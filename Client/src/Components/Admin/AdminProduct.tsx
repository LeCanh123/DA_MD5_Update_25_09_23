import React, { useEffect, useState } from "react";
import "./Admin.css";
import {
  Card,
  CardBody,
  useToast,
  CardFooter,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Grid,
  Select,
} from "@chakra-ui/react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import adminProduct from "@/apis/adminProduct";
//phân trang
import AdminManageProductPagination from "../Filter/AdminManageProductFilter/AdminManageProductPagination";
import apiAdminProduct from "@/apis/adminProduct";
import { setAdminProductTotal } from "@/redux/MenReducer/reducer";
import { useDispatch } from "react-redux";


function AdminProduct1() {

  //params
  const [searchParams, setSearchParams]:any = useSearchParams();
  const intialOrder = searchParams.get("order");
  const initialCategory = searchParams.getAll("category");


  //
  const [men, setMen] = useState([]);
  const toast = useToast();
  const [category,setCategory]=useState("")
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
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

  
async function getData(e:any){
  console.log("eeeeee",e);
  
  let getMenProductResult=await adminProduct.getProduct(localStorage.getItem("loginToken1"),
  {type:e,skip:0,take:import.meta.env.VITE_ITEM_PER_PAGE})
  if(getMenProductResult.data?.status){

    setMen(getMenProductResult.data.data);
    dispatch(setAdminProductTotal({total:getMenProductResult.data.total}))
  }else{
    toast({
      title: "Err",
      description: getMenProductResult.data.message,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  }
}

  //lấy sp về
  // useEffect(() => {
  //   async function getMenProduct(){
  //     let getMenProductResult= await adminProduct.getProduct(localStorage.getItem("loginToken1"),
  //     {type:category,skip:0,take:import.meta.env.VITE_ITEM_PER_PAGE})
  //     console.log("getMenProductResult",getMenProductResult);
  //     if(getMenProductResult.data?.status){
  //       // toast({
  //       //   title: "Success",
  //       //   description: getMenProductResult.data.message,
  //       //   status: "success",
  //       //   duration: 2000,
  //       //   isClosable: true,
  //       //   position: "top",
  //       // });
  //       setMen(getMenProductResult.data.data);
  //       dispatch(setAdminProductTotal({total:getMenProductResult.data.total}))
  //       console.log("getMenProductResult.data.total",getMenProductResult.data.total);
        
  //     }else{
  //       toast({
  //         title: "Err",
  //         description: getMenProductResult.data.message,
  //         status: "error",
  //         duration: 2000,
  //         isClosable: true,
  //         position: "top",
  //       });
  //     }
  //   }
  //   getMenProduct()


  // }, []);

  async function handleDelete(id:any){
    let deleteProductResult=await adminProduct.deleteteProduct(localStorage.getItem("loginToken1"),id);
    console.log("deleteProductResult",deleteProductResult);
    if(deleteProductResult.data?.status){
      toast({
        title: "Success",
        description: deleteProductResult.data.message,
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      getData("men")
    }else{
      toast({
        title: "Err",
        description: deleteProductResult.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }

  }

  //lấy ds category
  let [productCategory1,setProductCategory1]:any = useState({
    none: [{ id: -1, name: 'Chưa có danh mục' }],
  });
  useEffect(() => {
    async function productGetCategory(){
    let listCategory2:any= await apiAdminProduct.productGetCategory(localStorage.getItem("loginToken1"));
      if(listCategory2.status){
        setProductCategory1(listCategory2.data?.data)
      }
    }
    productGetCategory()
}, []);


    //phân trang
    const itemsPerPage = import.meta.env.VITE_ITEM_PER_PAGE;
    const currentPage = parseInt(searchParams.get('page')) || 1;
  
    useEffect(()=>{
      const currentPage1 = parseInt(searchParams.get('page')) || 1;
      const startIndex = (currentPage1 - 1) * itemsPerPage;
              async function getProductByCategory(){
                let getMenProductResult=await adminProduct.getProduct(localStorage.getItem("loginToken1"),{type:category,
                  skip:currentPage1,
                  take:itemsPerPage,})
                if(getMenProductResult.data?.status){
                  // toast({
                  //   title: "Success",
                  //   description: getMenProductResult.data.message,
                  //   status: "success",
                  //   duration: 2000,
                  //   isClosable: true,
                  //   position: "top",
                  // });
                  setMen(getMenProductResult.data.data);
                  dispatch(setAdminProductTotal({total:getMenProductResult.data.total}))
                }else{
                  toast({
                    title: "Err",
                    description: getMenProductResult.data.message,
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                  });
                }
              }
              getProductByCategory()
   

    },[currentPage])



  return (
    <>
      <AdminNavbar />
      <AdminSidebar />

      <select
            name="gender"
            id="gender"
            placeholder="Select Gender"
            onChange={(e) => {
              getData(e.target.value);
              setCategory(e.target.value)
            
            }
            }
            style={{marginTop:"100px",width:"20%",marginLeft:"300px",border:"1px solid black"}}
          >
            <option key={0} value={0}>{"Select Category"} </option>
            {Object.keys(productCategory1).map(category => (
              <option key={category} value={category}>{category} </option>
            ))}
          </select>

{/* <select
 style={{marginTop:"200px", width:"20%",marginLeft:"500px"}}>
  <option value="">qqqdddđ</option>
</select> */}
      <Grid
        width="70%"
        h={"auto"}
        m="auto"
        border={"1px solid gainsboro"}
        mt={"20px"}
        mb={"20px"}
        ml={"300px"}
        gap={"20px"}
        bg={"#f7f8f7"}
        gridTemplateColumns={"repeat(3,1fr)"}
      >
        {men.length > 0 &&
          men.map((el:any) => {
            return (
              <Card maxW="sm" key={el.id}>
                <CardBody>
                  <Image
                    src={el.productimage[0]?.image}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                    style={{width:"300px",height:"400px"}}
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{el.title}</Heading>

                    <Text color="blue.600" fontSize="2xl">
                    $ {el.price}
                    </Text>
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Link to={`/editProduct/${el.id}`}>
                      <Button colorScheme="blue">Edit Product</Button>
                    </Link>

                    <Button
                      onClick={() => handleDelete(el.id)}
                      colorScheme="blue"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </CardFooter>
              </Card>
            );
          })}
      </Grid>
      <AdminManageProductPagination></AdminManageProductPagination>
    </>
  );
}

export default AdminProduct1;
