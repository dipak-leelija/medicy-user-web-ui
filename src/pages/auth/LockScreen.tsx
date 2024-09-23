import React, { useState } from "react";
import { Button, Row, Col, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// components
import AuthLayout from "./AuthLayout";
import userImg from "../../assets/images/users/user-1.jpg";

/* bottom link */
const BottomLink = () => {
  const { t } = useTranslation();
  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-black-50">
          {t("Not you? return")}{" "}
          <Link to={"/login"} className="text-black ms-1">
            <b>{t("Sign In")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const LockScreen = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState({ password: false });
  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword((prev) => ({ password: !prev.password }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      // Handle successful form submission logic here
      console.log("Password submitted:", password);
      // Add further actions, like redirecting or unlocking
    }

    setValidated(true);
  };

  return (
    <>
      <AuthLayout>
        <div className="text-center w-75 m-auto">
          <img
            src={userImg}
            alt=""
            height="88"
            className="rounded-circle shadow"
          />
          <h4 className="text-dark-50 text-center mt-3">
            {t("Hi ! Geneva ")}
          </h4>
          <p className="text-muted mb-4">
            {t("Enter your password to access the admin.")}
          </p>
        </div>
        <div className="custom-form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="password" className="floating-label">
              <FormControl
                type={showPassword.password ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                minLength={6}
                maxLength={16}
                required
              />
              <Form.Label>Password</Form.Label>
              <Form.Control.Feedback type="invalid">
                Please enter a valid password.
              </Form.Control.Feedback>
              <i
                className={`fas ${showPassword.password ? "fa-eye-slash" : "fa-eye"} password-toggle-icon`}
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              ></i>
            </Form.Group>
            <Button type="submit" className="w-100 mt-2">
              {t("Unlock")}
            </Button>
          </Form>
        </div>
       
        <BottomLink />
      </AuthLayout>
    </>
  );
};

export default LockScreen;
