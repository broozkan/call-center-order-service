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
import CustomerResultView from "./views/App/Customer/CustomerResultView";
import CategoryListView from "./views/App/Category/CategoryListView";
import NewCategoryView from "./views/App/Category/NewCategoryView";
import UpdateCategoryView from "./views/App/Category/UpdateCategoryView";
import PaymentMethodListView from "./views/App/PaymentMethod/PaymentMethodListView";
import NewPaymentMethodView from "./views/App/PaymentMethod/NewPaymentMethodView";
import UpdatePaymentMethodView from "./views/App/PaymentMethod/UpdatePaymentMethodView";
import OfficeMenuView from "./views/App/Office/OfficeMenuView";
import UserListView from "./views/App/User/UserListView";
import NewUserView from "./views/App/User/NewUserView";
import UpdateUserView from "./views/App/User/UpdateUserView";


class App extends Component {

  constructor() {
    super()
    this.state = {
      mobile_menu_class_name: ''
    }

    this.handleOnClickToggleMobileMenu = this.handleOnClickToggleMobileMenu.bind(this)
  }


  handleOnClickToggleMobileMenu() {
    if (this.state.mobile_menu_class_name == 'slide-nav') {
      this.setState({
        mobile_menu_class_name: ''
      })
    } else {
      this.setState({
        mobile_menu_class_name: 'slide-nav'
      })
    }
  }

  render() {


    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path={urls.LOGIN_VIEW} exact component={LoginView}></Route>
            <Route path={'/'} exact component={LoginView}></Route>

            <div className={`main-wrapper ${this.state.mobile_menu_class_name}`}>
              <ContextAuthWrapper>
                <Route path={`${urls.LIVE_ORDER_VIEW}/:orderState?`} exact component={LiveOrderView}></Route>
                <Route path={`${urls.OFFICE_MENU_VIEW}/:availabilityState?`} exact component={OfficeMenuView}></Route>
                <Route path={`${urls.CHAT_VIEW}/:aside/:chatId?`} exact component={ChatView}></Route>
                <Route path={urls.DASHBOARD_VIEW} exact component={DashboardView}></Route>

                <Route path={urls.OFFICE_LIST_VIEW} exact component={OfficeListView}></Route>
                <Route path={urls.NEW_OFFICE_VIEW} exact component={NewOfficeView}></Route>
                <Route path={`${urls.UPDATE_OFFICE_VIEW}/:officeId`} exact component={UpdateOfficeView}></Route>

                <Route path={urls.CATEGORY_LIST_VIEW} exact component={CategoryListView}></Route>
                <Route path={urls.NEW_CATEGORY_VIEW} exact component={NewCategoryView}></Route>
                <Route path={`${urls.UPDATE_CATEGORY_VIEW}/:categoryId`} exact component={UpdateCategoryView}></Route>

                <Route path={urls.PAYMENT_METHOD_LIST_VIEW} exact component={PaymentMethodListView}></Route>
                <Route path={urls.NEW_PAYMENT_METHOD_VIEW} exact component={NewPaymentMethodView}></Route>
                <Route path={`${urls.UPDATE_PAYMENT_METHOD_VIEW}/:paymentMethodId`} exact component={UpdatePaymentMethodView}></Route>

                <Route path={urls.EMPLOYEE_LIST_VIEW} exact component={EmployeeListView}></Route>
                <Route path={urls.NEW_EMPLOYEE_VIEW} exact component={NewEmployeeView}></Route>
                <Route path={`${urls.UPDATE_EMPLOYEE_VIEW}/:employeeId`} exact component={UpdateEmployeeView}></Route>

                <Route path={urls.USER_LIST_VIEW} exact component={UserListView}></Route>
                <Route path={urls.NEW_USER_VIEW} exact component={NewUserView}></Route>
                <Route path={`${urls.UPDATE_USER_VIEW}/:userId`} exact component={UpdateUserView}></Route>

                <Route path={`${urls.CUSTOMER_RESULT_VIEW}/:customerId?`} exact component={CustomerResultView}></Route>
                <Route path={urls.CUSTOMER_LIST_VIEW} exact component={CustomerListView}></Route>
                <Route path={`${urls.NEW_CUSTOMER_VIEW}/:customerPhoneNumber?`} exact component={NewCustomerView}></Route>
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


              </ContextAuthWrapper>

            </div>

          </Switch>
        </Router>
      </div>
    )
  }

}

export default App;
