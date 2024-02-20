const type_values = {
    BROKERS: "BROKERS", BROKER: "BROKER",
    STOCKS: "STOCKS", STOCK: "STOCK",
    STOCK_INFO: "STOCK_INFO", TRADE_STOCKS: "TRADE_STOCKS"
};

const getData = (name) => {
    return JSON.parse(localStorage.getItem(name)) || [];
};

const brokers = getData("brokers");
const stocks = getData("stocks");
const trade_stock = getData("trade_stock");

const default_state = {
    brokers,
    stocks,
    choosed_broker: JSON.parse(localStorage.getItem("choosed_broker")) || null,
    choosed_stock: JSON.parse(localStorage.getItem("choosed_stock")) || null,
    stock_info: JSON.parse(localStorage.getItem("stock_info")) || null,
    trade_stock
};

export function Reducer(state = default_state, action) {
    switch (action.type) {
        case type_values.BROKERS:
            return { ...state, brokers: action.payload };
        case type_values.BROKER:
            return { ...state, choosed_broker: action.payload };
        case type_values.STOCKS:
            return { ...state, stocks: action.payload };
        case type_values.STOCK:
            return { ...state, choosed_stock: action.payload };
        case type_values.TRADE_STOCKS:
            return { ...state, trade_stock: action.payload };
        case type_values.STOCK_INFO:
            console.log("set stock info");
            return { ...state, stock_info: action.payload };
        default:
            return state;
    }
}

export const setBrokers = (brokers) => ({
    type: type_values.BROKERS,
    payload: brokers
});

export const setStocks = (stocks) => ({
    type: type_values.STOCKS,
    payload: stocks
});

export const setBroker = (broker) => ({
    type: type_values.BROKER,
    payload: broker
});

export const setStock = (stock) => ({
    type: type_values.STOCK,
    payload: stock
});

export const setStockInfo = (info) => ({
    type: type_values.STOCK_INFO,
    payload: info
});

export const setTradeStock = (stocks) => ({
    type: type_values.TRADE_STOCKS,
    payload: stocks
});
