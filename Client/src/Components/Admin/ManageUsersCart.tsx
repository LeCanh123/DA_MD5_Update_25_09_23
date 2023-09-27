import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Grid,
} from "@chakra-ui/react";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import adminUsers from "@/apis/adminUsers";
import { useToast} from "@chakra-ui/react";


function ManageUserCart() {
  const toast = useToast();
  const [userCardData, setUserCartData] = useState([]);

  const getData = async() => {
    let getUserCart:any= await adminUsers.getListUserCart(localStorage.getItem("loginToken1"));
    console.log(getUserCart);
    
    if(getUserCart.data?.status){
      // toast({
      //   title: "Success",
      //   description: getUser.data.message,
      //   status: "success",
      //   duration: 2000,
      //   isClosable: true,
      //   position: "top",
      // });
      setUserCartData(getUserCart.data?.data)
    }else{
      toast({
        title: "Err",
        description: getUserCart.data.message,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  
  };

  useEffect(() => {
    getData();
  }, []);

  function calculateTotalPrice(carts: any[]): number {
    let totalSum = 0;
  
    for (const cart of carts) {
      const price = cart.products.price;
      const quantity = cart.quantity;
  
      const productTotal = price * quantity;
  
      totalSum += productTotal;
    }
  
    return totalSum;
  }

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Grid width="70%" h={"auto"} ml="20px" m={"auto"} style={{position:"relative",top:"100px"}}>
        <TableContainer width="90%" h={"auto"} ml="150px" mb="20px">
          <Table variant="simple">
            {/* <Thead bg="#285e61">
              <Tr>
                <Th color={"white"}>S.No</Th>
                <Th color={"white"}>User Name</Th>
                <Th color={"white"}>User Address</Th>
                <Th color={"white"}>User password</Th>
              </Tr>
            </Thead> */}
            <Tbody>
              {userCardData.length > 0 &&
                userCardData.map((el:any, i:any) => {
                  return (
                    <>
                      <Tr key={el.id} style={{backgroundColor:"#6699FF"}}>
                      <Td>{i + 1}</Td>
                      <Td>
                        {"User Name"}
                      </Td>
                      <Td>{el.user?.username}</Td>
                      <Td>{el.password}</Td>
                    </Tr>
                    {/* <Tr key={el.id}>
                      <Td>{el.password}</Td>
                      <Td>
                        {"Name"}
                      </Td>
                      <Td>{el.address[0]?.name}</Td>
                      <Td>{el.password}</Td>
                    </Tr>

                    <Tr key={el.id}>
                      <Td>{el.password}</Td>
                      <Td>
                        {"State"}
                      </Td>
                      <Td>{el.address[0]?.state}</Td>
                      <Td>{el.password}</Td>
                    </Tr>


                    <Tr key={el.id}>
                      <Td>{el.password}</Td>
                      <Td>
                        {"Pin"}
                      </Td>
                      <Td>{el.address[0]?.pin}</Td>
                      <Td>{el.password}</Td>
                    </Tr>

                    <Tr key={el.id}>
                      <Td>{el.password}</Td>
                      <Td>
                        {"Mobile"}
                      </Td>
                      <Td>{el.address[0]?.mobile}</Td>
                      <Td>{el.password}</Td>
                    </Tr> */}


                    {/* <Tr key={el.id}>
                      <Td>{el.password}</Td>
                      <Td>
                        {"City"}
                      </Td>
                      <Td>{el.address[0]?.city}</Td>
                      <Td>{el.password}</Td>
                    </Tr> */}

                    {/* <Tr key={el.id}>
                      <Td>{el.password}</Td>
                      <Td>
                        {"Building"}
                      </Td>
                      <Td>{el.address[0]?.building}</Td>
                      <Td>{el.password}</Td>
                    </Tr> */}

                    <Tr key={el.id}>
                      <Td>IMG</Td>
                      <Td>
                        {"Product Name"}
                      </Td>
                      <Td>{"Price"}</Td>
                      <Td>{"QuanTity"}</Td>
                    </Tr>
                    {el.carts?.map((item:any)=>
                    <>
                    <Tr key={el.id}>
                      <Td><img src={item.products?.productimage[0]?.image} alt="" style={{width:"50px",height:"50px"}} /></Td>
                      <Td>
                        {item.products?.title}
                      </Td>
                      <Td>{item.products?.price}$</Td>
                      <Td>{item.quantity}</Td>
                    </Tr>
                    
                    </>
                    )}
                    <Tr key={el.id}>
                      <Td>{}</Td>
                      <Td>
                        {}
                      </Td>
                      <Td>Total:{calculateTotalPrice(el.carts)}$</Td>
                      <Td>{}</Td>
                    </Tr>
                    </>

                    
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default ManageUserCart;
