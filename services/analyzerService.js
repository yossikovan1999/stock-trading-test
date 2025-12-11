import { getStocksCopy } from "./databaseService.js";

//========================================
//          topIncreasingStocks
//========================================
function filterByPrevious(stocks){

    return stocks.filter((stock)=>{
        stock.previousPrices.length > 0
    })
}

//==================================

function sortIncreasing(stocks){

    return stocks.sort((stock1, stock2)=>{
        const stock1Increase =  stock1.currentPrice - stock1.previousPrices[0];
        const stock2Increase = stock2.currentPrice - stock2.previousPrices[0];

        return stock2Increase - stock1Increase;
    })
}

//==================================

function topIncreasingStocks(){
    
    const stocks = getStocksCopy();
    const filteredStocks = filterByPrevious(stocks);

    console.log(filteredStocks.map((stock)=>stock.name));

  

    const sortedStocks = sortIncreasing(filteredStocks);

   return sortedStocks.slice(0, 3);
}

//========================================
//          mostVolatileStock
//========================================

function getVolatile(stock){

    const max = Math.max(...stock.previousPrices + stock.currentPrice);
    const min = Math.min(...stock.previousPrices + stock.currentPrice);

    return max - min
}


function mostVolatileStock(){

    let stocks = getStocksCopy();

    stocks = stocks.sort((stock1, stock2)=>getVolatile(stock2) - getVolatile(stock1));

    return stocks[0].name;
}

//========================================
//          categoryStability
//========================================

function categoryStability(){

    const stocks = getStocksCopy();

    const categories = new Set(stocks.map((stock)=>stock.category));

    const obj = {}

    for (const category of categories){
        const filtered = stocks.filter((stock)=>stock.category === category);
        
        if(filtered.length < 1){
            obj[category] = 0;
            continue;
        }

        
        
        const voltileAvg = filtered.reduce((acummulator, stock)=>acummulator + getVolatile(stock), 0) / filtered.length;
        
        obj[category] = voltileAvg;
    }

    return obj;

}

//========================================
//         analyzeMarketTrends
//========================================
export default function analyzeMarketTrends(){
    
    const obj = {
        topIncreasingStocks : topIncreasingStocks(),
        mostVolatileStock : mostVolatileStock(),
        categoryStability : categoryStability(),
    }
    
    return obj;
}



