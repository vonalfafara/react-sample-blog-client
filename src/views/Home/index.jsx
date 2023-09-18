import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css";
import http from "../../libraries/http";

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAuthenticatedUser();
    getArticles();
    window.addEventListener("storage", getAuthenticatedUser);
    return () => {
      window.removeEventListener("storage", getAuthenticatedUser);
    };
  }, []);

  async function getArticles() {
    const response = await http.get("/articles?_sort=id&_order=desc");
    setArticles(response.data);
  }

  function getAuthenticatedUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }
  return (
    <section id="home">
      <Container>
        {loggedIn ? (
          <Row>
            <Col>
              <div className="create-blog d-flex justify-content-end mb-4 mx-auto p-0">
                <Button as={Link} to="/blog/create" variant="success">
                  Create Blog
                </Button>
              </div>
            </Col>
          </Row>
        ) : null}
        {articles.map((article, index) => {
          return (
            <Row key={index} className="mb-4">
              <Col className="d-flex justify-content-center">
                <Card>
                  <Card.Body>
                    <Card.Title>{article.title}</Card.Title>
                    <Card.Subtitle className="mb-2 fs-6 fw-lighter">
                      {article.author} | {article.created_at}
                    </Card.Subtitle>
                    <Card.Text>{article.description}</Card.Text>
                    <div className="blog-footer">
                      <Button
                        as={Link}
                        to={`/blog/${article.id}`}
                        variant="primary"
                      >
                        Read Blog
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          );
        })}
      </Container>
    </section>
  );
};

export default Home;
