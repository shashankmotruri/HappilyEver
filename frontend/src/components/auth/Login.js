import React, { Component } from 'react';
import { Link ,Redirect } from 'react-router-dom';
import { Form , Button } from 'react-bootstrap';
import {signin} from '../APIcalls/auth.js';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : "",
      isAuthenticated : false
    }
    this.performRedirect = this.performRedirect.bind(this);
  }

  SignIn = () => {
    signin(this.state.username, this.state.password)
    .then((res) => {
      if(res.currUser){
        localStorage.setItem("user",res.currUser._id);
        localStorage.setItem("login",true);
        this.setState({isAuthenticated : true});
      }
      console.log(res);
    })
  }

  performRedirect = () => {
    if(this.state.isAuthenticated){
      return <Redirect to='/home' />
    }
    return null;
  }

  render() {

    return (
      <div>
        <div className="d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <div className="brand-logo">
                {this.performRedirect()}
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <Form className="pt-3">
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="email" placeholder="Email" size="mg" className="h-auto" onChange={(e) => this.setState({username: e.target.value})} />
                  </Form.Group><br />
                  <Form.Group className="d-flex search-field">
                    <Form.Control type="password" placeholder="Password" size="md" className="h-auto" onChange={(e) => this.setState({password: e.target.value})}/>
                  </Form.Group>
                  <div className="mt-3">
                    <Button className="btn btn-block btn-primary btn-md font-weight-medium auth-form-btn" onClick={this.SignIn}>Sign in</Button>
                  </div>
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                  </div>
              
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/signup" className="text-primary">Create</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>  
      </div>
    )
  }
}

export default Login