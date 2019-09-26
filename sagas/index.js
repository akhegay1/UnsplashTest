import Fetch from 'isomorphic-unfetch';
import { put, takeLatest, all } from 'redux-saga/effects';

const appId='22b7b54287910389edfae878f576488bbc5b540a46daa0d2833ba858ce03b143'



function* fetchPhotos1(action) {
  console.log('fetchPhotos1 ')
  let urlStr
  
  urlStr = `https://api.unsplash.com/search/photos/?page=${action.curPage}&per_page=${action.perPage}'&query=${action.query}&client_id=${appId}`

  
  const json = yield Fetch(urlStr)
      .then(response => response.json() );  
      console.log('fetchPhotos1 '+json)
      
  yield put({ type: "LOADIMGS", jsonImgs: json.results }); 
}



function* actionWatcher() {
    console.log('actionWatcher')
    yield takeLatest('REQIMGS', fetchPhotos1)
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}