// ViewPurchase.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchPurchaseItemsRequest, fetchPurchaseDistributorRequest } from "../../../../redux/DataFetch/actions";
import { useParams } from "react-router-dom";
import Table from "../../../../components/Table";
import { Card, Col, Row } from "react-bootstrap";
import SalesOffcanvas from "../../SalesOffcanvas";
import { totalmem } from "os";

export default function ViewPurchase() {
  const dispatch = useDispatch();
  const { id } = useParams();
  // Remove the colon (:) from the id
  const cleanedId = id?.replace(':', '');


  const purchaseData = useSelector((state: RootState) => state.purchase.data);
    const purchaseLoading = useSelector((state: RootState) => state.purchase.loading);
    const purchaseError = useSelector((state: RootState) => state.purchase.error);


  console.log('purchase data-', purchaseData);

  useEffect(() => {
    dispatch(fetchPurchaseItemsRequest());
    dispatch(fetchPurchaseDistributorRequest());
  }, [dispatch]);

    if (purchaseLoading) return <p>Loading...</p>;
    if (purchaseError) return <p>{purchaseError}</p>;

  const filteredPurchaseData = purchaseData.filter(
    (item: { bill_id: string | number }) => item.bill_id === Number(cleanedId));

    const totalitem = filteredPurchaseData.length;
    const totalamount = filteredPurchaseData.reduce((acc: any, item: { amount: number; }) => acc + (item.amount),
    0);
    const totalQty = filteredPurchaseData.reduce((acc:any, item: {qty: any;}) => acc + parseInt(item.qty), 0);
    const totalGst = filteredPurchaseData.reduce((acc:any, item: {gst: any}) => acc + parseInt(item.gst), 0);
    const totalPtr = filteredPurchaseData.reduce((acc:any, item: {ptr: any}) => acc + parseInt(item.ptr),0);
    const totalMrp = filteredPurchaseData.reduce((acc:any, item: {mrp: any}) => acc + parseFloat(item.mrp),0);

    console.log('total gst-',totalGst);
    
    const totalViewPurchase = {
      totalitem : totalitem,
      totalQty : totalQty,
      totalPtr : totalPtr,
      totalMrp : totalMrp,
      totalamount : totalamount,
      totalGst : totalGst,
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
  const sizePerPageList = [
    {
      text: "10",
      value: 10,
    },
    {
      text: "25",
      value: 25,
    },
    {
      text: "All",
      value: filteredPurchaseData.length,
    },
  ];

  return (
    <>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Table
                columns={columns}
                data={filteredPurchaseData}
                pageSize={10}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={true}
                // isSearchable={true}
                theadClass="table-light"
                // searchBoxClass="mt-2 mb-3"
                isViewPage={true} // Pass this prop to modify the select dropdown
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <SalesOffcanvas isPurchaseView={true} totalViewPurchase={totalViewPurchase}/>
    </>
  );
}
