import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchPurchaseItemsRequest, fetchPurchaseDistributorRequest } from "../../../../redux/DataFetch/actions";
// components
import Table from "../../../../components/Table";

/* name column render */
const NameColumn = ({ row }: { row: any }) => {
  return (
    <>
      <div className="table-user">
        <img src={row.original.image} alt="" className="me-2 rounded-circle" />
        <Link to="#" className="text-body fw-semibold">
          {row.original.name}
        </Link>
      </div>
    </>
  );
};

/* action column render */
const ActionColumn = ({ row }: { row: any }) => {
  return (
    <>
      <Link to={`/add-purchase/${row.original.bill_id}`} className="action-icon">
        {" "}
        <i className="mdi mdi-square-edit-outline"></i>
      </Link>
      <Link to="#" className="action-icon">
        {" "}
        <i className="mdi mdi-delete"></i>
      </Link>
    </>
  );
};

// get all columns
const columns = [
  {
    Header: "Dist. Bill No",
    accessor: "bill_id",
    sort: true,
    // Cell: NameColumn,
  },
  {
    Header: "Dist. Name",
    accessor: "name",
    sort: true,
  },
  {
    Header: "Date",
    accessor: "created_on",
    sort: true,
    // Cell: LastOrderColumn,
  },
  {
    Header: "Amount",
    accessor: "amount",
    sort: true,
  },
  {
    Header: "Payment Mode",
    accessor: "payment_mode",
    sort: true,
  },
  {
    Header: "Action",
    accessor: "action",
    sort: false,
    Cell: ActionColumn,
  },
];


// main component
const Purchase = () => {
  const dispatch = useDispatch();
  const distributorData = useSelector((state: RootState) => state.purchaseDistributer.data);
  useEffect(() => {
    dispatch(fetchPurchaseDistributorRequest());
  }, [dispatch]);

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
    value: distributorData.length,
  },
];
  return (
    <>
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={4}>
                   <Link
                      to="/add-purchase"
                      className="btn btn-danger waves-effect waves-light"
                    >
                      <i className="mdi mdi-plus-circle me-1"></i> Add Purchase
                    </Link>
                </Col>

                <Col sm={8}>
                  <div className="text-sm-end">
                    <Button variant="success" className="mb-2 me-1">
                      <i className="mdi mdi-cog-outline"></i>
                    </Button>

                    <Button variant="light" className="mb-2 me-1">
                      Import
                    </Button>

                    <Button variant="light" className="mb-2 me-1">
                      Export
                    </Button>
                  </div>
                </Col>
              </Row>
              
              <Table
                columns={columns}
                data={distributorData}
                pageSize={10}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={true}
                isSearchable={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isPurchasePage={true} // Pass this prop to modify the select dropdown
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Purchase;
