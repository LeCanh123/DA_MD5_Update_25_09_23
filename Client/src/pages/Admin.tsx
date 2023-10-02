
import adminProduct from "@/apis/adminProduct";
import AdminNavbar from "../Components/Admin/AdminNavbar";
import AdminSidebar from "../Components/Admin/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function Admin() {

  const navigate = useNavigate();
  const toast = useToast();
  
  async function checkAdmin(){
    let checkAdminLoginResult= await adminProduct.adminCheckLogin(localStorage.getItem("loginToken1"));
    console.log("checkAdminLoginResult",checkAdminLoginResult);
    if(checkAdminLoginResult.data?.status){
    }else{
      navigate("/")
      toast({
        title: "Err",
        description: checkAdminLoginResult.data?.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
}
checkAdmin();


  return (
    <div>
      <AdminNavbar />
      <AdminSidebar />
    </div>
  );
}
export default Admin;
