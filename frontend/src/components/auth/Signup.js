import React, { Component } from 'react';
import { Link ,Redirect} from 'react-router-dom';
import {Signup} from '../APIcalls/auth.js';

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : "",
      isAuthenticated : false
    }
    this.performRedirect = this.performRedirect.bind(this);
  }

  SignUp = () => {
    Signup(this.state.username, this.state.password)
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
        <div className="d-flex align-items-center auth px-0 h-100">
        {this.performRedirect()}
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="card text-left py-5 px-4 px-sm-5">
                <h4>New here?</h4>
                <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                <form className="pt-3">
                  <div className="form-group">
                    <input type="text" className="form-control form-control-md" id="exampleInputUsername1" placeholder="Username" onChange={(e) => this.setState({username: e.target.value})}/>
                  </div><br />
                  <div className="form-group">
                    <input type="password" className="form-control form-control-md" id="exampleInputPassword1" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} />
                  </div><br />
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        <i className="input-helper"></i>
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Link type="submit" className="btn btn-block btn-primary btn-md font-weight-medium auth-form-btn" onClick={this.SignUp}>Sign up</Link>
                  </div>
                  <div className="text-center mt-4 font-weight-light">
                    Already have an account? <Link to="/" className="text-primary">Login</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register