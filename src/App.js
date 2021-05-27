import React from "react";
import Header from "./components/Header/Header";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Customer from "./components/Customer/Customer";
import Footer from "./components/Footer/Footer";
import Auth from "./components/Auth/Auth";
import Menu from "./components/Menu/Menu";
import Restaurant from "./components/Restaurant/Restaurant";

function App() {
    const ENDPOINT = "https://bb-bkd.herokuapp.com/";

    return <div>
        <Header />
        <Router>
            <Route path="/" exact render={(props) => (<Customer {...props} ENDPOINT={ENDPOINT}/>)} />
            <Route path="/auth" render={(props) => (<Auth {...props} ENDPOINT={ENDPOINT}/>)} />
            <Route path="/menu" render={(props) => (<Menu {...props} ENDPOINT={ENDPOINT}/>)} />
            <Route path="/restaurant" render={(props) => (<Restaurant {...props} ENDPOINT={ENDPOINT}/>)} />
        </Router>
        <Footer />
    </div>
}

export default App;