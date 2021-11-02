import React, { Component } from 'react'
import ReactNotification, { store } from 'react-notifications-component'
import AppNavbar from './AppNavbar'
import './CustomerLogin.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

class CustomerLogin extends Component {
    constructor(props){
        super(props)
        this.state = {
            login: false,
        }
    }
    register = () => {
        this.setState({register: true})
    }

    render() {
        return (
            <div>
                <AppNavbar></AppNavbar>
                <ReactNotification />
                <div></div>
                <div className='CustomerLogin'>
                { 
                    !this.state.login ? (
                        <div>
                            <form className='login'>
                                <h1>Customer Login</h1>
                                <div className='form-group'>
                                    <label>Name</label>
                                    <input type='text' className='form-control' placeholder='Enter Name' />
                                    <label>Password</label>
                                    <input type='password' className='form-control' placeholder='Enter Password' />
                                </div>
                                <button class='btn btn-outline-light'>Log in</button>
                                <span>Not Registered yet ?</span>     
                                <button type='button' class='btn btn-outline-light' data-bs-toggle='modal' data-bs-target='#myModal'>Register Now</button>
                            </form>
                            <div id='myModal' class='modal fade' role='dialog' tabIndex='-1'>
                                <div class='modal-dialog'>
                                    <div class='modal-content'>
                                        <div class='modal-header'>
                                            <h4 class="modal-title">Register to CABLOC</h4>
                                            <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                                        </div>
                                        <div class="modal-body">
                                            <form className='register'>
                                                <label>Name</label>
                                                <input type='text' className='form-control' placeholder='Enter Name' />
                                                <label>Password</label>
                                                <input type='password' className='form-control' placeholder='Enter Password' />
                                                <label>Mobile No</label>
                                                <input type='tel' className='form-control' placeholder='Enter mobile no' />
                                                <label>Address</label>
                                                <input type='text' className='form-control' placeholder='Enter address' />
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-outline-danger" data-bs-dismiss="modal">Cancel</button>
                                            <button type="button" class="btn btn-outline-dark" data-bs-dismiss="modal">Register</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    ):(
                        <div></div>
                    ) 
                }
                </div>
            </div>
        )
    }
}

export default CustomerLogin