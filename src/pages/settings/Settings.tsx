import React, { ChangeEvent, useRef, useState } from 'react'
import img from '../../assets/images/companies/airbnb.png';
import Swal from 'sweetalert2';
import { Button, Card, Col, Form, FormControl, Row, Tab, Tabs, Toast, ToastContainer, ToastHeader, ToastBody } from 'react-bootstrap';


export default function Settings() {


    const fileInputRef = useRef<HTMLInputElement>(null);
    const imgPreviewRef = useRef<HTMLImageElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);
    const uploadBtnRef = useRef<HTMLButtonElement>(null);
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
                    const fileName = file.name;
                    const extFile = fileName.split('.').pop()?.toLowerCase();
                    if (extFile === 'pdf' || extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
                        readURL(file);
                    } else {
                        if (errorRef.current) errorRef.current.classList.remove("d-none");
                    }
                }
            });
        }
    };

    // Function to read file and update preview
    const readURL = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (imgPreviewRef.current) imgPreviewRef.current.src = e.target?.result as string;
            if (uploadBtnRef.current) uploadBtnRef.current.classList.remove("d-none");
        };
        reader.readAsDataURL(file);
    };

    const [form20Preview, setForm20Preview] = useState<string | null>(null);
    const [form21Preview, setForm21Preview] = useState<string | null>(null);

    const form20Ref = useRef<HTMLInputElement | null>(null);
    const form21Ref = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'form20' | 'form21') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            if (reader.result && typeof reader.result === 'string') {
                if (type === 'form20') {
                    setForm20Preview(reader.result);
                } else if (type === 'form21') {
                    setForm21Preview(reader.result);
                }
            }
        };

        reader.readAsDataURL(file);
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
    // Control toast visibility
    const [DrugInputs, setDrugInputs] = useState({
        GSTnumber: '',
        PANnumber: '',

    })
    const [showToast, setShowToast] = useState(false);
    const [validated, setValidated] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^\d{10}$/;
    const GstNumberRegex = /^\d{15}$/;
    const PANnumberRegex = /^\d{10}$/;
    const pinRegex = /^\d{6}$/;

    const handleFromChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setHealthData({
            ...HealthData,
            [name]: value,
        });
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDrugInputs({
            ...DrugInputs,
            [name]: value,
        });
        setShowToast(false)
    };
    const handleDrugSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default behavior of the button if needed.

        // Example form validation: check if required fields are filled
        if (!DrugInputs.GSTnumber && !DrugInputs.PANnumber) {
            setShowToast(true);
        }

    };


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
        } else {
            console.log(HealthData);
            setValidated(true); // Handle form submission
        }
        setShowToast(false);

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

                                >
                                    <Tab eventKey="home" title="Health Care Details">
                                        <div className="Health-details">
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
                                        <Row className='mt-4'>

                                            <Card >
                                                <Card.Body>
                                                    <div className="card-box ">
                                                        <div className="cards">
                                                            <div className="card-border">
                                                                <div onClick={() => form20Ref.current?.click()} className="image-preview text-gray-700 border-dashed">
                                                                    <img
                                                                        className="preview-img"
                                                                        src={form20Preview || ''}
                                                                        alt="Form 20 Preview"
                                                                        style={{ display: form20Preview ? 'block' : 'none' }}
                                                                    />
                                                                    <span  style={{ display: form20Preview ? 'none' : 'block' }} className="mr-2">Upload Form 20</span>
                                                                    <i className="fas fa-upload"></i>
                                                                    <input
                                                                        type="file"
                                                                        ref={form20Ref}
                                                                        accept=".jpg,.jpeg,.png,.pdf"
                                                                        style={{ display: 'none' }}
                                                                        onChange={(e) => handleFileChange(e, 'form20')}
                                                                    />
                                                                   
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="cards">
                                                            <div className="card-border">
                                                                <div id="imagePreviewForm20" className="image-preview text-gray-700 border-dashed">
                                                                    <span className="mr-2">Upload Form 21</span>
                                                                    <i className="fas fa-upload"></i>
                                                                </div>

                                                            </div>


                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>

                                        </Row>
                                        <Row>
                                            <Col>
                                                <div className="inputs">
                                                    <Form id="drugPermitsForm" className="inputs">
                                                        <div className="form-group inputwidth">
                                                            <div className="floating-label">
                                                                <FormControl
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="GSTnumber"
                                                                    name="GSTnumber"
                                                                    value={DrugInputs.GSTnumber}
                                                                    onChange={handleInputChange}
                                                                    maxLength={15}
                                                                    minLength={15}
                                                                    isInvalid={!GstNumberRegex.test(DrugInputs.GSTnumber)}
                                                                    placeholder=""
                                                                    required
                                                                />
                                                                <label htmlFor="OrganizationName">
                                                                    Enter Organization GST number <span style={{ color: 'red' }}>*</span>
                                                                </label>
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please enter a valid  GST number.
                                                                </Form.Control.Feedback>
                                                            </div>
                                                        </div>

                                                        <div className="form-group">
                                                            <div className="floating-label inputwidth">
                                                                <FormControl
                                                                    type="text"
                                                                    className="form-control"
                                                                    id="PANnumber"
                                                                    name="PANnumber"
                                                                    value={DrugInputs.PANnumber}
                                                                    onChange={handleInputChange}
                                                                    maxLength={10}
                                                                    minLength={10}
                                                                    isInvalid={!GstNumberRegex.test(DrugInputs.PANnumber)}
                                                                    placeholder=""
                                                                    required
                                                                />
                                                                <label htmlFor="OrganizationName">
                                                                    Enter PAN number <span style={{ color: 'red' }}>*</span>
                                                                </label>
                                                                <Form.Control.Feedback type="invalid">
                                                                    Please enter a valid  PAN number.
                                                                </Form.Control.Feedback>
                                                            </div>
                                                        </div>




                                                    </Form>

                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="btns d-flex justify-content-end px-3">
                                            <Button onClick={handleDrugSubmit}>Submit</Button>
                                        </div>





                                    </Tab>
                                    <Tab eventKey="Subscriptions" title="Subscriptions">
                                        <div className="Subscriptions">
                                            <Row className='mt-4'>
                                                <Col>
                                                    <Card >
                                                        <Card.Body className='table-card'>
                                                            <table className="table table-sm">
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
