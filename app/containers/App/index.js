/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useCallback } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, useLocation, useParams } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Login from 'containers/Login/Loadable';
import UserRegister from '../UserRegister';
import Dashboard from '../../containers/Dashboard';
import DashboardStore from '../../containers/DashboardStore';
import DetailStore from '../../containers/DetailStore';
import DetailCustomer from '../../containers/DetailCustomer';
import SellerRegister from '../../containers/SellerRegister';
import DashboardRegister from '../../containers/DashboardRegister';
import DashboardCustomer from '../../containers/DashboardCustomer';
import DetailRegister from '../../containers/DetailRegister';
import SellerHomePage from '../../containers/SellerHomePage';
import SellerManagerProduct from '../../containers/SellerManagerProduct';
import SellerAddProduct from '../../containers/SellerAddProduct';
import SellerActionProduct from '../../containers/SellerActionProduct';
import UserHomePage from '../../containers/UserHomePage';
import FoodDetail from '../../containers/FoodDetail';
import UserSetting from '../../containers/UserSetting';
import SellerManagerOrder from '../../containers/SellerManagerOrder';
import SellerOrderDetail from '../../containers/SellerOrderDetail';
import UserOrderHistory from '../UserOrderHistory';
import UserChangePassword from '../../containers/UserChangePassword';
import UserDetailOrder from '../../containers/UserDetailOrder';
import UserAddress from '../../containers/UserAddress';
import EmailVerifiedSuccess from '../../containers/EmailVerifiedSuccess';
import ForgetPassword from '../../containers/ForgetPassword';
import UserRatingComment from '../../containers/UserRatingComment';
import SellerTurnover from '../../containers/SellerTurnover';
import Payment from '../../containers/Payment';
import SellerSetting from '../../containers/SellerSetting';
import UserForgetPassword from '../../containers/UserForgetPassword';
import UserResetPassword from '../../containers/UserResetPassword';

import Header from 'components/Header';
import Footer from 'components/Footer';
import {
  Box, Grid, Container
} from '@mui/material';

import GlobalStyle from '../../global-styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import SideBar from '../../components/SideBar';
import SellerSideBar from '../../components/SellerSideBar';
import { makeStyles } from '@material-ui/core';
import { StylesProvider } from "@material-ui/core/styles";
import { getUser } from '../../utils/common';
import Headerr from './../Headerr';


const useStyles = makeStyles((theme) => ({

  down: {
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      marginTop: "100px",
      marginLeft: "30px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
      marginTop: "100px",
      marginLeft: "250px",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      marginTop: "100px",
      width: "100%",
      marginLeft: "250px",
    },
  },
  down1: {
    [theme.breakpoints.up("xs")]: {
      width: "100%",
      marginTop: "100px",
      marginLeft: "30px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
      marginTop: "100px",
      marginLeft: "270px",
    },
    [theme.breakpoints.between("lg", "xl")]: {
      marginTop: "100px",
      width: "100%",
      marginLeft: "270px",
    },
  },
  down2: {
    width: "100%"
  }

}));

const AppWrapper = styled.div`
   margin: 0 auto;
   display: flex;
   min-height: 100%;
   flex-direction: column;
   font-family: sans-serif;
 `;

