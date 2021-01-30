import { Component } from "react";
import Articles from "./Articles.js";
class Home extends Component {
  render() {


    return (
      <Articles
        user={this.props.user}
        articles={this.props.articles}
        categories={this.props.categories}
        onSuccess={this.props.onSuccess}
      />
    );
  }
}

export default Home;
