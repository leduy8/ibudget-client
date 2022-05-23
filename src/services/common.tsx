import request from "../ultils/fetch";

export const getWallets = (token: any) => request.get("/wallets", {}, token);

export const getCategories = (token: any) =>
  request.get("/categories", {}, token);

export const getWalletsById = (token: any, id) =>
  request.get(`/wallets/${id}`, {}, token);

export const createWallet = (data: any, token: any) =>
  request.post("/wallets", data, "POST", token);