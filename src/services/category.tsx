import request from "../ultils/fetch";

export const getCategories = (token: any) => request.get("/categories", {}, token);

export const getCategoriesById = (token: any, id) => request.get(`/categories/${id}`, {}, token);