export function isLoggedIn(): boolean {
  return !!loadToken();
}

export function loadToken() {
  try {
    return localStorage.getItem("jwt_token");
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export function saveToken(token: string) {
  try {
    localStorage.setItem("jwt_token", token);
  } catch (error) {
    console.error(error);
  }
}
