import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const App: React.FC = () => {

  const [searchField, setSearch] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setSearch(val);
  };

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setLoading(true);


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
          disabled={loading}
          variant="primary"
          type="submit"
          onClick={handleSubmit}
        >
          {loading ? "Loading" : "Submit"}
        </Button>
      </Form>
      <br />
      </Container>
    </div>
  );
}

export default App;
