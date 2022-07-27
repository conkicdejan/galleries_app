export function selectCreateErrors(state) {
  return state.gallery.createErrors;
}

export function selectGalleries(state) {
  return state.gallery.galleries;
}

export function selectGallery(state) {
  return state.gallery.gallery;
}

export function selectCurrentPage(state) {
  return state.gallery.galleries?.current_page;
}

export function selectAddCommentErrors(state) {
  return state.gallery.addCommentErrors;
}
