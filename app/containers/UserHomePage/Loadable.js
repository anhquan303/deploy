/**
 *
 * Asynchronously loads the component for UserHomePage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
