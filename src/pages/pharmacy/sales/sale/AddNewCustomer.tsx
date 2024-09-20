import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Row, Col, Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

export default function AddNewCustomer() {
    const [show, setShow] = useState(false);
    const [validated, setValidated] = useState(false);
    
    const [formValue, setFormValue] = useState({
        name: '',
        phone: '',
        address:'',
    })

    const handleChange = (e: { target: { name: any; value: any; }; }) =>{
        const { name, value } = e.target
        setFormValue(prevValue =>({
            ...prevValue,
            [name]: value
        }))
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    return (
        <>
            <div className="m-1 p-1 bg-secondary fs-5 bg-opacity-25 text-primary text-center add-new-item" onClick={handleShow} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-plus-circle me-1"></i> Add New Customer
            </div>
            <div>
                <Offcanvas  show={show} onHide={handleClose} placement="top" responsive="md" style={{height:'55%'}}>
                    <Offcanvas.Header closeButton className='bg-primary bg-opacity-10'>
                        <Offcanvas.Title className='px-4'>Add Customer</Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr className='my-0' />
                    <Offcanvas.Body className='px-4 mt-2'>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Row>
                                <Form.Group as={Col} md="6" controlId="validationFormik01">
                                    <FloatingLabel className='invlabel' controlId="floatingDistName" label="Distributor Name">
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            className='borderRemove px-0 ps-1 bg-transparent'
                                            name='name'
                                            value={formValue.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide customer.
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group as={Col} md="6" controlId="validationFormik01">
                                    <FloatingLabel className='invlabel' controlId="floatingMobNo" label="Mobile Number">
                                        <Form.Control type="number" placeholder=""
                                            name='phone'
                                            value={formValue.phone}
                                            className='borderRemove px-0 ps-1 bg-transparent'
                                            onChange={handleChange}
                                            maxLength={10}  required/>
                                        <Form.Control.Feedback type="invalid">Please provide a valid phone number.</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            <Row className='mt-3'>
                            <Form.Group as={Col} md="12" controlId="validationFormik01">
                                    <FloatingLabel className='invlabel' controlId="floatingAddress" label="Address">
                                        <Form.Control type="text" placeholder=""
                                            name='address'
                                            value={formValue.address}
                                            className='borderRemove px-0 ps-1 bg-transparent'
                                            onChange={handleChange}
                                            required
                                             />
                                        <Form.Control.Feedback type="invalid">Please provide address.</Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            <Button variant="primary" type="submit" className='btn btn-primary waves-effect waves-light float-end mt-2'>
                                <i className="mdi mdi-plus-circle me-1"></i>Submit
                            </Button>
                        </Form>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}