export default function App() {
  const location = useLocation();
  // let { storeId } = useParams();
  const classes = useStyles();

  const user = getUser();
  return (
    <StylesProvider injectFirst>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - No Nê"
          defaultTitle="No Nê"
        >
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        {/* <Header /> */}

        {/* {location.pathname != "/login" && location.pathname != "/userRegister" && location.pathname != "/sellerRegister" && location.pathname != "/" && location.pathname != "/myStore"
           && location.pathname != "/managerProduct" && location.pathname != "/managerProduct/addProduct" && user.authorities[0].authority == 'ADMIN' ? */}
        {user != null && user.authorities[0].authority == 'ADMIN' ?
          <Grid container spacing={2}>
            <Grid item sm={12} xs={12} md={2}>
              <SideBar />
            </Grid>
            <div className={classes.down}>
              <Grid item sm={12} xs={12} md={12} >
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
                  <Route path="/customer/:id" component={DetailCustomer} />
                  <Route exact path="/store" component={DashboardStore} />
                  <Route path="/store/:id" component={DetailStore} />
                  <Route path="" component={NotFoundPage} />

                </Switch>
              </Grid>
            </div>
          </Grid>
          // : location.pathname == "/myStore" || location.pathname == "/managerProduct" || location.pathname == "/managerProduct/addProduct" && user.authorities[0].authority == 'USER' ?
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

          : user != null && user.authorities[0].authority == 'SELLER' && location.pathname.indexOf("/my-store/") == 0 ?
            <Grid container spacing={1}>
              <Grid item sm={12} xs={12} md={2} lg={2}>
                <SellerSideBar />
              </Grid>
              <div className={classes.down1}>
                <Grid item sm={12} xs={12} md={12} lg={12}>
                  <Switch>
                    {/* <Route exact path="/" component={HomePage} /> */}
                    <Route exact path="/my-store/manager-order" component={SellerManagerOrder} />
                    <Route exact path="/my-store/manager-product" component={SellerManagerProduct} />
                    <Route path="/my-store/manager-product/addProduct" component={SellerAddProduct} />
                    <Route path="/my-store/manager-product/:id" component={SellerActionProduct} />
                    <Route path="/my-store/manager-order/:id" component={SellerOrderDetail} />
                    <Route path="/my-store/turnover" component={SellerTurnover} />
                    <Route path="/my-store/setting" component={SellerSetting} />
                    {/* <Route path="/sellerRegister" component={SellerRegister} /> */}
                    <Route path="" component={NotFoundPage} />
                  </Switch>
                </Grid>
              </div>
            </Grid>
            : user != null && user.authorities[0].authority != 'USER' && location.pathname.indexOf("/user/") == 0 || user != null && user.authorities[0].authority != 'SELLER' && location.pathname.indexOf("/user/") == 0 ?
              <>
                <Headerr />
                <Container fixed>
                  <Grid container spacing={0} style={{ marginTop: "15px" }}>

                    <Grid item sm={3} xs={12} md={3} style={{ padding: "10px" }}>
                      <SellerHomePage />
                    </Grid>

                    <Grid item sm={9} xs={12} md={9} style={{ padding: "10px", backgroundColor: "#fff" }}>
                      <Switch>
                        <Route path="/user/setting" component={UserSetting} />
                        <Route exact path="/user/order-history" component={UserOrderHistory} />
                        <Route exact path="/user/order-history/:id" component={UserDetailOrder} />
                        <Route path="/user/change-password" component={UserChangePassword} />
                        <Route path="/user/address" component={UserAddress} />
                        <Route path="/user/rating-comment/:id" component={UserRatingComment} />
                        <Route path="" component={NotFoundPage} />
                      </Switch>
                    </Grid>

                  </Grid>
                </Container>
              </>
              : user != null && user.authorities[0].authority != 'USER' || user != null && user.authorities[0].authority != 'SELLER' ?
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Switch>
                      <Route exact path="/" component={UserHomePage} />
                      <Route path="/payment" component={Payment} />
                      <Route path="/sellerRegister" component={SellerRegister} />
                      <Route path="/food/:id" component={FoodDetail} />
                      <Route path="" component={NotFoundPage} />
                    </Switch>
                  </Grid>
                </Grid>
                :
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
                      <Route path="/food/:id" component={FoodDetail} />
                      <Route path="/email/verify" component={EmailVerifiedSuccess} />
                      <Route path="/forget-password" component={ForgetPassword} />
                      <Route path="" component={NotFoundPage} />
                    </Switch>
                  </Grid>
                </Grid>
        }


        {/* <Footer /> */}
        <GlobalStyle />
      </AppWrapper >
    </StylesProvider>
  );
}
