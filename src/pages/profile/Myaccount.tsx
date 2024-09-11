import React from 'react'
import accountImg from '../../assets/images/users/user-1.jpg'
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap'

export default function myaccount() {
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
                                            </div>

                                            <div className="profile-data">
                                                <h1>Alina Rose</h1>
                                                <p>username:Alina Rose</p>
                                                <p>ID:ADM24</p>


                                                <Button className='camicon'><i className='fas fa-camera'></i></Button>

                                            </div>

                                        </div>

                                    </div>
                                </div>

                                <div className="sec2">
                                    <div className="form">
                                        <Row className='mt-4'>
                                            <Col>
                                                <Card>
                                                    <Card.Body>
                                                        <Form>
                                                            <Col md>
                                                                <FloatingLabel className='invlabel' controlId="floatingbatch_no" label="First Name">
                                                                    <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='batch_no' value="" required />
                                                                </FloatingLabel>
                                                            </Col>

                                                            <Col md>
                                                                <FloatingLabel className='invlabel' controlId="floatingbatch_no" label="Email Address">
                                                                    <Form.Control type="email" placeholder="" className='borderRemove px-0 ps-1' name='batch_no' value="" required />
                                                                </FloatingLabel>
                                                            </Col>

                                                            <Col md>
                                                                <FloatingLabel className='invlabel' controlId="floatingbatch_no" label="Contact Number">
                                                                    <Form.Control type="number" placeholder="" className='borderRemove px-0 ps-1' name='batch_no' value="" required />
                                                                </FloatingLabel>
                                                            </Col>

                                                            <Col md>
                                                                <FloatingLabel className='invlabel' controlId="floatingbatch_no" label="Last Name">
                                                                    <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='batch_no' value="" required />
                                                                </FloatingLabel>
                                                            </Col>
                                                            <Col md>
                                                                <FloatingLabel className='invlabel' controlId="floatingbatch_no" label="Address">
                                                                    <Form.Control as='textarea' placeholder="" className='borderRemove px-0 ps-1' name='batch_no' value="" required />
                                                                </FloatingLabel>
                                                            </Col>

                                                            
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
            </Row>



        </>
    )
}
