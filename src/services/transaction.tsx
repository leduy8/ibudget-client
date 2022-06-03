import request from "../ultils/fetch";

export const getTransactions = (token: any, params: any = null) => {
    // ? Params will be an object
    if (params) {
        if (params.title === "FUTURE") {
            return {};
        }

        let url: string = "/transactions?";
        Object.keys(params).forEach(key => {
            if (key !== "title")
                url += `${key}=${params[key]}&`;
        });
        return request.get(url.substring(0, url.length - 1), {}, token);
    }
    return request.get("/transactions", {}, token);
}

export const getTransactionById = (token: any, id) => request.get(`/transactions/${id}`, {}, token);

export const createTransaction = (data: any, token: any) => request.post("/transactions", data, "POST", token);

export const deleteTransaction = (token: any, id) => request.delete(`/transactions/${id}`, {}, token)
