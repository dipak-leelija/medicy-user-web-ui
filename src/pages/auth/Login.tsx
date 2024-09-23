import React, { useEffect, useState } from "react";
import { Button, Alert, Row, Col, Form, FormControl } from "react-bootstrap";
import { Navigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

// actions
import { resetAuth, loginUser } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

import AuthLayout from "./AuthLayout";

const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p>
          <Link to={"/forget-password"} className="text-black-50 ms-1">
            {t("Forgot your password?")}
          </Link>
        </p>
        <p className="text-black-50 p-margin ">
          {t("Don't have an account?")}{" "}
          <Link to={"/register"} className="text-black ms-1">
            <b>{t("Sign Up")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { user, userLoggedIn, loading, error } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
    })
  );

  const [validated, setValidated] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // State to track password errors
  const [showError, setShowError] = useState(false); // Control error visibility

 
  const onSubmit = (formData: { username: string; password: string }) => {
    dispatch(loginUser(formData.username, formData.password));
  };


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
   
    if (username === "" || password === "") {
      setValidated(true);
      return; // Prevent submission
    }
    // Validate password length
    if (password.length < 8 || password.length > 16) {
      setPasswordError("Password must be between 8 and 16 characters.");
      setShowError(true); // Show the error message if validation fails
      return; // Prevent submission
    }

    setPasswordError(""); // Clear error if valid
    setValidated(true);
    setShowError(true); // Show error if credentials are incorrect
    onSubmit({ username, password });
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    // Clear error when the user starts typing
    // setShowError(false);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    // Clear error when the user starts typing
    // setShowError(false);

    // Check length and set error if necessary
    if (value.length < 8 || value.length > 16) {
      setPasswordError("Password must be between 8 and 16 characters.");
    } else {
      setPasswordError(""); // Clear error if valid
    }
  };

  return (
    <>
    

      <AuthLayout>
        {/* Show error when form is submitted or credentials are incorrect */}
        {showError && error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <div className="custom-form">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            autoComplete="off"
            className="custom-form"
          >
            <Form.Group controlId="username" className="floating-label mb-2">
              <FormControl
                type="text"
                name="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder=""
                required
                autoComplete="off"
              />
              <Form.Label htmlFor="fname">
                User Name <span className="form-asterisk">*</span>
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                Please enter your username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="floating-label mb-2">
              <FormControl
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder=""
                minLength={8}
                maxLength={16}
                required
                autoComplete="new-password"
                isInvalid={passwordError !== ""}
              />
              <Form.Label htmlFor="fname">
                Password <span className="form-asterisk">*</span>
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {passwordError || "Please enter your password."}
              </Form.Control.Feedback>
              <i
                className={`fas ${
                  showPassword ? "fa-eye-slash" : "fa-eye"
                } password-toggle-icon`}
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

            <div className="text-center d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={loading || password.length < 8 || password.length > 16}
              >
                {t("Log In")}
              </Button>
            </div>
          </Form>

          <BottomLink />
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
