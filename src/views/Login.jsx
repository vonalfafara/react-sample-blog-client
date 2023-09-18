import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import http from "../libraries/http";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  async function createAccount(event) {
    event.preventDefault();

    const form = event.currentTarget;

    setValidated(true);

    if (!form.checkValidity()) {
      event.stopPropagation();
      console.log("Error in form");
      return;
    }

    const data = {
      email,
      password,
    };

    try {
      const response = await http.post("/login", data);
      localStorage.setItem("token", response.data.accessToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.dispatchEvent(new Event("storage"));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section id="register">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={7} lg={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center">Login</Card.Title>
                <Form noValidate validated={validated} onSubmit={createAccount}>
                  <Form.Group className="mb-2">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-2 d-flex justify-content-end">
                    <Button as="input" type="submit" value="Login" />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
