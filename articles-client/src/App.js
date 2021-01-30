import { Component } from "react";
import Navigation from "./Navigation.js";
import { Container } from "react-bootstrap";
import Articles from "./Articles.js";
import { Switch, Route, withRouter } from "react-router-dom";
import "./App.css";
import Login from "./Login.js";
import Register from "./Register.js";
import Home from "./Home.js";
import ArticleCreate from "./ArticleCreate";
import ArticleView from "./ArticleView";
import ArticleEdit from "./ArticleEdit";
import ArticleDelete from "./ArticleDelete";

class App extends Component {
  REST_API = "http://localhost:8000/api";
  constructor(props) {
    super(props);
    let localUser = null;
    const userString = localStorage.getItem("user");
    if (userString !== null) {
      localUser = JSON.parse(userString);
    }
    this.state = {
      user: localUser,
      categories: [],
      articles: [],
      error: null,
    };
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
    this.onSuccessCreate = this.onSuccessCreate.bind(this);
    this.onSuccessView = this.onSuccessView.bind(this);

  }

  componentDidMount() {
    fetch(this.REST_API + "/articles", {
      //rest api request posting user detils
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json()) //converts result into json format
      .then(
        (result) => {
          this.setState({
            articles: result,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    fetch(this.REST_API + "/categories")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            categories: result,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  onLoginSuccess(loggedInUser, remember) {
    console.log(loggedInUser);
    this.setState({
      user: loggedInUser,
    });
    if (remember) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
    this.props.history.push("/home");
  }
  onLogoutSuccess(msg) {
    this.setState({
      user: null,
    });
    localStorage.removeItem("user");
  }
  onSuccessCreate(article) {
    this.setState((prevState) => ({
      articles: [...prevState.articles, article],
    }));
    this.props.history.push("/home");
  }
  onSuccessView(article) {
    console.log('success', article)
    this.setState({
      articlesingle: article,
    });
  }

  render() {
    return (
      <Container>
        <Navigation
          user={this.state.user}
          onLogoutSuccess={this.onLogoutSuccess}
        />
        <Switch>
          <Route exact path="/">
            <Articles
              user={this.state.user}
              articles={this.state.articles}
              categories={this.state.categories}
              onSuccess={this.onSuccessView}
            />
          </Route>
          <Route path="/home">
            <Home
              user={this.state.user}
              articles={this.state.articles}
              categories={this.state.categories}
              onSuccess={this.onSuccessView}
            />
          </Route>
          <Route path="/login">
            <Login onSuccess={this.onLoginSuccess} />
          </Route>
          <Route path="/articles/register">
            <Register />
          </Route>
          <Route path="/articles/delete/:id">
            <ArticleDelete onSuccess={this.onDeleteSuccess} />
          </Route>
          <Route path="/articles/edit/:id">
            <ArticleEdit onSuccess={this.onEditSuccess} />
          </Route>
          <Route path="/articles/view/:id">
            <ArticleView articlesingle={this.state.articlesingle} />
          </Route>
          <Route path="/articles/create">
            <ArticleCreate
              user={this.state.user}
              categories={this.state.categories}
              onSuccess={this.onSuccessCreate}
            />
          </Route>
        </Switch>
      </Container>
    );
  }
}

export default withRouter(App);
