import { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
class Navigation extends Component {
REST_API = "http://localhost:8000/api"
constructor(props){
  super(props);
  this.onLogout = this.onLogout.bind(this);
}
  onLogout(e) {
    fetch(this.REST_API + '/logout', { //rest api request posting user detils
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": "Bearer "+ this.props.user.api_token,
            "Access-Control-Allow-Origin": "*",
        },
        body: ""
    })
    .then(res => res.json()) //converts result into json format
    .then(
        (result) => {
            this.props.onLogoutSuccess(result.data); //performs on login success function in app on valid user data
        },
        (error) => {
            console.log(error);
            e.preventDefault(); //prevents normal form behavior

        }
    )
  }
  render() {
    const user = this.props.user;
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {user === null && (
            <Nav.Item className="ml-auto">
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            </Nav.Item>
          )}
          {user === null && (
            <Nav.Item className="float-right">
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
            </Nav.Item>
          )}
          {user !== null && (
          <Nav.Item>
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
          </Nav.Item>
          )}
          {user !== null && (
            <Nav.Item className="ml-auto">
              <Nav.Link as={Link} to="/login" onClick={this.onLogout}>Logout</Nav.Link>
            </Nav.Item>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
