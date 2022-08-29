/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, useLocation, useParams } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'containers/Login/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { Box, Grid, Container } from '@mui/material';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core';
import UserRegister from '../UserRegister';
import Dashboard from '../Dashboard';
import DashboardStore from '../DashboardStore';
import DetailStore from '../DetailStore';
import DetailCustomer from '../DetailCustomer';
import DashboardReport from '../DashboardReport';
import SellerRegister from '../SellerRegister';
import DashboardRegister from '../DashboardRegister';
import DashboardCustomer from '../DashboardCustomer';
import DetailRegister from '../DetailRegister';
import SellerHomePage from '../SellerHomePage';
import SellerManagerProduct from '../SellerManagerProduct';
import SellerAddProduct from '../SellerAddProduct';
import SellerActionProduct from '../SellerActionProduct';
import UserHomePage from '../UserHomePage';
import FoodDetail from '../FoodDetail';
import UserSetting from '../UserSetting';
import SellerManagerOrder from '../SellerManagerOrder';
import SellerOrderDetail from '../SellerOrderDetail';
import UserOrderHistory from '../UserOrderHistory';
import UserChangePassword from '../UserChangePassword';
import UserDetailOrder from '../UserDetailOrder';
import UserAddress from '../UserAddress';
import EmailVerifiedSuccess from '../EmailVerifiedSuccess';
import ForgetPassword from '../ForgetPassword';
import UserRatingComment from '../UserRatingComment';
import SellerTurnover from '../SellerTurnover';
import Payment from '../Payment';
import SellerSetting from '../SellerSetting';
import UserForgetPassword from '../UserForgetPassword';
import UserResetPassword from '../UserResetPassword';
import Cart from '../Cart';
import GlobalStyle from '../../global-styles';
import SideBar from '../../components/SideBar';
import SellerSideBar from '../../components/SellerSideBar';
import Detailreport from '../../containers/DetailReport';
import StoreProfile from '../../containers/StoreProfile';
import SellerVoucher from '../../containers/SellerVoucher';
import UserVoucher from '../../containers/UserVoucher';
import UserReport from '../../containers/UserReport';
import UserDetailReport from '../../containers/UserDetailReport';
import SellerReport from '../../containers/SellerReport';
import SellerDetailReport from '../../containers/SellerDetailReport';
import Footerr from '../../containers/Footerr';
import { getUser } from '../../utils/common';
import Headerr from '../Headerr';

const useStyles = makeStyles(theme => ({
  down: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      marginTop: '100px',
      marginLeft: '30px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '100%',
      marginTop: '100px',
      marginLeft: '250px',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginTop: '100px',
      width: '100%',
      marginLeft: '250px',
    },
  },
  down1: {
    [theme.breakpoints.up('xs')]: {
      width: '100%',
      marginTop: '100px',
      marginLeft: '30px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '100%',
      marginTop: '100px',
      marginLeft: '270px',
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      marginTop: '100px',
      width: '100%',
      marginLeft: '270px',
    },
  },
  down2: {
    width: '100%',
  },
}));

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  font-family: sans-serif;
  overflow-y: hidden;
