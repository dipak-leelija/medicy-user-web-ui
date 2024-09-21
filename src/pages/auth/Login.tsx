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

interface UserData {
  username: string;
  password: string;
}

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
  const [password, setPassword] = useState(""); // Add state to track password
  const [username, setUsername] = useState(""); // Add state to track username
  const [showPassword, setShowPassword] = useState({
    Currrentpassword: false,
    password: false,
    ConfirmPassword: false,
  });

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const onSubmit = (formData: UserData) => {
    dispatch(loginUser(formData.username, formData.password));
  };

  const location = useLocation();
  const redirectUrl = location?.search?.slice(6) || "/";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    onSubmit({ username, password });
  };

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Handle the username change
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  // Handle the password change
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      {(userLoggedIn || user) && <Navigate to={redirectUrl} />}

      <AuthLayout>
        {error && (
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
            <div className="form-group">
              <div className="floating-label">
                <Form.Group controlId="username">
                  <FormControl
                    type="text"
                    name="username"
                    value={username} // Track username state
                    onChange={handleUsernameChange}
                    placeholder=""
                    required
                    autoComplete="off"
                  />
                  <Form.Label>Username</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Please enter your username.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="form-group">
              <div className="floating-label">
                <Form.Group controlId="password">
                  <FormControl
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    value={password} // Track password state
                    onChange={handlePasswordChange}
                    placeholder=""
                    minLength={8}
                    maxLength={16} // Set maxLength if needed
                    required
                    autoComplete="new-password"
                    isInvalid={password.length > 0 && password.length < 8} // Validation based on length
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Password must be at least 8 characters long.
                  </Form.Control.Feedback>
                  <i
                    className={`fas ${showPassword.password ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                    onClick={() => toggleShowPassword('password')}
                    style={{
                      position: 'absolute',
                      right: '10px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer',
                    }}
                  ></i>
                </Form.Group>
              </div>
            </div>

            <div className="text-center d-grid">
              <Button
                variant="primary"
                type="submit"
                disabled={loading || password.length < 8} // Disable if password is less than 8 characters
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
