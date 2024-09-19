import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { Button, Alert, Row, Col, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

//actions
import { resetAuth, signupUser } from "../../redux/actions";
import { RootState, AppDispatch } from "../../redux/store";

// components
import AuthLayout from "./AuthLayout";

interface UserData {
  fullname: string;
  email: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        <p className="text-black-50">
          {t("Already have account?")}{" "}
          <Link to={"/auth/login"} className="text-black ms-1">
            <b>{t("Sign In")}</b>
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const Register = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, userSignUp, error } = useSelector((state: RootState) => ({
    loading: state.Auth.loading,
    error: state.Auth.error,
    userSignUp: state.Auth.userSignUp,
  }));

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    username: '',
    email: '',
    mobileNumber: '',
    password: '',
    cpassword: '',
  });

  const [errors, setErrors] = useState({
    mobileNumber: '',
    password: '',
    cpassword: '',
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    cpassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const { fname, lname, email, password, cpassword } = formData;

      if (password !== cpassword) {
        setErrors((prev) => ({
          ...prev,
          cpassword: t("Passwords do not match"),
        }));
        return;
      }

      const userData: UserData = {
        fullname: `${fname} ${lname}`,
        email,
        password,
      };

      dispatch(signupUser(userData.fullname, userData.email, userData.password));
    }
    setValidated(true);
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <>

      
        {userSignUp ? <Navigate to={"/auth/confirm"} /> : null}

        <AuthLayout  customWidth="35vw">
          {error && (
            <Alert variant="danger" className="my-2">
              {error}
            </Alert>
          )}
          <div className=" register-box custom-form">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="form-group mb-0">
              <Col  className=" floating-label">
              <Form.Group className="floating-label mb-3">
                <Form.Control
                  type="text"
                  name="fname"
                  id="fname"
                  className="med-input"
                  placeholder=""
                  value={formData.fname}
                  onChange={handleChange}
                  required
                />
                <Form.Label htmlFor="fname">
                  First Name <span className="form-asterisk">*</span>
                </Form.Label>
                <Form.Control.Feedback type="invalid">
                  {t("First name is required")}
                </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={6} className="floating-label  mb-3">
              <Form.Group className="floating-label ">
                <Form.Control
                  type="text"
                  name="lname"
                  id="lname"
                  className="med-input"
                  placeholder=""
                  value={formData.lname}
                  onChange={handleChange}
                  required
                />
                <Form.Label htmlFor="lname">
                  Last Name <span className="form-asterisk">*</span>
                </Form.Label>
                <Form.Control.Feedback type="invalid">
                  {t("Last name is required")}
                </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="floating-label mb-3">
              <Form.Control
                type="text"
                name="username"
                id="user-name"
                className="med-input"
                placeholder=""
                value={formData.username}
                onChange={handleChange}
                required
              />
              <Form.Label htmlFor="user-name">
                Username <span className="form-asterisk">*</span>
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {t("Username is required")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="floating-label mb-3">
              <Form.Control
                type="email"
                name="email"
                id="email"
                className="med-input"
                placeholder=""
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Label htmlFor="email">
                Email Address <span className="form-asterisk">*</span>
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {t("A valid email is required")}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="floating-label mb-3">
              <Form.Control
                type="tel"
                name="mobileNumber"
                id="mobile-number"
                className="med-input"
                placeholder=""
                pattern="[0-9]{10}"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
              <Form.Label htmlFor="mobile-number">
                Mobile Number <span className="form-asterisk">*</span>
              </Form.Label>
              <Form.Control.Feedback type="invalid">
                {t("A valid mobile number is required")}
              </Form.Control.Feedback>
            </Form.Group>

            <Row className="form-group mb-0">
              <Col  className=" floating-label">
              <Form.Group className="floating-label mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  id="  password"
                  className="med-input"
                  placeholder=""
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <Form.Label htmlFor="password">
                  Password <span className="form-asterisk">*</span>
                </Form.Label>
                <Form.Control.Feedback type="invalid">
                  {t("Invalid Password")}
                </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col sm={6} className="floating-label mb-2 ">
              <Form.Group className="floating-label ">
                <Form.Control
                  type="password"
                  name="cpassword"
                  id="cpassword"
                  className="med-input"
                  placeholder=""
                  value={formData.cpassword}
                  onChange={handleChange}
                  required
                />
                <Form.Label htmlFor="cpassword">
                  Forgot password <span className="form-asterisk">*</span>
                </Form.Label>
                <Form.Control.Feedback type="invalid">
                  {t("Invalid password")}
                </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>


            <Button className="btn btn-primary btn-block  w-100" type="submit" name="register">
              Register Account
            </Button>
          </Form>
         


      </div>
      <BottomLink />
      </AuthLayout >


    </>
  );
};

export default Register;
