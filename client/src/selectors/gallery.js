export const getError = (state) => state.gallery.error;
export const getIsLoading = (state) => state.gallery.isLoading;
export const getPhotos = (state) => state.gallery.data;
export const getPage = (state) => state.gallery.page;
export const getTotalPages = (state) => state.gallery.totalPages;

export const getHeight = (state) => state.gallery.filters.height;
export const getWidth = (state) => state.gallery.filters.width;
export const getIsGrayscale = (state) => state.gallery.filters.grayscale;
