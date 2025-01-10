const KEY = "user";
export const storeCurrentUser = (data) => {   //save current user data
  sessionStorage.setItem(KEY, JSON.stringify(data));
};

export const getCurrentUser = () => {   //retrive current user data
  return JSON.parse(sessionStorage.getItem(KEY));
};

export const getUserRole = () => {   //retrive user role
  const user = JSON.parse(sessionStorage.getItem(KEY));
  return user?.role;
};

export const getToken = () => {    //get current  user authentication token
  const user = JSON.parse(sessionStorage.getItem(KEY));
  return user?.token;
};

export const logoutCurrentUser = () => {   //removing user data
  sessionStorage.removeItem(KEY);
};

export const authorizationHeader = (headers, storeState) => {  //add authentication header if user loggin
  const result = JSON.parse(sessionStorage.getItem(KEY));
  if (result) {
    headers.set("Authorization", `Bearer ${result?.token}`);
  }
  return headers;
};
