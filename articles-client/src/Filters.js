import { Component } from "react";
import { Accordion } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
class Filters extends Component {
  render() {
    const categories = this.props.categories;
    const onCategoryChange = this.props.onCategoryChange;
    const onAuthorChange = this.props.onAuthorChange;

    return (
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle
              className="float-left"
              as={Button}
              variant="link"
              eventKey="0"
            >
              Filters
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Form>
                <fieldset>
                  <Form.Group as={Row}>
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
                          onChange={onCategoryChange}
                        />
                      ))}
                    </Col>
                  </Form.Group>
                </fieldset>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Author
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control 
                    type="text"
                     placeholder="Author"
                     onChange={onAuthorChange}
                     />
                  </Col>
                </Form.Group>
                <Form.Group as={Row}>
                  <Form.Label column sm={2}>
                    Pages
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Control type="number" placeholder="0" />
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}

export default Filters;
