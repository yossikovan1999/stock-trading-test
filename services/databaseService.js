import stockMarket from "../database/stockMarket.js";

export function getStocksCopy(){
    
    const stocks = stockMarket.stocks;

    return [...stocks];
}

export function getDatabaseCopy(){

    return {...stockMarket};
}