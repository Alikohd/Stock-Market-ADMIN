import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./components/home";

import Brokers_list from "./components/brokers/brokers_list";
import BrokerInfo from "./components/brokers/broker";
import NewBroker from "./components/brokers/new_broker";

import StocksList from "./components/stocks/stocks_list";
import StockInfo from "./components/stocks/stock_info";
import StartTrade from "./components/stocks/start_trade";
import Trading from "./components/stocks/trading";

function App() {
    return (
        <BrowserRouter>
            <div className="App"
                 style={{display: "flex", flexDirection: "column", justifyContent: "center", width: "max-content"}}>
                <Routes>
                    <Route path="/" Component={Home}/>
                    <Route path="/brokers" Component={Brokers_list}/>
                    <Route path="/broker" Component={BrokerInfo}/>
                    <Route path="/new_broker" Component={NewBroker}/>

                    <Route path="/stocks" Component={StocksList}/>
                    <Route path="/stock_info" Component={StockInfo}/>
                    <Route path="/start_trade" Component={StartTrade}/>
                    <Route path="/trading_graphics" Component={Trading}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
