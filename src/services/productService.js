import api from "./api";
const getProduct = () => api.get(api.url.allproducts);
const getDetail = (id) => api.get(`${api.url.allproducts}/${id}`);
const getFillProduct = (search) =>
  api.get(`${api.url.filter}?search=${search}`);
const getFillProductQuery = (type, search) =>
  api.get(`${api.url.filterQuery}?type=${type}&search=${search}`);
const getSortProduct = (sort, order) =>
  api.get(`${api.url.filter}?sort=${sort}&order=${order}`);
const getSortProductQuery = (type, sort, order) =>
  api.get(
    `${api.url.filterSortQuery}?type=${type}&sort=${sort}&order=${order}`
  );
const getSlice = (start, end) =>
  api.get(`${api.url.filter}?start=${start}&end=${end}`);
const getSliceQuery = (type, start, end) =>
  api.get(`${api.url.filterQuery}?type=${type}&start=${start}&end=${end}`);
const getFullSearch = (search) =>
  api.get(`${api.url.fullSearch}?search=${search}`);
const getFullSearchQuery = (type, search) =>
  api.get(`${api.url.fullSearchQuery}?type=${type}&search=${search}`);

const getPaging = (page, perpage) =>
  api.get(`${api.url.getPaging}?page=${page}&perpage=${perpage}`);
const getPagingSearch = (search, page, perpage) =>
  api.get(
    `${api.url.getpagingAndSearch}?search=${search}&page=${page}&perpage=${perpage}`
  );
const putAllproduct = (data, id) => {
  api.put(`${api.url.allproducts}/${id}`, data);
};
const productService = {
  getProduct,
  getFillProduct,
  getFullSearch,
  getFullSearchQuery,
  getSortProductQuery,
  getPaging,
  getPagingSearch,
  getSortProduct,
  getSlice,
  getSliceQuery,
  getFillProductQuery,
  putAllproduct,
  getDetail,
};
export default productService;
