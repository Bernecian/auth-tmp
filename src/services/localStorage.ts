const LocalStorageService = {
  setToken: (token: string) => {
    localStorage.setItem("authToken", token);
  },

  getToken: () => {
    return localStorage.getItem("authToken");
  },

  removeToken: () => {
    localStorage.removeItem("authToken");
  },
};

export default LocalStorageService;
