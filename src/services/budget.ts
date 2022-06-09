import request from "../ultils/fetch";

export const getBudgets = (token: any, params: any = null) => {
    // ? Params will be an object
    if (params) {
        let url: string = "/budgets?";
        Object.keys(params).forEach(key => {
            url += `${key}=${params[key]}&`;
        });
        return request.get(url.substring(0, url.length - 1), {}, token);
    }
    return request.get("/budgets", {}, token);
}

export const getBudgetById = (token: any, id) => request.get(`/budgets/${id}`, {}, token);

export const createBudget = (data: any, token: any) => request.post("/budgets", data, "POST", token);

export const updateBudget = (data: any, token: any, id) => request.put(`/budgets/${id}`, data, token);

export const deleteBudget = (token: any, id) => request.delete(`/budgets/${id}`, {}, token)