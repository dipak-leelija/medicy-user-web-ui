// ViewPurchase.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchPurchaseItemsRequest, fetchPurchaseDistributorRequest } from "../../../../redux/DataFetch/actions";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../../../components/Table";
import { Card, Col,  Row } from "react-bootstrap";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import SalesOffcanvas from "../../SalesOffcanvas";

export default function ViewPurchase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // Remove the colon (:) from the id
  const cleanedId = id?.replace(':', '');

  //get the current distributor data 
  const distributorData = useSelector((state: RootState) => state.purchaseDistributer.data);

  // get the purchase data from redux 
  const purchaseData = useSelector((state: RootState) => state.purchase.data);
  // const purchaseLoading = useSelector((state: RootState) => state.purchase.loading);
  // const purchaseError = useSelector((state: RootState) => state.purchase.error);

  useEffect(() => {
    dispatch(fetchPurchaseItemsRequest());
    dispatch(fetchPurchaseDistributorRequest());
  }, [dispatch]);

  //+++ find the matching distributor data+++//
  const filterDistributor = distributorData.find((distributor: { bill_id: string | number; }) => distributor.bill_id === Number(cleanedId));

  // console.log(filterDistributor.bill_id);
  //+++find the matching purchase data+++//
  const filteredPurchaseData = purchaseData.filter(
    (item: { bill_id: string | number }) => item.bill_id === Number(cleanedId));

  //+++pass total data of each input+++//
  const totalitem = filteredPurchaseData.length;
  const totalamount = filteredPurchaseData.reduce((acc: any, item: { amount: number; }) => acc + (item.amount),
    0);
  const totalQty = filteredPurchaseData.reduce((acc: any, item: { qty: any; }) => acc + parseInt(item.qty), 0);
  const totalGst = filteredPurchaseData.reduce((acc: any, item: { gst: any }) => acc + parseInt(item.gst), 0);
  const totalPtr = filteredPurchaseData.reduce((acc: any, item: { ptr: any }) => acc + parseInt(item.ptr), 0);
  const totalMrp = filteredPurchaseData.reduce((acc: any, item: { mrp: any }) => acc + parseFloat(item.mrp), 0);

  console.log('total gst-', totalGst);

  const totalViewPurchase = {
    totalitem: totalitem,
    totalQty: totalQty,
    totalPtr: totalPtr,
    totalMrp: totalMrp,
    totalamount: totalamount,
    totalGst: totalGst,
  }
  // console.log('filtered purchase data-', filteredPurchaseData.length);


  // get all columns
  const columns = [
    {
      Header: "Item Name",
      accessor: "item_name",
      sort: true,
      // Cell: NameColumn,
    },
    {
      Header: "Batch",
      accessor: "batch_no",
      sort: true,
    },
    {
      Header: "Expiry",
      accessor: "exp_date",
      sort: true,
      // Cell: LastOrderColumn,
    },
    {
      Header: "MRP",
      accessor: "mrp",
      sort: true,
    },
    {
      Header: "PTR",
      accessor: "ptr",
      sort: true,
    },
    {
      Header: "D.Price",
      accessor: "d_price",
      sort: true,
    },
    {
      Header: "QTY",
      accessor: "qty",
      sort: true,
    },
    {
      Header: "FREE",
      accessor: "0",
      sort: true,
    },
    {
      Header: "GST",
      accessor: "gst",
      sort: true,
    },
    {
      Header: "Amount",
      accessor: "amount",
      sort: true,
    },
  ];

  // get pagelist to display
  // const sizePerPageList = [
  //   {
  //     text: "10",
  //     value: 10,
  //   },
  //   {
  //     text: "25",
  //     value: 25,
  //   },
  //   {
  //     text: "All",
  //     value: filteredPurchaseData.length,
  //   },
  // ];

  return (
    <>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body className="pt-1">
              <Row className="pb-1">
                <Col>
                  <FloatingLabel className='invlabel border-0' controlId="floatingDistBillNo" label="Distributor Bill No.">
                    <Form.Control type="text" placeholder="" className='border-0 px-0 ps-1 fs-5 fw-bold bg-transparent' name='billId' value={filterDistributor?.bill_id || ''} readOnly/>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel className='invlabel' controlId="floatingDistBillNo" label="Bill Date">
                    <Form.Control type="text" placeholder="" className='border-0 px-0 ps-1 fs-5 fw-bold bg-transparent' name='billId' value={filterDistributor?.created_on || ''} readOnly/>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel className='invlabel' controlId="floatingDistBillNo" label="Distributor Bill No.">
                    <Form.Control type="text" placeholder="" className='border-0 px-0 ps-1 fs-5 fw-bold bg-transparent' name='billId' value={filterDistributor?.payment_mode || ''} readOnly/>
                  </FloatingLabel>
                </Col>
                <Col className="CustomTableRow px-4 cursor-pointer" onClick={()=>navigate('/distributor')}>
                <i className="fas fa-user ms-n2" style={{ position: 'absolute', marginTop: '8px',marginRight:'160px' }}></i>
                  <FloatingLabel className='invlabel border-0 CustomTableRow' controlId="floatingDistBillNo" label="Distributor">
                    <Form.Control type="text" placeholder="" className='border-0 px-0 ps-1 fs-5 fw-bold bg-transparent CustomTableRow' name='billId' value={filterDistributor?.name || ''} readOnly/>
                  </FloatingLabel>
                </Col>
              </Row>
              <Table
                columns={columns}
                data={filteredPurchaseData}
                // pageSize={10}
                // sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={true}
                // isSearchable={true}
                theadClass="table-light"
                // searchBoxClass="mt-2 mb-3"
                isPurchaseViewTable={true} // Pass this prop to modify the select dropdown
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <SalesOffcanvas isPurchaseView={true} totalViewPurchase={totalViewPurchase} />
    </>
  );
}
