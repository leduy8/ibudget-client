import request from "../ultils/fetch";

export const changePassword = (data: any, token: any) => request.put("/users/password_change", data, token);
