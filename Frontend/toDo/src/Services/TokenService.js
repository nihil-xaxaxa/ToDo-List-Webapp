//gets the token from the header
const ParseToken = (string) => {
  let token = JSON.parse(atob(string.split(".")[1]));
  return token;
};

//checks if the token time has expired
const tokenIsExpired = (string) => {
  try {
    let token = ParseToken(string);
    if (token.exp * 1000 < Date.now()) return true;
    else return false;
  } catch {
    return true;
  }
};

//gets the name from the token 
const getName = (string) => {
  try {
    let token = ParseToken(string);
    return token.username;
  } catch {
    return null;
  }
};

//checks if the token is valid
const isValidToken = () => {
  let token = localStorage.getItem("Authorization");
  if (tokenIsExpired(token)) return false;
};

//gets the token from the loclstorage
const getToken = () => {
  return localStorage.getItem("Authorization");
};

//store the given token
const setToken = (token) => {
  localStorage.setItem("Authorization", `${token}`);
};

const deleteCookie=(cookieName)=>{
  console.cookie=`${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export {
  ParseToken,
  setToken,
  getToken,
  getName,
  tokenIsExpired,
  isValidToken,
  deleteCookie
};
