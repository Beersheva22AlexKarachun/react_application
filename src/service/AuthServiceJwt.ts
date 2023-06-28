import LoginData from "../model/LoginData";
import UserData from "../model/UserData";
import AuthService from "./AuthService";

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
    //TODO
  }

}

function getUserData(data: any): UserData {
  const jwtPayloadJson = atob(data.accessToken.split(".")[1])
  const jwtPayloadObject = JSON.parse(jwtPayloadJson)
  return { email: jwtPayloadObject.email, role: jwtPayloadObject.sub };
}
