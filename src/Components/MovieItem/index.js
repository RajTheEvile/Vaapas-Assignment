import { Component } from "react";
import "./index.css";

class MovieItem extends Component {
  state = {
    imageUrl: "",
  };

  componentDidMount() {
    this.fetchImage();
  }

  fetchImage = async () => {
    const urle = "https://dog.ceo/api/breeds/image/random";
    const options = {
      method: "GET",
    };
    const response = await fetch(urle, options);
    if (response.ok) {
      const data = await response.json();
      const { message } = data;
      this.setState({ imageUrl: message });
    } else {
      this.setState({ imageUrl: "default-image-url" }); // Replace with an actual default image URL
    }
  };

  render() {
    const { imageUrl } = this.state;
    const { movieDetails } = this.props;
    const { title, author, firstPublishYear } = movieDetails;

    return (
      <li className="movie-item">
        {imageUrl ? (
          <img className="movie-image" src={imageUrl} alt={title} />
        ) : (
          <div className="movie-image-placeholder">Loading...</div>
        )}
        <h2 className="movie-name">{title}</h2>
        <p className="movie-author">{author}</p>
        <p className="movie-year">{firstPublishYear}</p>
      </li>
    );
  }
}

export default MovieItem;
