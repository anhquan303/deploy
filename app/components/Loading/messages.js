/*
 * Loading Messages
 *
 * This contains all the text for the Loading component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Loading';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Loading component!',
  },
});
