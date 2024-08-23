import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SalesOffcanvas from '../../SalesOffcanvas';
import CusttomInvoiceDropdown from '../../../../components/CustomInvoiceDropdown';
import { Link, useParams } from 'react-router-dom';
import { stock, purchaseItem } from "../data";

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

    console.log('after add--', addPurchaseDetails);

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
        batchNo: '',
        ptr: '',
        mrp: '',
        gst: 0,
        discount: 0,
        d_price: 0,
        amount: 0,
        freeQty: '',
        expiryDate: '',
    });

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

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;

        if (name == 'gst') {
            const gstValue = parseFloat(value);
            const updatedPtr = Math.round(parseFloat(purchaseItemDetails.mrp) * 100 / (gstValue + 100)).toFixed(2);

            setPurchaseItemDetails(prevValues => ({
                ...prevValues,
                ptr: updatedPtr,
                gst: gstValue,
            }));
        }

        if (name == 'discount') {
            const discValue = parseFloat(value);
            const updatedPtr = parseFloat(purchaseItemDetails.ptr);
            const discountValue = (updatedPtr - (updatedPtr * (discValue / 100))).toFixed(2);
            setPurchaseItemDetails((prevValues) => ({
                ...prevValues,
                ptr: updatedPtr.toString(),
                d_price: Number(discountValue),
            }));
        }

        if (name == 'qty') {
            const qtyValue = parseInt(value);
            if (qtyValue) {
                const discountValue = (purchaseItemDetails.d_price);
                // console.log('qty discount value--',discountValue);
                const gst = (purchaseItemDetails.gst);
                const updateAmount = ((discountValue + (discountValue * ((gst) / 100))) * qtyValue).toFixed(2);
                console.log('amount--', updateAmount);
                setPurchaseItemDetails((prevValues) => ({
                    ...prevValues,
                    amount: Number(updateAmount),
                }));
            }
            else {
                setPurchaseItemDetails((prevValues) => ({
                    ...prevValues,
                    amount: 0,
                }))
            }

        }
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));

        setPurchaseItemDetails(prevValues => ({
            ...prevValues,
            [name]: value,
        }));

    };

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
            const updatedPtr = Math.round(parseFloat(mrpValue) * 100 / (gstValue + 100)).toFixed(2);

            setInputValue(selectedItem ? selectedItem.item_name.toString() : '');
            setPurchaseItemDetails({
                // inputValue: inputValue,
                batchNo: '',
                ptr: updatedPtr,
                mrp: mrpValue,
                gst: gstValue,
                discount: selectedItem.discount,
                d_price: selectedItem.d_price,
                amount: selectedItem.amount,
                freeQty: '',
                expiryDate: '',
            });
        }
    };

    // const handlePurchaseItemAdd = () => {
    //     const newPurchaseDetail = {
    //         item_name: inputValue,
    //         ...purchaseItemDetails,
    //     };

    //     setAddPurchaseDetails((prevDetails: any[]) => [
    //         ...prevDetails,
    //         newPurchaseDetail,
    //     ]);
    // }

    const handlePurchaseItemAdd = () => {
        const {
            batchNo,
            ptr,
            mrp,
            gst,
            discount,
            d_price,
            amount,
            freeQty,
            expiryDate,
        } = purchaseItemDetails;
    
        // Check if all fields are filled
        if (
            inputValue &&
            batchNo &&
            ptr &&
            mrp &&
            gst !== 0 &&  // Assuming gst is a number, so 0 or a falsy value would mean it's not filled
            discount !== 0 && // Assuming discount is a number, so 0 or a falsy value would mean it's not filled
            d_price !== 0 && // Same logic for d_price
            amount !== 0 && // Same logic for amount
            freeQty &&
            expiryDate
        ) {
            const newPurchaseDetail = {
                item_name: inputValue,
                ...purchaseItemDetails,
            };
    
            setAddPurchaseDetails((prevDetails: any[]) => [
                ...prevDetails,
                newPurchaseDetail,
            ]);
    
            // Optionally, clear the fields after adding
            setInputValue('');
            setPurchaseItemDetails({
                batchNo: '',
                ptr: '',
                mrp: '',
                gst: 0,
                discount: 0,
                d_price: 0,
                amount: 0,
                freeQty: '',
                expiryDate: '',
            });
        } else {
            // Show an alert or a validation message if any field is empty
            alert('Please fill out all the fields before adding an item.');
        }
    };
    

    const handleEditPurchaseItem= (index: number)=>{
        setAddPurchaseDetails(prevDetails => prevDetails.filter((_, i) => i !== index));
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
                                                onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel className='invlabel' controlId="floatingBillDate" label="Bill Date">
                                            <Form.Control type="date" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='BillDate' value={formValues.billDate} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel className='invlabel' controlId="floatingDueDate" label="Due Date">
                                            <Form.Control type="date" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='dueDate' value={formValues.billDate} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
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
                                        inputValue={inputValue}
                                        setInputValue={setInputValue}
                                        searchType="name"
                                        label="Item Name"
                                        className='invlabel'
                                    />
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingBatchNo" label="Batch No.">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='batchNo' onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingMrpPckg" label="MRP/Package">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='mrp' value={purchaseItemDetails.mrp}
                                            onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingPtrPckg" label="PTR/Package">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name="ptr" value={purchaseItemDetails.ptr} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel
                                        controlId="floatingDisct"
                                        label="GST%"
                                    >
                                        <Form.Select aria-label="Floating label select example" className='borderRemove bg-transparent'
                                            name='gst'
                                            value={purchaseItemDetails.gst || ""}
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
                                        <Form.Control type="text" name='freeQty' placeholder="" className='borderRemove px-0 ps-1' onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingExpDate" label="Expiry Date">
                                        <Form.Control type="date" name='expiryDate' placeholder="" className='borderRemove px-0 ps-1' onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingGst" label="Discount% ">
                                        <Form.Control type="text" name="discount" placeholder="" className='borderRemove px-0 ps-1' value={purchaseItemDetails.discount} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingDprice" label="D Price">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='d_price' value={(purchaseItemDetails.discount) ? purchaseItemDetails.d_price : ''} required/>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingQuantity" label="Quantity">
                                        <Form.Control type="text" name='qty' placeholder="" className='borderRemove px-0 ps-1' onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required/>
                                    </FloatingLabel>
                                </Col>
                                <Col md>
                                    <FloatingLabel className='invlabel' controlId="floatingBillAmnt" label="Bill Amount">
                                        <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='bill_amount' value={purchaseItemDetails.amount} required/>
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
                                            <>
                                            <i className="fas fa-trash ms-n2 mt-2" style={{ position: 'absolute', color:'red'}}></i>
                                            <tr key={index}
                                            // className='border-bottom'
                                            style={{cursor:'pointer', borderBottom:'1px solid #e1e1e1'}}
                                            onClick={() => handleEditPurchaseItem(index)}>
                                                <td>{detail.item_name}</td>
                                                <td>{detail.batchNo}</td>
                                                <td>{detail.expiryDate}</td>
                                                <td>{detail.qty}</td>
                                                <td>{detail.freeQty}</td>
                                                <td>{detail.mrp}</td>
                                                <td>{detail.ptr}</td>
                                                <td>{detail.d_price}</td>
                                                <td>{detail.gst}</td>
                                                <td>{detail.amount}</td>
                                            </tr>
                                            </>
                                        ))}
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
