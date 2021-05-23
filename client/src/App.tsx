import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFlickr, getYoutube } from './API';
import { YouTubeVideo } from './types/youtube';

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from 'react-bootstrap/Image'

interface Results {
  videos?: YouTubeVideo[];
  media?: string[];
}

const App: React.FC = () => {

  const [results, setResults] = React.useState<Results>({});
  const [searchField, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Text box field updating
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearch(val);
  };

  // Handle sending of API request
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    // Reset any errors and pre-existing results
    const searchTerm = searchField.trim();
    setSearch(searchTerm);
    setError("");
    setResults({});

    // YouTube results
    const youtubeProm = getYoutube(searchTerm);
    youtubeProm.then(ytResults => {
      setResults(prevResults => ({
        ...prevResults,
        videos: ytResults.slice(0, 1),
      }));
    }).catch(e => {
      setError(prevError => prevError + "An error occurred in the YouTube API. ");
    });

    // Flickr results
    const flickrProm = getFlickr(searchTerm);
    flickrProm.then(flickrResults => {
      setResults(prevResults => ({
        ...prevResults,
        media: flickrResults.slice(0, 1),
      }));
    }).catch(e => {
      setError(prevError => prevError + "An error occurred in the Flickr API. ");
    });

    // Re-enable search after both promises complete
    Promise.all([youtubeProm, flickrProm]).finally(() => setLoading(false));
  };

  return (
    <div className="App">
      <Container className="p-3">
        <Jumbotron>
          <h1>Dev Test</h1>
        </Jumbotron>
        <Form>
          <Form.Group controlId="formSearch">
            <Form.Label>Search query:</Form.Label>
            <Form.Control
              value={searchField}
              type="text"
              isInvalid={error.length > 0}
              placeholder="Query"
              onChange={event => handleChange(event as any)}
            />
            <Form.Control.Feedback type="invalid">
              {error}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={loading || searchField.trim().length <= 0}
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
          {loading ? "Loading" : "Submit"}
        </Button>
      </Form>
      <br />
      {results.media && (
        <div>
          <h3>{`Flickr Results`}</h3>
          {results.media.map(image => (
            <Image src={image} fluid rounded />
          ))}
        </div>
      )}
      {results.videos && (
        <div>
        <h3>{`YouTube Results`}</h3>
        {results.videos.map(video => (
          <>
            <a href={video.link}>{video.title}</a>
            <br/>
          </>
        ))}
        </div>
      )}
      </Container>
    </div>
  );
}

export default App;
