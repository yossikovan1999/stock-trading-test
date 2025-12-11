import {
  getMenuInput,
  choosePrice,
  enterAbove,
  enterIdOrName,
  enterBuyOrSell,
} from "./io/io.js";

import {
  searchStock,
  filterStocksByPrice,
  operateOnStock,
} from "./services/stockMarketService.js";

//===============================
//      handleSearchStock
//===============================
function handleSearchStock() {
  const idOrName = enterIdOrName();
  const result = searchStock(idOrName);
  console.table(result);
}

//===============================
//      handleOperateOnStock
//===============================
function handleOperateOnStock() {
  const idOrName = enterIdOrName();
  const buyOrSell = enterBuyOrSell();

  operateOnStock(buyOrSell, idOrName);
}

//===============================
//         handleInput
//===============================
function handlefilterStocksByPrice() {
  const price = choosePrice();
  const above = enterAbove();

  const result = filterStocksByPrice(price, above);

  console.table(result);
}

//===============================
//         handleInput
//===============================
function handleInput(userInput) {
  switch (userInput) {
    case "1":
      handleSearchStock();
      break;
    case "2":
       handlefilterStocksByPrice();
      break;
    case "3":
      handleOperateOnStock();
      break;
    case "4":
        return false;  
  }

  return true;
}

//===============================
//            runApp
//===============================
function runApp() {
  let loop = true;

  while (loop) {
    try {
      const result = getMenuInput();
      loop = handleInput(result);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
}

runApp();


// name: "BrightFuture Academy",
//             id: "x7l2df9",