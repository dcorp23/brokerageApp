import express, {json} from 'express';
import { createConnection } from 'mysql';
import cors from 'cors';

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

app.use(json());
app.use(cors());

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
                        "INSERT INTO users (username, password) VALUES (?, ?)",
                        [username, password], 
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
                console.log(result);
                if (result.length == 1) {
                    res.send(result);
                }
                else {
                    res.send({message : "Username/Password Incorrect"});
                }
            }
        }
    );
});

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


app.listen('3000', () => {
    console.log('Serever started on port 3000');
});