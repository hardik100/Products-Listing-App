import React, {useState} from "react";
import {BrowserRouter as Router,Route, Switch} from "react-router-dom";
import ProductListing from "./ProductListing";
import ProductDetails from "./ProductDetails";
import './App.css';
import TableList from "./table";

function App() {
  return (
      <Router>
        <Switch>
        <Route path="/" exact component={ProductListing} />
        <Route path="/table" component={TableList} />
        <Route path="/productDetails" component={ProductDetails} />
        </Switch>
      </Router>
  );
}

export default App;






