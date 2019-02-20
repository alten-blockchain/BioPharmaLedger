import {
  call,
  takeLatest,
  put
} from 'redux-saga/effects';
import { apiUrl, HTTP_METHODS } from '../constants';
import { setUserMessage } from '../actions/user-message.actions';
import {
  BID_SUBMIT_REQUEST,
  bidSubmitSuccess,
  bidSubmitFailure
} from '../actions/bid.actions';

const placeBidUrl = `${apiUrl}/bids`;

function placeBidApiCall(payload) {
  return fetch(placeBidUrl,
    {
      method: HTTP_METHODS.POST,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then((response) => {
      return response.json()
    })
    .catch(err => {
      throw err
    });
}

function* placeBid(action) {
  try {
    const response = yield call(placeBidApiCall, action.payload);
    if (response.success) {
      yield put(bidSubmitSuccess(response.data));
      yield put(setUserMessage('Bid success', true));
    } else {
      yield put(bidSubmitFailure());
      // TODO: change the message
      yield put(setUserMessage('Bid failed'));
    }
  } catch (err) {
    yield put(bidSubmitFailure(err));
    yield put(setUserMessage('Bid failed'));
  }
}

export default function* watchBids() {
  yield takeLatest(BID_SUBMIT_REQUEST, placeBid)
}
