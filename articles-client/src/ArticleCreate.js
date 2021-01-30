import { Component } from "react";
import { Card, Form, Row, Col, Button } from "react-bootstrap";

class ArticleCreate extends Component {
  REST_API = "http://localhost:8000/api";
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      category: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  handleChange(e) {
    const target = e.target;
    const field = target.name;
    const value = target.value;

    this.setState({
      [field]: value,
    });
  }
  
  onSubmit(e) {
    e.preventDefault(); //prevents normal form behavior
    const articleDetails = {
      title: this.state.title,
      body: this.state.body,
      category_id: this.state.category,
    };
    // console.log(
    //   this.state.title,
    //   this.state.body,
    //   this.state.category,
    //   this.props.user.api_token
    // );
    fetch(this.REST_API + "/articles", {
      //rest api request posting user detils
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer "+ this.props.user.api_token,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(articleDetails),
    })
      .then((res) => res.json()) //converts result into json format
      .then(
        (result) => {
          const article = result;
          console.log(article);
          this.props.onSuccess(article); //performs on login success function in app on valid user data
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    const categories = this.props.categories;
    return (
      <Card className="mt-2">
        <Card.Body>
          <Card.Title>Create New Article</Card.Title>
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                name="title"
                type="text"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                required
                as="textarea"
                name="body"
                type="body"
                value={this.state.body}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group as={Row} controlId="category_id">
              <Form.Label as="legend" column sm={2}>
                Categories
              </Form.Label>
              <Col sm={10}>
                {categories.map((category) => (
                  <Form.Check
                    key={category.id}
                    type="radio"
                    name="category"
                    value={category.id}
                    label={category.title}
                    onChange={this.handleChange}
                  />
                ))}
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
              Store Article
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default ArticleCreate;
