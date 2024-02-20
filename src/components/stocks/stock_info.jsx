    import React, { Component } from "react";
    import { connect } from "react-redux";
    import { setStockInfo } from "../../redux/reducer";
    import { withRouter } from "../../services/with_router";
    import { getRequest } from "../../services/requests";
    import Chart from 'chart.js/auto';
    import { CategoryScale } from 'chart.js';
    import { Line } from "react-chartjs-2";

    Chart.register(CategoryScale);

    class StockInfo extends Component {
        constructor(props) {
            super(props);
            this.chart = null;
            this.state = { data: null };
            this.setStockInfo();
        }

        setStockInfo() {
            getRequest("/stocks/" + this.props.stock.id)
                .then(json => {
                    this.props.setStockInfo(json);
                });
        }

        navigation(url) {
            this.props.navigate(url);
        }

        componentDidMount() {
            this.setStockInfo();
            this.graphic(365);
        }

        graphic = (period) => {
            const stock_info = this.props.stock_info;

            let dates = stock_info.map(info => info.date).splice(stock_info.length - period, period);
            let opens = stock_info.map(info => info.open).splice(stock_info.length - period, period);

            this.setState({
                data: {
                    labels: dates,
                    datasets: [{
                        data: opens,
                        label: this.props.stock.full,
                        pointRadius: 1,
                        pointHoverRadius: 1,
                        backgroundColor: 'rgba(255, 165, 0, 0.5)',
                        borderColor: 'rgba(255, 165, 0, 1)'
                    }]
                }
            });
        };

        table() {
            const stock_info = this.props.stock_info;

            let table = stock_info.map(info => `${info.date} - ${info.open}$`).reverse();
            let key = 0;

            const renderedTable = table.map(table => (
                <li key={key++}>
                    {table}
                </li>
            ));

            return (<>{renderedTable}</>);
        }

        render() {
            const stock = this.props.stock;
            const table = this.table();
            const chart = this.state.data ? <Line data={this.state.data}
                                                  width={600}
                                                  height={300}
            /> : <></>;

            return (
                <div style={styles.container}>
                    <h2 style={styles.heading}>{stock.full}</h2>
                    {chart}

                    <div style={styles.scrollBar}>
                        <ul style={styles.infoTable}>
                            {table}
                        </ul>
                    </div>

                    <button style={styles.button} onClick={() => this.graphic(365)}>1 Year</button>
                    <button style={styles.button} onClick={() => this.graphic(this.props.stock_info.length)}> {">"} 1 Year </button>
                <div>
                    <button style={styles.button} onClick={() => this.navigation("/stocks")}>Close</button>
                </div>
                </div>
            );
        }
    }

    const mapStateToProps = state => ({
        stock: state.reducer.choosed_stock,
        stock_info: state.reducer.stock_info
    });

    const mapDispatchToProps = {
        setStockInfo
    };

    export default connect(mapStateToProps, mapDispatchToProps)(withRouter(StockInfo));

    const styles = {
        container: {
            textAlign: 'center',
            padding: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            maxWidth: '600px',
            margin: 'auto'
        },
        heading: {
            color: '#333',
            marginBottom: '10px'
        },
        scrollBar: {
            height: "200px",
            width: "80%",
            overflowY: "scroll",
            margin: "20px auto"
        },
        infoTable: {
            listStyleType: 'none',
            padding: '0',
            margin: '0'
        },
        button: {
            backgroundColor: '#ffa500',
            color: 'white',
            padding: '10px',
            margin: '5px',
            borderRadius: '5px',
            cursor: 'pointer'
        }
    };
