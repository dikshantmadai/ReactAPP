import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert, Card, Spinner } from "react-bootstrap";

const Register = () => {
  const [errMsg, setErrMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:8800/auth/signup", data);
      const response = res.data;

      if (response?.status === "failed") {
        setErrMsg(response);
      } else {
        setErrMsg(response);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
      setErrMsg({ status: "failed", message: "Something went wrong. Please try again." });
    }
    setIsSubmitting(false);
  };

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="g-0 h-100">
        {/* Left Column - Form */}
        <Col lg={6} className="d-flex align-items-center justify-content-center bg-primary">
          <Card className="shadow-lg" style={{ width: "100%", maxWidth: "500px" }}>
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary">SIGN UP</h2>
                <p className="text-muted">Create your account to get started</p>
              </div>

              {errMsg?.message && (
                <Alert variant={errMsg.status === "failed" ? "danger" : "success"} className="text-center">
                  {errMsg.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Fields */}
                <Row className="mb-3">
                  <Col md={6} className="mb-3 mb-md-0">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        isInvalid={!!errors.firstName}
                        {...register("firstName", { required: "First Name is required!" })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.firstName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        isInvalid={!!errors.lastName}
                        {...register("lastName", { required: "Last Name is required!" })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.lastName?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="email@example.com"
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

                {/* Password Fields */}
                <Row className="mb-4">
                  <Col md={6} className="mb-3 mb-md-0">
                    <Form.Group>
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
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        isInvalid={!!errors.cPassword}
                        {...register("cPassword", {
                          validate: (value) => {
                            const { password } = getValues();
                            if (value !== password) {
                              return "Passwords do not match";
                            }
                          },
                        })}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.cPassword?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Button 
                  variant="primary" 
                  type="submit" 
                  className="w-100 mb-3"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Creating Account...
                    </>
                  ) : "Create Account"}
                </Button>
              </Form>

              <div className="text-center mt-3">
                <p className="text-muted">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                    Login
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Right Column - Image */}
        <Col lg={6} className="d-none d-lg-block">
          <div 
            className="h-100 bg-cover bg-center"
            style={{ backgroundImage: `url(/assets/signup.png)` }}
          ></div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;