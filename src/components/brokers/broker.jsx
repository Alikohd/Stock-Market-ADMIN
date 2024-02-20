import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteRequest, putRequest } from "../../services/requests";
import { withRouter } from "../../services/with_router";

const BrokerInfo = ({ broker, navigate }) => {
    const [balance, setBalance] = useState(broker.balance);
    const [info, setInfo] = useState("");

    useEffect(() => {
        setBalance(broker.balance);
    }, [broker.balance]);

    const go = (url) => {
        navigate(url);
    };

    const handleBalanceChange = (e) => {
        const value = e.target.value;
        const isValid = !isNaN(+value) && value[0] !== "-";
        setInfo(isValid ? "" : "Wrong number");
        setBalance(isValid ? value : "");
    };

    const save = () => {
        const data = {
            broker: {
                id: broker.id,
                name: broker.name,
                balance: Number(balance),
            },
        };

        putRequest("/brokers", data).then(() => {
            go("/brokers");
        });
    };

    const handleSave = () => {
        const isValid = !!balance;
        setInfo(isValid ? "" : "Empty data");

        if (isValid) {
            save();
        }
    };

    const handleDelete = () => {
        deleteRequest("/brokers/" + broker.id).then(() => {
            go("/brokers");
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1>Broker: {broker.name}</h1>
            </div>
            <div style={styles.content}>
                <p>Current balance:</p>
                <input
                    type="number"
                    value={balance}
                    onChange={(e) => handleBalanceChange(e)}
                />
            </div>
            <div>
                <button onClick={() => handleSave()}>Save</button>
                <button onClick={() => handleDelete()}>Delete brock</button>
                {info && <p style={styles.error}>{info}</p>}
            </div>
            <div style={styles.footer}>
                <button onClick={() => go("/brokers")}>Close</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        background: "#f4f4f4",
    },
    header: {
        marginBottom: "20px",
    },
    content: {
        marginBottom: "20px",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
    footer: {},
};

const mapStateToProps = (state) => ({
    broker: state.reducer.choosed_broker,
});

export default connect(mapStateToProps)(withRouter(BrokerInfo));
