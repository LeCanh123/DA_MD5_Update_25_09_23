import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

function SearchBar() {
  const [search1,setSearch1]=useState("");

  const handleSearch=(e:any)=>{
let blockItem=document.querySelectorAll(".product-card")
blockItem.forEach((e1)=>{
  console.log(e1);
  e1.innerText.toLowerCase().indexOf(e.toLowerCase())!=-1?e1.classList.remove('hidden1'):e1.classList.add('hidden1')
})
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
