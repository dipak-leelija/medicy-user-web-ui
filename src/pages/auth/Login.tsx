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

// PasswordFields type is not used, so it can be removed if not needed
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
  const [showPassword, setShowPassword] = useState({
    Currrentpassword: false,
    password: false,
    ConfirmPassword: false,
  });

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
  handle form submission
  */
  const onSubmit = (formData: UserData) => {
    dispatch(loginUser(formData["username"], formData["password"]));
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
    onSubmit({ username: form.username.value, password: form.password.value });
  };

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <>
      {(userLoggedIn || user) && <Navigate to={redirectUrl} />}

      <AuthLayout >
        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <div className="custom-form">
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="custom-form">
            <div className="form-group">
              <div className="floating-label">
                <Form.Group controlId="username">
                  <FormControl
                    type="text"
                    name="username"
                    placeholder=""
                    required
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
                    placeholder=""
                    minLength={8}
                    maxLength={8} // Adjusted maxLength
                    required
                  />
                  <Form.Label>Password</Form.Label>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid password.
                  </Form.Control.Feedback>
                  <i
                    className={`fas ${showPassword.password ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                    onClick={() => toggleShowPassword('password')}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                  ></i>
                </Form.Group>
              </div>
            </div>

            <div className="text-center d-grid">
              <Button variant="primary" type="submit" disabled={loading}>
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
