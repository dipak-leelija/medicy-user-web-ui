import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SalesOffcanvas from '../../SalesOffcanvas';
import CusttomInvoiceDropdown from '../../../../components/CustomInvoiceDropdown';
// import PageTitle from "../../../../components/PageTitle";
import { Link, useParams } from 'react-router-dom';
import { sellers } from "../data";

// Utility function to convert MM/DD/YYYY to yyyy-MM-dd
const formatDate = (dateStr: string): string => {
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export default function NewSale() {
    const [inputValue, setInputValue] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    const [saleData, setSaleData] = useState<any | null>(null);

    const [formValues, setFormValues] = useState({
        billDate: '',
        doctor: '',
        customer: '',
        paymentMode: '',
        quantity: '',
        discount: '',
    });

    const [sellerDetails, setSellerDetails] = useState({
        patientName: '',
        storeName: '',
        // ratings: '',
        balance: '',
        createdOn: '',
        revenue: '',
    });

    useEffect(() => {
        if (id) {
            // Find the sale by ID
            const sale = sellers.find(seller => seller.id === parseInt(id));
            if (sale) {
                setSaleData(sale);
                setFormValues({
                    billDate: formatDate(sale.created_on),
                    doctor: sale.name, // Adjust based on your data
                    customer: sale.store, // Adjust based on your data
                    paymentMode: sale.balance, // Adjust based on your data
                    quantity: '', // Set default or adjust as needed
                    discount: '', // Set default or adjust as needed
                });
            } else {
                // Handle case where the sale is not found
                console.error(`Sale with ID ${id} not found`);
            }
        }
    }, [id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;

        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSelect = (selectedSellerId: number) => {
        const selectedSeller = sellers.find(seller => seller.id === selectedSellerId);
        if (selectedSeller) {
            setInputValue(selectedSeller ? selectedSeller.name.toString() : '');
            setSellerDetails({
                patientName: selectedSeller.name,
                storeName: selectedSeller.store,
                // ratings: selectedSeller.ratings,
                balance: selectedSeller.balance,
                createdOn: selectedSeller.created_on,
                revenue: selectedSeller.revenue,

            });
        }
        // setShowDropdown(false);
    };
    return (
        <>
            {/* <PageTitle breadCrumbItems={[]} title={"New Seles"} /> */}
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card className='m-0'>
                                <Card.Body>
                                    <Row className="g-5">
                                        <Col md>
                                            <FloatingLabel
                                                controlId="floatingBillDate"
                                                label="Bill Date"
                                                className="mb-3"
                                            >
                                                <Form.Control type="date" placeholder="" className='borderRemove' value={formValues.billDate}
                                                    name="billDate"
                                                    onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                                                />
                                            </FloatingLabel>

                                            <FloatingLabel
                                                controlId="floatingDoctor"
                                                label="Doctor"
                                            >
                                                <Form.Select aria-label="Floating label select example" className='borderRemove'
                                                    name="doctor"
                                                    value={formValues.doctor}
                                                    onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                                                >
                                                    <option>Select Doctor</option>
                                                    <option value="1">Jaynata Barman</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md>
                                            <FloatingLabel controlId="floatingCustomer" label="Customer" className="mb-3">
                                                <Form.Control type="text" placeholder="" className='borderRemove'
                                                    value={formValues.customer}
                                                    name="customer"
                                                    onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>}
                                                />
                                            </FloatingLabel>

                                            <FloatingLabel
                                                controlId="floatingPayment"
                                                label="Payment Mode"
                                            // className="w-75"
                                            >
                                                <Form.Select aria-label="Floating label select example" className='borderRemove' value={saleData ? saleData.balance : ''}>
                                                    <option>Select Payment</option>
                                                    <option value="1">Cash</option>
                                                    <option value="2">Credit</option>
                                                    <option value="3">UPI</option>
                                                    <option value="3">Card</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            <hr className='mb-2' />
                            <Row>
                                <Col style={{width:'200px'}}>
                                <CusttomInvoiceDropdown 
                                        sellers={sellers}
                                        onSelect={handleSelect}
                                        inputValue={inputValue}
                                        setInputValue={setInputValue}
                                        searchType="name"
                                        label="Item Name"
                                        className='invlabel'
                                    />
                                    {/* <FloatingLabel className='invlabel' controlId="floatingItemName" label="Item Name">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' />
                                    </FloatingLabel> */}
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingBatch" label="Batch">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Unit/Pack">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Expiry">
                                        <Form.Control type="text" value={sellerDetails.createdOn} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="MRP">
                                        <Form.Control type="text" value={sellerDetails.balance} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Qty.">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Disc%">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Taxable">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="GST%">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Net Amount">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" className='btn btn-primary waves-effect waves-light float-end mt-2'><i className="mdi mdi-plus-circle me-1"></i>Submit
                            </Button>
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
                    <SalesOffcanvas isNewSale={true} />
                </Col>
            </Row>

        </>
    )
}
