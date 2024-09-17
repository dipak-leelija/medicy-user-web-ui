import React, { useState } from 'react'
import img from '../../assets/images/companies/airbnb.png';
import Swal from 'sweetalert2';
import { Button, Card, Col, Form, FormControl, Row, Tab, Tabs, Toast, ToastContainer, ToastHeader, ToastBody } from 'react-bootstrap';

export default function Settings() {
    
        
           
        

    const [HealthData, setHealthData] = useState({
        OrganizationName: '',
        HelpLineNumber: '',
        AppointmentHelpLine: '',
        HelthCareEmail: '',
        Address1: '',
        Address2: '',
        City: '',
        Dist: '',
        SelectState: '',
        PIN: '',
        Country: '',
    });
    // Control toast visibility
    const [showToast, setShowToast] = useState(false);
    const [validated, setValidated] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;
    const pinRegex = /^\d{6}$/;

    const handleFromChange = (e) => {
        const { name, value } = e.target;
        setHealthData({
            ...HealthData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
      
        const { OrganizationName, HelpLineNumber, AppointmentHelpLine, HelthCareEmail, Address1, Address2, City, Dist, SelectState, PIN, Country } = HealthData;
    
        // Define mandatory fields
        const mandatoryFields = [OrganizationName, AppointmentHelpLine, Address1, City, Dist, SelectState, PIN, Country];
        
        // Check if any mandatory field is empty
        const emptyMandatoryFields = mandatoryFields.some((field) => !field);
    
        // Check if only OrganizationName and HelpLineNumber are filled, and others are empty
        if (emptyMandatoryFields) {
            setShowToast(true);
            return;
        }

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        else {
            console.log(HealthData); 
            setValidated(true);// Handle form submission
        }
        setShowToast(false)
        
         // Trigger validation feedback
    };

    return (
        <div className="Settings-section">
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Body>
                            <div className="top-nav">
                                <Tabs
                                    defaultActiveKey="home"
                                    id="fill-tab-example"
                                    className="mb-3"
                                    fill
                                >
                                    <Tab eventKey="home" title="Health Care Details">
                                        <div className="Health-details">
                                            <Row className='mt-4'>
                                                <Col>
                                                    <Card>
                                                        <Card.Body>
                                                            <div className="settings-img">
                                                                <img src={img} alt="" />
                                                                <Button className='change-Img'>Change Image</Button>
                                                            </div>


                                                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="OrganizationName"
                                                                                name="OrganizationName"
                                                                                value={HealthData.OrganizationName}
                                                                                onChange={handleFromChange}
                                                                                placeholder=""
                                                                                required
                                                                            />
                                                                            <label htmlFor="OrganizationName">
                                                                                Organization/Health Care Name <span style={{ color: 'red' }}>*</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="HelpLineNumber"
                                                                                name="HelpLineNumber"
                                                                                value={HealthData.HelpLineNumber}
                                                                                onChange={(e) => {
                                                                                    const value = e.target.value;
                                                                                    if (/^\d*$/.test(value)) {
                                                                                        handleFromChange(e);
                                                                                    }
                                                                                }}
                                                                                isInvalid={!contactRegex.test(HealthData.HelpLineNumber)}
                                                                                placeholder=""
                                                                                minLength={10}
                                                                                maxLength={10}
                                                                                required
                                                                            />
                                                                            <label htmlFor="HelpLineNumber">
                                                                                Help Line Number <span style={{ color: 'red' }}>*</span>
                                                                            </label>
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
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="AppointmentHelpLine"
                                                                                name="AppointmentHelpLine"
                                                                                value={HealthData.AppointmentHelpLine}
                                                                                onChange={handleFromChange}
                                                                                isInvalid={!contactRegex.test(HealthData.AppointmentHelpLine)}
                                                                                placeholder=""
                                                                                minLength={10}
                                                                                maxLength={10}
                                                                                required
                                                                            />
                                                                            <label htmlFor="AppointmentHelpLine">
                                                                                Appointment Help Line <span style={{ color: 'red' }}>*</span>
                                                                            </label>
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
                                                                                id="HelthCareEmail"
                                                                                name="HelthCareEmail"
                                                                                value={HealthData.HelthCareEmail}
                                                                                onChange={handleFromChange}
                                                                                isInvalid={!emailRegex.test(HealthData.HelthCareEmail)}
                                                                                placeholder=""
                                                                            />
                                                                            <label htmlFor="HelthCareEmail">
                                                                                Health Care Email
                                                                            </label>
                                                                            <Form.Control.Feedback type="invalid">
                                                                                Please enter a valid email address.
                                                                            </Form.Control.Feedback>
                                                                        </div>
                                                                    </div>
                                                                </Col>

                                                            </Form>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                                <Col>
                                                    <Card>
                                                        <Card.Body>
                                                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                as='textarea'
                                                                                className="form-control"
                                                                                id="Address"
                                                                                name="Address1"
                                                                                value={HealthData.Address1}
                                                                                onChange={handleFromChange}
                                                                                placeholder=""
                                                                                required />
                                                                            <label htmlFor="name">Address 1 <span style={{ color: 'red' }}>* </span></label>
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
                                                                                name="Address2"
                                                                                value={HealthData.Address2}
                                                                                onChange={handleFromChange}
                                                                                placeholder=""
                                                                                required />
                                                                            <label htmlFor="name">Address 2</label>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="City"
                                                                                name="City"
                                                                                value={HealthData.City}
                                                                                onChange={handleFromChange}
                                                                                placeholder=""
                                                                                required
                                                                            />
                                                                            <label htmlFor="OrganizationName">
                                                                                City <span style={{ color: 'red' }}>*</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="Dist"
                                                                                name="Dist"
                                                                                value={HealthData.Dist}
                                                                                onChange={handleFromChange}
                                                                                placeholder=""
                                                                                required
                                                                            />
                                                                            <label htmlFor="OrganizationName">
                                                                                Dist <span style={{ color: 'red' }}>*</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md>
                                                                <div className="form-group">
                                                                        <div className="floating-label select-wrapper">
                                                                            <select
                                                                                id="SelectState"
                                                                                name="SelectState"
                                                                                value={HealthData.SelectState}
                                                                                onChange={handleFromChange}
                                                                                required
                                                                                className="form-select"
                                                                            >
                                                                                
                                                                                <option value="" disabled>Select state</option>
                                                                                <option value="Option1">West Bengal</option>
                                                                                <option value="Option2">Others</option>
                                                                            </select>
                                                                            <label htmlFor="SelectState" className={HealthData.Country ? 'active' : ''}>
                                                                                Select State <span style={{ color: 'red' }}>*</span>
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col md>
                                                                    <div className="form-group">
                                                                        <div className="floating-label">
                                                                            <FormControl
                                                                                type="text"
                                                                                className="form-control"
                                                                                id="Pin"
                                                                                name="PIN"
                                                                                value={HealthData.PIN}
                                                                                onChange={handleFromChange}
                                                                                isInvalid={!pinRegex.test(HealthData.PIN)}
                                                                                placeholder=""
                                                                                minLength={6}
                                                                                maxLength={6}
                                                                                required
                                                                            />
                                                                            <label htmlFor="AppointmentHelpLine">
                                                                                PIN <span style={{ color: 'red' }}>*</span>
                                                                            </label>
                                                                            <Form.Control.Feedback type="invalid">
                                                                                Please enter a valid 6-digit contact number.
                                                                            </Form.Control.Feedback>
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <div className="form-group">
                                                                        <div className="floating-label select-wrapper">
                                                                            <select
                                                                                id="SelectState"
                                                                                name="Country"
                                                                                value={HealthData.Country}
                                                                                onChange={handleFromChange}
                                                                                required
                                                                                className="form-select"
                                                                            >
                                                                                
                                                                                <option value="" disabled>Select Country</option>
                                                                                <option value="India">India</option>
                                                                                <option value="Others">Others</option>
                                                                            </select>
                                                                            <label htmlFor="SelectState" className={HealthData.Country ? 'active' : ''}>
                                                                                Country <span style={{ color: 'red' }}>*</span>
                                                                            </label>
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
                                    </Tab>
                                    <Tab eventKey="Drug Permits" title="Drug Permits">
                                        Tab content for Profile
                                    </Tab>
                                    <Tab eventKey="Subscriptions" title="Subscriptions">
                                        <div className="Subscriptions">
                                            <Row className='mt-4'>
                                                <Col>
                                                    <Card >
                                                        <Card.Body className='table-card'>
                                                            <table class="table table-sm">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">Plan</th>
                                                                        <th scope="col">Started From</th>
                                                                        <th scope="col">Expiry</th>
                                                                        <th scope="col">Amount</th>
                                                                        <th scope="col">Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>

                                                                    <tr>
                                                                        <th scope="row">1</th>
                                                                        <td>30-08-2024</td>
                                                                        <td>30-11-2024</td>
                                                                        <td>0.00</td>
                                                                        <td>SUCCESS</td>
                                                                    </tr>

                                                                </tbody>
                                                            </table>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Tab>
                                </Tabs>
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
            </Row>
        </div >
    );
}
