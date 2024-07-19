import { Component } from "react";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line import/no-extraneous-dependencies
import { RingLoader } from "react-spinners";
import MovieItem from "../MovieItem";
import "./index.css";

const SEARCH_ICON_URL =
  "https://assets.ccbp.in/frontend/react-js/app-store/app-store-search-img.png";

const STATES = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  ERROR: "ERROR",
  NO_MOVIES: "NO_MOVIES",
  MOVIES_FOUND: "MOVIES_FOUND",
};

class MovieSearch extends Component {
  state = {
    searchInput: "",
    movieList: [],
    currentState: STATES.INITIAL,
    error: null,
  };

  onChangeSearchInput = (event) => {
    const { currentState } = this.state;
    if (currentState !== "LOADING") {
      this.setState({ searchInput: event.target.value });
    }
  };

  fetchMovies = async () => {
    const { currentState } = this.state;
    if (currentState !== "LOADING") {
      this.setState({ currentState: STATES.LOADING, error: null });
      const { searchInput } = this.state;
      const search = searchInput.replaceAll(" ", "+");
      const url = `https://openlibrary.org/search.json?q=${search}`;
      const options = {
        method: "GET",
      };
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const fetchData = await response.json();
          const movieList = fetchData.docs.map((each) => ({
            id: uuidv4(),
            title: each.title ? each.title : "Undefined",
            author: each.author_name
              ? each.author_name.join(", ")
              : "Unknown Author",
            firstPublishYear: each.first_publish_year,
          }));
          if (movieList.length === 0) {
            this.setState({ currentState: STATES.NO_MOVIES });
          } else {
            this.setState({ movieList, currentState: STATES.MOVIES_FOUND });
          }
        } else {
          throw new Error("Failed to fetch movies");
        }
      } catch (error) {
        this.setState({ error: error.message, currentState: STATES.ERROR });
      }
    }
  };

  renderInitialView = () => <p>Start searching for movies</p>;

  renderLoadingView = () => <RingLoader color="#b946ee" />;

  renderErrorView = () => {
    const { error } = this.state;
    return <p className="error-message">{error}</p>;
  };

  renderNoMoviesView = () => <p>No movies found</p>;

  renderMoviesFoundView = () => {
    const { movieList } = this.state;
    return (
      <ul className="movies-list">
        {movieList.map((eachMovie) => (
          <MovieItem key={eachMovie.id} movieDetails={eachMovie} />
        ))}
      </ul>
    );
  };

  renderCurrentView = () => {
    const { currentState } = this.state;
    switch (currentState) {
      case STATES.INITIAL:
        return this.renderInitialView();
      case STATES.LOADING:
        return this.renderLoadingView();
      case STATES.ERROR:
        return this.renderErrorView();
      case STATES.NO_MOVIES:
        return this.renderNoMoviesView();
      case STATES.MOVIES_FOUND:
        return this.renderMoviesFoundView();
      default:
        return null;
    }
  };

  render() {
    const { searchInput } = this.state;
    return (
      <div className="app-container">
        <div className="app-store">
          <h1 className="heading">Movies</h1>
          <div className="search-input-container">
            <input
              type="search"
              placeholder="Search"
              className="search-input"
              value={searchInput}
              onChange={this.onChangeSearchInput}
            />
            <button
              className="search-btn"
              onClick={this.fetchMovies}
              type="button"
            >
              <img
                src={SEARCH_ICON_URL}
                alt="search icon"
                className="search-icon"
              />
            </button>
          </div>
          <div className="body">{this.renderCurrentView()}</div>
        </div>
      </div>
    );
  }
}

export default MovieSearch;
