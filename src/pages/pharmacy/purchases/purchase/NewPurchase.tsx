import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from "react-bootstrap";
// import classNames from "classnames";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SalesOffcanvas from '../../SalesOffcanvas';
import CusttomInvoiceDropdown from '../../../../components/CustomInvoiceDropdown';
import {useParams } from 'react-router-dom';
import { stock, purchaseItem } from "../data";
// import { number } from 'yup';
import { Toast, ToastContainer } from 'react-bootstrap';

// Utility function to convert MM/DD/YYYY to yyyy-MM-dd
const formatDate = (dateStr: string): string => {
    const [month, day, year] = dateStr.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export default function NewPurchase() {
    const [purchaseProductItem, setPurchaseProductItem] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    const [purchaseData, setPurchaseData] = useState<any | null>(null);
    const [addPurchaseDetails, setAddPurchaseDetails] = useState<any[]>([])
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState<string>('');


    console.log(addPurchaseDetails);


    // console.log('stok--', purchaseProductItem);

    const [formValues, setFormValues] = useState({
        distName: '',
        billId: '',
        billDate: '',
        dueDate: '',
        paymentMode: '',
    });

    const [purchaseItemDetails, setPurchaseItemDetails] = useState({
        // inputValue:'',
        batch_no: '',
        ptr: '',
        mrp: '',
        gst: 0,
        discount: 0,
        d_price: 0,
        amount: '',
        freeQty: '',
        expiryDate: new Date().toISOString().slice(0, 7),
        qty: '',
        // totalGst: '',
    });

    // edit time data fetch 
    useEffect(() => {
        if (id) {
            const purchase = stock.find(stock => stock.bill_id === parseInt(id));
            if (purchase) {
                setPurchaseData(purchase);
                setFormValues({
                    distName: purchase.name,
                    billId: purchase.bill_id.toString(),
                    billDate: formatDate(purchase.created_on),
                    dueDate: '',
                    paymentMode: purchase.payment_mode,
                });
            } else {
                console.error(`Sale with ID ${id} not found`);
            }
        }
    }, [id]);


    // value change time data add 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;

        if (name === 'gst') {
            const gstValue = parseFloat(value);
            const updatedPtr = ((parseFloat(purchaseItemDetails.mrp) * 100) / (gstValue + 100));
            console.log('updatedPtr--', updatedPtr);


            setPurchaseItemDetails(prevValues => ({
                ...prevValues,
                ptr: updatedPtr.toFixed(2),
                gst: gstValue,
            }));
        }

        if (name === 'discount') {
            const discValue = parseFloat(value);
            const updatedPtr = parseFloat(purchaseItemDetails.ptr);
            const discountValue = (updatedPtr - (updatedPtr * (discValue / 100))).toFixed(2);
            setPurchaseItemDetails((prevValues) => ({
                ...prevValues,
                ptr: updatedPtr.toString(),
                d_price: Number(discountValue),
            }));
        }

        if (name === 'qty') {
            let qtyValue = parseInt(value);
            if (qtyValue) {
                const discountValue = (purchaseItemDetails.d_price);
                const gst = (purchaseItemDetails.gst);
                const updateAmount = ((discountValue + (discountValue * ((gst) / 100))) * qtyValue).toFixed(2);
                console.log('amount--', updateAmount);
                setPurchaseItemDetails((prevValues) => ({
                    ...prevValues,
                    amount: (updateAmount),
                }));
            }
            else {
                setPurchaseItemDetails((prevValues) => ({
                    ...prevValues,
                    amount: '',
                }))
            }
        }

        // const totalGst = ((purchaseItemDetails.d_price * parseInt(value)) * purchaseItemDetails.gst / 100).toFixed(2);
        // console.log('totalGst=========',totalGst);
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));

        setPurchaseItemDetails(prevValues => ({
            ...prevValues,
            [name]: value,
        }));


    };

    // find gst of each item 
    const eachItemGstAmnt = ((purchaseItemDetails.d_price * parseInt(purchaseItemDetails.qty)) * purchaseItemDetails.gst / 100).toFixed(2);
    // console.log('totalGst=========',totalGst); // end find gst of each item 

    const handleSelectStock = (selectedStockItem: number) => {
        const selectedItem = stock.find(item => item.bill_id === selectedStockItem);
        if (selectedItem) {
            console.log(selectedItem);
            setPurchaseProductItem(selectedItem ? selectedItem.name.toString() : '');
        }
    };

    const handleSelectItem = (selectedPurchaseItem: number) => {
        const selectedItem = purchaseItem.find(item => item.id === selectedPurchaseItem);
        if (selectedItem) {
            // console.log(selectedItem);
            const mrpValue = selectedItem.mrp.toString();
            const gstValue = selectedItem.gst;
            const updatedPtr = ((parseFloat(mrpValue) * 100) / (gstValue + 100)).toFixed(2);

            setInputValue(selectedItem ? selectedItem.item_name.toString() : '');
            setPurchaseItemDetails({
                batch_no: '',
                ptr: updatedPtr,
                mrp: mrpValue,
                gst: gstValue,
                discount: selectedItem.discount,
                d_price: selectedItem.d_price,
                amount: selectedItem.amount,
                freeQty: '',
                expiryDate: new Date().toISOString().slice(0, 7),
                qty: '',
            });
        }
    };

    const handlePurchaseItemAdd = () => {
        const {
            batch_no,
            ptr,
            mrp,
            gst,
            discount,
            d_price,
            amount,
            freeQty,
            expiryDate,
            qty,
        } = purchaseItemDetails;

        // Check if all fields are filled

        if (parseFloat(mrp) < parseFloat(ptr)) {
            setToastMessage('Ptr should be less than Mrp !')
            setShowToast(true);
        }
        else if (
            inputValue &&
            batch_no &&
            ptr &&
            mrp &&
            gst !== 0 &&
            discount !== 0 &&
            d_price !== 0 &&
            amount !== '' &&
            freeQty &&
            expiryDate && qty
        ) {
            const newPurchaseDetail = {
                item_name: inputValue,
                totalGst: eachItemGstAmnt,
                ...purchaseItemDetails,
            };

            setAddPurchaseDetails((prevDetails: any[]) => [
                ...prevDetails,
                newPurchaseDetail,
            ]);

            // Optionally, clear the fields after adding
            setInputValue('');
            setPurchaseItemDetails({
                batch_no: '',
                ptr: '',
                mrp: '',
                gst: 0,
                discount: 0,
                d_price: 0,
                amount: '',
                freeQty: '',
                expiryDate: '',
                qty: '',
            });
        }
        else {
            setToastMessage('Please fill out all the fields before adding an item.');
            setShowToast(true);
        }
    };


    const handleEditPurchaseItem = (index: number) => {
        const selectedItem = addPurchaseDetails[index];
        setAddPurchaseDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
        setInputValue(selectedItem.item_name);
        setPurchaseItemDetails({
            batch_no: selectedItem.batch_no,
            ptr: selectedItem.ptr,
            mrp: selectedItem.mrp,
            gst: selectedItem.gst,
            discount: selectedItem.discount,
            d_price: selectedItem.d_price,
            amount: selectedItem.amount,
            freeQty: selectedItem.freeQty,
            expiryDate: selectedItem.expiryDate,
            qty: selectedItem.qty,
        });
    }


    const [validated, setValidated] = useState(false);
    const handleSubmit = (event: { currentTarget: any; preventDefault: () => void; stopPropagation: () => void; }) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };

    const totalAmount = addPurchaseDetails
        .reduce((total, detail) => total + parseFloat(detail.amount), 0)
        .toFixed(2);

    const toatalMrp = addPurchaseDetails
        .reduce((total, detail) => total + parseFloat(detail.mrp), 0)
        .toFixed(2);
    const toatalitem = addPurchaseDetails.length;
    const toatalQty = addPurchaseDetails.reduce((total, detail) => total + parseInt(detail.qty), 0);
    const toatalPtr = addPurchaseDetails
        .reduce((total, detail) => total + parseFloat(detail.ptr), 0).toFixed(2);

    const totalDisct = addPurchaseDetails.reduce((total, detail) => total + parseFloat(detail.discount), 0).toFixed(2);
    const totalGst = addPurchaseDetails.reduce((total, detail) => total + parseFloat(detail.totalGst), 0).toFixed(2);
    console.log('ajdsfhaslkdhfk', totalGst);

    const toalPurchaseAddDetails = {
        totalAmount: totalAmount,
        toatalMrp: toatalMrp,
        toatalitem: toatalitem,
        toatalQty: toatalQty,
        toatalPtr: toatalPtr,
        totalDisct: totalDisct,
        totalGst: totalGst
    };
    return (
        <>
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Body>
                            {/* ---------------ditributor form----------------  */}
                            <div className='bg-secondary bg-opacity-10 p-2 px-3 py-3 rounded'>
                                <Row>
                                    <Col>
                                        <i className="fas fa-user ms-n2" style={{ position: 'absolute', marginTop: '20px' }}></i>

                                        <CusttomInvoiceDropdown
                                            stocks={stock}
                                            onSelect={handleSelectStock}
                                            inputValue={formValues.distName || purchaseProductItem}
                                            setInputValue={setPurchaseProductItem}
                                            searchType="name"
                                            label="Distributor"
                                            className='invlabel'
                                            onAdd={() => {
                                            }}
                                        />
                                    </Col>
                                    <Col>
                                        <i className="fas fa-hashtag ms-n2" style={{ position: 'absolute', marginTop: '20px' }}></i>
                                        <FloatingLabel className='invlabel' controlId="floatingDistBillNo" label="Distributor Bill No.">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='billId' value={formValues.billId}
                                                onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel className='invlabel' controlId="floatingBillDate" label="Bill Date">
                                            <Form.Control type="date" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='BillDate' value={formValues.billDate} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel className='invlabel' controlId="floatingDueDate" label="Due Date">
                                            <Form.Control type="date" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='dueDate' value={formValues.billDate} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="floatingPayment"
                                            label="Payment Mode"
                                        >
                                            <Form.Select
                                                aria-label="Floating label select example"
                                                className="borderRemove bg-transparent"
                                                name='paymentMode'
                                                value={formValues.paymentMode || ""}
                                                onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                                                required
                                            >
                                                {purchaseData && (
                                                    <option value={purchaseData.payment_mode}>
                                                        {purchaseData.payment_mode}
                                                    </option>
                                                )}
                                                {!purchaseData && <option value="">Select Payment</option>}
                                                <option value="1">Cash</option>
                                                <option value="2">Credit</option>
                                                <option value="3">UPI</option>
                                                <option value="4">Card</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </div>
                            {/* ---------end distributor form---------  */}
                            <hr className='mb-2' />

                            {/*-----------------item selected form ------------ */}

                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row>
                                    <Col lg>
                                        <CusttomInvoiceDropdown
                                            purchaseItems={purchaseItem}
                                            onSelect={handleSelectItem}
                                            inputValue={(inputValue) ? inputValue : ''}
                                            setInputValue={setInputValue}
                                            searchType="name"
                                            label="Item Name"
                                            className='invlabel'
                                        />
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingbatch_no" label="Batch No.">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='batch_no' value={purchaseItemDetails.batch_no} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingMrpPckg" label="MRP/Package">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='mrp' value={purchaseItemDetails.mrp}
                                                onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingPtrPckg" label="PTR/Package">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name="ptr" value={purchaseItemDetails.ptr} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel
                                            controlId="floatingDisct"
                                            label="GST%"
                                        >
                                            <Form.Select aria-label="Floating label select example" className='borderRemove bg-transparent'
                                                name='gst'
                                                value={(purchaseItemDetails.gst) ? purchaseItemDetails.gst : ''}
                                                onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                                                required
                                            >
                                                {purchaseItemDetails && (
                                                    <option value={purchaseItemDetails.gst}> {purchaseItemDetails.gst}</option>
                                                )}
                                                <option value="5">5</option>
                                                <option value="12">12</option>
                                                <option value="18">18</option>
                                                <option value="28">28</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingFree" label="Free">
                                            <Form.Control type="text" name='freeQty' placeholder="" className='borderRemove px-0 ps-1' value={purchaseItemDetails.freeQty} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingExpDate" label="Expiry Date">
                                            <Form.Control type="month" name='expiryDate' placeholder="" className='borderRemove px-0 ps-1' value={purchaseItemDetails.expiryDate} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingGst" label="Discount% ">
                                            <Form.Control type="text" name="discount" placeholder="" className='borderRemove px-0 ps-1' value={(purchaseItemDetails.discount) ? purchaseItemDetails.discount : ''} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingDprice" label="D Price">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='d_price' value={(purchaseItemDetails.discount) ? purchaseItemDetails.d_price : ''} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingQuantity" label="Quantity">
                                            <Form.Control type="text" name='qty' placeholder="" className='borderRemove px-0 ps-1' value={purchaseItemDetails.qty} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingBillAmnt" label="Bill Amount">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='bill_amount' value={purchaseItemDetails.amount} required />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Button variant="primary" type="submit" className='btn btn-primary waves-effect waves-light float-end mt-2'
                                    onClick={handlePurchaseItemAdd}>
                                    <i className="mdi mdi-plus-circle me-1"></i>Add
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Body>
                            <div className="table-responsive">
                                <table className="table table-sm table-responsive">
                                    <thead>
                                        <tr>
                                            <th scope="col">Items</th>
                                            <th scope="col">Batch</th>
                                            <th scope="col">Exp.</th>
                                            <th scope="col">Qty.</th>
                                            <th scope="col">Free</th>
                                            <th scope="col">MRP</th>
                                            <th scope="col">PTR</th>
                                            <th scope="col">D.Price</th>
                                            <th scope="col">GST%</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-0">
                                        {addPurchaseDetails.map((detail: any, index: number) => (
                                            // console.log('totalGst=========',totalGst);
                                            <React.Fragment key={index}>
                                                <i className="fas fa-trash ms-n2 mt-2" style={{ position: 'absolute', color: 'red' }}></i>
                                                <tr
                                                    style={{ cursor: 'pointer', borderBottom: '1px solid #e1e1e1' }}
                                                    onClick={() => handleEditPurchaseItem(index)}>
                                                    <td>{detail.item_name}</td>
                                                    <td>{detail.batch_no}</td>
                                                    <td>{detail.expiryDate}</td>
                                                    <td>{detail.qty}</td>
                                                    <td>{detail.freeQty}</td>
                                                    <td>{detail.mrp}</td>
                                                    <td>{detail.ptr}</td>
                                                    <td>{detail.d_price}</td>
                                                    <td>{detail.gst}</td>
                                                    <td>{detail.amount}</td>
                                                </tr>
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                    <SalesOffcanvas isPurchase={true} toalPurchaseAddDetails={toalPurchaseAddDetails} />
                </Col>
            </Row>


            {/* Toast Component */}
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={6000} autohide bg="danger">
                    <Toast.Header>
                        <strong className="me-auto">Validation Error !</strong>
                    </Toast.Header>
                    <Toast.Body className='text-white'>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer> {/*end Toast Component */}
        </>
    )
}


