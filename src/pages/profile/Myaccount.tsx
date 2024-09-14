import React, { useState } from 'react'
import accountImg from '../../assets/images/users/user-1.jpg'
import { Button, Card, Col, FloatingLabel, Form, FormControl, Nav, Row, Toast, ToastContainer } from 'react-bootstrap'


export default function Myaccount() {

    // const BootstrapForm: React.FC = () => {
    const [personalData, setpersonalData] = useState({
        name: '',
        email: '',
        LastName: '',
        contact: '',
        address: '',

    });
    const [passwordData, setpasswordData] = useState({
        password: '',
        Currrentpassword: '',
        ConfirmPassword: '',

    });

    const [section, setsection] = useState('details');
    // Control toast visibility
    const [showToast, setShowToast] = useState(false);
    // Control toast visibility
    const [validated, setValidated] = useState(false);

    const handleSectionChange = (section: string) => {
        setsection(section);
    };
    //email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Contact number validation: must be 10 digits long
    const contactRegex = /^\d{10}$/;

    // Password Match logic
    const doPasswordsMatch = passwordData.password === passwordData.ConfirmPassword;



    const handleFromChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setpersonalData({
            ...personalData,
            [name]: value,
        });
    };

    const handlefrom2Change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setpasswordData({
            ...passwordData,
            [name]: value,
        });

    };



    const handleFromSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const isAnyFieldEmpty = Object.values(personalData).some((value) => value === '');

        if (isAnyFieldEmpty) {
            setShowToast(true);  // Show toast if any field is empty
            return;  // Prevent form submission if any field is empty
        }
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else {
            console.log(personalData); // Handle form submission
        }

        setValidated(true); // Trigger validation feedback
    };


    // 
    const handleFrom2Submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const isAnyFieldEmpty = Object.values(passwordData).some((value) => value === '');

        if (isAnyFieldEmpty) {
            setShowToast(true);
            return;
        }


        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            console.log(passwordData);
        }

        setValidated(true);
    };
    const [passwordError, setPasswordError] = useState('');

    // Handle password field changes
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setpasswordData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        // Validation logic
        if (name === 'password') {
            if (value.length < 10) {
                setPasswordError('Password must be at least 10 characters long.');
            } else {
                setPasswordError('');
            }
        } else if (name === 'ConfirmPassword') {
            if (value !== passwordData.password) {
                setPasswordError('Passwords do not match.');
            } else {
                setPasswordError('');
            }
        }
    };


    return (
        <>
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="Profile-main-container">

                                <div className="section1">
                                    <div className="coll">

                                        <div className="profile-items">
                                            <div className="account-logo">
                                                <img className="shadow-lg " src={accountImg} alt="" />
                                                <Button className='iconBG-border'><i className='fas fa-camera'></i></Button>
                                            </div>

                                            <div className="profile-data">
                                                <h1>Alina Rose</h1>
                                                <p>username:Alina Rose</p>
                                                <p>ID:ADM24</p>




                                            </div>

                                        </div>

                                    </div>
                                </div>


                                <div className="section-2">


                                    <Nav className=" nav-tabs" justify variant="tabs" activeKey={section} >
                                        <Nav.Item className='nav-tabs profile-navs'>
                                            <Nav.Link eventKey="details" onClick={() => setsection('details')}>
                                                Details
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="password" onClick={() => setsection('password')}>
                                                Password
                                            </Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                    <div className={section === 'details' ? 'nav-tb-Active ' : 'd-none'}>




                                        <div className="profile-form">
                                            <Row className='mt-4'>
                                                <Col>
                                                    <Card>
                                                        <Card.Body>
                                                            <Form noValidate validated={validated} onSubmit={handleFromSubmit}>
                                                                <Col md>

                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="name"
                                                                                name="name"
                                                                                value={personalData.name}
                                                                                onChange={handleFromChange}
                                                                                placeholder=""
                                                                                required />

                                                                            <label htmlFor="name">Name</label>
                                                                        </div>
                                                                    </div>


                                                                </Col>

                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="Lastname"
                                                                                name="LastName"
                                                                                value={personalData.LastName}
                                                                                onChange={handleFromChange}
                                                                                placeholder=""
                                                                                required />
                                                                            <label htmlFor="name">Last Name</label>
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="name"
                                                                                name="contact"
                                                                                value={personalData.contact}
                                                                                onChange={(e) => {
                                                                                    const value = e.target.value;
                                                                                    // Allow only digits to be entered
                                                                                    if (/^\d*$/.test(value)) {
                                                                                        handleFromChange(e);
                                                                                    }
                                                                                }}
                                                                                isInvalid={!contactRegex.test(personalData.contact) && personalData.contact !== ''}
                                                                                placeholder=""
                                                                                minLength={10}
                                                                                maxLength={10}
                                                                                required />

                                                                            <label htmlFor="name">Contact Number</label>
                                                                            <Form.Control.Feedback type="invalid">
                                                                                Please enter a valid 10-digit contact number.
                                                                            </Form.Control.Feedback>
                                                                        </div>
                                                                    </div>





                                                                </Col>

                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                type="email"
                                                                                className="form-control"
                                                                                id="email"
                                                                                name="email"
                                                                                value={personalData.email}
                                                                                onChange={handleFromChange}
                                                                                isInvalid={!emailRegex.test(personalData.email) && personalData.email !== ''}
                                                                                placeholder=""
                                                                                required />
                                                                            <label htmlFor="name">Email</label>
                                                                            <Form.Control.Feedback type="invalid">
                                                                                Please enter a valid email.
                                                                            </Form.Control.Feedback>
                                                                        </div>
                                                                    </div>



                                                                </Col>
                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                as='textarea'
                                                                                className="form-control"
                                                                                id="Address"
                                                                                name="address"
                                                                                value={personalData.address}
                                                                                onChange={handleFromChange}
                                                                                placeholder=""
                                                                                required />
                                                                            <label htmlFor="name">Address</label>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <div className="btnUpdate d-flex justify-content-end" >
                                                                    <Button type='submit' variant="outline-info  " >Update</Button>
                                                                </div>

                                                            </Form>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>




                                    </div>
                                    <div className={section === 'password' ? 'nav-tb-Active' : 'd-none'} >
                                        <div className="navigation-tabs">

                                        </div>
                                        <div className="form2">
                                            <Row className='mt-4'>
                                                <Col>
                                                    <Card>
                                                        <Card.Body>
                                                            <Form noValidate validated={validated} onSubmit={handleFrom2Submit}>
                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                type="password"
                                                                                className="form-control"
                                                                                id="password"
                                                                                name="Currrentpassword"
                                                                                value={passwordData.Currrentpassword}
                                                                                onChange={handlefrom2Change}

                                                                                placeholder=""
                                                                                required />

                                                                            <label htmlFor="name">Current Password</label>

                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                                <Col md>
                                                                <div className="form-group">
                                                                 <div className="floating-label">
                                                                        <Form.Group controlId="password">
                                                                            <FormControl
                                                                                type="password"
                                                                                className={passwordError && passwordData.password.length < 10 ? 'is-invalid form-control ' : 'form-control'}
                                                                                name="password"
                                                                                value={passwordData.password}
                                                                                onChange={handlePasswordChange}
                                                                                placeholder=""
                                                                                minLength={10}
                                                                                maxLength={10}
                                                                                required
                                                                            />
                                                                            <label htmlFor="">New Password</label>
                                                                            <Form.Control.Feedback type="invalid">
                                                                                {passwordError}
                                                                            </Form.Control.Feedback>
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                                   
                                                                </Col>

                                                                <Col md>

                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                type="password"
                                                                                className="form-control"
                                                                                id="Confirmpassword"
                                                                                name="ConfirmPassword"
                                                                                value={passwordData.ConfirmPassword}
                                                                                onChange={handlefrom2Change}
                                                                                isInvalid={!doPasswordsMatch && passwordData.ConfirmPassword !== ''}
                                                                                placeholder=""
                                                                                minLength={10}
                                                                                maxLength={10}
                                                                                required />

                                                                            <label htmlFor="name">Confirm Password</label>
                                                                            <Form.Control.Feedback type="invalid">
                                                                                Passwords do not match.
                                                                            </Form.Control.Feedback>

                                                                        </div>
                                                                    </div>



                                                                </Col>
                                                                <div className="btnUpdate d-flex justify-content-end" >
                                                                    <Button type='submit' variant="outline-info mt-2 " >Save</Button>
                                                                </div>
                                                            </Form>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </Card.Body>
                    </Card>
                </Col>



                <ToastContainer className="p-3 fixed-toast" style={{ bottom: '1rem', right: '1rem' }}>
                    <Toast
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={3000}
                        autohide bg="danger"
                    >
                        <Toast.Header>
                            <strong className="me-auto">Validation Error</strong>
                        </Toast.Header>

                        <Toast.Body className='text-white'>Please fill in all the fields!</Toast.Body>
                    </Toast>
                </ToastContainer>
            </Row >




        </>
    )
}
function setConfirmPasswordError(arg0: string) {
    throw new Error('Function not implemented.');
}

function setPasswordError(arg0: string) {
    throw new Error('Function not implemented.');
}

