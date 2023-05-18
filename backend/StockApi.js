import axios from "axios";
import fs from "fs";

const APIKEY = '4d422dfb74mshcea6b8b5e469e9ap13ad43jsn1cf17005f97f';

export const getAllStocks = async () => {
    const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/stocks',
    params: {
        country: 'United States',
        format: 'json'
    },
    headers: {
        'X-RapidAPI-Key': APIKEY,
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const getStockInfo = async (symbol) => {
    const options = {
    method: 'GET',
    url: 'https://twelve-data1.p.rapidapi.com/price',
    params: {
        symbol: symbol,
        format: 'json',
        outputsize: '30'
    },
    headers: {
        'X-RapidAPI-Key': APIKEY,
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        return (response.data);
    } catch (error) {
        console.error(error);
    }
}