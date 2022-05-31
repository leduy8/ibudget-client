import request from "../ultils/fetch";

export const getTransactions = (token: any) => request.get("/transactions", {}, token);

export const getTransactionById = (token: any, id) => request.get(`/transactions/${id}`, {}, token);

export const createTransaction = (data: any, token: any) => request.post("/transactions", data, "POST", token);

export const deleteTransaction = (token: any, id) => request.delete(`/transactions/${id}`, {}, token)