`;

export default function App() {
  const location = useLocation();
  // let { storeId } = useParams();
  const classes = useStyles();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const user = getUser();
  return (
    <StylesProvider injectFirst>
      <AppWrapper>
        <Helmet titleTemplate="%s - No Nê" defaultTitle="No Nê">
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        {/* <Header /> */}

        {/* {location.pathname != "/login" && location.pathname != "/userRegister" && location.pathname != "/sellerRegister" && location.pathname != "/" && location.pathname != "/myStore"
           && location.pathname != "/managerProduct" && location.pathname != "/managerProduct/addProduct" && user.authorities[0].authority == 'ADMIN' ? */}
        {user != null && user.authorities[0].authority == 'ADMIN' ? (
          <Grid container spacing={0}>
            <Grid item sm={12} xs={12} md={2} >
              <SideBar />
            </Grid>
            <div className={classes.down} >
              <Grid item sm={12} xs={12} md={12}>
                {/* <DashboardHeader /> */}
                <Switch>
                  {/* <Route exact path="/" component={HomePage} /> */}
                  {/* <Route path="/features" component={FeaturePage} />
                   <Route path="/login" component={Login} /> */}
                  <Route path="/userRegister" component={UserRegister} />
                  <Route path="/sellerRegister" component={SellerRegister} />
                  <Route path="/dashboard" component={Dashboard} />
                  <Route exact path="/register" component={DashboardRegister} />
                  <Route path="/register/:id" component={DetailRegister} />
                  <Route exact path="/customer" component={DashboardCustomer} />
                  <Route exact path="/report" component={DashboardReport} />
                  <Route path="/report/:id" component={Detailreport} />
                  <Route path="/customer/:id" component={DetailCustomer} />
                  <Route exact path="/store" component={DashboardStore} />
                  <Route path="/store/:id" component={DetailStore} />

                  <Route path="" component={NotFoundPage} />
                </Switch>

              </Grid>
            </div>
          </Grid>
        ) : // : location.pathname == "/myStore" || location.pathname == "/managerProduct" || location.pathname == "/managerProduct/addProduct" && user.authorities[0].authority == 'USER' ?
          // :
          // user != null && user.authorities[0].authority == 'USER' && location.pathname == "/" || location.pathname.indexOf("/food/") == 0 || user != null && user.authorities[0].authority == 'SELLER' && location.pathname == "/" || location.pathname.indexOf("/food/") == 0 ?
          //   <Grid container spacing={1}>
          //     <Grid item sm={12} xs={12} md={12}>
          //       <Switch>
          //         <Route exact path="/" component={UserHomePage} />
          //         <Route path="/food/:id" component={FoodDetail} />
          //         <Route path="/sellerRegister" component={SellerRegister} />
          //         <Route path="" component={NotFoundPage} />
          //       </Switch>
          //     </Grid>
          //   </Grid>
          //

          user != null &&
            user.authorities[0].authority == 'SELLER' &&
            location.pathname.indexOf('/my-store/') == 0 ? (
            <Grid container spacing={1}>
              <Grid item sm={12} xs={12} md={2} lg={2}>
                <SellerSideBar />
              </Grid>
              <div className={classes.down1}>
                <Grid item sm={12} xs={12} md={12} lg={12}>
                  <Switch>
                    {/* <Route exact path="/" component={HomePage} /> */}
                    <Route
                      exact
                      path="/my-store/manager-order"
                      component={SellerManagerOrder}
                    />
                    <Route
                      exact
                      path="/my-store/manager-product"
                      component={SellerManagerProduct}
                    />
                    <Route
                      path="/my-store/manager-product/addProduct"
                      component={SellerAddProduct}
                    />
                    <Route
                      path="/my-store/manager-product/:id"
                      component={SellerActionProduct}
                    />
                    <Route path="/my-store/manager-order/:id" component={SellerOrderDetail} />
                    <Route path="/my-store/turnover" component={SellerTurnover} />
                    <Route path="/my-store/setting" component={SellerSetting} />
                    <Route path="/my-store/voucher" component={SellerVoucher} />
                    <Route exact path="/my-store/report" component={SellerReport} />
                    <Route path="/my-store/report/:id" component={SellerDetailReport} />
                    {/* <Route path="/sellerRegister" component={SellerRegister} /> */}
                    <Route path="" component={NotFoundPage} />
                  </Switch>

                </Grid>
              </div>
            </Grid>
          ) : (user != null &&
            user.authorities[0].authority != 'USER' &&
            location.pathname.indexOf('/user/') == 0) ||
            (user != null &&
              user.authorities[0].authority != 'SELLER' &&
              location.pathname.indexOf('/user/') == 0) ? (
            <>
              <div style={{ backgroundColor: "#F3F7F8", paddingBottom: "20px", height: "100%" }}>
                <Headerr />
                <Container fixed>
                  <Grid container spacing={0} style={{ marginTop: '15px' }}>
                    <Grid item sm={12} xs={12} md={3} style={{ padding: '0 10px' }}>
                      <SellerHomePage />
                    </Grid>

                    <Grid item sm={12} xs={12} md={9} style={{ padding: '10px', backgroundColor: '#fff', marginTop: "15px", height: "fit-content" }}>
                      <Switch>
                        <Route path="/user/setting" component={UserSetting} />
                        <Route exact path="/user/order-history" component={UserOrderHistory} />
                        <Route exact path="/user/order-history/:id" component={UserDetailOrder} />
                        <Route path="/user/change-password" component={UserChangePassword} />
                        <Route path="/user/address" component={UserAddress} />
                        <Route path="/user/rating-comment/:id" component={UserRatingComment} />
                        <Route path="/user/voucher" component={UserVoucher} />
                        <Route exact path="/user/report" component={UserReport} />
                        <Route path="/user/detail-report/:id" component={UserDetailReport} />
                        <Route path="" component={NotFoundPage} />
                      </Switch>

                    </Grid>
                  </Grid>
                </Container>

              </div>
              <Footerr />
            </>
          ) : (user != null && user.authorities[0].authority != 'USER') ||
            (user != null && user.authorities[0].authority != 'SELLER') ? (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Switch>
                  <Route exact path="/" component={UserHomePage} />
                  <Route path="/payment" component={Payment} />
                  <Route path="/sellerRegister" component={SellerRegister} />
                  <Route path="/food/:id" component={FoodDetail} />
                  <Route path="/cart" component={Cart} />
                  <Route path="/store-profile" component={StoreProfile} />
                  <Route path="" component={NotFoundPage} />
                </Switch>

              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Switch>
                  <Route exact path="/" component={UserHomePage} />
                  {/* <Route path="/features" component={FeaturePage} /> */}
                  <Route path="/login" component={Login} />
                  <Route path="/forget-password" component={UserForgetPassword} />
                  <Route path="/userRegister" component={UserRegister} />
                  <Route path="/sellerRegister" component={SellerRegister} />
                  <Route path="/reset-password" component={UserResetPassword} />
                  <Route path="/store-profile" component={StoreProfile} />
                  <Route path="/food/:id" component={FoodDetail} />
                  <Route path="/email/verify" component={EmailVerifiedSuccess} />
                  <Route path="/forget-password" component={ForgetPassword} />
                  <Route path="" component={NotFoundPage} />
                </Switch>

              </Grid>

            </Grid>
          )}

        {/* <Footer /> */}
        <GlobalStyle />
      </AppWrapper>
    </StylesProvider>
  );
}
