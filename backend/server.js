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

//Login creates cookies
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

//check if logged in with cookies
app.get("/login", (req, res) => {
    if (req.session.user) {
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
})

//logout of account destroys cookies
app.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.send({message: "Logged Out"});
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

//get trade history list
app.post('/history', (req, res) => {
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

//get users information
app.post('/get_user', (req, res) => {
    const userId = req.body.userId;

    db.query(
        "SELECT * FROM users WHERE id = ?", 
        [userId], 
        (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        }
    )
});

app.post('/active_positions', (req, res) => {
    const userId = req.body.userId;

    db.query(
        "SELECT * FROM active_positions WHERE user_id = ?", 
        [userId], 
        (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        }
    )
});

app.post('/buy', (req, res) => {
    const ticker = req.body.tickerSymbol;
    const shares = req.body.shares;
    const amount = req.body.amount;
    const userId = req.body.userId;
    const userCash = req.body.userCash;
    const stockPrice = req.body.stockPrice;

    var date = new Date();
    var dateStr =
    date.getFullYear() + "-" + 
    ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getDate()).slice(-2) + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);

    console.log(shares ? ((amount * stockPrice) > userCash) : (amount > userCash));

    //check if the user has enough money
    if (shares ? ((amount * stockPrice) > userCash) : (amount > userCash)) {
        res.send({message: "Insufficient Funds"});
    }
    else {
        db.query(
            "INSERT INTO trades (ticker_symbol, cost_basis, date, user_id, shares, buy)" + 
            "VALUES (?, ?, ?, ?, ?, true)",  
            [ticker, stockPrice, dateStr, userId, (shares ? amount : (amount/stockPrice))], 
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            }
        );

        //insert into active positions or add to shares
        db.query(
            "INSERT INTO active_positions (ticker_symbol, user_id, shares) VALUES (?, ?, ?)" + 
            "ON DUPLICATE KEY UPDATE shares = shares + ?",  
            [ticker, userId, (shares ? amount : (amount/stockPrice)), (shares ? amount : (amount/stockPrice))], 
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            }
        );

        //subtract money from account
        db.query(
            "UPDATE users SET cash=(cash - ?) WHERE id = ?", 
            [((!shares) ? amount : (amount*stockPrice)), userId], 
            (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                }
            }
        );
    
        res.send({message: "Buy Complete"});
    }
});

app.post('/sell', (req, res) => {
    const ticker = req.body.tickerSymbol;
    const shares = req.body.shares;
    const amount = req.body.amount;
    const userId = req.body.userId;
    const stockPrice = req.body.stockPrice;

    var date = new Date();
    var dateStr =
    date.getFullYear() + "-" + 
    ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
    ("00" + date.getDate()).slice(-2) + " " +
    ("00" + date.getHours()).slice(-2) + ":" +
    ("00" + date.getMinutes()).slice(-2) + ":" +
    ("00" + date.getSeconds()).slice(-2);

    //check if the person has the shares to sell
    var userShares;
    db.query(
        "SELECT * FROM active_positions WHERE user_id = ? AND ticker_symbol = ?",
        [userId, ticker], 
        (err, result) => {
            if (err) {
                console.log(err);
            }
            if (result.length === 0) {
                res.send({message: "You don't have any " + ticker});
            } else {
                userShares = result[0].shares;
                if ((shares ? amount : (amount/stockPrice)) > userShares) {
                    res.send({message: "Insufficient shares"});
                }
                else {
                    //insert into trade history
                    db.query(
                        "INSERT INTO trades (ticker_symbol, cost_basis, date, user_id, shares, buy)" + 
                        "VALUES (?, ?, ?, ?, ?, false)", 
                        [ticker, stockPrice, dateStr, userId, (shares ? amount : (amount/stockPrice))], 
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(result);
                        }
                    );
                
                    //subtract shares from active_positions
                    db.query(
                        "UPDATE active_positions SET shares=(shares-?) WHERE user_id = ? AND ticker_symbol = ?",  
                        [(shares ? amount : (amount/stockPrice)), userId, ticker], 
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(result);
                        }
                    );
                
                    //delete position if the user has no shares
                    db.query(
                        "DELETE FROM active_positions WHERE user_id = ? AND shares <= 0", 
                        [userId], 
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log(result);
                        }
                    );
                
                    //add cash to account
                    db.query(
                        "UPDATE users SET cash=(cash + ?) WHERE id = ?", 
                        [((!shares) ? amount : (amount*stockPrice)), userId], 
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(result);
                                res.send({message: "Sell Complete"});
                            }
                        }
                    );
                }
            }
        }
    );
})

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