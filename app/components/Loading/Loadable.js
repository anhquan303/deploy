/**
 *
 * Asynchronously loads the component for Loading
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
