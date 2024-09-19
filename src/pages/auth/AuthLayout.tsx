import React, { useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import LogoLight from "../../assets/images/m-logo.png";

interface AccountLayoutProps {
  helpText?: string;
  bottomLinks?: any;
  isCombineForm?: boolean;
  children?: any;
  customWidth?: string; // new prop to control width
}

const AuthLayout = ({
  helpText,
  bottomLinks,
  children,
  isCombineForm,
  customWidth, // add customWidth prop
}: AccountLayoutProps) => {
  useEffect(() => {
    if (document.body)
      document.body.classList.add(
        "authentication-bg",
        "authentication-bg-pattern"
      );

    return () => {
      if (document.body)
        document.body.classList.remove(
          "authentication-bg",
          "authentication-bg-pattern"
        );
    };
  }, []);

  return (
    <>
      <div className="account-pages mt-3 mb-5">
        <Container>
          <Row className="justify-content-center">
            <Col
              md={8}
              lg={6}
              xl={isCombineForm ? 5 :5}
              
            >
              <Card>
                <Card.Body className="p-4">
                  <div className="text-center w-75 m-auto">
                    <div className="auth-brand">
                      <Link to="/" className="logo logo-dark text-center">
                        <span className="logo-lg">
                          <img src={LogoLight} alt="" height="25" />
                        </span>
                      </Link>
                    </div>
                    <p className="text-muted mb-4 mt-3">{helpText}</p>
                  </div>
                  {children}
                </Card.Body>
              </Card>

              {/* bottom links */}
              {bottomLinks}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AuthLayout;
