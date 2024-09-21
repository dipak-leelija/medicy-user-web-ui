import React, { useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Button, Alert, Offcanvas, Dropdown } from "react-bootstrap";
import classNames from "classnames";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { sellers } from "../../data";
import SalesOffcanvas from '../../SalesOffcanvas';
import { useParams } from 'react-router-dom';
import CusttomInvoiceDropdown from '../../../../components/CustomInvoiceDropdown';
// import { Link } from 'react-router-dom';

<style>{`
    
`}</style>

export default function NewSaleReturn() {

    const [inputValue, setInputValue] = useState<string>('');
    const { id } = useParams<{ id: string }>();

    const [sellerDetails, setSellerDetails] = useState({
        patientName: '',
        storeName: '',
        // ratings: '',
        balance: '',
        createdOn: '',
        revenue: '',
    });

    // useEffect(() => {
    //     if (id) {
    //         const selectedSeller = sellers.find(seller => seller.id.toString() === id);
    //         if (selectedSeller) {
    //             setSellerDetails({
    //                 patientName: selectedSeller.name,
    //                 storeName: selectedSeller.store,
    //                 balance: selectedSeller.balance,
    //                 createdOn: selectedSeller.created_on,
    //                 revenue: selectedSeller.revenue,
    //             });
    //             setInputValue(selectedSeller.id.toString());
    //         }
    //     }
    // }, [id]);


    // const handleSelect = (selectedSellerId: number) => {
    //     const selectedSeller = sellers.find(seller => seller.id === selectedSellerId);
    //     if (selectedSeller) {
    //       setInputValue(selectedSeller.id.toString());
    //       setSellerDetails({
    //         patientName: selectedSeller.name,
    //         storeName: selectedSeller.store,
    //         balance: selectedSeller.balance,
    //         createdOn: selectedSeller.created_on,
    //         revenue: selectedSeller.revenue,
    //       });
    //     }
    //   };

    return (
        <>

            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col md>
                                    {/* <CusttomInvoiceDropdown
                                        sellers={sellers}
                                        onSelect={handleSelect}
                                        inputValue={inputValue}
                                        setInputValue={setInputValue}
                                        searchType="id"
                                        label="Invoice No."
                                        className='mb-3'
                                    /> */}
                                </Col>
                                <Col md>
                                    <FloatingLabel controlId="floatingDoctor" label="Patient Name" className="">
                                        <Form.Control type="text" value={sellerDetails.patientName} placeholder="" className='borderRemove' />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel controlId="floatingCustomer" label="Bill Date" className="mb-3">
                                        <Form.Control type="text" value={sellerDetails.createdOn} placeholder="" className='borderRemove' />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel controlId="floatingCustomer" label="Reff By" className="mb-3">
                                        <Form.Control type="text" placeholder="" className='borderRemove' />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel
                                        controlId="floatingPayment"
                                        label="Refund Mode"
                                    >
                                        <Form.Select aria-label="Floating label select example" className='borderRemove'>
                                            <option>Select Payment</option>
                                            <option value="2">Credit</option>
                                            <option value="1">Cash</option>
                                            <option value="3">UPI</option>
                                            <option value="3">Card</option>
                                            <option value="1">Bank Transfer</option>
                                            <option value="2">Credit Card</option>
                                            <option value="3">Debit Card</option>
                                            <option value="3">Net Banking</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>

                                <Col md>
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Return Date"
                                        className="mb-3"
                                    >
                                        <Form.Control type="date" placeholder="" className='borderRemove' />
                                    </FloatingLabel>
                                </Col>
                            </Row>

                            <Row>
                                <Col md>
                                    <FloatingLabel
                                        controlId="floatingProduct"
                                        label="Product Name"
                                    >
                                        <Form.Select aria-label="Floating label select example" className='borderRemove w-50'
                                        //  value={sellerDetails.storeName || 'Select Invoice Number First'} 
                                        >
                                            {sellerDetails.storeName ? (
                                                <>
                                                    <option value="">{'Select Store Name'}</option>
                                                    <option value={sellerDetails.storeName}>
                                                        {sellerDetails.storeName}
                                                    </option>
                                                </>
                                            ) : (
                                                <option>Select Invoice Number First</option>
                                            )}
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingExpiry" label="Expiry">
                                        <Form.Control type="text" value={'01/2090'} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingUnit" label="Unit">
                                        <Form.Control value={5} type="text" placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingBatch" label="Batch">
                                        <Form.Control type="text" value={'sdj001'} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingMrp" label="MRP">
                                        <Form.Control type="text" value={125} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingPtr" label="PTR">
                                        <Form.Control type="text" value={200} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingPqt" label="P.Qty">
                                        <Form.Control type="text" value={200} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingCrQty" label="Cr.Qty">
                                        <Form.Control type="text" value={200} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingDisc" label="Disc%">
                                        <Form.Control type="text" value={20} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingGst" label="GST">
                                        <Form.Control type="text" value={5} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingAmount" label="Amount">
                                        <Form.Control type="text" value={200} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingReturn" label="Return">
                                        <Form.Control type="text" value={50} placeholder="" className='borderRemove px-0 ps-1' />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingRefund" label="Refund">
                                        <Form.Control type="text" value={40} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            {/* <div className=''> */}
                            <Button variant="primary" type="submit" className='btn btn-primary waves-effect waves-light float-end mt-2'><i className="mdi mdi-plus-circle me-1"></i>Submit
                            </Button>
                            {/* </div> */}
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Body>
                            <div className="table-responsive">
                                <table className="table table-sm table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">Item Name</th>
                                            <th scope="col">Batch</th>
                                            <th scope="col">Unit/Pack</th>
                                            <th scope="col">Expiry</th>
                                            <th scope="col">MRP</th>
                                            <th scope="col">Qty.</th>
                                            <th scope="col">Disc%</th>
                                            <th scope="col">Taxable</th>
                                            <th scope="col">GST%</th>
                                            <th scope="col">Net Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-0">
                                        <tr>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                    <SalesOffcanvas isNewSale={false} />
                </Col>
            </Row>

        </>
    )
}

