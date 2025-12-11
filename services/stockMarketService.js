import { getStocksCopy, getDatabaseCopy } from "./databaseService.js";
import { getQuantity } from "../io/io.js";

//====================================
//           searchStock
//====================================
export function searchStock(identifier) {
  //get a copy of the database.
  const database = getStocksCopy();

  const result = database.filter(
    (stock) => stock.id === identifier || stock.name === identifier
  );

  //make sure there were stocks that match and if not log none found.
  if (result.length < 1) {
    console.log("No stocks found that match the id or the name given.");
  }

  return result;
}


//====================================
//         filterAbove
//===================================
function filterAbove(price, stocks) {
  return stocks.filter((stock) => stock.currentPrice > price);
}

//====================================
//         filterBelow
//===================================
function filterBelow(price, stocks) {
  return stocks.filter((stock) => {
    stock.currentPrice < price;
  });
}

//====================================
//         filterStocksByPrice
//===================================
export function filterStocksByPrice(givenPrice, above) {
  const stocks = getStocksCopy();

  let result = [];

  if (above) {
    result = filterAbove(givenPrice, stocks);
  } else if (!above) {
    result = filterBelow(givenPrice, stocks);
  }

  //verify that the result is not empty and if it is log a message.
  if (result.length < 1) {
    console.log("No stocks found that are below or under the given price.");
  }

  return result;
}

//====================================
//         updateAllInCategory
//====================================

function updateAllInCategory(stocks, curStock, amount) {
  /*this will return all the stocks in the category not 
    including the current stock.*/
  const filteredStocks = stocks.filter(
    (stock) =>
      stock.category === curStock.category &&
      stock !== curStock
  );

  //for every stock update the price
  filteredStocks.forEach((stock) => {
    stock.previousPrices.push(stock.currentPrice);
    stock.currentPrice = stock.currentPrice * amount + stock.currentPrice;
  });
}

//======================================
//           handleSell
//======================================
function handleSell(stocks, curStock, quantity) {
  
  curStock.quantity += quantity;

  updateAllInCategory(stocks, curStock, -0.01);

  //update the stock price.
  curStock.previousPrices.push(curStock.currentPrice);
  curStock.currentPrice = curStock.currentPrice - curStock.currentPrice * 0.05;
}

//======================================
//             handleBuy
//======================================
function handleBuy(stocks, curStock, quantity) {
  
  if (curStock.availableStocks - quantity < 0) {
    throw new Error("Unable to buy this amount try again with a new amount.");
  }

  updateAllInCategory(stocks, curStock, 0.01);

  curStock.previousPrices.push(curStock.currentPrice);
  curStock.currentPrice = curStock.currentPrice + curStock.currentPrice * 0.05;

  curStock.availableStocks -= quantity;
}

//======================================
//           operateOnStock
//======================================
export function operateOnStock(operation, identifier) {
  
  if(operation.toUpperCase() !== "BUY" && operation.toUpperCase() !== "SELL"){
        throw new Error("You must enter Buy OR Sell only!");
  }
  
  //get the quantity from the user.
  const quantity = getQuantity();

  const database = getDatabaseCopy();
  const stocks = getStocksCopy();

  //this will find the stock
  const curStock = stocks.find(
    (stock) => stock.id === identifier || stock.name === identifier
  );
   
  //make sure the stock exists and if not thorw a error.
  if(!curStock){
    throw new Error("Stock not found.")
  }

  if (operation.toUpperCase() === "BUY") {
    handleBuy(stocks, curStock, quantity);
  } else {
    handleSell(stocks, curStock, quantity);
  }

   database.lastUpdated = new Date().toString();

   console.table(stocks);
}
