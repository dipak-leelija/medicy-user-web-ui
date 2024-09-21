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

  // Toggle password visibility
  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Handle successful form submission logic here
      console.log("Password submitted:", form["password"].value);
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
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="floating-label">
              <Form.Group controlId="password">
                <FormControl
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  placeholder=""
                  minLength={6}
                  maxLength={20} // Adjusted maxLength
                  required
                />
                <Form.Label>Password</Form.Label>
                <Form.Control.Feedback type="invalid">
                  Please enter a valid password.
                </Form.Control.Feedback>
                <i
                  className={`fas ${
                    showPassword.password ? "fa-eye-slash" : "fa-eye"
                  } password-toggle-icon`}
                  onClick={() => toggleShowPassword("password")}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                ></i>
              </Form.Group>
            </div>
          </div>
          <Button type="submit" className="w-100 mt-2">
            {t("Unlock")}
          </Button>
        </Form>
        <BottomLink/>
      </AuthLayout>
    </>
  );
};

export default LockScreen;
