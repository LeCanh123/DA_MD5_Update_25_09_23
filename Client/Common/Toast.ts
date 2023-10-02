import { useToast} from "@chakra-ui/react";
const toast = useToast();


if(addCategoryResult.data?.status){
    toast({
      title: "Success",
      description: addCategoryResult.data.message,
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }else{
    toast({
      title: "Err",
      description: addCategoryResult.data.message,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }

  //api
  addCategory:(category:any)=> {
    console.log("data",category);
    return axios.post(import.meta.env.VITE_SERVER_HOST+`apis/v1/adminproduct/addcategory`,{category})
      .then(res => {
        console.log(res);
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