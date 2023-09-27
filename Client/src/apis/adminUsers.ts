import axios from 'axios';

export default {

  getlistUser:(token:any)=> {
    console.log("newUser",token);
    return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/users/getlistuser`,{token})
      .then(res => {
        return res
      })
      .catch(error => 
        {
          return {
            data:{data:[]}
          }
      }
        );
  },
  getListUserCart:(token:any)=> {
    console.log("newUser",token);
    return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/carts/admin/getusercart`,{token})
      .then(res => {
        return res
      })
      .catch(error => 
        {
          return {
            data:{data:[]}
          }
      }
        );
  },
    }