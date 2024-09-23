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
import { fetchPatientRequest, fetchDoctorRequest, fetchCurrentStockRequest, fetchSalesRequest, fetchPurchaseItemsRequest, fetchProductRequest } from "../../../../redux/DataFetch/actions";

// Utility function to convert MM/DD/YYYY to yyyy-MM-dd
const formatDate = (dateStr: string): string => {
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};


export default function NewSale() {
    const [inputValue, setInputValue] = useState<string>('');
    const [saleCustomer, setSaleCustomer] = useState<string>('');
    const [showBatchDiv, setShowBatchDiv] = useState<any>(false);
    const [batchData, setBatchData] = useState<any[]>([]);
    const [saleData, setSaleData] = useState<any | null>(null);
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const patients = useSelector((state: RootState) => state.patient.data)
    const doctors = useSelector((state: RootState) => state.doctors.data);
    const currentStock = useSelector((state: RootState) => state.currentStock.data);
    const sellers = useSelector((state: RootState) => state.sales.data);
    const purchaseItem = useSelector((state: RootState) => state.purchase.data)
    const productItem = useSelector((state: RootState) => state.product.data);
    console.log('batchData data-', batchData);


    useEffect(() => {
        dispatch(fetchPatientRequest());
        dispatch(fetchDoctorRequest());
        dispatch(fetchCurrentStockRequest());
        dispatch(fetchSalesRequest());
        dispatch(fetchPurchaseItemsRequest());
        dispatch(fetchProductRequest())
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
        Qty: '',
        // ratings: '',
        balance: '',
        exp_date: '',
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
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement || "";

        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSelectSele = (selectedSale: number | string) => {
        const selectedSales = patients.find((item: { id: any; }) => item.id === selectedSale);
        console.log('selected sale-', selectedSales);

        if (selectedSales) {
            setSaleCustomer(selectedSales ? selectedSales.name.toString() : '');
        }
    }

    const handleSelect = (selectedItemId: number | string) => {
        const selectedItem = productItem.find((item: { product_id: any }) => item.product_id === selectedItemId);
        if (selectedItem && selectedItem.product_id) {
            console.log('search item is-', typeof (selectedItem.product_id));
            // const selectedId = String(selectedItem.product_id)
            const currentProduct = currentStock.filter((item: { product_id: string }) => item.product_id.trim() === selectedItem.product_id.trim());

            if (selectedItem) {
                setInputValue(selectedItem ? selectedItem.name.toString() : '');
                setShowBatchDiv(true)
                setBatchData(currentProduct);
            }
        }
    };
    const batchSelect = (item: any) => {
        setSellerDetails({
            batch_no: item.batch_no,
            unit: item.unit,
            mrp: item.mrp,
            Qty: item.qty,
            storeName: item.store,
            balance: item.balance,
            exp_date: item.exp_date,
            revenue: item.revenue,
        });
        setShowBatchDiv(false)
    }

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
                                                    {doctors.map((doctor: any, index: any) => (
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
                                        sellers={productItem}
                                        onSelect={handleSelect}
                                        inputValue={inputValue}
                                        setInputValue={setInputValue}
                                        searchType="name"
                                        label="Item Name"
                                        className='invlabel'
                                        sellerItemInput={true}
                                    />
                                </Col>
                                <Col md className='px-1 '>
                                    <FloatingLabel className='invlabel' controlId="floatingBatch" label="Batch">
                                        <Form.Control type="text" value={sellerDetails.batch_no} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>

                                <Col md className='px-1 position-relative'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Unit/Pack">
                                        <Form.Control type="text" value={sellerDetails.unit} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                {showBatchDiv && (
                                    <div className='position-absolute bg-white shadow-lg w-50 h-auto p-0 mt-5 z-3' style={{ left: '25%' }}>
                                        <div className='p-2 py-1 bg-secondary bg-opacity-25 text-dark'>
                                            <div className='row'>
                                                <div className='col-md-6'>Batch No</div>
                                                <div className='col-md-6'>Stock</div>
                                            </div>
                                        </div>
                                        {Array.isArray(batchData) && batchData.length > 0 ? (
                                            batchData.map((item, index) => (
                                                <div className={`batchDivInput ${index ? 'row focused' : ''}`} key={index} onClick={() => batchSelect(item)}>
                                                    <div className='col-md-6'>{item.batch_no}</div>
                                                    <div className='col-md-6'>{item.qty}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No batches available</div>
                                        )}
                                    </div>
                                )}
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Expiry">
                                        <Form.Control type="text" value={sellerDetails.exp_date} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="MRP">
                                        <Form.Control type="text" value={sellerDetails.mrp} placeholder="" className='borderRemove px-0 ps-1' readOnly />
                                    </FloatingLabel>
                                </Col>
                                <Col md className='px-1'>
                                    <FloatingLabel className='invlabel' controlId="floatingInputGrid" label="Qty.">
                                        <Form.Control type="text" name='Qty' value={sellerDetails.Qty} placeholder="" className='borderRemove px-0 ps-1'
                                            onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} />
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
