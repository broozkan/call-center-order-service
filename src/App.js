import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  useLocation
} from 'react-router-dom'
import LoginView from "./views/User/LoginView";
import DashboardView from "./views/App/DashboardView";
import { urls } from "./lib/urls";
import OfficeListView from "./views/App/Office/OfficeListView";
import NewOfficeView from "./views/App/Office/NewOfficeView";
import UpdateOfficeView from "./views/App/Office/UpdateOfficeView";
import Breadcrumb from "./components/Breadcrumb/Breadcrumb";
import { Component } from "react";
import EmployeeListView from "./views/App/Employee/EmployeeListView";
import NewEmployeeView from "./views/App/Employee/NewEmployeeView";
import UpdateEmployeeView from "./views/App/Employee/UpdateEmployeeView";
import CustomerListView from "./views/App/Customer/CustomerListView";
import NewCustomerView from "./views/App/Customer/NewCustomerView";
import UpdateCustomerView from "./views/App/Customer/UpdateCustomerView";
import ProductListView from "./views/App/Product/ProductListView";
import NewProductView from "./views/App/Product/NewProductView";
import UpdateProductView from "./views/App/Product/UpdateProductView";
import OrderListView from "./views/App/Order/OrderListView";
import NewOrderView from "./views/App/Order/NewOrderView";
import UpdateOrderView from "./views/App/Order/UpdateOrderView";
import ReservationListView from "./views/App/Reservation/ReservationListView";
import NewReservationView from "./views/App/Reservation/NewReservationView";
import UpdateReservationView from "./views/App/Reservation/UpdateReservationView";
import { ContextAuthWrapper } from "./contexts/ContextAuth";
import LiveOrderView from "./views/App/Order/LiveOrderView";
import ChatView from "./views/App/Chat/ChatView";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path={urls.LOGIN_VIEW} exact component={LoginView}></Route>
            <Route path={urls.LIVE_ORDER_VIEW} exact component={LiveOrderView}></Route>
            <Route path={urls.CHAT_VIEW} exact component={ChatView}></Route>
            <div className="main-wrapper">
              <ContextAuthWrapper>
                <Header />
                <Sidebar />
                <div className="page-wrapper" style={{ minHeight: '754px' }}>
                  <div className="content container-fluid">
                    <Route path={urls.DASHBOARD_VIEW} exact component={DashboardView}></Route>

                    <Route path={urls.OFFICE_LIST_VIEW} exact component={OfficeListView}></Route>
                    <Route path={urls.NEW_OFFICE_VIEW} exact component={NewOfficeView}></Route>
                    <Route path={`${urls.UPDATE_OFFICE_VIEW}/:officeId`} exact component={UpdateOfficeView}></Route>

                    <Route path={urls.EMPLOYEE_LIST_VIEW} exact component={EmployeeListView}></Route>
                    <Route path={urls.NEW_EMPLOYEE_VIEW} exact component={NewEmployeeView}></Route>
                    <Route path={`${urls.UPDATE_EMPLOYEE_VIEW}/:employeeId`} exact component={UpdateEmployeeView}></Route>

                    <Route path={urls.CUSTOMER_LIST_VIEW} exact component={CustomerListView}></Route>
                    <Route path={urls.NEW_CUSTOMER_VIEW} exact component={NewCustomerView}></Route>
                    <Route path={`${urls.UPDATE_CUSTOMER_VIEW}/:customerId`} exact component={UpdateCustomerView}></Route>


                    <Route path={urls.PRODUCT_LIST_VIEW} exact component={ProductListView}></Route>
                    <Route path={urls.NEW_PRODUCT_VIEW} exact component={NewProductView}></Route>
                    <Route path={`${urls.UPDATE_PRODUCT_VIEW}/:productId`} exact component={UpdateProductView}></Route>

                    <Route path={urls.ORDER_LIST_VIEW} exact component={OrderListView}></Route>
                    <Route path={urls.NEW_ORDER_VIEW} exact component={NewOrderView}></Route>
                    <Route path={`${urls.UPDATE_ORDER_VIEW}/:orderId`} exact component={UpdateOrderView}></Route>

                    <Route path={urls.RESERVATION_LIST_VIEW} exact component={ReservationListView}></Route>
                    <Route path={urls.NEW_RESERVATION_VIEW} exact component={NewReservationView}></Route>
                    <Route path={`${urls.UPDATE_RESERVATION_VIEW}/:reservationId`} exact component={UpdateReservationView}></Route>
                  </div>
                </div>

              </ContextAuthWrapper>

            </div>
          </Switch>
        </Router>
      </div>
    )
  }

}

export default App;
