/**
 *
 * DashboardReport
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
import makeSelectDashboardReport from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export function DashboardReport() {
  useInjectReducer({ key: 'dashboardReport', reducer });
  useInjectSaga({ key: 'dashboardReport', saga });

  return (
    <div>
      <Helmet>
        <title>DashboardReport</title>
        <meta name="description" content="Description of DashboardReport" />
      </Helmet>
      <FormattedMessage {...messages.header} />
    </div>
  );
}

DashboardReport.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardReport: makeSelectDashboardReport(),
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
)(DashboardReport);
