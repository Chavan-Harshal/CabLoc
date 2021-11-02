import React, { Component } from 'react';
import { 
    Navbar, 
    NavbarBrand, 
    NavItem,
    NavLink,
    Nav} from 'reactstrap';
import logo from '../logo.png'
import './Appnavbar.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect } from 'react-router-dom';


class AppNavbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectHome: false
        }
    }
    handleRedirect = () => {
        this.setState({redirectHome : true})
    }
    render() {
        if (this.state.redirectHome === true){
            return <Redirect to = '/' push></Redirect>
        }
        return (
            <div className='Navbar'>
                <Navbar>
                    <NavbarBrand className='Brand'>
                        <img onClick = {this.handleRedirect}
                            src={logo}
                            alt='LOGO'
                        />
                        <b onClick = {this.handleRedirect}>CABLOC</b>
                        <link href="https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap" rel="stylesheet" />
                        <span>Grab a Cab !</span>
                    </NavbarBrand>
                    <Nav className="ms-auto">
                        <NavItem>
                            <NavLink onClick = {() => console.log('About Us')}><span>About Us</span></NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default AppNavbar