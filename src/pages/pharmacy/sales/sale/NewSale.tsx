import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SalesOffcanvas from '../../SalesOffcanvas';
import CusttomInvoiceDropdown from '../../../../components/CustomInvoiceDropdown';
import { Link, useParams } from 'react-router-dom';
// import { sellers } from "../data";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchPatientRequest, fetchDoctorRequest, fetchSalesRequest, fetchPurchaseItemsRequest} from "../../../../redux/DataFetch/actions";

// Utility function to convert MM/DD/YYYY to yyyy-MM-dd
// const formatDate = (dateStr: string): string => {
//     const [month, day, year] = dateStr.split('/');
//     return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
// };

// Utility function to convert MM/DD/YYYY to yyyy-MM-dd
const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr) {
        console.error('Invalid date string:', dateStr);
        return ''; // or handle as needed, e.g., return a default date or empty string
    }

    const [month, day, year] = dateStr.split('/');
    if (!month || !day || !year) {
        console.error('Date string is not in the expected MM/DD/YYYY format:', dateStr);
        return ''; // or handle this case as well
    }

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};


export default function NewSale() {
    const [inputValue, setInputValue] = useState<string>('');
    const [saleCustomer, setSaleCustomer] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    
    
    const [saleData, setSaleData] = useState<any | null>(null);
    const dispatch = useDispatch();

    const patients = useSelector((state: RootState) => state.patient.data)
    const doctors = useSelector((state: RootState) => state.doctors.data);
    const sellers = useSelector((state: RootState) => state.sales.data);
    const purchaseItem = useSelector((state: RootState) => state.purchase.data)
    console.log('purchaseItem data-', purchaseItem);
    console.log('input value-', inputValue);
    

    useEffect(() => {
        dispatch(fetchPatientRequest());
        dispatch(fetchDoctorRequest());
        dispatch(fetchSalesRequest());
        dispatch(fetchPurchaseItemsRequest());
    }, [dispatch])

    const [formValues, setFormValues] = useState({
        billDate: '',
        doctor: '',
        customer: '',
        paymentMode: ''
    });

    const [sellerDetails, setSellerDetails] = useState({
        batch_no: '',
        unit: '',
        mrp: '',
        storeName: '',
        qty: '',
        // ratings: '',
        balance: '',
        createdOn: '',
        revenue: '',
    });

    // useEffect(() => {
    //     if (id && sellers.length > 0) {
    //         // Find the sale by ID
    //         const sale = sellers.find((seller: { invoice_id: string; }) => seller.invoice_id === id);
    //         // console.log('find sale data in newsale page-',sale);
            
    //         if (sale) {
    //             setSaleData(sale);
    //             // setFormValues({
    //             //     billDate: formatDate(sale.bill_date) || '',
    //             //     doctor: sale.reff_by || '', // Adjust based on your data
    //             //     customer:  '', // Adjust based on your data
    //             //     paymentMode: sale.payment_mod || '', // Adjust based on your data
    //             // });
    //         } else {
    //             // Handle case where the sale is not found
    //             console.error(`Sale with ID ${id} not found`);
    //         }
    //     }
    // }, [id, sellers]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;

        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSelectSele = (selectedSale: number) => {
        const selectedSales = patients.find((item: { id: any; }) => item.id === selectedSale);
        console.log('selected sale-',selectedSales);
        
        if (selectedSales) {
            setSaleCustomer(selectedSales ? selectedSales.name.toString() : '');
        }
    }

    const handleSelect = (selectedItemId: number) => {
        const selectedItem = purchaseItem.find((item: { id: number }) => item.id === selectedItemId);
        console.log('search item is-',selectedItem);
        if (selectedItem) {
            setInputValue(selectedItem ? selectedItem.item_name.toString() : '');
            setSellerDetails({
                batch_no: selectedItem.batch_no,
                unit: selectedItem.unit,
                mrp: selectedItem.mrp,
                qty: selectedItem.qty,
                storeName: selectedItem.store,
                balance: selectedItem.balance,
                createdOn: selectedItem.created_on,
                revenue: selectedItem.revenue,
            });
        }
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
                                                <Form.Control type="date" placeholder="" className='borderRemove' value={formValues.billDate }
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
                                                    {doctors.map((doctor:any, index: any) => (
                                                        <option value={doctor.doctor_id} key={doctor.doctor_id} >{doctor.doctor_name}</option>
                                                    ))}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md>
                                            <CusttomInvoiceDropdown
                                                stocks={patients}
                                                onSelect={handleSelectSele}
                                                inputValue={formValues.customer || saleCustomer}
                                                setInputValue={setSaleCustomer}
                                                searchType="name"
                                                label="customer"
                                                className=' mb-3'
                                                onAddCustomer={() => {
                                                }}
                                            />

                                            <FloatingLabel
                                                controlId="floatingPayment"
                                                label="Payment Mode"
                                            // className="w-75"
                                            >
                                                <Form.Select aria-label="Floating label select example" className='borderRemove' name="paymentMode" value={formValues.paymentMode}
                                                onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}>
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
                                <Col style={{ width: '200px' }}>
                                    <CusttomInvoiceDropdown
                                        sellers={purchaseItem}
                                        onSelect={handleSelect}
                                        inputValue={inputValue}
                                        setInputValue={setInputValue}
                                        searchType="name"
                                        label="Item Name"
                                        className='invlabel'
                                        sellerItemInput={true}
                                    />
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingBatch" label="Batch">
                                        <Form.Control type="text" value={sellerDetails.batch_no} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Unit/Pack">
                                        <Form.Control type="text" value={sellerDetails.unit} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Expiry">
                                        <Form.Control type="text" value={sellerDetails.createdOn} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="MRP">
                                        <Form.Control type="text" value={sellerDetails.mrp} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Qty.">
                                        <Form.Control type="text"  placeholder="" className='borderRemove px-0 ps-1' />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Disc%">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Taxable">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="GST%">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Net Amount">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" className='btn btn-primary waves-effect waves-light float-end mt-2'><i className="mdi mdi-plus-circle me-1"></i>Add
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
