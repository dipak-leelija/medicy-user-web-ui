import React, { useState } from 'react'
import { Row, Col, Card, Button, Alert, Offcanvas } from "react-bootstrap";

interface SalesOffcanvasProps {
    isNewSale: boolean;
    // isPurchaseReturnPage: boolean;
}

export default function SalesOffcanvas({ isNewSale }: SalesOffcanvasProps) {

    const [show, setShow] = useState(false);
    const [cashValu, setCashValue] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={`position-fixed bg-primary bottom-0 rounded-0 fs-5 offcanvasbar `}>  
            {/* ${(isPurchaseReturnPage) ? 'bg-danger' : 'bg-primary'} */}
                <div className='d-flex justify-content-between'>
                    <div></div>
                    <div className='d-flex justify-content-around align-items-center text-white rightoffcanvas'>
                        <div onClick={handleShow}>0 <span className='text-secondary-emphasis'>Qty</span></div>
                        <div onClick={handleShow}>0 <span className='text-secondary-emphasis'>Items</span></div>

                        {!isNewSale && (
                            <div className='bg-primary px-2' style={{ maxWidth: '160px' }}>
                                <div className='d-flex justify-content-between align-items-center '>
                                    <input type="number" className='bg-transparent inputBorderRemove text-white' placeholder='Cash +/-' onChange={(e) => setCashValue(e.target.value)} style={{ height: '40px' }} />

                                    <div style={{marginLeft:'100px', position: 'absolute'}}>
                                        {cashValu && (
                                            <span className='bg-white rounded text-dark'>-{cashValu}</span>
                                        )}
                                    </div>
                                    <i className="fas fa-calculator ms-n3"></i>
                                </div>
                            </div>
                        )}
                        {isNewSale && (
                            <div style={{ height: '30px', marginTop: '9px' }} onClick={handleShow}>0 <span className='text-secondary-emphasis'>GST</span></div>
                        )}
                        <div className='text-secondary-emphasis d-flex jusitfy-content-between' onClick={handleShow}>
                            <div>Net Payable </div>
                            <div className='text-white ms-2'> 0</div>
                        </div>
                        <div data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top" onClick={handleShow}> <i className='fe-arrow-up'></i> </div>
                    </div>
                </div>
            </div>

            <Offcanvas className='customoffcanvas' show={show} onHide={handleClose} placement="bottom" responsive="md">
                <Offcanvas.Header className='bg-primary d-flex justify-content-between py-1'>
                    <Offcanvas.Title className='fs-3 text-white'>Invoice Breakdown</Offcanvas.Title>
                    <div className="d-flex justify-content-end align-items-center">
                        <Button  className='btn-sm btn-info fs-5'>Submit</Button>
                        <Button onClick={handleClose} className="me-1 shadow-none">
                            <span aria-hidden="true">&times;</span>
                        </Button>
                    </div>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='d-flex gap-3'>
                        <div className='w-50'>
                            {isNewSale && (
                            <Card>
                                <Card.Body className='p-2 rounded border'>
                                    <div className='fs-5 fw-bold'>Bill Discount</div>
                                    <div className='d-flex align-items-center justify-content-around'>
                                        <input className='borderRemove w-25' type="text" />
                                        <p className='m-0'> OR</p>
                                        <input className='borderRemove w-25' type="text" name="" id="" />
                                        <Button className='py-0'><i className="fas fa-check"></i> </Button>
                                    </div>
                                    <p className='m-0 fs-6 text-primary'>Bill Discount is only applicable on unlocked items.</p>
                                </Card.Body>
                            </Card>
                            )}
                            <Card>
                                <Card.Body className='bg-warning p-2 bg-opacity-25 rounded'>
                                    <div className='fs-4'>Note <span className='text-primary fs-6'>(0/150)</span></div>
                                    <textarea className='border-0 p-0 m-0 w-100 bg-transparent inputBorderRemove' name="" id="" placeholder='type note...' style={{ height: '60px' }}>

                                    </textarea>
                                    <hr className='my-0 text-primary' />
                                </Card.Body>
                            </Card>
                            <Card>
                                <Card.Body className='bg-info px-3 bg-opacity-10 rounded'>
                                    <div>
                                        <p className='fs-4 m-0'>GST</p>
                                        <h6 className='text-primary fs-4'>&#x20b9; 0</h6>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className='w-50'>
                            <Card>
                                <Card.Body className='py-0'>
                                    <div className='d-flex justify-content-between'>
                                        <p className='m-0'>MRP Total</p>
                                        <h6>&#x20b9; 0</h6>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p className='m-0'>Total Discount</p>
                                        <h6>0.00</h6>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p className='m-0'>Bill Amount</p>
                                        <h6>0.00</h6>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p className='m-0'>Past Due / Credit</p>
                                        <h6>+0.00</h6>
                                    </div>
                                    {isNewSale && (
                                    <>
                                    <div className='d-flex justify-content-between'>
                                        <p className='m-0'>Wallet</p>
                                        <h6>0.00</h6>
                                    </div>
                                    <div className='d-flex justify-content-between'>
                                        <p className='m-0'>Extra Charges</p>
                                        <h6>0.00</h6>
                                    </div>
                                    <hr className='m-0' />
                                    <div className='d-flex justify-content-between'>
                                        <p className='m-0'>Adjustment Amount</p>
                                        <h6>0.00</h6>
                                    </div>
                                    <hr className='m-0' />
                                    </>
                                    )}
                                    <div className='d-flex justify-content-between'>
                                        <p className='m-0'>Round off</p>
                                        <h6>0.00</h6>
                                    </div>
                                    <hr className='my-1 text-primary' />
                                    <div className='d-flex justify-content-between'>
                                        <p className='m-0 fs-4'>Net Amount</p>
                                        <h6>0.00</h6>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}
