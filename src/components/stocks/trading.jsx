import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../services/with_router";
import { io } from "socket.io-client";
import { Chart } from "chart.js/auto";

class Trading extends Component {
    constructor(props) {
        super(props);
        this.charts = [];
    }

    componentDidMount() {
        this.initializeSocket();
        this.graphic();
    }

    initializeSocket() {
        const data = JSON.parse(localStorage.getItem("graphics_data"));

        this.socket = io("http://localhost:4000");
        this.socket.on("message", (data) => {
            this.addPoints(data);
        });

        this.socket.emit("message", data);
    }

    addPoints(data) {
        if (!data[0]) return;

        for (let i = 0; i < this.props.trade_stock.length; i++) {
            this.charts[i].data.datasets[0].data.push(data[i].open);
            this.charts[i].data.labels.push(data[i].date);
            this.charts[i].update();
        }
    }

    graphic = () => {
        for (let i = 0; i < this.props.stocks.length; i++) {
            const ctx = document.getElementById(i.toString());

            if (!ctx) {
                return;
            }

            const data = {
                labels: [],
                datasets: [{
                    data: [],
                    label: this.props.trade_stock[i],
                    pointRadius: 1,
                    pointHoverRadius: 1,
                    backgroundColor: 'orange',
                    borderColor: 'orange'
                }]
            };

            let myChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                },
            });

            this.charts.push(myChart);
        }
    };

    go(url) {
        this.props.navigate(url);
    }

    clearTimer() {
        this.go("/start_trade");
    }

    componentWillUnmount() {
        this.socket.emit("message", { close: true });
        this.socket.disconnect();
    }

    render() {
        return (
            <div style={styles.container}>
                {this.props.trade_stock.map((trade_stock, index) => (
                    <div key={index} style={styles.chartContainer}>
                        <canvas id={index} style={styles.chart}></canvas>
                    </div>
                ))}

                <button onClick={() => this.clearTimer()} style={styles.button}>Close</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    stocks: state.reducer.stocks,
    trade_stock: state.reducer.trade_stock
});

export default connect(mapStateToProps)(withRouter(Trading));

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "20px auto",
    },
    chartContainer: {
        height: "15rem",
        width: "30rem",
        marginBottom: "20px",
    },
    chart: {
        width: "100%",
        height: "100%",
    },
    button: {
        backgroundColor: "#ffa500",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
    },
};
