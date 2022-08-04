/**
 *
 * Loading
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './loading.css';

function Loading() {
  return (
    <div class="lds-dual-ring"></div>
  );
}

Loading.propTypes = {};

export default memo(Loading);
