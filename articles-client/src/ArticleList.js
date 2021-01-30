import { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import { Form } from "react-bootstrap";


class ArticleList extends Component {
  REST_API = "http://localhost:8000/api"
  constructor(props) {
    super(props);
    this.state = {
      selectedArticle: null,
    };
    this.onArticleSelected = this.onArticleSelected.bind(this);

  }
  
  onArticleSelected(e) {
    const article = parseInt(e.target.value);
    this.setState({
      selectedArticle: article,
    });
    

    
  }
  render() {
    const articles = this.props.articles;
    const selectedCategory = this.props.selectedCategory;
    const selectedAuthor = this.props.selectedAuthor;
    const filteredArticles = articles.filter(
      (article) =>
        (selectedCategory === null ||
          selectedCategory === article.category_id) &&
        (selectedAuthor === null || article.user.name.includes(selectedAuthor))
    );
    return (
      <div>
        {this.props.user && (
          <div className="clearfix">
            <Button
              className="mt-2 float-right"
              as={Link}
              to="/articles/create"
            >
              {" "}
              Create an article
            </Button>
          </div>
        )}

        <ListGroup className="mt-2">
          {this.props.user &&
            filteredArticles.map((article) => (
              <ListGroup.Item key={article.id}>
                {article.title}
                <Form.Check
                  type="radio"
                  name="article"
                  value={article.id}
                  label={article.title}
                  onChange={this.onArticleSelected}
                />
                {article.id === this.state.selectedArticle && this.props.user && (
                  <div className="float-right">
                    <Button
                      className="ml-2 btn-info"
                      onClick={() => this.props.onClickView(article.id)}
                      as={Link}
                      to={"articles/view/" + article.id}
                    >
                      {" "}
                      View
                    </Button>
                    <Button
                      className="ml-2 btn-warning"
                      as={Link}
                      to={"/articles/edit/" + article.id}
                    >
                      {" "}
                      Edit
                    </Button>
                    <Button
                      className="ml-2 btn-danger"
                      as={Link}
                      to={"/articles/delete/" + article.id}
                    >
                      {" "}
                      Delete
                    </Button>
                  </div>
                )}
              </ListGroup.Item>
            ))}
          {!this.props.user &&
            filteredArticles.map((article) => (
              <ListGroup.Item key={article.id}>
                {article.title}
                {article.body}
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    );
  }
}

export default ArticleList;
