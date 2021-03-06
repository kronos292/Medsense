import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Navbar, Nav, NavDropdown, MenuItem, NavItem, Image} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import axios from 'axios';

class Header extends Component {
    state = {
        constants: null
    };

    componentDidMount() {
        axios.get('/api/getConstantTypes').then(res => {
            this.setState({constants: res.data});
        }).catch(err => {
            console.log(err);
        });
    }

    onLogoutClick = () => {
        axios.post('/api/logout').then(res => {
            window.location = '/';
        }).catch(err => {
            console.log(err);
        });
    };

    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <Nav pullRight>
                        <NavItem className="navItem" eventKey={1} href="/about">About</NavItem>
                        <NavDropdown className="navItem" eventKey={2} title="Login/Register" id="login-dropdown">
                            <MenuItem eventKey={2.1} href="/login">Login</MenuItem>
                            <MenuItem eventKey={2.2} href="/register">Register</MenuItem>
                        </NavDropdown>
                    </Nav>
                );
            default:
                switch(this.state.constants) {
                    case null:
                        return;
                    default:
                        // Check for user type
                        switch (this.props.auth.usertype) {
                            case this.state.constants.USER_TYPE_PROFESSOR:
                                return(
                                    <Nav pullRight>

                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={2} href="/upload">     Upload     </NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={3} href="/vetting">     Vet     </NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={5} href="/dashboard">     Dashboard     </NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={6} href="/about">     About     </NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={7} onClick={this.onLogoutClick}>     Logout               </NavItem>

                                        <a href="/profile"><Image src={this.props.auth.profilepicture} className="img-circle" style={{height: '50px', width: '50px'}} /></a>
                                    </Nav>
                                );
                            case this.state.constants.USER_TYPE_STUDENT:
                                return(
                                    <Nav pullRight>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={2} href="/game">     Game     </NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={3} href="/upload">     Upload     </NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={5} href="/dashboard">     Dashboard     </NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={6} href="/about">     About     </NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={7} onClick={this.onLogoutClick}>     Logout               </NavItem>
                                        <a href="/profile"><Image src={this.props.auth.profilepicture} className="img-circle" style={{height: '50px', width: '50px'}} /></a>
                                    </Nav>
                                );
                            case this.state.constants.USER_TYPE_ADMIN:
                                return(
                                    <Nav pullRight>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={1} href="/admincasemanager">Case Management</NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={2} href="/adminusermanager">User Management</NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={3} href="/admintermmanager">Medical Terms Management</NavItem>
                                        <NavItem style={{whiteSpace:"pre-wrap"}} className="navItem" eventKey={8} onClick={this.onLogoutClick}>     Logout               </NavItem>
                                        <a href="#"><Image src={this.props.auth.profilepicture} className="img-circle" style={{height: '50px', width: '50px'}} /></a>
                                    </Nav>
                                );
                            default:
                                return;
                        }
                }
        }
    }

    renderLogo() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return(
                    <NavLink to="/" style={{padding: '0px'}}><Image src="./medsense_logo.png" style={{height: '50px', width: '160px', padding: '0px'}}/></NavLink>
                );
            default:
                return(
                    <NavLink to="/home" style={{padding: '0px'}}><Image src="./medsense_logo.png" style={{height: '50px', width: '160px', padding: '0px'}}/></NavLink>
                );
        }
    }

    render() {
        return (
            <Navbar id="navbar" fixedTop={false}>
                <Navbar.Header>
                    <Navbar.Brand>
                        {this.renderLogo()}
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {this.renderContent()}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);