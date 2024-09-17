import React, { useRef, useState } from 'react'
import accountImg from '../../assets/images/users/user-1.jpg'
import Swal from 'sweetalert2';
import { Button, Card, Col, FloatingLabel, Form, FormControl, Nav, Row, Tab, Tabs, Toast, ToastContainer } from 'react-bootstrap'
type PasswordFields = 'Currrentpassword' | 'password' | 'ConfirmPassword';
interface ShowPasswordState {
    Currrentpassword: boolean;
    password: boolean;
    ConfirmPassword: boolean;
}
export default function Myaccount() {

    
        // Declare refs
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
                    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
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
    //show password and hide password 
    const [showPassword, setShowPassword] = useState({
        Currrentpassword: false,
        password: false,
        ConfirmPassword: false
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

    const toggleShowPassword = (field: PasswordFields) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };


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
                                            <img className="" src={accountImg} alt="Profile" ref={imgPreviewRef} />
                                            <div className="input-img">
                                                <form>
                                                    <input 
                                                        type="file" 
                                                        ref={fileInputRef} 
                                                        onChange={validateFileType} 
                                                        style={{ display: 'none' }} 
                                                    />
                                                    <Button onClick={() => fileInputRef.current?.click()} className='iconBG-border'>
                                                        <i className='fas fa-camera'></i>
                                                    </Button>
                                                </form>
                                            </div>
                                            <Button id="upload-btn" ref={uploadBtnRef} className='d-none'>Upload</Button>
                                            <div id="err-show" ref={errorRef} className="d-none">Invalid file type. Please select a JPG, JPEG, or PNG image.</div>
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

                                    <Tabs
                                        defaultActiveKey="profile"
                                        id="fill-tab-example"
                                        className="mb-3 tab-account"

                                    >
                                        <Tab eventKey="profile-form" title="Details">
                                            <div className="profile-form">
                                                <Row className='mt-4 '>
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

                                        </Tab>
                                        <Tab eventKey="profile" title="Password">
                                            <div className="form2">
                                                <Row className='mt-4'>
                                                    <Col>
                                                        <Card>
                                                            <Card.Body>
                                                                <Form noValidate validated={validated} onSubmit={handleFrom2Submit} className='Pass-data'>
                                                                    <Col md>
                                                                        <div className="form-group Pass-data ">
                                                                            <div className="floating-label Pass-data">
                                                                                <FormControl
                                                                                    type={showPassword.Currrentpassword ? "text" : "password"}
                                                                                    className="form-control"
                                                                                    id="password"
                                                                                    name="Currrentpassword"
                                                                                    value={passwordData.Currrentpassword}
                                                                                    onChange={handlefrom2Change}

                                                                                    placeholder=""
                                                                                    required />

                                                                                <label htmlFor="name" >Current Password</label>
                                                                                <i
                                                                                    className={`fas ${showPassword.Currrentpassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                                                                                    onClick={() => toggleShowPassword('Currrentpassword')}
                                                                                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                                                                ></i>

                                                                            </div>
                                                                        </div>
                                                                    </Col>

                                                                    <Col md>
                                                                        <div className="form-group">
                                                                            <div className="floating-label">
                                                                                <Form.Group controlId="password">
                                                                                    <FormControl
                                                                                        type={showPassword.password ? "text" : "password"}
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
                                                                                    <i
                                                                                        className={`fas ${showPassword.password ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                                                                                        onClick={() => toggleShowPassword('password')}
                                                                                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                                                                                    ></i>
                                                                                </Form.Group>
                                                                            </div>
                                                                        </div>

                                                                    </Col>

                                                                    <Col md>

                                                                        <div className="form-group ">
                                                                            <div className="floating-label">

                                                                                <FormControl
                                                                                    type={showPassword.ConfirmPassword ? "text" : "password"}
                                                                                    className="form-control"
                                                                                    id="Confirmpassword"
                                                                                    name="ConfirmPassword"
                                                                                    value={passwordData.ConfirmPassword}
                                                                                    onChange={handlefrom2Change}
                                                                                    isInvalid={!doPasswordsMatch && passwordData.ConfirmPassword !== ''}
                                                                                    placeholder=""
                                                                                    minLength={10}
                                                                                    maxLength={10}
                                                                                    required
                                                                                />
                                                                                {/* Eye icon for password visibility toggle */}
                                                                                <i
                                                                                    className={`fas ${showPassword.ConfirmPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle-icon`}
                                                                                    onClick={() => toggleShowPassword('ConfirmPassword')}
                                                                                    style={{
                                                                                        position: 'absolute',
                                                                                        right: '10px',
                                                                                        top: '50%',
                                                                                        transform: 'translateY(-50%)',
                                                                                        cursor: 'pointer'
                                                                                    }}
                                                                                ></i>

                                                                                <label htmlFor="Confirmpassword">Confirm Password</label>
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
                                        </Tab>
                                    </Tabs>
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

