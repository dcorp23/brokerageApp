import express from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

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
                        "INSERT INTO users (username, password, chash) VALUES (?, ?, ?)",
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
                    console.log(req.session.user);
                    res.send(result);
                }
                else {
                    res.send({message : "Username/Password Incorrect"});
                }
            }
        }
    );
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
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

app.post('/get_user', (req, res) => {
    const userId = req.body.userId;

    db.query(
        "SELECT * FROM users WHERE id = ?", 
        [userId], 
        (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result.data[0]);
        }
    )
})


app.listen('3000', () => {
    console.log('Serever started on port 3000');
});