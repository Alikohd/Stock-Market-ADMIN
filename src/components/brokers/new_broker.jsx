import React, { useState } from "react";
import { withRouter } from "../../services/with_router";
import { putRequest } from "../../services/requests";

const NewBroker = ({ navigate }) => {
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [info, setInfo] = useState("");

    const save = () => {
        const data = {
            broker: {
                name: name,
                balance: Number(balance),
            },
        };

        putRequest("/brokers", data).then(() => {
            navigate("/brokers");
        });
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleBalanceChange = (e) => {
        const value = e.target.value;
        const isValid = !isNaN(+value) && value[0] !== "-";
        setInfo(isValid ? "" : "Wrong number");
        setBalance(isValid ? value : "");
    };

    const handleSave = () => {
        const isValid = !!name && !!balance;
        setInfo(isValid ? "" : "Empty data");

        if (isValid) {
            save();
        }
    };

    return (
        <section style={styles.container}>
            Добавление брокера:
            <br/>
            <input
                value={name}
                placeholder="Name"
                onChange={(e) => handleNameChange(e)}
            />
            <br />
            <input
                placeholder="Balance"
                value={balance}
                onChange={(e) => handleBalanceChange(e)}
            />
            <br />
            <button onClick={() => navigate("/brokers")}>Close</button>
            <br />
            <button onClick={() => handleSave()}>Save</button>
            {info && <p style={styles.error}>{info}</p>}
        </section>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        textAlign: "center",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        background: "#f4f4f4",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
};

export default withRouter(NewBroker);
