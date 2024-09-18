import React, { ChangeEvent, useRef, useState } from 'react'
import { Button, Card, Col, Form, FormControl, Row, Tab, Tabs, Toast, ToastContainer, ToastHeader, ToastBody } from 'react-bootstrap';

export default function DrugPermits() {
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
    // states for validation
    const [showToast, setShowToast] = useState(false);
    const [validated, setValidated] = useState(false);
    const GstNumberRegex = /^\d{15}$/;
    const PANnumberRegex = /^\d{10}$/;

    // Function to read file and update preview
    const readURL = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file); // Read file as URL
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>, form: 'form20' | 'form21') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                const result = e.target.result as string;
                const currentFileType = file.type;

                if (form === 'form20') {
                    if (currentFileType.includes('image') && imgPreviewRef20.current) {
                        imgPreviewRef20.current.src = result;
                        imgPreviewRef20.current.style.display = 'block';
                        if (pdfPreviewRef20.current) pdfPreviewRef20.current.style.display = 'none';
                        setFileType20('image');
                    } else if (currentFileType === 'application/pdf' && pdfPreviewRef20.current) {
                        pdfPreviewRef20.current.data = result;
                        pdfPreviewRef20.current.style.display = 'block';
                        if (imgPreviewRef20.current) imgPreviewRef20.current.style.display = 'none';
                        setFileType20('pdf');
                    }
                    setForm20Preview(result);
                } else if (form === 'form21') {
                    if (currentFileType.includes('image') && imgPreviewRef21.current) {
                        imgPreviewRef21.current.src = result;
                        imgPreviewRef21.current.style.display = 'block';
                        if (pdfPreviewRef21.current) pdfPreviewRef21.current.style.display = 'none';
                        setFileType21('image');
                    } else if (currentFileType === 'application/pdf' && pdfPreviewRef21.current) {
                        pdfPreviewRef21.current.data = result;
                        pdfPreviewRef21.current.style.display = 'block';
                        if (imgPreviewRef21.current) imgPreviewRef21.current.style.display = 'none';
                        setFileType21('pdf');
                    }
                    setForm21Preview(result);
                }
            }
        };
        reader.readAsDataURL(file);
    };
    const handleDivClick = (ref: React.RefObject<HTMLInputElement>) => {
        ref.current?.click();
    };

    const [DrugInputs, setDrugInputs] = useState({
        GSTnumber: '',
        PANnumber: '',

    })

    const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setDrugInputs({
            ...DrugInputs,
            [name]: value,
        });
        setShowToast(false)
    };


    const handleDrugSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevent default behavior of the button
        
        // Validate if at least one field is filled
        const isGSTValid = GstNumberRegex.test(DrugInputs.GSTnumber);
        const isPANValid = PANnumberRegex.test(DrugInputs.PANnumber);
        
        if (!DrugInputs.GSTnumber && !DrugInputs.PANnumber) {
            // If both fields are empty, set form as invalid and show toast
            setShowToast(true);
            setValidated(false); // Apply invalid state to the form
        } else if (isGSTValid || isPANValid) {
            // If at least one field is valid, consider the form valid
            setValidated(true); // Mark form as valid
            console.log('Form is valid. Proceed with submission.');
            // Add logic to submit form if needed
        } else {
            // If neither field is valid, show the invalid feedback
            setShowToast(true);
            setValidated(false); // Apply invalid state to the form
        }
    };
    return (
        <>
            <Row className='mt-4 '>

                <Card >
                    <Card.Body>
                        <div className="card-box">
                            <div className="cards">
                                <div className="card-border">
                                    <div className="image-preview text-gray-700 border-dashed">
                                        <input
                                            type="file"
                                            ref={form20Ref}
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleFileChange(e, 'form20')}
                                        />
                                        <div
                                            onClick={() => handleDivClick(form20Ref)}
                                            style={{ cursor: 'pointer', padding: '20px', textAlign: 'center' }}
                                        >
                                            <span style={{ display: form20Preview ? 'none' : 'block' }} className="mr-2">Upload Form 20</span>
                                            <i className="fas fa-upload" style={{ display: form20Preview ? 'none' : 'inline' }}></i>
                                            <div >
                                                <img
                                                    ref={imgPreviewRef20}
                                                    alt="Preview"
                                                    style={{ display: fileType20 === 'image' ? 'block' : 'none', maxWidth: '100%', maxHeight: '400px', }}
                                                />
                                                <object
                                                    ref={pdfPreviewRef20}
                                                    type="application/pdf"
                                                    style={{ display: fileType20 === 'pdf' ? 'block' : 'none', width: '100%', height: '600px' }}
                                                ></object>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="cards">
                                <div className="card-border">
                                    <div className="image-preview text-gray-700 border-dashed">
                                        <input
                                            type="file"
                                            ref={form21Ref}
                                            accept=".jpg,.jpeg,.png,.pdf"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleFileChange(e, 'form21')}
                                        />
                                        <div
                                            onClick={() => handleDivClick(form21Ref)}
                                            style={{ cursor: 'pointer', padding: '20px', textAlign: 'center' }}
                                        >
                                            <span style={{ display: form21Preview ? 'none' : 'block' }} className="mr-2">Upload Form 21</span>
                                            <i className="fas fa-upload" style={{ display: form21Preview ? 'none' : 'inline' }}></i>
                                            <div>
                                                <img
                                                    ref={imgPreviewRef21}
                                                    alt="Preview"
                                                    style={{ display: fileType21 === 'image' ? 'block' : 'none', maxWidth: '100%', maxHeight: '400px' }}
                                                />
                                                <object
                                                    ref={pdfPreviewRef21}
                                                    type="application/pdf"
                                                    style={{ display: fileType21 === 'pdf' ? 'block' : 'none', width: '100%', height: '600px' }}
                                                ></object>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

            </Row>
            <Row>
                <Col>
                    <div className="inputs custom-form">

                        <Form id="drugPermitsForm" noValidate validated={validated} className="inputs">
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
                                    <label htmlFor="GSTnumber">
                                        Enter Organization GST number <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid GST number.
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
                                        isInvalid={!PANnumberRegex.test(DrugInputs.PANnumber)}
                                        placeholder=""
                                        required
                                    />
                                    <label htmlFor="PANnumber">
                                        Enter PAN number <span style={{ color: 'red' }}>*</span>
                                    </label>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid PAN number.
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
        </>
    )


}