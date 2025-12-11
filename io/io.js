import readlineSync from "readline-sync";

const validMenuInput = ["1", "2", "3", "4", "5"];

//===============================
//          print Menu
//===============================
export function getMenuInput(){

    const message = `please enter from the following:
    (1) search by id or name
    (2) show stocks above or below a given price
    (3) buy or sell a stock
    (4) analyze
    (5) exit
    `
    
    
    const result = readlineSync.question(message);

    if(!validMenuInput.includes(result)){
        throw new Error("The input must be in one of the above numbers!")
    }

    return result;
}

//===============================
//         choose Price
//===============================
export function choosePrice(){

    const price = readlineSync.question("Please enter a price: ");

    if(isNaN(price)){
       throw new Error("You must write a valid price!");
    }

    return Number(price);
    
}

//===============================
//         choose Price
//===============================
export function enterAbove(){

    const result = readlineSync.question("Please enter (1) for above (2) for under: ");

    if(result === "1"){
        return true;
    }else if(result === "2"){
        return false;
    }
    
    //thorw a error if the user did not choose 1 or 2.
    throw new Error("You must choose 1 or 2 only!");
}

//===============================
//       get Id Or Name
//===============================
export function enterIdOrName(){

    return readlineSync.question("Please enter a id or name to search by: ");
}

//===============================
//       get buy or sell
//===============================
export function enterBuyOrSell(){

    const result = readlineSync.question("Please enter buy or sell: ");
    
    if(result.toUpperCase() !== "BUY" && result.toUpperCase() !== "SELL"){
        throw new Error("You must enter Buy OR Sell only!");
    }

    return result.toUpperCase();
}

//===============================
//         get quantity
//===============================

export function getQuantity(){

    const quantity = readlineSync.question("Please enter a quantity: ");

    if(isNaN(quantity)){
       throw new Error("Quantity must be a valid number!");
    }

    return Number(quantity);

}