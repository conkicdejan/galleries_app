import { createSlice } from '@reduxjs/toolkit';

const middlewareActions = {
  createGallery: () => {},
  getGalleries: () => {},
  getGallery: () => {},
  editGallery: () => {},
  deleteGallery: () => {},
  addComment: () => {},
  deleteComment: () => {},
};

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    galleries: null,
    gallery: null,
    createErrors: null,
    addCommentErrors: null,
  },
  reducers: {
    setCreateErrors(state, { payload }) {
      state.createErrors = payload;
    },
    setGalleries(state, { payload }) {
      state.galleries = payload;
    },
    setGallery(state, { payload }) {
      state.gallery = payload;
    },
    setAddCommentErrors(state, { payload }) {
      state.addCommentErrors = payload;
    },
    setNewComment(state, { payload }) {
      state.gallery.comments = [...state.gallery.comments, payload];
    },
    setDeletedComment(state, { payload }) {
      const updated = state.gallery.comments.filter(
        (comment) => comment.id !== payload
      );
      state.gallery.comments = updated;
    },
    ...middlewareActions,
  },
});

export const {
  setCreateErrors,
  setGalleries,
  setGallery,
  setAddCommentErrors,
  setNewComment,
  setDeletedComment,

  createGallery,
  getGalleries,
  getGallery,
  editGallery,
  deleteGallery,
  addComment,
  deleteComment,
} = gallerySlice.actions;
export default gallerySlice.reducer;
