import { Component } from "react";
import {Link} from "react-router-dom";
import { Card, Form, Row, Col, Button } from "react-bootstrap";


class ArticleView extends Component {
  render() {
     const articlesingle = this.props.articlesingle;
    return (
      <Card className="mt-2">
        <Card.Header>🦆{articlesingle.title}</Card.Header>
        <Card.Body>
          {articlesingle.body}
          <Button as={Link} to={"/home"} variant="primary" type="submit">
            Back
          </Button>
        </Card.Body>
      </Card>
    );
    
  }
}

export default ArticleView;
