import React, { Component } from 'react';
import { Button, Table, ControlLabel, FormGroup, FormControl, Col } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import axios from 'axios';


class AdminHome extends Component {
    state = {
        caseCount: [],
        specialityCount: [],
        speciality: "",
        subspecialityArray: [],
        countArray: []
    };

    componentDidMount() {
        axios.get('/api/fetchCount').then(res => {
            console.log(res)
            this.setState({
                caseCount: res.data
            });
        }).catch(err => {
            console.log(err);
        });
        axios.post('/api/fetchSpecialityCount').then(res => {
            console.log(res)
            this.setState({
                specialityCount: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    }

    handleSpecialityChange(e) {
        const value = e.target.value;
        this.setState({ speciality: value });
        axios.post('/api/fetchSpecialityCount', {
            speciality: value
        }).then(res => {
            this.setState({
                specialityCount: res.data
            });
            this.state.subspecialityArray = [];
            this.state.countArray = [];
            for (var item in res.data) {
                this.state.subspecialityArray.push(res.data[item]['_id']);
                this.state.countArray.push(res.data[item]['count']);
                console.log(res.data[item]['_id'])
                console.log(res.data[item]['count'])
            }
            console.log(this.state.subspecialityArray)
        }).catch(err => {
            console.log(err);
        });

    }

    render() {
        let cases = this.state.caseCount.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ))

        let scases = this.state.specialityCount.map(item => (
            <tr align="center">
                <td>{item._id}</td>
                <td>{item.count}</td>
            </tr>

        ))

        return (
            <div className="container-fluid">
                <div className="text-center">
                    {/* <h2>Welcome back to Medsense</h2> */}
                </div>
                <div className="row">

                </div>
                <div className="row">
                    <div class="col-lg-6">

                        <FormGroup controlId="formControlsDifficulty">
                            <ControlLabel style={{ fontSize: "150%" }}>Select Speciality:</ControlLabel>
                            <FormControl componentClass="select" value={this.state.speciality} name="usertype" onChange={(e) => this.handleSpecialityChange(e)}>
                                <option value="Select One">Select One</option>
                                <option value="Clinical Practicum">Clinical Practicum</option>
                                <option value="Medicine">Medicine</option>
                                <option value="Surgery">Surgery</option>
                                <option value="Orthopaedics">Orthopedics</option>
                                <option value="Others">Others</option>
                            </FormControl>
                        </FormGroup>
                        <Table responsive className="table">
                            <thead>
                                <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                                    <th><center>Subspeciality</center></th>
                                    <th><center>Count</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {scases}
                            </tbody>
                        </Table>

                    </div>
                    <div class="col-lg-6">
                        <br /><br /><br /><br /><br />
                        <Table responsive className="table">
                            <thead>
                                <tr style={{ background: '#D9EDF7', fontSize: "130%" }}>
                                    <th><center>Approach</center></th>
                                    <th><center>Count</center></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cases}
                            </tbody>
                        </Table>

                    </div>
                </div>
            </div>
        );

    }
}

export default AdminHome;