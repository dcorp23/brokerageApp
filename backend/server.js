import express from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { getStockCurrentPrice, getStockQuote } from "./StockApi.js";

const db = createConnection({
    host : 'localhost', 
    user : 'root', 
    password : 'password', 
    database : 'brokerage_app'
});

db.connect((err) => {
    if(err) {
        console.log(err);
    }
    console.log('MySQL Connected');
})

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(session({
    key: "userId", 
    secret: "thisIsTheSecret", 
    resave: false, 
    saveUninitialized: false, 
    cookie: {
        expires: 60 * 60 * 24
    }
}));

app.use(cors({
    origin: ["http://localhost:5173"], 
    methods: ["GET", "POST"], 
    credentials: true
}));

//Create account
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?", //check if the username is taken
        [username], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            if (result) {
                console.log(result);
                if (result.length != 0) { //if taken send message
                    res.send({message : "Username already taken"});
                }
                else { //if not taken store in database
                    db.query(
                        "INSERT INTO users (username, password, cash) VALUES (?, ?, ?)",
                        [username, password, 100000], 
                        (err) => {
                            res.send(err);
                        }
                    );
                }
            }
        }
    );
});

//Login
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?", 
        [username, password], 
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err);
            }
            if (result) {
                if (result.length == 1) {
                    req.session.user = result;
                    res.send(result);
                }
                else {
                    res.send({message : "Username/Password Incorrect"});
                }
            }
        }
    );
});

//check if logged in
app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})

app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.redirect("/");
    });
})

//delete user by a given id
app.post('/delete_user', (req, res) => {
    const userId = req.body.userId;

    db.query(
        "DELETE FROM users WHERE id = ?",
        [userId], 
        (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        }
    );
});

//get portfolio list
app.post('/portfolio', (req, res) => {
    const userId = req.body.userId;

    db.query(
        "SELECT * FROM trades WHERE user_id = ?", 
        [userId], 
        (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        }
    )
});

//get stock price
app.post('/stock_api/price', (req, res) => {
    const symbol = req.body.symbol;
    getStockCurrentPrice(symbol).then((result) => {
        const data = result;
        res.send(data);
    });
});

//get stock quote
app.post('/stock_api/quote', (req, res) => {
    const symbol = req.body.symbol;
    getStockQuote(symbol).then((result) => {
        const data = result;
        res.send(data);
    });
    
})

app.listen('3000', () => {
    console.log('Serever started on port 3000');
});