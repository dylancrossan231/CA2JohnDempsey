import { Component } from "react";
import Filters from "./Filters.js";
import ArticleList from "./ArticleList.js";


class Articles extends Component {
  REST_API = "http://localhost:8000/api"
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: null,
      selectedAuthor: null,
    };
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onAuthorChange = this.onAuthorChange.bind(this);
    this.onClickView = this.onClickView.bind(this);

  }
  onClickView(id) {
    fetch(this.REST_API + "/articles/" + id, {
      //rest api request posting user detils
      method: "GET",
      headers: {
       "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Authorization": "Bearer " + this.props.user.api_token,
      },
    })
      .then((res) => res.json()) //converts result into json format
      .then(
        (result) => {
          console.log(result);
          const art = result;
          this.props.onSuccess(art); //performs on login success function in app on valid user data
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onCategoryChange(e) {
    const category = e.target.value;
    this.setState({
      selectedCategory: category,
    });
  }
  onAuthorChange(e) {
    const author = e.target.value;
    this.setState({
      selectedAuthor: author,
    });
  }
  render() {
    return (
      <div>
        <Filters
          categories={this.props.categories}
          onCategoryChange={this.onCategoryChange}
          onAuthorChange={this.onAuthorChange}
        />
        <ArticleList
          user={this.props.user}
          articles={this.props.articles}
          selectedCategory={this.state.selectedCategory}
          selectedAuthor={this.state.selectedAuthor}
          onClickView={this.onClickView}
        />
      </div>
    );
  }
}

export default Articles;
