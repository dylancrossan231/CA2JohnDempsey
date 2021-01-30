import { Component } from "react";
import Button from "react-bootstrap/Button"
import { Card, Form } from "react-bootstrap";
class Register extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     name: "",
  //     email:"",
  //     password:"",
  //     remember:false
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  // }
  render() {
    return(
      <Card className="mt-2">
        <Card.Body>
          <Card.Title>
            Register Form
          </Card.Title>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text"/>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email"/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="password"/>
            </Form.Group>
            <Form.Group controlId="remember">
              <Form.Check type="checkbox" label="Remember me"/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>


    );
  }
}

export default Register;
