import { call, delay, fork, join, put } from "redux-saga/effects";
import fetch from "isomorphic-fetch";

function* fetchSaga() {
  return yield call(async () =>
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    )
  );
}

export function* rootSaga() {
  const fetchTask = yield fork(fetchSaga);
  yield delay(1000);
  const res = yield join(fetchTask);
  yield put({
    type: "fetched",
    payload: res,
  });
}
