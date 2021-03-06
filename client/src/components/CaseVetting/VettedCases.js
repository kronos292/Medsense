import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchVettedCases} from '../../actions';
import {Table} from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';

class VettedCases extends Component {
    state = {
        currentUser: null
    };

    componentDidMount() {
        // Get current user
        axios.get('/api/current_user').then(res => {
            this.setState({currentUser: res.data});
        });
        this.props.fetchVettedCases();
    }

    renderVettedCases() {
        return this.props.vettedCases.reverse().map((vettedCase, index) => {
            let toRenderCase = false;
            switch(this.props.filterVetted) {
                case 'All':
                    for(let i = 0; i < vettedCase.subspeciality.length; i++) {
                        const vettedCaseSubspeciality = vettedCase.subspeciality[i];
                        for(let j = 0; j < this.state.currentUser.subspeciality.length; j++) {
                            if(vettedCaseSubspeciality === this.state.currentUser.subspeciality[j]) {
                                toRenderCase = true;
                            }
                        }
                    }
                    if(toRenderCase) {
                        let dateTime = moment(vettedCase.uploadTime).format('MMMM Do YYYY, h:mm:ss a');
                        let vettedDate = moment(vettedCase.vetTime).format('MMMM Do YYYY, h:mm:ss a');
                        return(
                            <tr align="center" key={vettedCase._id}>
                                <td>{vettedCase.title}</td>
                                <td>{vettedCase.subspeciality.join(', ')}</td>
                                <td>{vettedCase.authorid.username}</td>
                                <td>{dateTime}</td>
                                <td>{vettedDate}</td>
                            </tr>
                        );
                    }
                    return '';
                default:
                    for(let i = 0; i < vettedCase.subspeciality.length; i++) {
                        const vettedCaseSubspeciality = vettedCase.subspeciality[i];
                        if(vettedCaseSubspeciality === this.props.filterVetted) {
                            toRenderCase = true;
                        }
                    }
                    if(toRenderCase) {
                        let dateTime = moment(vettedCase.uploadTime).format('MMMM Do YYYY, h:mm:ss a');
                        let vettedDate = moment(vettedCase.vetTime).format('MMMM Do YYYY, h:mm:ss a');
                        return(
                            <tr align="center" key={vettedCase._id}>
                                <td>{vettedCase.title}</td>
                                <td>{vettedCase.subspeciality.join(', ')}</td>
                                <td>{vettedCase.authorname}</td>
                                <td>{dateTime}</td>
                                <td>{vettedDate}</td>
                            </tr>
                        );
                    }
                    return '';
            }
        });
    }

    renderContent() {
        switch(this.props.vettedCases) {
            case null:
                return;
            default:
                switch(this.state.currentUser) {
                    case null:
                        return;
                    default:
                        return(
                            <tbody>
                                {this.renderVettedCases()}
                            </tbody>
                        );
                }
        }
    }

    render() {
        return(
            <Table responsive>
                <thead>
                <tr style={{background: '#D9EDF7', fontSize: "130%"}}>
                    <th><center>Case Title</center></th>
                    <th><center>Sub-speciality</center></th>
                    <th><center>Uploaded by</center></th>
                    <th><center>Upload Date</center></th>
                    <th><center>Vetted Date</center></th>
                    <th></th>
                </tr>
                </thead>
                {this.renderContent()}
            </Table>
        );
    }
}

function mapStateToProps2({vettedCases}) {
    return {
        vettedCases
    };
}

export default connect(mapStateToProps2, {fetchVettedCases})(VettedCases);