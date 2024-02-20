import React, { useEffect } from "react";
import { connect } from "react-redux";
import { setBroker, setBrokers } from "../../redux/reducer";
import { getRequest } from "../../services/requests";
import { withRouter } from "../../services/with_router";

const BrokersList = ({ brokers, setBrokers, setBroker, navigate }) => {
    useEffect(() => {
        getRequest("/brokers")
            .then((json) => {
                setBrokers(json);
            });
    }, [setBrokers]);

    const handleBrokerClick = (broker) => {
        setBroker(broker);
        navigate("/broker");
    };

    const renderedBrokers = brokers.map((broker) => (
        <React.Fragment key={broker.id}>
            <button onClick={() => handleBrokerClick(broker)}>
                {broker.name}
            </button>
            <br />
        </React.Fragment>
    ));

    return (
        <section className="all_brokers" style={styles.container}>
            <div className="content">
                <h1>Brokerage Platform Admin</h1>
                <p>Explore brokers list:</p>

                <div className="broker-buttons">
                    <ul>{renderedBrokers}</ul>
                </div>
            </div>

            <div className="additional-content">
                <button onClick={() => navigate("/new_broker")}>Add Broker</button>
                <button onClick={() => navigate("/")}>Home</button>
            </div>
        </section>
    );
};

const styles = {
    container: {
        display: "flex",
        alignItems: "center",
        minHeight: "100vh",
    },
    content: {
        flex: 1,
    },
    additionalContent: {
        marginLeft: "20px",
    },
};

const mapStateToProps = (state) => ({
    brokers: state.reducer.brokers,
});

const mapDispatchToProps = {
    setBroker,
    setBrokers,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BrokersList));
