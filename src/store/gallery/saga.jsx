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

function* addGalleryHandler({ payload }) {
  yield put(setCreateErrors(null));
  try {
    yield call(GalleryService.create, payload.gallery);
    if (typeof payload.meta?.onSuccess === 'function') {
      yield call(payload.meta.onSuccess);
    }
  } catch (error) {
    console.log('addGalleryHandler', error);
    if (error.response.status === 422) {
      yield put(setCreateErrors(error.response.data.errors));
    }
  }
}

function* getGalleryHandler({ payload }) {
  yield put(setGallery(null));
  try {
    const gallery = yield call(GalleryService.getById, payload.id);
    yield put(setGallery(gallery));
  } catch (error) {
    console.log('get all gallery', error);
    if (error.response.status === 404) {
      if (typeof payload.meta?.onNotFound === 'function') {
        yield call(payload.meta.onNotFound);
      }
    }
  }
}

function* editGalleryHandler({ payload }) {
  yield put(setCreateErrors(null));
  try {
    yield call(GalleryService.edit, payload.id, payload.gallery);
    if (typeof payload.meta?.onSuccess === 'function') {
      yield call(payload.meta.onSuccess);
    }
  } catch (error) {
    console.log('addGalleryHandler', error);
    if (error.response.status === 422) {
      yield put(setCreateErrors(error.response.data.errors));
    }
  }
}

function* deleteGalleryHandler({ payload }) {
  try {
    yield call(GalleryService.delete, payload.id);
    if (typeof payload.meta?.onDelete === 'function') {
      yield call(payload.meta.onDelete);
    }
  } catch (error) {
    console.log('deleteGalleryHandler', error);
  }
}

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
