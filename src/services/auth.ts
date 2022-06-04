import request from "../ultils/fetch";

export const reigster = (data: any) => request.post("/users", data, "POST", null);

export const login = (data: any) => request.post("/auth", data, "POST", null);

export const getUser = (token: any) => request.get("/users/me", {}, token);
