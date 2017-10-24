import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Login from './LoginSignup/Login';

import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Login exact path="/" component={Login} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
