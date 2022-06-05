import request from "../ultils/fetch";

export const getBudgets = (token: any) => request.get("/budgets", {}, token);

export const getBudgetById = (token: any, id) => request.get(`/budgets/${id}`, {}, token);

export const createBudget = (data: any, token: any) => request.post("/budgets", data, "POST", token);

export const updateBudget = (data: any, token: any, id) => request.put(`/budgets/${id}`, data, token);

export const deleteBudget = (token: any, id) => request.delete(`/budgets/${id}`, {}, token)