
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SalesOffcanvas from '../../SalesOffcanvas';
import CusttomInvoiceDropdown from '../../../../components/CustomInvoiceDropdown';
import { Link, useParams } from 'react-router-dom';
import { stock, purchaseItem } from "../data";
import { number } from 'yup';

// Utility function to convert MM/DD/YYYY to yyyy-MM-dd
// const formatDate = (dateStr: string): string => {
//     const [month, day, year] = dateStr.split('/');
//     return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
// };

export default function NewPurchaseReturn() {
    const [distPurchaseItem, setdistPurchaseItem] = useState<any>([]);
    const [inputValue, setInputValue] = useState<string>('');
    const [distName, setDistName] = useState<string>('');
    const [defaultDropDown, setDefaultDropDown] = useState<boolean>(false);
    const [addPurchaseReturnItem, setAddPurchaseReturnItem] = useState<any[]>([]);
    const { id } = useParams<{ id: string }>();


    console.log('addPurchaseReturnItem--', addPurchaseReturnItem);

    const [formValues, setFormValues] = useState({
        dist_Name: '',
    });

    const [fillItem, setFillItem] = useState<Partial<any>>({
        item_name: '',
        paymentMode: '',
        bill_no: '',
        batch_no: '',
        mrp: '',
        ptr: '',
        gst: '',
        discount: '',
        d_price: '',
        created_on: '',
        exp_date: '',
        qty: '',
        cur_Qty: '',
        amount: '',
        return_Qty: '',
        description: '',
        ref_amount: '',
    });

    // edit time data fetch 
    useEffect(() => {
        if (id) {
            const purchase = stock.find(stock => stock.bill_id === parseInt(id));
            if (purchase) {
                setFormValues({
                    dist_Name: purchase.name,
                });
            } else {
                console.error(`Sale with ID ${id} not found`);
            }
        }
    }, [id]);


    // value change time data add 
    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target as HTMLInputElement | HTMLSelectElement;

        if (name === 'return_Qty') {
            const refund = parseInt(value, 10);
            const cur_Qty = parseFloat(fillItem.cur_Qty);
            const amount = parseFloat(fillItem.amount);
            const refund_amount = (cur_Qty / amount) * refund;
            setFillItem(prevValues => ({
                ...prevValues,
                ref_amount: refund_amount.toFixed(2),
            }))

        }
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));

        setFillItem(prevValues => ({
            ...prevValues,
            [name]: value
        }))
    };


    const handleSelectDist = (selectedStockItem: number) => {
        const selectedItem = stock.find(item => item.bill_id === selectedStockItem);
        if (selectedItem) {
            // console.log(selectedItem.bill_id);
            // setdistPurchaseItem(selectedItem.bill_id.toString());
            setDistName(selectedItem.name.toString());
            setDefaultDropDown(true);

            const selectBaseedDist = purchaseItem.filter(item => item.bill_id === selectedItem.bill_id);
            if (selectBaseedDist) {
                setdistPurchaseItem(selectBaseedDist);
                // console.log('search item--', selectBaseedDist);
            } else {
                // console.log('No matching item found');
                setdistPurchaseItem([]);
            }
        }
    };


    const handleSelectItem = (selectedItemId: number) => {
        const selectedItem = distPurchaseItem.find((item: { id: number; }) => item.id === selectedItemId);
        if (selectedItem) {
            // setInputValue(selectedItem.item_name); // Set the selected item's name in the input field
            // console.log('Selected item--', selectedItem);
            const cur_Qty = Number(selectedItem.qty) + Number(selectedItem.qty);
            // const refund = Number(cur_Qty) / Number(selectedItem.amount);
            setFillItem({
                item_name: selectedItem.item_name,
                paymentMode: '',
                bill_no: selectedItem.bill_id,
                batch_no: selectedItem.batch_no,
                mrp: selectedItem.mrp,
                ptr: selectedItem.ptr,
                gst: selectedItem.gst,
                discount: selectedItem.discount,
                d_price: selectedItem.d_price,
                created_on: selectedItem.created_on,
                exp_date: selectedItem.exp_date,
                qty: selectedItem.qty,
                cur_Qty: cur_Qty.toString(),
                amount: selectedItem.amount,
                return_Qty: '',
                description: '',
                ref_amount: selectedItem.refund_amount,
            })
            setInputValue(selectedItem.item_name);
        }
    };

    const handlePurchaseReturnAdd = () => {

        const {
            paymentMode,
            description,
            return_Qty,
            ref_amount,
        } = fillItem;

        if (inputValue && paymentMode && description && return_Qty && ref_amount) {

            const newPurchaseReturnDetail = {
                dist_Name: distName,
                ...fillItem,
            };
            setAddPurchaseReturnItem((prevDetails: any[]) => [
                ...prevDetails,
                newPurchaseReturnDetail,
            ]);

            setDistName('');
            setInputValue('');
            setFillItem({
                item_name: '',
                paymentMode: '',
                bill_no: '',
                batch_no: '',
                mrp: '',
                ptr: '',
                gst: '',
                discount: '',
                d_price: '',
                created_on: '',
                exp_date: '',
                qty: '',
                cur_Qty: '',
                amount: '',
                return_Qty: '',
                description: '',
                ref_amount: '',
            });
        } else {
            alert('Please fill all the fields');
        }


    }

    const handleEditPurchaseItem = (index: number) => {
        const itemIndex = addPurchaseReturnItem[index];
        console.log('item index value--', itemIndex);

        setAddPurchaseReturnItem(prevDetails => prevDetails.filter((_, i) => i !== index));
        setDistName(itemIndex.dist_Name);
        setInputValue(itemIndex.item_name)
        setFillItem({
            paymentMode: itemIndex.paymentMode,
            bill_no: itemIndex.bill_no,
            batch_no: itemIndex.batch_no,
            mrp: itemIndex.mrp,
            ptr: itemIndex.ptr,
            gst: itemIndex.gst,
            discount: itemIndex.discount,
            d_price: itemIndex.d_price,
            created_on: itemIndex.created_on,
            exp_date: itemIndex.exp_date,
            qty: itemIndex.qty,
            cur_Qty: itemIndex.cur_Qty,
            amount: itemIndex.amount,
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

    const totalAmount = addPurchaseReturnItem
        .reduce((total, item) => total + parseFloat(item.amount), 0)
        .toFixed(2);
    const toatalMrp = addPurchaseReturnItem
        .reduce((total, item) => total + parseFloat(item.mrp), 0)
        .toFixed(2);
    const toatalitem = addPurchaseReturnItem.length;
    const toatalQty = addPurchaseReturnItem.reduce((total, item) => total + parseInt(item.qty), 0);
    const toatalPtr = addPurchaseReturnItem
        .reduce((total, item) => total + parseFloat(item.ptr), 0).toFixed(2);

    const totalDisct = addPurchaseReturnItem.reduce((total, item) => total + parseFloat(item.discount), 0).toFixed(2);
    const totalGst = addPurchaseReturnItem.reduce((total, item) => total + parseFloat(item.gst), 0).toFixed(2);
    // console.log('ajdsfhaslkdhfk', toatalitem);

    const totalPurchaseReturnAdd = {
        totalAmount: totalAmount,
        toatalMrp: toatalMrp,
        toatalitem: toatalitem,
        toatalQty: toatalQty,
        toatalPtr: toatalPtr,
        totalDisct: totalDisct,
        totalGst:totalGst
    }
    return (
        <>
            <Row className='mt-4'>
                <Col>
                    <Card>
                        <Card.Body>
                            {/* ---------------Purchase Return form----------------  */}
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <div className='bg-secondary bg-opacity-10 p-2 px-3 py-3 rounded'>
                                    <Row>
                                        <Col>
                                            <i className="fas fa-user ms-n2" style={{ position: 'absolute', marginTop: '20px' }}></i>

                                            <CusttomInvoiceDropdown
                                                stocks={stock}
                                                onSelect={handleSelectDist}
                                                inputValue={formValues.dist_Name || distName}
                                                setInputValue={setDistName}
                                                searchType="name"
                                                label="Distributor"
                                                className='invlabel'
                                            />
                                        </Col>
                                        <Col lg>
                                            <CusttomInvoiceDropdown
                                                purchaseItems={distPurchaseItem}
                                                onSelect={handleSelectItem}
                                                inputValue={(inputValue) ? inputValue : ''}
                                                setInputValue={setInputValue}
                                                searchType="name"
                                                label="Item Name"
                                                className='invlabel'
                                                defaultDropDown={defaultDropDown}
                                            />
                                        </Col>

                                        <Col>
                                            <FloatingLabel
                                                controlId="floatingPayment"
                                                label="Return Mode"
                                            >
                                                <Form.Select
                                                    aria-label="Floating label select example"
                                                    className="borderRemove bg-transparent"
                                                    name='paymentMode'
                                                    value={fillItem.paymentMode}
                                                    onChange={handleChange as React.ChangeEventHandler<HTMLSelectElement>}
                                                    required
                                                >
                                                    <option value="">Select Payment</option>
                                                    <option value="Cash">Cash</option>
                                                    <option value="Credit">Credit</option>
                                                    <option value="UPI">UPI</option>
                                                    <option value="Card">Card</option>
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </div>
                                <hr className='mb-2' />
                                <Row>
                                    <Col>
                                        <FloatingLabel className='invlabel' controlId="floatingDistBillNo" label="Distributor Bill No.">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1 bg-transparent' name='billId' value={fillItem.bill_no}
                                                required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingbatch_no" label="Batch No.">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='batch_no' value={fillItem.batch_no} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingPtrPckg" label="PTR/Package">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name="ptr" value={fillItem.ptr} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingGst" label="Discount% ">
                                            <Form.Control type="text" name="discount" placeholder="" className='borderRemove px-0 ps-1' value={fillItem.discount} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingDprice" label="D Price">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='d_price' value={fillItem.d_price} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingFree" label="Purchase Date">
                                            <Form.Control type="text" name='PurchaseDate' placeholder="" className='borderRemove px-0 ps-1' value={fillItem.created_on} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingExpDate" label="Expiry Date">
                                            <Form.Control type="text" name='expiryDate' placeholder="" className='borderRemove px-0 ps-1' value={fillItem.exp_date} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingGst" label="Purchase Qty">
                                            <Form.Control type="text" name="puchaseQty" placeholder="" className='borderRemove px-0 ps-1' value={fillItem.qty} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingDprice" label="Free Qty">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='d_price' value={fillItem.qty} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingQuantity" label="Current Qty">
                                            <Form.Control type="text" name='qty' placeholder="" className='borderRemove px-0 ps-1' value={fillItem.cur_Qty} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingBillAmnt" label="Amount">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='bill_amount' value={fillItem.amount} required readOnly />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FloatingLabel className='invlabel' controlId="floatingBillAmnt" label="Description">
                                            <Form.Control as="textarea" placeholder="" className='borderRemove px-0 ps-1' name='description' value={fillItem.description}
                                                onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingBillAmnt" label="Return Qty">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='return_Qty' value={fillItem.return_Qty}
                                                onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col md>
                                        <FloatingLabel className='invlabel' controlId="floatingBillAmnt" label="Refund">
                                            <Form.Control type="text" placeholder="" className='borderRemove px-0 ps-1' name='ref_amount' value={fillItem.ref_amount} required />
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <Button variant="primary" type="submit" className='btn btn-primary waves-effect waves-light float-end mt-2' onClick={handlePurchaseReturnAdd}>
                                            <i className="mdi mdi-plus-circle me-1"></i>Add
                                        </Button>
                                    </Col>
                                </Row>
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
                                            {/* <th scope="col">Qty.</th> */}
                                            <th scope="col">Free</th>
                                            <th scope="col">MRP</th>
                                            <th scope="col">PTR</th>
                                            <th scope="col">D.Price</th>
                                            <th scope="col">GST%</th>
                                            <th scope="col">Amount</th>
                                        </tr>
                                    </thead>

                                    <tbody className="border-0">
                                        {addPurchaseReturnItem.map((item, index) => (
                                            <tr key={index} onClick={() => handleEditPurchaseItem(index)}>
                                                <td>{item.item_name}</td>
                                                <td>{item.batch_no}</td>
                                                <td>{item.exp_date}</td>
                                                <td>{item.qty}</td>
                                                <td>{item.mrp}</td>
                                                <td>{item.ptr}</td>
                                                <td>{item.d_price}</td>
                                                <td>{item.gst}</td>
                                                <td>{item.amount}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card.Body>
                    </Card>
                    <SalesOffcanvas isPurchaseReturn={true} totalPurchaseReturnAdd={totalPurchaseReturnAdd} />
                </Col>
            </Row>

        </>
    )
}


