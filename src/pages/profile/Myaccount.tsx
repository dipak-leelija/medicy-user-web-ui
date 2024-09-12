import React, { useState } from 'react'
import accountImg from '../../assets/images/users/user-1.jpg'
import { Button, Card, Col, FloatingLabel, Form, Nav, Row } from 'react-bootstrap'

export default function Myaccount() {

    // const BootstrapForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        LastName: '',
        contact: '',
        address: '',
    });

    const [section, setsection] = useState('details');

    const handleSectionChange = (section: string) => {
        setsection(section);
    };

    const [validated, setValidated] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            console.log(formData); // Handle form submission
        }

        setValidated(true); // Trigger validation feedback
    };






    return (
        <>
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="main-container ">
                                <div className="sec1">
                                    <div className="coll">

                                        <div className="profile-items">
                                            <div className="accountlogo">
                                                <img className="shadow-lg " src={accountImg} alt="" />
                                                <Button className='camicon'><i className='fas fa-camera'></i></Button>
                                            </div>

                                            <div className="profile-data">
                                                <h1>Alina Rose</h1>
                                                <p>username:Alina Rose</p>
                                                <p>ID:ADM24</p>




                                            </div>

                                        </div>

                                    </div>
                                </div>


                                <div className={section === 'details' ? 'navtbActive' : 'sec2'}>

                                    <Nav className='navtabs' justify variant="tabs" defaultActiveKey="/home">
                                        <Nav.Item>
                                            <Nav.Link eventKey="" onClick={() => handleSectionChange('details')}>Details</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link onClick={() => handleSectionChange('password')}>Password</Nav.Link>
                                        </Nav.Item>
                                    </Nav>


                                    <div className="form">
                                        <Row className='mt-4'>
                                            <Col>
                                                <Card>
                                                    <Card.Body>
                                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                            <Col md>
                                                                <FloatingLabel className='invlabel profilelable' controlId="floatingbatch_no" label="First Name">
                                                                    <Form.Control
                                                                        type="text"
                                                                        placeholder=""
                                                                        className='borderRemove px-0 ps-1'
                                                                        name='name'
                                                                        value={formData.name}
                                                                        onChange={handleChange}
                                                                        isInvalid={!formData.name}
                                                                        required />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please enter a first name.
                                                                    </Form.Control.Feedback>
                                                                </FloatingLabel>
                                                            </Col>

                                                            <Col md>
                                                                <FloatingLabel className='invlabel profilelable' controlId="floatingbatch_no" label="Last Name">
                                                                    <Form.Control type="text"
                                                                        placeholder=""
                                                                        className='borderRemove px-0 ps-1'
                                                                        name='LastName'
                                                                        value={formData.LastName}
                                                                        onChange={handleChange}
                                                                        required />
                                                                </FloatingLabel>
                                                            </Col>

                                                            <Col md>
                                                                <FloatingLabel className='invlabel profilelable' controlId="floatingbatch_no" label="Contact Number">
                                                                    <Form.Control type="number" placeholder="" className='borderRemove px-0 ps-1' name='contact' onChange={handleChange} value={formData.contact} required />
                                                                </FloatingLabel>
                                                            </Col>

                                                            <Col md>
                                                                <FloatingLabel className='invlabel profilelable' controlId="floatingbatch_no" label="Email">
                                                                    <Form.Control type="email"
                                                                        placeholder=""
                                                                        className='borderRemove px-0 ps-1'
                                                                        onChange={handleChange}
                                                                        name='email'
                                                                        value={formData.email}
                                                                        required />
                                                                </FloatingLabel>
                                                            </Col>
                                                            <Col md>
                                                                <FloatingLabel className='invlabel profilelable' controlId="floatingbatch_no" label="Address">
                                                                    <Form.Control as='textarea' style={{ height: '80px' }} placeholder="" onChange={handleChange} className='borderRemove px-0 ps-1' name='address' value={formData.address} required />
                                                                </FloatingLabel>
                                                            </Col>
                                                            <div className="btnUpdate d-flex justify-content-end" >
                                                                <Button variant="outline-info mt-2 " >Update</Button>
                                                            </div>

                                                        </Form>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>




                                </div>
                                <div className={section === 'password' ? 'navtbActive' : 'sec3'} >
                                    <Nav className='navtabs' justify variant="tabs" defaultActiveKey="/home">
                                        <Nav.Item>
                                            <Nav.Link onClick={() => handleSectionChange('details')}>Details</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey='' onClick={() => handleSectionChange('password')}>Password</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                    <div className="form2">
                                        <Row className='mt-4'>
                                            <Col>
                                                <Card>
                                                    <Card.Body>
                                                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                            <Col md>
                                                                <FloatingLabel className='invlabel profilelable' controlId="floatingbatch_no" label="Current Password">
                                                                    <Form.Control
                                                                        type="password"
                                                                        placeholder=""
                                                                        className='borderRemove px-0 ps-1'
                                                                        name='password'
                                                                        value={formData.name}
                                                                        onChange={handleChange}
                                                                        isInvalid={!formData.name}
                                                                        required />
                                                                    <Form.Control.Feedback type="invalid">
                                                                        Please enter the password.
                                                                    </Form.Control.Feedback>
                                                                </FloatingLabel>
                                                            </Col>

                                                            <Col md>
                                                                <FloatingLabel className='invlabel profilelable' controlId="floatingbatch_no" label="Enter New Password">
                                                                    <Form.Control type="password" placeholder="" className='borderRemove px-0 ps-1' name='newPassword' value={formData.email} onChange={handleChange} required />
                                                                </FloatingLabel>
                                                            </Col>

                                                            <Col md>
                                                                <FloatingLabel className='invlabel profilelable' controlId="floatingbatch_no" label="Confirm Password">
                                                                    <Form.Control type="number" placeholder="" className='borderRemove px-0 ps-1' name='Contact Number' onChange={handleChange} value="" required />
                                                                </FloatingLabel>
                                                            </Col>
                                                            <div className="btnUpdate d-flex justify-content-end" >
                                                                <Button variant="outline-info mt-2 " >Save</Button>
                                                            </div>
                                                        </Form>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>



                        </Card.Body>
                    </Card>
                </Col>
            </Row >



        </>
    )
}
