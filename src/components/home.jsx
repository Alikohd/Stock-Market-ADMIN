import React from "react";
import { withRouter } from "../services/with_router";

const Home = ({ navigate }) => {
    const go = (url) => {
        navigate(url);
    };

    return (
        <section style={styles.container}>
            <h1 style={styles.title}>Welcome to Brokerage Platform Admin!</h1>
            <p style={styles.description}>Explore the following sections:</p>
            <div style={styles.buttonContainer}>
                <button onClick={() => go("/brokers")}>Brokers</button>
                <button onClick={() => go("/stocks")}>Stocks</button>
            </div>
        </section>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "1rem",
    },
    description: {
        fontSize: "1rem",
        marginBottom: "2rem",
    },
    buttonContainer: {
        display: "flex",
        gap: "1rem",
    },
};

export default withRouter(Home);
