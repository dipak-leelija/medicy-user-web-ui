import React, { useRef, useState } from 'react'
import Swal from 'sweetalert2';
import img from '../../assets/images/companies/airbnb.png';
import { Button, Card, Col, Form, FormControl, Row, Tab, Tabs, Toast, ToastContainer, ToastHeader, ToastBody } from 'react-bootstrap';
export default function HealthCareDetails() {


    const fileInputRef = useRef<HTMLInputElement>(null);
    const imgPreviewRef = useRef<HTMLImageElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);
    const [fileType, setFileType] = useState<string>('');
    const pdfPreviewRef = useRef<HTMLObjectElement | null>(null);
    const form20Ref = useRef<HTMLInputElement | null>(null);
    const imgPreviewRef20 = useRef<HTMLImageElement | null>(null);
    const pdfPreviewRef20 = useRef<HTMLObjectElement | null>(null);

    // Refs for form 21
    const form21Ref = useRef<HTMLInputElement | null>(null);
    const imgPreviewRef21 = useRef<HTMLImageElement | null>(null);
    const pdfPreviewRef21 = useRef<HTMLObjectElement | null>(null);

    const [form20Preview, setForm20Preview] = useState<string | null>(null);
    const [form21Preview, setForm21Preview] = useState<string | null>(null);

    const [fileType20, setFileType20] = useState<string>('');
    const [fileType21, setFileType21] = useState<string>('');

    const handleFileChange = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (imgPreviewRef.current) {
                imgPreviewRef.current.src = reader.result as string;
            }
        };
        reader.readAsDataURL(file);
    };

    const validateFileType = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            Swal.fire({
                title: "Are you sure?",
                text: "Change Profile Photo?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#0047AB",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Change!"
            }).then((result) => {
                if (result.isConfirmed) {
                    const extFile = file.name.split('.').pop()?.toLowerCase();
                    if (['pdf', 'jpg', 'jpeg', 'png'].includes(extFile || '')) {
                        handleFileChange(file);
                    } else {
                        if (errorRef.current) errorRef.current.classList.remove("d-none");
                    }
                }
            });
        }
    };


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
    const [showToast, setShowToast] = useState(false);
    const [validated, setValidated] = useState(false);

    const handleFromChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHealthData({
            ...HealthData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        const { OrganizationName, HelpLineNumber, AppointmentHelpLine, HelthCareEmail, Address1, Address2, City, Dist, SelectState, PIN, Country } = HealthData;

        // Define mandatory fields
        const mandatoryFields = [OrganizationName, HelpLineNumber,HelthCareEmail, Address1, City, Dist, SelectState, PIN, Country];

        // Check if any mandatory field is empty
        const emptyMandatoryFields = mandatoryFields.some((field) => !field);

        // Check if only OrganizationName and HelpLineNumber are filled, and others are empty
        if (emptyMandatoryFields) {
            setShowToast(true);
            return;
        }

        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            console.log(HealthData);
            setValidated(true); // Handle form submission
        }
        setShowToast(false);

    };

    const pinRegex = /^\d{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;



    return (
        <>
            <div className="Health-details custom-form">
                <Row className='mt-4'>
                    <Col>
                        <Card>
                            <Card.Body>
                                <div className="settings-img">
                                    <img src={img} alt="" ref={imgPreviewRef} />
                                    <form action="">
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={validateFileType}
                                            style={{ display: 'none' }}
                                        />
                                    </form>

                                    <Button onClick={() => fileInputRef.current?.click()} className='change-Img'>Change Image</Button>
                                </div>


                                <Form noValidate validated={validated} onSubmit={handleSubmit} >
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
                                                    id="Address1"
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
                                                    id="Address2"
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
                                                    id="Country"
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
            </div>

        </>
    )
}




