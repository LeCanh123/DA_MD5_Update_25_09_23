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
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import adminProduct from "@/apis/adminProduct";



function AdminProduct1() {
  const [men, setMen] = useState([]);
  const toast = useToast();


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
  let getMenProductResult=await adminProduct.getProduct(localStorage.getItem("loginToken1"),{type:e})
  if(getMenProductResult.data?.status){
    // toast({
    //   title: "Success",
    //   description: getMenProductResult.data.message,
    //   status: "success",
    //   duration: 2000,
    //   isClosable: true,
    //   position: "top",
    // });
    setMen(getMenProductResult.data.data)
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


  useEffect(() => {
    async function getMenProduct(){
      let getMenProductResult= await adminProduct.getProduct(localStorage.getItem("loginToken1"),{type:"men"})
      console.log("getMenProductResult",getMenProductResult);
      if(getMenProductResult.data?.status){
        // toast({
        //   title: "Success",
        //   description: getMenProductResult.data.message,
        //   status: "success",
        //   duration: 2000,
        //   isClosable: true,
        //   position: "top",
        // });
        setMen(getMenProductResult.data.data)
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
    getMenProduct()


  }, []);

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

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Select
        onChange={(e) => {
          getData(e.target.value)
          // setCatergory(e.target.value);
         

        }}
        width="20%"
        h={"auto"}
        m="auto"
        border={"1px solid gainsboro"}
        mt={"20px"}
        mb={"20px"}
        ml={"300px"}
        gap={"20px"}
        bg={"#f7f8f7"}
      >
        <option value="men">Men</option>
        <option value="women">Women</option>
    
      </Select>

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
    </>
  );
}

export default AdminProduct1;
