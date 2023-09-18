import {
  Container,
  Row,
  Col,
  Card,
  Placeholder,
  Form,
  Button,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import http from "../../libraries/http";
import * as dayjs from "dayjs";

const Blog = () => {
  const params = useParams();
  const [loggedIn, setLoggedIn] = useState(false);
  const [article, setArticle] = useState(null);
  const [validated, setValidated] = useState(false);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getArticle();
    getComments();
    getAuthenticatedUser();
    window.addEventListener("storage", getAuthenticatedUser);
    return () => {
      window.removeEventListener("storage", getAuthenticatedUser);
    };
  }, []);

  function getAuthenticatedUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
    }
  }

  async function getArticle() {
    const response = await http.get(`/articles/${params.articleId}`);
    setArticle(response.data);
  }

  async function getComments() {
    const response = await http.get(
      `/comments?_sort=id&_order=desc&article_id=${params.articleId}`
    );
    setComments(response.data);
  }

  async function postComment(event) {
    event.preventDefault();

    const form = event.currentTarget;

    setValidated(true);

    if (!form.checkValidity()) {
      event.stopPropagation();
      return;
    }

    let user = localStorage.getItem("user");

    if (!user) {
      return;
    }

    user = JSON.parse(user);

    const data = {
      comment,
      article_id: article.id,
      user_id: user.id,
      username: user.username,
      full_name: `${user.first_name} ${user.last_name}`.trim(),
      created_at: dayjs().format("MMMM DD, YYYY hh:mm A"),
    };

    try {
      await http.post("/comments", data);
      setComment("");
      getComments();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section id="blog">
      <Container>
        {article ? (
          <>
            <div className="blog-header text-center mb-4">
              <h1>{article.title}</h1>
              <h5>
                By <i>{article.author}</i>
              </h5>
              <p>{article.created_at}</p>
            </div>
            <Row className="mb-4">
              <Col>
                <p className="fst-italic">{article.description}</p>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
              </Col>
            </Row>
          </>
        ) : (
          <>
            <div className="mb-4">
              <Placeholder animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
              <Placeholder animation="glow">
                <Placeholder xs={12} />
              </Placeholder>
            </div>
            <Row className="mb-4">
              <Col>
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
              </Col>
            </Row>
            <Row className="mb-5">
              <Col>
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
                <Placeholder animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder animation="glow">
                  <Placeholder xs={12} />
                </Placeholder>
                <Placeholder animation="glow">
                  <Placeholder xs={3} />
                </Placeholder>
                <br />
              </Col>
            </Row>
          </>
        )}

        <Row>
          <Col>
            <h3>Comments</h3>
            <div className="comment-section">
              {comments.map((comment, index) => {
                return (
                  <Card body key={index} className="mb-4">
                    <h5>{comment.full_name}</h5>
                    <p className="fw-lighter">{comment.created_at}</p>
                    <p>{comment.comment}</p>
                  </Card>
                );
              })}
              {loggedIn ? (
                <Card body className="mb-4">
                  <Form noValidate validated={validated} onSubmit={postComment}>
                    <Form.Group className="mb-2">
                      <Form.Label>Post your comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        required
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Your comment..."
                      />
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-end">
                      <Button as="input" type="submit" value="Post Comment" />
                    </Form.Group>
                  </Form>
                </Card>
              ) : null}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Blog;
