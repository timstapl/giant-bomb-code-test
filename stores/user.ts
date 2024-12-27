import { defineStore } from 'pinia';

interface UserState {
  user: UserInfo | null
}

type UserInfo = {
};

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    loginUser(user : UserInfo) {
      this.user = user;
    },
    logoutUser() {
      this.user = null;
    },
  },
  getters: {
    isUserLoggedIn() : boolean {
      return this.user === null ? false : true
    }
  },
})
