import React, { Component } from 'react';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {currentTime: new Date().toLocaleTimeString(), motivationalQuote: '', doomsdayCountdown: ''}
    }

    timer() {
        this.setState({
            currentTime: new Date().toLocaleTimeString(),
            doomsdayCountdown: this.getDoomsdayCountdown()
        });
    }

    componentDidMount() {
        // Dynamically set background image
        document.body.style.backgroundImage = "url('./home_background.jpg')";

        this.intervalId = setInterval(this.timer.bind(this), 1000);
        this.setState({
            motivationalQuote: this.getMotivationalQuote()
        });
    }

    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    getDoomsdayCountdown() {
        let date1 = new Date();
        let date2 = new Date("November 7, 2017 10:00:00");
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
        return "We have " + countdown + " left to FYP Acceptance.";
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

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <h1>
                            Welcome to Medsense!
                        </h1>
                        <h1>
                            The time now is {this.state.currentTime}.
                        </h1>
                        <h1 style={{color: 'red'}}>
                            {this.state.doomsdayCountdown}
                        </h1>
                        <h2>
                            {this.state.motivationalQuote}
                        </h2>
                        <div className="container">
                            <div className="row main">
                                <div className="main-login main-center">
                                    <form action="/api/uploadProfileImage" encType="multipart/form-data" method="post">
                                        <div className="form-group">
                                            <label className="cols-sm-2 control-label">Upload File</label>
                                            <input type="file" name="upload" multiple="multiple" />
                                            <br/>
                                            <input type="submit" value="Upload" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;