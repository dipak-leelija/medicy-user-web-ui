import React, { useEffect, useState } from "react";
import { Button, Alert, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";

//actions
import { resetAuth, forgotPassword } from "../../redux/actions";
import { RootState, AppDispatch } from "../../redux/store";

// components
import AuthLayout from "./AuthLayout";

interface UserData {
  identifier: string;
}

/* bottom link */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-white-50">
          {t("Back to")}{" "}
          <Link to={"/auth/login"} className="text-white ms-1">
            <b>{t("Log in")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const ForgetPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const { loading, passwordReset, resetPasswordSuccess, error } = useSelector(
    (state: RootState) => ({
      loading: state.Auth.loading,
      error: state.Auth.error,
      passwordReset: state.Auth.passwordReset,
      resetPasswordSuccess: state.Auth.resetPasswordSuccess,
    })
  );

  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<UserData>({
    identifier: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, identifier: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      dispatch(forgotPassword(formData.identifier));
    }
    setValidated(true);
  };

  return (
    <AuthLayout bottomLinks={<BottomLink />}>
      {resetPasswordSuccess && (
        <Alert variant="success">{resetPasswordSuccess.message}</Alert>
      )}

      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}

      {!passwordReset && (
        <div className="custom-form">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="form-group mb-0">
        <Col className="floating-label">
        </Col>
        </Row>

        <Form.Group className="floating-label mb-3">
                  <Form.Control
                    type="text"
                    name="identifier"
                    id="user"
                    className="med-input"
                    placeholder=""
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                  />
                  <Form.Label htmlFor="fname">
                    User name / Email<span className="form-asterisk">*</span>
                  </Form.Label>
                  <Form.Control.Feedback type="invalid">
                    {t("User name / Email is required")}
                  </Form.Control.Feedback>
                </Form.Group>
        <div className="d-grid text-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {t("Reset Password")}
          </Button>
        </div>
      </Form></div>
        
      )}
    </AuthLayout>
  );
};

export default ForgetPassword;
