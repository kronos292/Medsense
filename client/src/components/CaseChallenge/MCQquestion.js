import React, { Component } from 'react';
import { Form, FormGroup, Col, Alert } from 'react-bootstrap';
import { Checkbox, Button, Row, Panel } from 'react-bootstrap';
import { Line } from 'rc-progress';
import { bindAll } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import MCQAnswers from './MCQAnswers';
import './Game.css';
import ImageMagnifier from "./ImageMagnifier";

class MCQquestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mark: this.props.question.mark,
            question: this.props.question.question,
            stem: this.props.question.stem,
            type: this.props.question.type,
            attachment: this.props.question.attachment,
            pearl: this.props.question.pearl,
            reference: this.props.question.reference,
            showAnswers: false,
            showNextButton: true,
            mcq1: this.props.question.mcq1,
            mcq2: this.props.question.mcq2,
            mcq3: this.props.question.mcq3,
            mcq4: this.props.question.mcq4,
            mcq5: this.props.question.mcq5,
            mcq6: this.props.question.mcq6,
            check1Stu: false,
            check2Stu: false,
            check3Stu: false,
            check4Stu: false,
            check5Stu: false,
            check6Stu: false,
            answerid: this.props.answerid,
            authid: this.props.authid,
            timeLimit: parseFloat(this.props.question.time) * 60,
            time: {},
            date: this.props.date,
            seconds: parseFloat(this.props.question.time) * 60,
        };
        this.timer = 0;
        bindAll(this, 'selectDone', 'startTimer', 'countDown', 'secondsToTime', 'pauseTimer', 'renderTimer',
            'renderShowNextButton', 'renderProgressBar', 'renderScenario', 'renderMCQ3', 'renderMCQ4', 'renderMCQ5',
            'renderMCQ6', 'renderContent', 'renderStorySoFar');
    }

    startTimer() {
        if (this.timer === 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.selectDone()
        }
    }

    secondsToTime(secs) {
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    pauseTimer() {
        clearInterval(this.timer);
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
        window.scrollTo(0, 0)
    }

    selectDone() {
        // this.props.storeCaseAnswerMCQ(this.state);
        const { showAnswers } = this.state;
        const { showNextButton } = this.state;
        if (!showAnswers) {
            this.setState({ showAnswers: !showAnswers });
            this.setState({ showNextButton: !showNextButton });
            this.pauseTimer()
        }
    }

    renderTimer(duration) {
        //console.log(this.props.timeLimit);
        if (this.props.timeLimit) {
            return (
                <Col>
                    {this.startTimer()}
                    <img src="./timer.png" hspace='5' alt="" style={{ height: "35px" }} /> {this.state.time.m}
                    min {this.state.time.s} sec
                </Col>
            );
        }
        return;
    }

    renderShowNextButton() {
        const { showNextButton } = this.state;
        if (showNextButton) {
            return (
                <Col smOffset={10}>
                    <Button onClick={(e) => this.selectDone()} hspace="20" bsStyle="primary" bsSize="large">
                        Done
                    </Button>
                </Col>
            );
        }
    }

    renderProgressBar() {
        let progress = parseFloat(this.props.question.id) / parseFloat(this.props.totalQnNum) * 100;
        return (
            <div >
                <Col sm={10} align="left">
                    <Line
                        percent={progress}
                        strokeWidth="2"
                        trailWidth="1"
                        strokeColor="#82C5D9"
                        strokeLinecap="square"
                    />
                </Col>
                <Col sm={2} align="left"><h4>{this.props.question.id}/{this.props.totalQnNum} Questions</h4> </Col>
            </div>
        );
    }

    renderScenario() {
        if (this.props.question.id === 1 + "") {
            return ReactHtmlParser(this.props.scenario);
        } else {
            return ReactHtmlParser(this.props.question.stem);
        }
    }

    handleCheck1Change(e) {
        const value = e.target.checked;
        this.setState({ check1Stu: value });
        // this.update(value, "check1");
    }
    handleCheck2Change(e) {
        const value = e.target.checked;
        this.setState({ check2Stu: value });
        // this.update(value, "check2");
    }
    handleCheck3Change(e) {
        const value = e.target.checked;
        this.setState({ check3Stu: value });
        console.log(e.target.checked);
        // this.update(value, "check3");
    }
    handleCheck4Change(e) {
        const value = e.target.checked;
        this.setState({ check4Stu: value });
        // this.update(value, "check4");
    }
    handleCheck5Change(e) {
        const value = e.target.checked;
        this.setState({ check5Stu: value });
        // this.update(value, "check5");
    }
    handleCheck6Change(e) {
        const value = e.target.checked;
        this.setState({ check6Stu: value });
        // this.update(value, "check6");
    }

    renderMCQ3() {
        if (this.props.question.mcq3.length !== 0) {
            return (
                <Checkbox onChange={(e) => this.handleCheck3Change(e)}>{this.props.question.mcq3}</Checkbox>
            );
        }
    }

    renderMCQ4() {
        if (this.props.question.mcq4.length !== 0) {
            return (
                <Checkbox onChange={(e) => this.handleCheck4Change(e)}>{this.props.question.mcq4}</Checkbox>
            );
        }
    }

    renderMCQ5() {
        if (this.props.question.mcq5.length !== 0) {
            return (
                <Checkbox onChange={(e) => this.handleCheck5Change(e)}>{this.props.question.mcq5}</Checkbox>
            );
        }
    }

    renderMCQ6() {
        if (this.props.question.mcq6.length !== 0) {
            return (
                <Checkbox onChange={(e) => this.handleCheck6Change(e)}>{this.props.question.mcq6}</Checkbox>
            );
        }
    }

    renderStorySoFar(){
        let stems = this.props.case.questions.map((obj, index) => {
            console.log(this.props.question.id);
            if (parseFloat(obj.id) < parseFloat(this.props.question.id)) {
                let stem = '';
                if (obj.id !== 1) {
                    stem = obj.stem;
                }

                return (
                    <div className="stem">
                        <div className="stem-label" style={{fontSize: "180%"}}>
                            Question {obj.id}
                        </div>
                        <div style={{color: "black"}}>{ReactHtmlParser(stem)}</div>
                        <br />
                    </div>
                );
            }
        });

        if (this.props.question.id > "1") {
            return (
                <Alert bsStyle="info" style={{borderWidth: "thick", width: "93%", background: "white", borderColor: "#bce8f1"}}>
                    <p style={{fontFamily: "Great Vibes, cursive", fontWeight: "bold", fontSize: "300%", textAlign: "center"}}>Story So Far</p>
                    <p style={{textDecorationLine: "underline", margin: "0", fontSize: "200%"}}>Case Scenario</p>
                    <div className="row" style={{whiteSpace: "pre-wrap", paddingLeft: "2%", color: "black"}}>
                        {ReactHtmlParser(this.props.scenario)}
                    </div>
                    <p style={{textDecorationLine: "underline", margin: "0", fontSize: "200%"}}>Case Continuation</p>
                    <div className="row" style={{whiteSpace: "pre-wrap", paddingLeft: "2%"}}>{stems}</div>
                    {/*<br/><br/>*/}
                </Alert>
            );
        }
    }


    renderContent() {
        return (
            <div className='container'>
                <h1>
                    <Row>
                        <div>{this.props.caseTitle}</div>
                        <br />{this.renderProgressBar()}
                    </Row>
                </h1>

                <br />

                <h3>
                    <Row style={{width: "95%"}}>
                        <Col sm={3} style={{paddingLeft: "0", fontWeight: "bold"}}>Question {this.props.question.id}  </Col>
                        <Col className='pull-right'>{this.renderTimer(0.2)}</Col>
                    </Row>
                </h3>

                <br />

                <Row style={{paddingLeft: "0"}}>
                    {this.renderStorySoFar()}
                </Row>

                <Row>
                    <Panel bsStyle="info" id="panel" style={{ borderWidth: "thick", width: "93%" }}>

                        <h4 style={{ border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>{this.renderScenario()}</h4>

                        <br />

                        <h4 style={{ border: "0", background: "white", padding: "0", fontSize: "medium", whiteSpace: "pre-wrap", wordBreak: "keep-all" }}>
                            {ReactHtmlParser(this.props.question.question)}
                        </h4>

                        <div className="col-md-5 col-md-offset-2">{<ImageMagnifier url={this.props.question.attachment} />}</div>

                        <br /><br />

                        <Form><h4>
                            <FormGroup>
                                <div className="col-md-6 col-md-offset-2">
                                    <Checkbox onChange={(e) => this.handleCheck1Change(e)}>{this.props.question.mcq1}</Checkbox>
                                    <Checkbox onChange={(e) => this.handleCheck2Change(e)}>{this.props.question.mcq2}</Checkbox>
                                    {this.renderMCQ3()}
                                    {this.renderMCQ4()}
                                    {this.renderMCQ5()}
                                    {this.renderMCQ6()}
                                </div>
                            </FormGroup>
                        </h4></Form>
                    </Panel>
                    {this.renderShowNextButton()}


                    {this.state.showAnswers && <MCQAnswers
                        caseid={this.props.caseid}
                        authid={this.props.authid}
                        timeLimit={this.state.timeLimit}
                        seconds={this.state.seconds}
                        date={this.props.date}
                        question={this.props.question}
                        totalQnNum={this.props.totalQnNum}
                        updateScore={this.props.updateScore}
                        handleViewScore={this.props.handleViewScore}
                        handleNextQuestion={this.props.handleNextQuestion}
                        check1Stu={this.state.check1Stu} check2Stu={this.state.check2Stu}
                        check3Stu={this.state.check3Stu} check4Stu={this.state.check4Stu}
                        check5Stu={this.state.check5Stu} check6Stu={this.state.check6Stu} />}
                </Row>
            </div>
        );
    }

    render() {
        return (
            <Form horizontal>
                {this.renderContent()}
            </Form>
        );
    }
}

// function mapStateToProps2({ game}) {
//     return {
//         game
//     };
// }

// export default connect(mapStateToProps2, { storeCaseAnswerMCQ })(MCQquestion);
export default MCQquestion;