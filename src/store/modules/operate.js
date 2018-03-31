import {getUserLists} from '@/api/users'
import {getToken, setToken} from '@/utils/auth'
import users from "./users";

const operate = {
  state: {},
  mutations: {},
  action: {
    getUserList ({commit}) {
      return new Promise((resolve, reject) => {
        getUserLists ().then(response=>{

        })
      });
    }
  }
};
export default operate;
