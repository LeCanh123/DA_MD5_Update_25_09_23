import axios from 'axios';

export default {
  //category
  getCategory:(token:string)=> {
        console.log("newUser",token);
        return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/category/getall`,{token})
          .then(res => {
            // console.log(res);
            return res
          })
          .catch(error => 
            {
              console.log(error)
              return {data:{
                status:false,
                message:"Lỗi hệ thống"
              }}
          }
            );
      },
  addCategory:(token:string,category:any)=> {

        return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/category`,{category,token})
          .then(res => {
            console.log(res);
            return res
          })
          .catch(error => 
            {
                // console.log(error)
                return {data:{
                  status:false,
                  message:"Lỗi hệ thống"
                }}
            }
            );
      },
  deleteCategory:(token:any,id:any)=> {
    console.log("data",token);
    return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/category/delete`,{token,id})
      .then(res => {
        // console.log(res);
        return res
      })
      .catch(error => 
        {
            // console.log(error)
            return {data:{
              status:false,
              message:"Lỗi hệ thống"
            }}
        }
        );
      },
  //product
  addProduct:(data:any)=> {
        console.log("data",data);
        return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/products`,data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
          .then(res => {
            return res
          })
          .catch(error => 
            {
              // console.log(error)
              return {data:{
                status:false,
                message:"Lỗi hệ thống"
              }}
          }
            );
      },
  updateProduct:(data:any)=> {
    console.log("data",data);
    return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/products/admin/update`,data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        return res
      })
      .catch(error => 
        {
          // console.log(error)
          return {data:{
            status:false,
            message:"Lỗi hệ thống"
          }}
      }
        );
      },
  getUpdateProduct:(token:any,data:any)=> {
    console.log("data",data);
    return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/products/admin/getupdateproduct`,{token,id:data})
      .then(res => {
        return res
      })
      .catch(error => 
        {
          // console.log(error)
          return {data:{
            status:false,
            message:"Lỗi hệ thống"
          }}
      }
        );
    },
  getProduct:(token:any,data:any)=> {
      console.log("data",data);
      return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/products/admin/getproduct`,{token,data})
        .then(res => {
          return res
        })
        .catch(error => 
          {
            // console.log(error)
            return {data:{
              status:false,
              message:"Lỗi hệ thống"
            }}
        }
          );
      },
  deleteteProduct:(token:any,id:any)=> {
    return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/products/admin/deleteproduct`,{token,id})
      .then(res => {
        return res
      })
      .catch(error => 
        {
          // console.log(error)
          return {data:{
            status:false,
            message:"Lỗi hệ thống"
          }}
      }
        );
    },
  productGetCategory:(token:any)=> {
    // console.log("newUser",token);
    return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/category/productgetcategory`,{token})
      .then(res => {
        // console.log(res);
        return res
      })
      .catch(error => 
        {
          console.log(error)
          return {data:{
            status:false,
            message:"Lỗi hệ thống"
          }}
      }
        );
    },
  //checklogin
  adminCheckLogin:(token:any)=> {
    // console.log("newUser",token);
    return axios.post(import.meta.env.VITE_SERVER_HOST+`api/v1/products/admin/checklogin`,{token})
      .then(res => {
        // console.log(res);
        return res
      })
      .catch(error => 
        {
          console.log(error)
          return {data:{
            status:false,
            message:"Lỗi hệ thống"
          }}
      }
        );
    },
    }