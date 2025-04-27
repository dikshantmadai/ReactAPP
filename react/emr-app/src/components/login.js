import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

export default function Login() {
  const [errMsg, setErrMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:8800/auth/login", data);

      if (res.data?.user) {
        setErrMsg("");
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/Homepage");
      } else {
        setErrMsg(res.data?.message || "Login failed! Invalid email or password.");
      }
    } catch (error) {
      console.error(error);
      setErrMsg(
        error.response?.data?.message || 
        "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="g-0 h-100">
        {/* Left Column - Form */}
        <Col lg={6} className="d-flex align-items-center justify-content-center bg-primary">
          <Card className="shadow-lg" style={{ width: "100%", maxWidth: "450px" }}>
            <Card.Body className="p-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">LOGIN</h2>
                <p className="text-muted">Welcome back to your account</p>
              </div>

              {errMsg && <Alert variant="danger" className="text-center">{errMsg}</Alert>}

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    isInvalid={!!errors.email}
                    {...register("email", { 
                      required: "Email Address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    isInvalid={!!errors.password}
                    {...register("password", { 
                      required: "Password is required!",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      }
                    })}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Logging in...
                    </>
                  ) : "Login"}
                </Button>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-primary fw-semibold text-decoration-none">
                      Sign up
                    </a>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Image */}
        <Col lg={6} className="d-none d-lg-block">
          <div 
            className="h-100 bg-cover bg-center"
            style={{ backgroundImage: `url(/assets/Login.png)` }}
          ></div>
        </Col>
      </Row>
    </Container>
  );
}