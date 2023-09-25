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


function ManageUsers() {
  const toast = useToast();
  const [userData, setUserData] = useState([]);

  const getData = async() => {
    let getUser:any= await adminUsers.getlistUser(localStorage.getItem("loginToken1"));
    console.log(getUser);
    
    if(getUser.data?.status){
      // toast({
      //   title: "Success",
      //   description: getUser.data.message,
      //   status: "success",
      //   duration: 2000,
      //   isClosable: true,
      //   position: "top",
      // });
      setUserData(getUser.data?.data)
    }else{
      toast({
        title: "Err",
        description: getUser.data.message,
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

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <Grid width="70%" h={"auto"} ml="20px" m={"auto"} style={{position:"relative",top:"100px"}}>
        <TableContainer width="90%" h={"auto"} ml="150px" mb="20px">
          <Table variant="simple">
            <Thead bg="#285e61">
              <Tr>
                <Th color={"white"}>S.No</Th>
                <Th color={"white"}>User Name</Th>
                <Th color={"white"}>User email</Th>
                <Th color={"white"}>User password</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userData.length > 0 &&
                userData.map((el:any, i:any) => {
                  return (
                    <Tr key={el.id}>
                      <Td>{i + 1}</Td>
                      <Td>
                        {el.username}
                      </Td>
                      <Td>{el.email}</Td>
                      <Td>{el.password}</Td>
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default ManageUsers;
