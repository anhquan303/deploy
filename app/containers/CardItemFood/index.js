/**
 *
 * CardItemFood
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectCardItemFood from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from '@mui/material';
import { makeStyles, Container, Button } from '@material-ui/core';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { getUser } from '../../utils/common';

const useStyles = makeStyles(theme => ({
  card: {
    border: '1px solid #000',
    '&:hover': {
      boxShadow: '2rem 2rem 3rem rgba(132, 139, 200, 0.18)',
    },
  },
  center: {
    flexWrap: 'wrap',
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'left',
  },
}));

export function CardItemFood({ foodName, storeName, address, img, price}) {
  const dispatch = useDispatch;
  useInjectReducer({ key: 'cardItemFood', reducer });
  useInjectSaga({ key: 'cardItemFood', saga });

  const classes = useStyles();
  const user = getUser();
  let dollarUSLocale = Intl.NumberFormat('en-US');

  const addToCart = () => {
    const data = {
      uid: user.id,
      fid: id
    }
    dispatch(addToCart(data));
  }
  return (
    <div>
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
          {/* <Typography variant="body2" color="text.secondary" style={{
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {address && address.name != null ? <span>{address.name} - {address.village} - {address.town}</span> :
              <span> {address.dormName} - {address.room_number}</span>
            }

          </Typography> */}
          <Typography variant="body2" color="text.secondary" style={{
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: "700",
            fontSize: "15px"
          }}>
            {dollarUSLocale.format(price)} VND

          </Typography>
          {/* <Typography variant="body2" color="text.secondary" style={{
            whiteSpace: 'nowrap',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontWeight: "700",
            fontSize: "15px",
            textAlign: "right"
          }}>
            <IconButton style={{ color: '#EA5E5E' }} onClick={addToCart}>
              <AddBoxIcon />
            </IconButton>

          </Typography> */}

        </CardContent>
      </Card>


    </div>
  );
}

CardItemFood.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cardItemFood: makeSelectCardItemFood(),
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
)(CardItemFood);
