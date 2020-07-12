import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Home from "./pages/home";
import Stream from "./pages/Stream";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import Broadcast from "./pages/broadcast";

function App() {
    return (
        <Router history={history}>
            <Container>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/streams/:id" component={Stream} />
                    <Route path="/broadcast" component={Broadcast} />
                </Switch>
            </Container>
        </Router>
    );
}

const Container = styled.div`
    height: calc(var(--vh, 1vh) * 100);
    width: 100%;
    display: flex;
    flex-direction: column;
`;

export default App;
