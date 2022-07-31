export const getUser = () => {
    const userStr = sessionStorage.getItem("user");
    if(userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () => {
    return sessionStorage.getItem("token") || null;
}

export const setUserSession = (token, user, store) => {
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("store", store);
}

export const removeUserSession = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("store");
}

export const getStore = () => {
    const store = sessionStorage.getItem("store");
    if(store != null) return JSON.parse(store);
    else return null;
}
