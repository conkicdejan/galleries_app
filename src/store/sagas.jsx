import * as authSagas from './auth/saga';
import * as gallerySagas from './gallery/saga';

const sagas = {
  ...authSagas,
  ...gallerySagas,
};

export default sagas;
