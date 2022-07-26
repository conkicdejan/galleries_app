import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  createGallery: () => {},
  getGalleries: () => {},
  getGallery: () => {},
  editGallery: () => {},
  deleteGallery: () => {},
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    galleries: null,
    gallery: null,
    createErrors: null,
  },
  reducers: {
    setCreateErrors(state, action) {
      state.createErrors = action.payload;
    },
    setGalleries(state, { payload }) {
      state.galleries = payload;
    },
    setGallery(state, action) {
      state.gallery = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  setCreateErrors,
  setGalleries,
  setGallery,

  createGallery,
  getGalleries,
  getGallery,
  editGallery,
  deleteGallery,
} = gallerySlice.actions;
export default gallerySlice.reducer;
