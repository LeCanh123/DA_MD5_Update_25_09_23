import axios from 'axios';

export default {
    createOrder:async (token:any,data:any)=> {
        console.log(data);
        
        return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/purchase/addorder`,{token,data})
          .then(res => {
            return res
          })
          .catch(error => {
                return {data: {
                              status:false,
                              message:"Lỗi hệ thống"
                              }}}
          );

      },
    getHistoryOrder:async (token:any)=> {
      return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/purchase/gethistory`,{token})
        .then(res => {
          return res
        })
        .catch(error => {
              return {data: {
                            status:false,
                            message:"Lỗi hệ thống"
                            }}}
        );

    },
      
    }