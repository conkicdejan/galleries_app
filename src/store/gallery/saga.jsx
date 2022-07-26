import {
  setCreateErrors,
  setGalleries,
  setGallery,
  createGallery,
  getGalleries,
  getGallery,
  editGallery,
  deleteGallery,
} from './index';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import GalleryService from './../../services/GalleryService';

function* getGalleriesHandler({ payload }) {
  try {
    const galleries = yield call(GalleryService.getAll, payload);
    yield put(setGalleries(galleries));
    console.log(galleries);
  } catch (error) {
    console.log('get all galleries', error);
  }
}

function* addGalleryHandler({ payload }) {}

function* getGalleryHandler({ payload }) {}

function* editGalleryHandler({ payload }) {}

function* deleteGalleryHandler({ payload }) {}

export function* watchAddGallery() {
  yield takeLatest(createGallery.type, addGalleryHandler);
}
export function* watchGetGalleries() {
  yield takeLatest(getGalleries.type, getGalleriesHandler);
}
export function* watchGetGallery() {
  yield takeLatest(getGallery.type, getGalleryHandler);
}
export function* watchEditGallery() {
  yield takeLatest(editGallery.type, editGalleryHandler);
}
export function* watchDeleteGallery() {
  yield takeLatest(deleteGallery.type, deleteGalleryHandler);
}
