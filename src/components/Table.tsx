import React, { useRef, useEffect, forwardRef, useState } from "react";
import { Row, Col, Card, Form } from "react-bootstrap";
import Select, { components } from "react-select";

import {
  useTable,
  useSortBy,
  usePagination,
  useRowSelect,
  useGlobalFilter,
  useAsyncDebounce,
  useExpanded,
} from "react-table";
import classNames from "classnames";
import Rupeeicon from '../assets/icon/rupee.svg'
import CashIcon from '../assets/icon/cash.svg'
import Craditicon from '../assets/icon/cradit.svg'
import UpiIcon from '../assets/icon/bhimUpi.png'
// components
import Pagination from "./Pagination";
import { useNavigate, useLocation } from "react-router-dom";


interface GlobalFilterProps {
  preGlobalFilteredRows: any;
  globalFilter: any;
  setGlobalFilter: any;
  searchBoxClass: any;
  isSalePage?: boolean; // Add this prop
  isPurchasePage?: boolean;
  isPurchaseReturnPage?: boolean;
  // isViewPage?: boolean;
}

// Define a default UI for filtering
const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  searchBoxClass,
  isSalePage, // Add this prop
  isPurchasePage,
  isPurchaseReturnPage,
  // isViewPage,
}: GlobalFilterProps) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState<any>(globalFilter);
  const [paymentMode, setPaymentMode] = useState<any>(globalFilter);
  const [durationMode, setDurationMode] = useState<any>(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  console.log('globalFilter-',globalFilter);
  

  // Custom Option component to render payment icons
  const CustomOption = (props: any) => {
    return (
      <components.Option {...props}>
        <img
          src={props.data.icon} // Use icon from options or a default icon
          style={{ width: 15, marginRight: 20, marginLeft: 15 }}
          alt={props.data.label}
        />
        {props.data.label}
      </components.Option>
    );
  };
  

  const PaymentMode = [
    {
      label: "Payment Mode",
      options: [
        { value: '', label: 'All', icon: Rupeeicon },
        { value: "cash", label: "Cash", icon: CashIcon },
        { value: "cresit", label: "Credit", icon: Craditicon },
        { value: "upi", label: "UPI", icon: UpiIcon },
      ],
    },
  ];

  const Duration = [
    {
      // label: "Duration",
      options: [
        { value: "", label: "All" },
        { value: "today", label: "Today" },
        { value: "yesterday", label: "Yesterday" },
        { value: "last7Days", label: "Last 7 Days" },
        { value: "last30Days", label: "Last 30 Days" },
        { value: "last90Days", label: "Last 90 Days" },
        { value: "cuuresntFiscalYear", label: "Current Fiscal Year" },
        { value: "previousFiscalYear", label: "Previous Fiscal Year" },
        { value: "customRange", label: "Custom Range" }
      ]
    }
  ];

  const admin = [
    {
      label: "Admin",
      options: [
        { value: "", label: "All" },
        { value: "admin", label: "Admin" },
      ]
    }
  ]

  ///++++++++++++++++ show the table data based on duration wise++++++++++++++ ///
  const handleDurationChange = (selectedOption: any) => {
    const today = new Date();
    let filterValue;
  
    switch (selectedOption.value) {
      case "today":
        filterValue = today.toISOString().slice(0, 10); // Today's date in YYYY-MM-DD format
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        filterValue = yesterday.toISOString().slice(0, 10);
        break;
      case "last7Days":
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);
        filterValue = {
          start: last7Days.toISOString().slice(0, 10),
          end: today.toISOString().slice(0, 10),
        };
        break;
      case "last30Days":
        const last30Days = new Date(today);
        last30Days.setDate(today.getDate() - 30);
        filterValue = {
          start: last30Days.toISOString().slice(0, 10),
          end: today.toISOString().slice(0, 10),
        };
        break;
      case "last90Days":
        const last90Days = new Date(today);
        last90Days.setDate(today.getDate() - 90);
        filterValue = {
          start: last90Days.toISOString().slice(0, 10),
          end: today.toISOString().slice(0, 10),
        };
        break;
      case "cuuresntFiscalYear": // Assuming fiscal year starts from April 1st
        const currentYear = today.getFullYear();
        const fiscalYearStart = new Date(currentYear, 3, 1);
        filterValue = {
          start: fiscalYearStart.toISOString().slice(0, 10),
          end: today.toISOString().slice(0, 10),
        };
        break;
      case "previousFiscalYear":
        const previousFiscalYearStart = new Date(today.getFullYear() - 1, 3, 1);
        const previousFiscalYearEnd = new Date(today.getFullYear(), 2, 31);
        filterValue = {
          start: previousFiscalYearStart.toISOString().slice(0, 10),
          end: previousFiscalYearEnd.toISOString().slice(0, 10),
        };
        break;
      case "customRange":
        // Handle custom range selection logic here
        break;
      default:
        filterValue = undefined;
    }
    setDurationMode(filterValue);
    setGlobalFilter(filterValue); // Update the global filter with the calculated value
  };///++++++++++++++++ end show table data based on duration wise++++++++++++++ ///
  
  return (
    <div className={classNames('d-flex justify-content-between', searchBoxClass)}>
      <span className="d-flex align-items-center">
        Search :{" "}
        <input
          type="search"
          value={value || ""}
          onChange={(e: any) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          className="form-control w-auto ms-1"
        />
      </span>
      {isSalePage && (
        <>
          <Form.Group className=" w-25">
            <Select
              className="react-select my-1 react-select-container"
              classNamePrefix="react-select"
              options={Duration}
              // onChange={(selectedOption: any) => {
              //   setPaymentMode(selectedOption.value);
              //   onChange(selectedOption.value);
              // }}
              placeholder="Select Duration"
              id="duration"
            />
          </Form.Group>

          <Form.Group className=" w-25">
            <Select
              className="react-select my-1 react-select-container"
              classNamePrefix="react-select"
              options={PaymentMode}
              onChange={(selectedOption: any) => {
                setPaymentMode(selectedOption.value);
                onChange(selectedOption.value);
              }}
              components={{ Option: CustomOption }}
              placeholder="Payment Mode"
              id="Payment Mode"
            />
          </Form.Group>
        </>
      )}

      {!isSalePage && (
        <>
          <Form.Group className=" w-25">
            <Select
              className="react-select my-1 react-select-container"
              classNamePrefix="react-select"
              options={Duration}
              onChange={handleDurationChange}
              placeholder="Return Date Duration"
              id="return-duration"
            />
          </Form.Group>
          {!isPurchaseReturnPage && (
            <Form.Group className=" w-25">
            <Select
              className="react-select my-1 react-select-container"
              classNamePrefix="react-select"
              options={admin}
              // onChange={(selectedOption: any) => {
              //   setPaymentMode(selectedOption.value);
              //   onChange(selectedOption.value);
              // }}
              placeholder="Select Staff"
              id="admin"
            />
          </Form.Group>
          )}
        </>
      )}

      {isPurchaseReturnPage && !isSalePage && (
        <>
          <Form.Group className=" w-25">
            <Select
              className="react-select my-1 react-select-container"
              classNamePrefix="react-select"
              options={PaymentMode}
              onChange={(selectedOption: any) => {
                setPaymentMode(selectedOption.value);
                onChange(selectedOption.value);
              }}
              components={{ Option: CustomOption }}
              placeholder="Payment Mode"
              id="Payment Mode"
            />
          </Form.Group>
          <Form.Group className="" style={{width:'150px'}}>
            <Select
              className="react-select my-1 react-select-container"
              classNamePrefix="react-select"
              options={admin}
              // onChange={(selectedOption: any) => {
              //   setPaymentMode(selectedOption.value);
              //   onChange(selectedOption.value);
              // }}
              placeholder="Select Staff"
              id="admin"
            />
          </Form.Group>
        </>
      )}
    </div>
  );
};

