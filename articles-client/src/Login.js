import { Component } from "react";
import Button from "react-bootstrap/Button"
import { Card, Form } from "react-bootstrap";
class Login extends Component {

  REST_API = "http://localhost:8000/api"

  constructor(props){
    super(props);
    this.state = {
      email:"",
      password:"",
      remember:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }

  handleChange(e) {

    const target = e.target
    const field = target.name
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [field]: value,
    });
  }
  
  onSubmit(e) {
    e.preventDefault(); //prevents normal form behavior
    const userDetails = { 
        email: this.state.email,
        password: this.state.password,
        remember: this.state.remember
    };

    fetch(this.REST_API + '/login', { //rest api request posting user detils
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(userDetails)
        
    })
    .then(res => res.json()) //converts result into json format
    .then(
        (result) => {
            console.log(result);
            const user = result.data;
          
            this.props.onSuccess(user, this.state.remember); //performs on login success function in app on valid user data
        },
        (error) => {
            console.log(error);
        }
    )
  }
  render() {
    return(
      <Card className="mt-2">
        <Card.Body>
          <Card.Title>
            Login Form
          </Card.Title>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control 
              required
              name ="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              required
              name = "password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="remember">
              <Form.Check 
              
              type="checkbox"
              name="remember"
              label="Remember me"
              value={this.state.remember}
              onChange={this.handleChange}
               />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>


    );
  }
}

export default Login;
