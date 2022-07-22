/*
 * Headerr Messages
 *
 * This contains all the text for the Headerr container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Headerr';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Headerr container!',
  },
  becomeSeller: {
    id: `${scope}.becomeSeller`,
    defaultMessage: 'Trở thành đối tác của No Nê',
  },
  myStore: {
    id: `${scope}.myStore`,
    defaultMessage: 'Cửa hàng của tôi',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Đăng nhập',
  },
  signup: {
    id: `${scope}.signup`,
    defaultMessage: 'Đăng ký',
  },
  myAccount: {
    id: `${scope}.myAccount`,
    defaultMessage: 'Tài khoản của tôi',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Đăng xuất',
  },
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Bạn muốn ăn gì hôm nay?',
  },
  
});
