import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "@/redux/MenReducer/reducer";



function SearchBar() {
  const dispatch = useDispatch();
  const [search1,setSearch1]=useState("");

  const { search } = useSelector((store:any) => {
    return store.MenReducer;
  });
  const handleSearch=(e:any)=>{
    console.log("search ",e);
    if(e){
      console.log("có");
      let searchProductResult=searchProduct({key:e,search:"true"},dispatch);

    }else{
      let searchProductResult=searchProduct({key:e,search:"false"},dispatch);
      
    }
    
  }
  return (
    <Box borderRadius={"md"} pos="relative">
      <InputGroup>
        <InputLeftElement children={<BsSearch color="gray.300" />} />
        <Input
        onChange={(e)=>handleSearch(e.target.value)}
          type="text"
          outline="none"
          placeholder="What are you looking for?"
          backgroundColor={"#ffffff"}
          _focus={{
            boxShadow: "none",
            border: "1px solid #f89f17",
            outline: "none",
          }}
        />
      </InputGroup>
    </Box>
  );
}

export default SearchBar;
