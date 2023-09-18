import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import dayjs from "dayjs";
import "react-quill/dist/quill.snow.css";
import http from "../../libraries/http";

const CreateBlog = () => {
  const day = dayjs();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [validated, setValidated] = useState(false);

  async function submitBlog(event) {
    event.preventDefault();

    const form = event.currentTarget;

    setValidated(true);

    if (form.checkValidity() === false || body.length === 0) {
      event.stopPropagation();
      return;
    }

    let user = localStorage.getItem("user");

    if (!user) {
      return;
    }

    user = JSON.parse(user);

    const data = {
      title,
      description,
      body,
      userId: user.id,
      created_at: day.format("MMMM DD, YYYY hh:mm A"),
      author: `${user.first_name} ${user.last_name}`.trim(),
    };

    try {
      await http.post("/articles", data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section id="create-blog">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8}>
            <Form noValidate validated={validated} onSubmit={submitBlog}>
              <Form.Group className="mb-3">
                <Form.Label>Blog Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="The quick brown fox"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jumped over the lazy dog"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="body">
                <Form.Label>Blog Body</Form.Label>
                <ReactQuill
                  theme="snow"
                  value={body}
                  onChange={setBody}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Blog content required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 d-flex justify-content-end">
                <Button as="input" type="submit" value="Create Blog" />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CreateBlog;
