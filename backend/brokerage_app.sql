CREATE DATABASE brokerage_app;

USE brokerage_app;

CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT, 
    username VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    cash FLOAT, 
    PRIMARY KEY (id)
);

CREATE TABLE trades (
	trade_id INT AUTO_INCREMENT, 
    ticker_symbol VARCHAR(10), 
    cost_basis FLOAT,
    date DATETIME, 
    shares FLOAT, 
    buy BOOLEAN,
    user_id INT NOT NULL, 
	PRIMARY KEY (trade_id), 
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE active_positions (
    ticker_symbol VARCHAR(10), 
    user_id INT, 
    shares FLOAT, 
	PRIMARY KEY (ticker_symbol, user_id), 
    FOREIGN KEY (user_id) REFERENCES users(id)
);

SELECT * FROM users;

SELECT * FROM trades;

SELECT * FROM active_positions;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
