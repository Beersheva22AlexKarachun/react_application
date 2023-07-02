import LoginData from "../model/LoginData";
import UserData from "../model/UserData";
import AuthService from "./AuthService";

export const AUTH_DATA_JWT: string = "auth-data-jwt"
export default class AuthServiceJwt implements AuthService {
  constructor(private _url: string) { }

  async login(loginData: LoginData): Promise<UserData> {
    const response = await fetch(this._url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginData)
    });
    return response.ok ? getUserData(await response.json()) : null;
  }

  async logout(): Promise<void> {
    localStorage.removeItem(AUTH_DATA_JWT)

  }

}

function getUserData(data: any): UserData {
  const jwt = data.accessToken
  localStorage.setItem(AUTH_DATA_JWT, jwt)
  const jwtPayloadJson = atob(jwt.split(".")[1])
  const jwtPayloadObject = JSON.parse(jwtPayloadJson)
  return { email: jwtPayloadObject.email, role: jwtPayloadObject.sub };
}
