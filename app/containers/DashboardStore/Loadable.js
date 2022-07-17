/**
 *
 * Asynchronously loads the component for DashboardStore
 *
 */

 import React from 'react';
 import loadable from 'utils/loadable';
 import LoadingIndicator from 'components/LoadingIndicator';
 
 export default loadable(() => import('./index'), {
     fallback: <LoadingIndicator />,
 });
 
 