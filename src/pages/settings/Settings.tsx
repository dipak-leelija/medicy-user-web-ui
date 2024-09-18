import React, { ChangeEvent, useRef, useState } from 'react'
import img from '../../assets/images/companies/airbnb.png';
import Swal from 'sweetalert2';
import { Button, Card, Col, Form, FormControl, Row, Tab, Tabs, Toast, ToastContainer, ToastHeader, ToastBody } from 'react-bootstrap';
import HealthCareDetails from './HealthCareDetails';
import DrugPermits from './DrugPermits';
import Subcription from './Subcription';


export default function Settings() {

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
                                    className="  mb-3"
                                >
                                    <Tab eventKey="home" title="Health Care Details">
                                        <HealthCareDetails />
                                    </Tab>

                                    <Tab eventKey="Drug Permits" title="Drug Permits">
                                        <DrugPermits />

                                    </Tab>

                                    <Tab eventKey="Subscriptions" title="Subscriptions">
                                        <Subcription />
                                    </Tab>
                                </Tabs>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>

               
            </Row>
        </div>
    );

}