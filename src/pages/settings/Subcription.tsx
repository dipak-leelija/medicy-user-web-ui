import React from 'react'
import { Button, Card, Col, Form, FormControl, Row, Tab, Tabs, Toast, ToastContainer, ToastHeader, ToastBody } from 'react-bootstrap';
export default function Subcription() {
  return (

    <>
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
    </>
  )
}
