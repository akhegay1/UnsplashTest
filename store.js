import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';


const exampleInitialState =
{
  "imgs": [
    1
  ]
}

export const actionTypes = {
  LOADIMGS: 'LOADIMGS',
  REQIMGS: 'REQIMGS'
}

// REDUCER
export const reducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOADIMGS :
      console.log('action.jsonImgs')
      console.log(action.jsonImgs)
      return {...state, imgs: action.jsonImgs};
    case actionTypes.REQIMGS :
      console.log('action.REQIMGS')
      return {...state, curPage: action.curPage, query: action.query, perPage: action.perPage}
    default:
      return state
  }
}



// ACTIONS

export const requestImgs = (curPage, query, perPage) =>
    ({
        type: actionTypes.REQIMGS,
        curPage,
        query,
        perPage
    })

export const loadImgs = (jsonImgs) =>
({
    type: actionTypes.LOADIMGS,
    jsonImgs
})




export function initializeStore (initialState = exampleInitialState) {
  console.log('bef run saga')
  const saga = createSagaMiddleware();

  const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(saga))
  )

  saga.run(rootSaga);
  console.log('after run saga')

  return store;
}


