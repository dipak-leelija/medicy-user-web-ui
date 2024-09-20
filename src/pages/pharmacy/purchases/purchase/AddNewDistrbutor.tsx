import React, { useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Row, Col, Button } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Formik, FormikProps } from 'formik';
import * as yup from 'yup';

interface FormValues {
    distName: string;
    Mobnumber?: string;
    gstId?: string;
    emailAddrs?: string;
    areaPin?: string;
    address?: string;
    descrption?: string;
}

export default function AddNewDistrbutor() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const schema = yup.object().shape({
        distName: yup.string().required(),
        Mobnumber: yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile Number is a required field'),
        gstId: yup.string().required(),
        emailAddrs: yup.string().email('Invalid email address').required('Email Address is a required field'),
        areaPin: yup.string().matches(/^\d{6}$/, 'Area PIN must be exactly 6 digits').required('Area PIN is a required field'),
        address: yup.string().required(),
        descrption: yup.string().required(),
    });

    

    return (
        <>
            <div className="m-1 p-1 bg-secondary fs-5 bg-opacity-25 text-primary text-center add-new-item" onClick={handleShow} style={{ cursor: 'pointer' }}>
                <i className="mdi mdi-plus-circle me-1"></i> Add New Distributor
            </div>
            <div>
                <Offcanvas show={show} onHide={handleClose} placement="top" responsive="md">
                    <Offcanvas.Header closeButton className='bg-primary bg-opacity-10'>
                        <Offcanvas.Title className='px-4'>Add Distributor</Offcanvas.Title>
                    </Offcanvas.Header>
                    <hr className='my-0' />
                    <Offcanvas.Body className='px-4 mt-2'>

                        <Formik<FormValues>
                            validationSchema={schema}
                            onSubmit={(values: FormValues) => console.log(values)}
                            initialValues={{
                                distName: '',
                                Mobnumber: '',
                                gstId: '',
                            }}
                        >
                            {({
                                handleSubmit,
                                handleChange,
                                values,
                                errors
                            }: FormikProps<FormValues>) => (
                                <Form noValidate onSubmit={handleSubmit}>

                                    <Row>
                                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                                            <FloatingLabel className='invlabel' controlId="floatingDistName" label="Distributor Name">
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    className='borderRemove px-0 ps-1 bg-transparent'
                                                    name='distName'
                                                    value={values.distName}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.distName}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    Distributor Nmae is a required field
                                                </Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                                            <FloatingLabel className='invlabel' controlId="floatingMobNo" label="Mobile Number">
                                                <Form.Control type="number" placeholder=""
                                                    name='Mobnumber'
                                                    value={values.Mobnumber}
                                                    className='borderRemove px-0 ps-1 bg-transparent'
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.Mobnumber}
                                                    maxLength={10} />
                                                <Form.Control.Feedback type="invalid">{errors.Mobnumber}</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                                            <FloatingLabel className='invlabel' controlId="floatingGstId" label="GST ID">
                                                <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='gstId'
                                                    value={values.gstId}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.gstId} />
                                                <Form.Control.Feedback type="invalid">GST ID is a required field</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                                            <FloatingLabel className='invlabel' controlId="floatingEmailAddrs" label="Email Address">
                                                <Form.Control type="email" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='emailAddrs'
                                                    value={values.emailAddrs}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.emailAddrs} />
                                                <Form.Control.Feedback type="invalid">{errors.emailAddrs}</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                                            <FloatingLabel className='invlabel' controlId="floatingAreaPin" label="Area PIN Code">
                                                <Form.Control type="number" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='areaPin'
                                                    value={values.areaPin}
                                                    onChange={handleChange}
                                                    isInvalid={!!errors.areaPin}
                                                    maxLength={6} />
                                                <Form.Control.Feedback type="invalid">{errors.areaPin}</Form.Control.Feedback>
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                                            <FloatingLabel className='invlabel' controlId="floatingAddrs" label="Address">
                                                <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='address'
                                                value={values.address}
                                                onChange={handleChange}
                                                isInvalid={!!errors.address} />
                                                <Form.Control.Feedback type="invalid">Address is a required field</Form.Control.Feedback>
                                            </FloatingLabel>
                                            </Form.Group>
                                    </Row>
                                    <Row>
                                    <Form.Group as={Col} md="12" controlId="validationFormik01">
                                            <FloatingLabel className='invlabel' controlId="floatingDiscrption" label="Description">
                                                <Form.Control as="textarea" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='descrption'
                                                value={values.descrption}
                                                onChange={handleChange}
                                                isInvalid={!!errors.descrption} style={{ height: '100px' }} />
                                                <Form.Control.Feedback type="invalid">Description is a required field</Form.Control.Feedback>
                                            </FloatingLabel>
                                            </Form.Group>
                                    </Row>
                                    <Button variant="primary" type="submit" className='btn btn-primary waves-effect waves-light float-end mt-2'>
                                        <i className="mdi mdi-plus-circle me-1"></i>Submit
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        </>
    )
}
