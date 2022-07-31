import { take, call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  getListBankFailed,
  getListBankSuccess,
  getListWardsFailed,
  getListWardsSuccess,
  sellerSignUpFailed,
  sellerSignUpSuccess,
} from './actions';
import { apiFetchData, apiGetListBank, apiSignup, uploadImage } from './api';
import * as types from './constants';

const token = sessionStorage.getItem('token');

export function* sellerSignUp({ payload }) {
  try {
    const formData = new FormData();
    formData.append('name', payload.name);
    formData.append('description', payload.description);
    formData.append('slogan', payload.slogan);
    formData.append('phone', payload.phone);
    formData.append('email', payload.email);
    formData.append('open_time', payload.open_time);
    formData.append('close_time', payload.close_time);
    formData.append('cover_image', payload.image.avatar);
    formData.append('avatar', payload.image.avatar);
    // formData.append('avatar', null);
    formData.append(
      'identity_card_front',
      payload.certificate.identity_card_front,
    );
    // formData.append('identity_card_front', null);
    // formData.append('identity_card_back', null);
    // formData.append('food_quality_certificate', null);
    // formData.append('menu', null);
    formData.append(
      'identity_card_back',
      payload.certificate.identity_card_back,
    );
    formData.append(
      'food_quality_certificate',
      payload.certificate.food_quality_certificate,
    );
    formData.append('menu', payload.menu);
    formData.append('isInCampus', payload.isInCampus);
    formData.append('owner_name', payload.owner_name);
    formData.append('location', payload.location);
    formData.append('bin', payload.bin);
    formData.append('account_number', payload.account_number)

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    // axios.post("http://localhost:3990/api/store/register", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //     "Authorization": `Bearer ${token}`
    //   },
    // })
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error))

    // const formData1 = new FormData();
    // formData1.append('file', payload.certificate.identity_card_front);
    const res = yield call(uploadImage, ['api/store/register'], formData);
    if (res.status == 200) {
      yield put(
        sellerSignUpSuccess(
          'Bạn đã đăng ký thành công, vui lòng chờ để dược duyệt, kết quả sẽ được trả về email',
        ),
      );
    } else {
      yield put(sellerSignUpFailed('Bạn đã đăng ký không thành công'));
    }

    // axios({
    //   method: "post",
    //   url: "http://localhost:3990/api/store/register",
    //   data: formData,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    //   .then(res => console.log(res))
    //   .catch(error => console.log(error))
  } catch (error) {
    yield put(sellerSignUpFailed(error.message));
  }
}

export function* getListWards({ payload }) {
  try {
    // axios.get("https://provinces.open-api.vn/api/d/276?depth=2")
    //   .then((response) => {
    //     console.log(response.data.wards);
    //   })
    //   .catch((error) => {
    //   });
    const res = yield call(apiFetchData, []);
    if (res.status == 200) {
      yield put(getListWardsSuccess(res.data.wards));
    } else {
      yield put(getListWardsFailed('Failed'));
    }
  } catch (error) {
    yield put(getListWardsFailed(error.message));
  }
}

export function* getListBank({ payload }) {
  try {
    // axios.get("https://provinces.open-api.vn/api/d/276?depth=2")
    //   .then((response) => {
    //     console.log(response.data.wards);
    //   })
    //   .catch((error) => {
    //   });
    const res = yield call(apiGetListBank, []);
    if (res.status == 200) {
      yield put(getListBankSuccess(res.data.data));
    } else {
      yield put(getListBankFailed('Failed'));
    }
  } catch (error) {
    yield put(getListBankFailed(error.message));
  }
}

// Individual exports for testing
export default function* sellerRegisterSaga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery(types.SELLER_SIGNUP, sellerSignUp);
  yield takeEvery(types.GET_LIST_WARDS, getListWards);
  yield takeEvery(types.GET_LIST_BANK, getListBank);
}
