import React, { Component } from 'react';
import * as ReactGA from "react-ga";
import { Button } from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class About extends Component {
    state = {
        currentTime: new Date().toLocaleTimeString(),
        motivationalQuote: '',
        doomsdayCountdown: ''
    };

    timer() {
        this.setState({
            currentTime: new Date().toLocaleTimeString(),
            doomsdayCountdown: this.getDoomsdayCountdown()
        });
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
        this.setState({
            motivationalQuote: this.getMotivationalQuote()
        });
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    getDoomsdayCountdown() {
        const doomsDayDateString = "April 5, 2018 8:00:00";

        let date1 = new Date();
        let date2 = new Date(doomsDayDateString);
        let timeDiff = Math.abs(date2.getTime() - date1.getTime());
        let seconds = (timeDiff / 1000).toFixed(0);
        let minutes = Math.floor(seconds / 60);
        let hours = "";
        if (minutes > 59) {
            hours = Math.floor(minutes / 60);
            hours = (hours >= 10) ? hours : "0" + hours;
            minutes = minutes - (hours * 60);
            minutes = (minutes >= 10) ? minutes : "0" + minutes;
        }
        seconds = Math.floor(seconds % 60);
        seconds = (seconds >= 10) ? seconds : "0" + seconds;
        let countdown = "";
        if (hours !== "") {
            countdown = hours + " hours, " + minutes + " minutes and " + seconds + " seconds";
        } else {
            countdown = minutes + " minutes and " + seconds + " seconds"
        }
        return "We have " + countdown + " left to FYP User Acceptance Testing.";
    }

    getMotivationalQuote() {
        const quotes = ["You miss 100% of the shots you don't take. – Wayne Gretzky"
            , "The most difficult thing is the decision to act, the rest is merely tenacity. – Amelia Earhart"
            , "I attribute my success to this: I never gave or took any excuse. – Florence Nightingale"
            , "Life is 10% what happens to me and 90% of how I react to it. – Charles Swindoll"
            , "The most common way people give up their power is by thinking they don’t have any. – Alice Walker"];
        const randomNumber = Math.floor(Math.random() * quotes.length);
        return(
            <strong>
                {quotes[randomNumber]}
            </strong>
        );
    }

    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                const medsenseDescription = <h4>
                    Ever felt like getting a bit more practice?<br/>
                    This is the place for you.<br/><br/>
                    Medsense is a case-based simulation website for medical trainees, <br/>
                    with faculty-vetted cases <em>from you, for you</em>.<br/><br/>
                    <strong>Upload</strong> an interesting case or <strong>try out</strong> a case<br/>
                    and check out your strength and weaknesses at your dashboard.<br/><br/>
                    Come make sense of medicine.
                </h4>;
                return(
                    <div className="container">
                        {/*<div className="row">*/}
                            {/*<div className="col-md-offset-2 col-md-8 text-center">*/}
                                {/*<h1>*/}
                                {/*Welcome to Medsense!*/}
                                {/*</h1>*/}
                                {/*<h1>*/}
                                {/*The time now is {this.state.currentTime}.*/}
                                {/*</h1>*/}
                                {/*<h1 style={{color: 'red'}}>*/}
                                {/*{this.state.doomsdayCountdown}*/}
                                {/*</h1>*/}
                                {/*<h2>*/}
                                {/*{this.state.motivationalQuote}*/}
                                {/*</h2>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                        <div className="row">
                            <div className="col-md-offset-2 col-md-8 text-center">
                                <img src="./medsense_logo.png" style={{width: '70%', marginLeft: '45px'}} alt="Medsense" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-offset-2 col-md-8 text-center main-login" style={{backgroundColor: 'rgba(255,255,255,0.4)', padding: '20px'}}>
                                <h1>
                                    Welcome to Medsense
                                </h1><br/>
                                {medsenseDescription}
                                <br/><br/>
                                <Button onClick={(e) => window.location='/register'} className="btn btn-primary btn-lg" style={{whiteSpace:"pre-wrap", background: "#483D8B", color:"white", width: "25%"}}>
                                    <p style={{marginTop: "7%"}}>REGISTER</p>
                                </Button>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <Redirect to="/home"/>;
        }
    }

    render() {
        // React GA
        ReactGA.initialize('UA-112382826-1');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(About);