import axios from 'axios';

export default {
    addToCart:async (token:any,id:number)=> {
        return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/carts/add`,{token:String(token),id:String(id)})
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
    getCart:async (token:any)=> {
        return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/carts/get/`,{token})
          .then(res => {
            // return res
            return {data:res.data?.data,
            total:1
                  }
          })
          .catch(error => 
            
            {
                return {data:[{id:1}],
                total:4
                        }
            }
            );

      },
    deleteProduct:async (token:any,id:any)=> {
          return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/carts/remove/`,{token,id})
            .then(res => {
              // return res
              return res
            })
            .catch(err => {
              return {
                data:{
                  status:false,
                  message:"Lỗi hệ thống"
                }
              }
            }
   
              
              );
  
      },
    changeQuantity:async (token:any,id:any,type:any)=> {
          return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/carts/changequantity/`,{token,id,type})
          .then(res => {
            // return res
            return res
          })
          .catch(err => {
            return {
              data:{
                status:false,
                message:"Lỗi hệ thống"
              }
            }
          }
              );
  
      },
      
    }