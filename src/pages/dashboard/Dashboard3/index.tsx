import React from "react";
import { Row, Col } from "react-bootstrap";

// components
import PageTitle from "../../../components/PageTitle";
import Messages from "../../../components/Messages";
import TodoList from "../../../components/TodoList";
import ChatList from "../../../components/ChatList";



import SalesChart from "../../../components/SalesChart";
import IncomeChart from "../../../components/IncomeChart";
import UsersChart from "../../../components/UsersChart";




import Statistics from "./Statistics";
import PerformanceChart from "./PerformanceChart";
import RevenueChart from "./RevenueChart";
import RevenueChartCircle from "./RevenueChartCircle";
import UsersBalances from "./UsersBalances";
import RevenueHistory from "./RevenueHistory";
import RevenueChart2 from "./RevenueChart2";
import TopSellingProducts from "./TopSellingProducts";

import SalesChart2 from "./SalesChart";
import StatisticsChart from "./StatisticsChart";
import IncomeChart2 from "./IncomeChart";

import ProjectsDetails from "./ProjectsDetails";

// dummy data
import { chatMessages } from "./data";
import { balances, revenueHistory } from "./data1";
import { products} from "./data2";
import { projectsDetails } from "./data4";


const Dashboard3 = () => {
  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Dashboards", path: "/dashboard-3" },
          { label: "Dashboard 3", path: "/dashboard-3", active: true },
        ]}
        title={"Dashboard 3"}
      />

      <Statistics />

      <Row>
        <Col xl={6}>
          <RevenueChart />
        </Col>
        <Col xl={6}>
          <PerformanceChart />
        </Col>
      </Row>
      <Row>
        <Col lg={6} xl={4}>
          <Messages />
        </Col>
        <Col lg={6} xl={4}>
          <TodoList addTodo={true} height={"310px"} />
        </Col>
        <Col lg={12} xl={4}>
          <ChatList messages={chatMessages} />
        </Col>
        <Col lg={4}>
          <RevenueChartCircle />
        </Col>
      </Row>
      <Row>
        <Col xl={6}>
          <UsersBalances balances={balances} />
        </Col>
        <Col xl={6}>
          <RevenueHistory revenueHistory={revenueHistory} />
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={4}>
          <SalesChart />
        </Col>
        <Col md={6} xl={4}>
          <IncomeChart />
        </Col>
        <Col md={6} xl={4}>
          <UsersChart />
        </Col>
      </Row>

      <Row>
        <Col xl={4} md={6}>
          <SalesChart />
        </Col>
        <Col xl={4} md={6}>
          <StatisticsChart />
        </Col>
        <Col xl={4} md={12}>
          <IncomeChart />
        </Col>
      </Row>
      
      <Row>
        <Col xl={6}>
          <RevenueChart2 />
        </Col>
        <Col xl={6}>
          <TopSellingProducts products={products} />
        </Col>
      </Row>
      <Row>
        <Col>
          <ProjectsDetails projectsDetails={projectsDetails} />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard3;
