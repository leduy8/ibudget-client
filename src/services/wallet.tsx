import request from "../ultils/fetch";

export const getWallets = (token: any) => request.get("/wallets", {}, token);

export const getWalletById = (token: any, id) => request.get(`/wallets/${id}`, {}, token);

export const createWallet = (data: any, token: any) => request.post("/wallets", data, "POST", token);

export const deleteWallet = (token: any, id) => request.delete(`/wallets/${id}`, {}, token)
