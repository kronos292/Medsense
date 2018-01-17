import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchCaseByApproach} from '../../actions';
import {Table, Button} from 'react-bootstrap';
import Game from "./Game";
import { bindAll } from 'lodash';


class ApproachCases extends Component {
    constructor(props){
        super(props);
        this.state = {
            approach:this.props.approach,
            // showGameView: false,
            // caseId: '',
        };

        bindAll(this, 'renderApproachCases', 'tryCase', 'renderContent');
    }

    componentDidMount() {
        this.props.fetchCaseByApproach(this.state);
        // this.props.fetchCaseByApproach();
    }

    // componentWillReceiveProps(nextProps){
    //     // this.setState(() => {
    //     //     return{
    //     //         approach:nextProps.approach,
    //     //     }
    //     // });
    //     this.setState({
    //         approach:nextProps.approach,
    //     });
    //     console.log(nextProps.approach);
    //     this.props.fetchCaseByApproach(this.state);
    // }

    renderApproachCases() {
        const approaches = this.state.approach;
        return this.props.approachCases.map((approachCase, index) => {
            let additional = approachCase.approach;
            for (let i=0; i<approachCase.approach.length; i++){
                for (let j=0; j<approaches.length; j++){
                    if (approachCase.approach[i]===approaches[j]){
                        let index = additional.indexOf(approaches[j]);
                        if (index !== -1) {
                            additional.splice(index, 1);
                        }
                    }
                }
            }
            let additionalApproach = "";
            for (let k=0; k<additional.length-1; k++){
                additionalApproach+=additional[k] + ", ";
            }
            additionalApproach+=additional[additional.length-1];
            let timeStamp = approachCase.timestamp.split(" ");
            let date = timeStamp[2]+" "+timeStamp[1]+" "+timeStamp[3];
            let timeArr = timeStamp[4].split(":");
            let time = timeArr[0]+":"+timeArr[1];
            return(
                <tr align="center" key={approachCase._id}>
                    <td>{approachCase.title}</td>
                    <td>{additionalApproach}</td>
                    <td>{approachCase.speciality}</td>
                    <td>{approachCase.subspeciality}</td>
                    <td>{approachCase.difficulty}</td>
                    <td>{approachCase.authorname}</td>
                    <td>{date}<br/>{time}</td>
                    <td><Button  type="button" bsStyle="primary" onClick={(e)=>this.tryCase(approachCase)}>Try</Button></td>
                </tr>
            );

        });
    }

    tryCase(game) {
        this.props.handleReturnCase(game);
    }

    renderContent() {
        switch(this.props.approachCases) {
            case null:
                return;
            default:
                if(this.props.approachCases.length === 0){
                    return (
                        <div style={{ fontSize: "150%", fontWeight: "200" }}>
                            <br />
                            <img src="./sad.png" hspace='5' alt="" style={{ height: "35px" }} />
                            Sorry, no cases found.  Please try other approaches!
                            {this.state.approach}
                        </div>
                    )
                }else {
                    return (
                        <Table responsive>
                            <thead>
                            <tr style={{background: '#82C5D9', fontSize: "130%"}}>
                                <th>
                                    <center>Case Title</center>
                                </th>
                                <th>
                                    <center>Additional Approaches</center>
                                </th>
                                <th>
                                    <center>Speciality</center>
                                </th>
                                <th>
                                    <center>Sub-speciality</center>
                                </th>
                                <th>
                                    <center>Difficulty Level</center>
                                </th>
                                <th>
                                    <center>Uploaded by</center>
                                </th>
                                <th>
                                    <center>Last Updated</center>
                                </th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.renderApproachCases()}
                            </tbody>

                        </Table>

                    );

                }
        }
    }

    render() {
        return(
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

function mapStateToProps2({approachCases}) {
    return {
        approachCases
    };
}

export default connect(mapStateToProps2, {fetchCaseByApproach})(ApproachCases);