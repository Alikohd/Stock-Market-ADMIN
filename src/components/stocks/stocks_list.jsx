import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRequest } from "../../services/requests";
import { withRouter } from "../../services/with_router";
import { setStock, setStocks } from "../../redux/reducer";

const StocksList = ({ stocks, setStocks, setStock, navigate }) => {
    useEffect(() => {
        getRequest("/stocks").then((json) => {
            setStocks(json);
        });
    }, [setStocks]);

    const handleStockClick = (stock) => {
        setStock(stock);
        navigate("/stock_info");
    };

    const renderedStocks = stocks.map((stock) => (
        <div key={stock.id} style={styles.stockCard} onClick={() => handleStockClick(stock)}>
            <h3>{stock.id}</h3>
            <p>{stock.full}</p>
        </div>
    ));

    return (
        <section style={styles.container}>
            <h1>All Stocks</h1>
            <div className="stock-list" style={styles.stockList}>
                {renderedStocks}
            </div>

            <div className="additional-content">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/start_trade")}>Start trading</button>
            </div>
        </section>
    );
};

const styles = {
    container: {
        maxWidth: "800px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        background: "#f4f4f4",
    },
    stockList: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "20px",
    },
    stockCard: {
        width: "200px",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
        background: "white",
        cursor: "pointer",
        transition: "transform 0.3s ease-in-out",
        ":hover": {
            transform: "scale(1.05)",
        },
    },
};

const mapStateToProps = (state) => ({
    stocks: state.reducer.stocks,
});

const mapDispatchToProps = {
    setStock,
    setStocks,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StocksList));
