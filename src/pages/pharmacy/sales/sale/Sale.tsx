import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import classNames from "classnames";

// components
import Table from "../../../../components/Table";

// dummy data

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchPatientRequest, fetchSalesRequest } from "../../../../redux/DataFetch/actions";


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
      <Link to={`/sales-edit/${row.original.invoice_id}`} className="action-icon">
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


// main component
const Sellers = () => {
  const dispatch = useDispatch();
  const [salesWithPatientNames, setSalesWithPatientNames] = useState<any[]>([]);

  const patients = useSelector((state: RootState) => state.patient.data);
  const sallers = useSelector((state: RootState) => state.sales.data);
  console.log('patients data-',patients);
  console.log('sallers data-',sallers);
  useEffect(()=>{
    dispatch(fetchPatientRequest())
    dispatch(fetchSalesRequest());
  },[dispatch])

  useEffect(()=>{
   const updateSales = sallers.map((saller: {customer_id: string})=>{
      const patient = patients.find((item: { patient_id: any; })=> item.patient_id === saller.customer_id);
      return {
        ...saller,
        patientName: patient ? patient.name : 'N/A'
      }
    })
    setSalesWithPatientNames(updateSales);
  },[sallers, patients])

  
// get all columns
const columns = [
  {
    Header: "Invoice",
    accessor: "invoice_id",
    sort: true,
    // Cell: NameColumn,
  },
  {
    Header: "Patient",
    accessor: "patientName",
    sort: true,
  },
  {
    Header: "Bill Date",
    accessor: "bill_date",
    sort: true,
    // Cell: RatingsColumn,
  },
  {
    Header: "Item",
    accessor: "items",
    sort: true,
  },
  {
    Header: "Amount",
    accessor: "amount",
    sort: true,
  },
  {
    Header: "Payment",
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
    value: salesWithPatientNames.length,
  },
];
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
                data={salesWithPatientNames}
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
