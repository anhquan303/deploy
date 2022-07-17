/**
 *
 * CardItem
 *
 */

 import React, { memo } from 'react';
 import PropTypes from 'prop-types';
 import { connect } from 'react-redux';
 import { Helmet } from 'react-helmet';
 import { FormattedMessage } from 'react-intl';
 import { createStructuredSelector } from 'reselect';
 import { compose } from 'redux';
 
 import { useInjectSaga } from 'utils/injectSaga';
 import { useInjectReducer } from 'utils/injectReducer';
 import makeSelectCardItem from './selectors';
 import reducer from './reducer';
 import saga from './saga';
 import messages from './messages';
 import CheckCircleIcon from '@mui/icons-material/CheckCircle';
 import { Typography, Card, CardActions, CardContent, CardMedia } from '@mui/material';
 import { makeStyles, Container, Button } from '@material-ui/core';
 
 const useStyles = makeStyles((theme) => ({
   card: {
     border: "1px solid #000",
     "&:hover": {
       boxShadow: "2rem 2rem 3rem rgba(132, 139, 200, 0.18)",
     },
   }
 
 }));
 
 export function CardItem({ foodName, storeName, address, img }) {
 
   useInjectReducer({ key: 'cardItem', reducer });
   useInjectSaga({ key: 'cardItem', saga });
   const classes = useStyles();
 
   return (
     <div>
       <Card sx={{ maxWidth: 200 }} className={classes.card}>
         <CardMedia
           component="img"
           height="150"
           width="150"
           image="https://ofo-image.s3.amazonaws.com/store_image/11_avatar?fbclid=IwAR0vxhkzaE-EV9LWbgXTGoM65tqhAG8U_3mfSWy8a-8vfTOSQzHVtve9haQ"
           alt="anh mon an"
 
         />
         <CardContent>
           {/* <Typography gutterBottom variant="h11" component="div">
                   <span style={{ color: "#5890FF" }}><CheckCircleIcon /></span>
                   <span style={{ overflow: "hidden", textOverflow: "ellipsis", width: "20px" }}>Quán ngon - Cơm suất</span>
                 </Typography> */}
           <div style={{ whiteSpace: "nowrap", width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>
             <span style={{ color: "#5890FF" }}><CheckCircleIcon /></span>{storeName} - {foodName}
           </div>
           <Typography variant="body2" color="text.secondary" style={{ whiteSpace: "nowrap", width: "100%", overflow: "hidden", textOverflow: "ellipsis" }}>
             {address}
           </Typography>
         </CardContent>
         <hr />
         <CardActions>
           {/* <Button size="small">Share</Button>
                 <Button size="small">Learn More</Button> */}
           <Typography style={{ margin: "0 auto" }}>
             Quán ăn
           </Typography>
         </CardActions>
       </Card>
     </div>
   );
 }
 
 CardItem.propTypes = {
   dispatch: PropTypes.func.isRequired,
 };
 
 const mapStateToProps = createStructuredSelector({
   cardItem: makeSelectCardItem(),
 });
 
 function mapDispatchToProps(dispatch) {
   return {
     dispatch,
   };
 }
 
 const withConnect = connect(
   mapStateToProps,
   mapDispatchToProps,
 );
 
 export default compose(
   withConnect,
   memo,
 )(CardItem);
 