interface IndeterminateCheckboxProps {
  indeterminate: any;
  children?: React.ReactNode;
}

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef: any = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          ref={resolvedRef}
          {...rest}
        />
        <label htmlFor="form-check-input" className="form-check-label"></label>
      </div>
    </>
  );
});

interface TableProps {
  isSearchable?: boolean;
  isSortable?: boolean;
  pagination?: boolean;
  isSelectable?: boolean;
  isExpandable?: boolean;
  sizePerPageList?: {
    text: string;
    value: number;
  }[];
  columns: {
    Header: string;
    accessor: string;
    sort?: boolean;
    Cell?: any;
    className?: string;
  }[];
  data: any[];
  pageSize?: any;
  searchBoxClass?: string;
  tableClass?: string;
  theadClass?: string;
  isSalePage?: boolean; // Add this prop
  isPurchasePage?: boolean;
  isPurchaseReturnPage?: boolean;
  isPurchaseViewTable?: boolean;
  isPurchaseReturnViewTable?: boolean;
}

const Table = (props: TableProps) => {
  const isSearchable = props["isSearchable"] || false;
  const isSortable = props["isSortable"] || false;
  const pagination = props["pagination"] || false;
  const isSelectable = props["isSelectable"] || false;
  const isExpandable = props["isExpandable"] || false;
  const sizePerPageList = props["sizePerPageList"] || [];
  const isSalePage = props["isSalePage"] || false;
  const isPurchasePage = props["isPurchasePage"] || false;
  const isPurchaseReturnPage = props["isPurchaseReturnPage"] || false;
  const isPurchaseViewTable = props["isPurchaseViewTable"] || false;
  const isPurchaseReturnViewTable = props["isPurchaseReturnViewTable"] || false;

  const navigate = useNavigate();
  const location = useLocation();

  let otherProps: any = {};

  if (isSearchable) {
    otherProps["useGlobalFilter"] = useGlobalFilter;
  }
  if (isSortable) {
    otherProps["useSortBy"] = useSortBy;
  }
  if (isExpandable) {
    otherProps["useExpanded"] = useExpanded;
  }
  if (pagination) {
    otherProps["usePagination"] = usePagination;
  }
  if (isSelectable) {
    otherProps["useRowSelect"] = useRowSelect;
  }

  const dataTable = useTable(
    {
      columns: props["columns"],
      data: props["data"],
      initialState: { pageSize: props["pageSize"] || 10 },
    },
    otherProps.hasOwnProperty("useGlobalFilter") &&
    otherProps["useGlobalFilter"],
    otherProps.hasOwnProperty("useSortBy") && otherProps["useSortBy"],
    otherProps.hasOwnProperty("useExpanded") && otherProps["useExpanded"],
    otherProps.hasOwnProperty("usePagination") && otherProps["usePagination"],
    otherProps.hasOwnProperty("useRowSelect") && otherProps["useRowSelect"],
    (hooks) => {
      isSelectable &&
        hooks.visibleColumns.push((columns: any) => [
          // Let's make a column for selection
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }: any) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }: any) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);

      isExpandable &&
        hooks.visibleColumns.push((columns: any) => [
          // Let's make a column for selection
          {
            // Build our expander column
            id: "expander", // Make sure it has an ID
            Header: ({
              getToggleAllRowsExpandedProps,
              isAllRowsExpanded,
            }: any) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? "-" : "+"}
              </span>
            ),
            Cell: ({ row }) =>
              // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
              // to build the toggle for expanding a row
              row.canExpand ? (
                <span
                  {...row.getToggleRowExpandedProps({
                    style: {
                      // We can even use the row.depth property
                      // and paddingLeft to indicate the depth
                      // of the row
                      paddingLeft: `${row.depth * 2}rem`,
                    },
                  })}
                >
                  {row.isExpanded ? "-" : "+"}
                </span>
              ) : null,
          },
          ...columns,
        ]);
    }
  );

  let rows = pagination ? dataTable.page : dataTable.rows;

  //++++++++++ view table row data +++++++++++++//
  const ViewData = (row: any) => {
    const billId = row.original.bill_id;

    let basePath='';
    
     if(location.pathname.includes("purchase-return")){
      basePath= 'purchase-return'
    }else if(location.pathname.includes("purchase")){
      basePath= 'purchase'
     }
  if (billId) {
    navigate(`/${basePath}/View/:${billId}`);
  } else {
    console.error("billId is undefined for the row:", row);
  }
  }; //++++++++++ end view table row data +++++++++++++//

  return (
    <>
      {isSearchable && (
        <GlobalFilter
          preGlobalFilteredRows={dataTable.preGlobalFilteredRows}
          globalFilter={dataTable.state.globalFilter}
          setGlobalFilter={dataTable.setGlobalFilter}
          searchBoxClass={props["searchBoxClass"]}
          isSalePage={isSalePage} // Pass this prop to GlobalFilter
          isPurchasePage={isPurchasePage}
          isPurchaseReturnPage={isPurchaseReturnPage}
        />
      )}

      <div className="table-responsive">
        <table
          {...dataTable.getTableProps()}
          className={classNames(
            "table table-centered react-table",
            props["tableClass"]
          )}
        >
          <thead className={props["theadClass"]}>
            {(dataTable.headerGroups || []).map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {(headerGroup.headers || []).map((column: any) => (
                  <th
                    {...column.getHeaderProps(
                      column.sort && column.getSortByToggleProps()
                    )}
                    className={classNames({
                      sorting_desc: column.isSortedDesc === true,
                      sorting_asc: column.isSortedDesc === false,
                      sortable: column.sort === true,
                    })}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...dataTable.getTableBodyProps()}>
            {(rows || []).map((row: any, i: number) => {
              dataTable.prepareRow(row);
              // console.log(row);
              
              return (
                <tr {...row.getRowProps()} className={isPurchaseViewTable || isPurchaseReturnViewTable ? " customViewTableRow" : 'CustomTableRow'}>
                  {(row.cells || []).map((cell: any) => {
                    return (
                      <td
                        {...cell.getCellProps([
                          {
                            className: cell.column.className,
                          },
                        ])}
                        onClick={isPurchaseViewTable || isPurchaseReturnViewTable || cell.column.Header === "Action" ? undefined : () => ViewData(row)}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination tableProps={dataTable} sizePerPageList={sizePerPageList} />
      )}
    </>
  );
};

export default Table;
