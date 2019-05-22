import { observable } from "mobx";

export class UserStore {
  @observable
  token: string = "";

  isLoggedIn(): boolean {
    return !!this.token;
  }

  logOut(): void {
    this.token = "";
  }
}

const userStore = new UserStore();

export default userStore;
