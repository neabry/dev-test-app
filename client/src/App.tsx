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
  videos: YouTubeVideo[];
  media: string[];
}

const App: React.FC = () => {

  const [results, setResults] = React.useState<null | Results>(null);
  const [searchField, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearch(val);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);

    const search = searchField.trim();
    setError(false);

    try {
      const thisResults = await Promise.all([
        getYoutube(search),
        getFlickr(search),
      ]);

      setResults({
        videos: thisResults[0],
        media: thisResults[1],
      })
    } catch (e) {
      console.log(e);
      setError(true);
    }

    setLoading(false);
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
            isInvalid={error}
            placeholder="Query"
            onChange={event => handleChange(event as any)}
          />
          <Form.Control.Feedback type="invalid">
            An error occurred.
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
      {results && results.media && (
        results.media.map(image => (
          <Image src={image} fluid />
        ))
      )}
      </Container>
    </div>
  );
}

export default App;
