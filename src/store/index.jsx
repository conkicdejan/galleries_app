import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/slice';
import createSagaMiddleware from 'redux-saga';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}

export default store;
