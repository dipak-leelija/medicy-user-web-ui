import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";

// components
import PageTitle from "../../../../components/PageTitle";
import Table from "../../../../components/Table";

// dummy data
import { sellers } from "../data";

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

/* ratings column render */
// const RatingsColumn = ({ row }: { row: any }) => {
//   const variant =
//     row.original.ratings >= 3.0 && row.original.ratings <= 5.0
//       ? "text-warning"
//       : "text-danger";
//   return (
//     <>
//       <i className={classNames("mdi", "mdi-star", variant)}></i>{" "}
//       {row.original.ratings}
//     </>
//   );
// };

/* action column render */
const ActionColumn = ({ row }: { row: any }) => {
  return (
    <>
      <Link to={`/sales-edit/${row.original.id}`} className="action-icon">
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
    Header: "Invoice",
    accessor: "id",
    sort: true,
    // Cell: NameColumn,
  },
  {
    Header: "Patient",
    accessor: "name",
    sort: true,
  },
  {
    Header: "Bill Date",
    accessor: "created_on",
    sort: true,
    // Cell: RatingsColumn,
  },
  {
    Header: "Item",
    accessor: "products",
    sort: true,
  },
  {
    Header: "Amount",
    accessor: "revenue",
    sort: true,
  },
  {
    Header: "Payment",
    accessor: "balance",
    sort: true,
  },
  {
    Header: "Action",
    accessor: "action",
    sort: false,
    Cell: ActionColumn,
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
    value: sellers.length,
  },
];

// main component
const Sellers = () => {
  return (
    <>
      {/* <PageTitle
        breadCrumbItems={[
          // { label: "Ecommerce", path: "/apps/ecommerce/sellers" },
          // { label: "Sellers", path: "/apps/ecommerce/sellers", active: true },
        ]}
        title={"Seles"}
      /> */}

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Body>
              <Row>
                <Col sm={4}>
                  {/* <Button variant="danger" className="mb-2">
                    <i className="mdi mdi-plus-circle me-2"></i> New Sell
                  </Button> */}
                   <Link
                      to="/new-sales"
                      className="btn btn-danger waves-effect waves-light"
                    >
                      <i className="mdi mdi-plus-circle me-1"></i> Add New Sell
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
                data={sellers}
                pageSize={10}
                sizePerPageList={sizePerPageList}
                isSortable={true}
                pagination={true}
                isSelectable={true}
                isSearchable={true}
                theadClass="table-light"
                searchBoxClass="mt-2 mb-3"
                isSalePage={true} // Pass this prop to modify the select dropdown
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Sellers;
