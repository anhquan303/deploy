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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from '@mui/material';
import { makeStyles, Container, Button } from '@material-ui/core';
import makeSelectCardItem from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const useStyles = makeStyles(theme => ({
  card: {
    border: '1px solid #000',
    '&:hover': {
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
}));

export function CardItem({ foodName, storeName, address, img, price }) {
  useInjectReducer({ key: 'cardItem', reducer });
  useInjectSaga({ key: 'cardItem', saga });
  const classes = useStyles();
  let dollarUSLocale = Intl.NumberFormat('en-US');

  return (
    <div>
      {/* <Card sx={{ maxWidth: 200 }} className={classes.card}>
        <CardMedia
          component="img"
          height="150"
          width="150"
          image="https://ofo-image.s3.amazonaws.com/store_image/11_avatar?fbclid=IwAR0vxhkzaE-EV9LWbgXTGoM65tqhAG8U_3mfSWy8a-8vfTOSQzHVtve9haQ"
          alt="anh mon an"
        />
        <CardContent>
          <div
            style={{
              whiteSpace: 'nowrap',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <span style={{ color: '#5890FF' }}>
              <CheckCircleIcon />
            </span>
            {foodName} - {storeName}
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{
              whiteSpace: 'nowrap',
              width: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {address.name} - {address.village} - {address.town}
          </Typography>
        </CardContent>
        <hr />
        <CardActions>
          <Typography style={{ margin: '0 auto' }}>Quán ăn</Typography>
        </CardActions>
      </Card> */}


      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={img}
          alt="anh mon an"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {foodName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {storeName}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {/* {address.name} - {address.village} - {address.town} */}
            {address && address.name != null ? <span>{address.name} - {address.village} - {address.town}</span> :
              <span> {address.dormName} - {address.room_number}</span>
            }

          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span style={{ fontWeight: "600", fontSize: "20px", color: "#EA5E5E" }}>{dollarUSLocale.format(price)} VND</span>
          </Typography>

        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions> */}
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
