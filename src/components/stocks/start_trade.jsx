import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../services/with_router";
import { setTradeStock } from "../../redux/reducer";

class StartTrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedStocks: [false, false, false, true, false, false, true, true],
            interval: '2',
            start_date: new Date(2023, 9, 2)
        };
    }

    go(url) {
        this.props.navigate(url);
    }

    get_stocks_id() {
        return this.props.stocks
            .filter((stock, index) => this.state.selectedStocks[index])
            .map(stock => stock.id);
    }

    get_dot_date_format(date) {
        return (date.getMonth() + 1) + '.' + date.getDate() + "." + date.getFullYear();
    }

    get_kebab_date_format(date) {
        return date.toISOString().slice(0, 10);
    }

    start_trade() {
        if (!this.can_start_trade()) return;

        const stocksId = this.get_stocks_id();
        this.props.setTradeStock(stocksId);

        const data = {
            stocks: stocksId,
            date: this.get_dot_date_format(this.state.start_date),
            interval: this.state.interval * 1000
        };

        localStorage.setItem("graphics_data", JSON.stringify(data));
        this.go("/trading_graphics");
    }

    can_start_trade() {
        return this.state.interval && this.state.start_date;
    }

    onIntervalChange(e) {
        let value = e.target.value;
        let cond = !isNaN(+value) && value[0] !== '-' && Number(value) < 100;
        this.setState({ interval: cond ? value : '' });
    }

    onStartDateChange(e) {
        let value = e.target.value;
        let finalDate = new Date(2023, 10, 11);
        let curDate = new Date(value);
        let cond = curDate < finalDate;
        this.setState({ start_date: cond ? curDate : undefined });
    }

    onSelectedStocksChange(position) {
        const updatedSelectedStocks = this.state.selectedStocks.map((item, index) =>
            index === position ? !item : item
        );
        this.setState({ selectedStocks: updatedSelectedStocks });
    }

    render() {
        const stocks = this.props.stocks;

        const renderedStocks = stocks.map((stock, index) => (
            <div key={stock.id} style={styles.stockItem}>
                <input
                    type="checkbox"
                    value={stock.id}
                    checked={this.state.selectedStocks[index]}
                    onChange={() => this.onSelectedStocksChange(index)}
                />
                <label style={styles.stockLabel}>{stock.full}</label>
            </div>
        ));

        return (
            <div style={styles.container}>
                <div style={styles.stockList}>{renderedStocks}</div>
                <input
                    placeholder="Interval"
                    value={this.state.interval}
                    onChange={(e) => this.onIntervalChange(e)}
                    style={styles.input}
                />
                <br />
                <input
                    type="date"
                    value={this.get_kebab_date_format(this.state.start_date)}
                    onChange={(e) => this.onStartDateChange(e)}
                    style={styles.input}
                />
                <br />
                <button onClick={() => this.start_trade()} style={styles.button}>Start</button>
                <br />
                <button onClick={() => this.go("/stocks")} style={styles.button}>Close</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    stocks: state.reducer.stocks
});

const mapDispatchToProps = {
    setTradeStock
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StartTrade));

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "20px auto",
    },
    stockList: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    stockItem: {
        marginBottom: "10px",
        display: "flex",
        alignItems: "center",
    },
    stockLabel: {
        marginLeft: "5px",
    },
    input: {
        padding: "8px",
        margin: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "80%",
    },
    button: {
        backgroundColor: "#ffa500",
        color: "white",
        padding: "10px",
        margin: "5px",
        borderRadius: "5px",
        cursor: "pointer",
    },
};
