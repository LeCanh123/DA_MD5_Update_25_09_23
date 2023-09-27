import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchMensData, getProductByCategory, searchProduct } from "@/redux/MenReducer/reducer";
import { useSearchParams } from "react-router-dom";



function SearchBar() {
  const dispatch = useDispatch();



  const [searchParams, setSearchParams]:any = useSearchParams();
  const intialOrder = searchParams.get("order");
  const initialCategory = searchParams.getAll("category");
  const intialPage = searchParams.get("page");

  

  const { search } = useSelector((store:any) => {
    return store.MenReducer;
  });
  const [search1,setSearch1]=useState("");


  console.log("searchsearch",search);
  
  const handleSearch=(e:any)=>{
    console.log("search ",e);
    if(e){
      console.log("có");
      //lấy trang 
      //lấy category
      const initialCategory1 = searchParams.getAll("category");
      if(initialCategory1.length!=0){
        const itemsPerPage1 = import.meta.env.VITE_ITEM_PER_PAGE;
        const currentPage1 = parseInt(searchParams.get('page')) || 1;
        const startIndex1 = (currentPage1 - 1) * itemsPerPage1;
        const intialOrder1 = searchParams.get("order");
        let getProductByCategory2=getProductByCategory({token:localStorage.getItem("loginToken1"),
          listCategory:initialCategory,
          skip:startIndex1,
          take:itemsPerPage1,
          sortby:intialOrder1,
          search:e
          },dispatch)
      }else{
        const itemsPerPage1 = import.meta.env.VITE_ITEM_PER_PAGE;
        const currentPage1 = parseInt(searchParams.get('page')) || 1;
        const startIndex1 = (currentPage1 - 1) * itemsPerPage1;
        const intialOrder1 = searchParams.get("order");
        let menproduct= fetchMensData({skip:startIndex1,take:import.meta.env.VITE_ITEM_PER_PAGE,sortby:intialOrder1,
          search:e
        },dispatch);
      }


      let searchProductResult=searchProduct({key:e,search:"true"},dispatch);
    }else{
      const initialCategory1 = searchParams.getAll("category");
      if(initialCategory1.length!=0){
        const itemsPerPage1 = import.meta.env.VITE_ITEM_PER_PAGE;
        const currentPage1 = parseInt(searchParams.get('page')) || 1;
        const startIndex1 = (currentPage1 - 1) * itemsPerPage1;
        const intialOrder1 = searchParams.get("order");
        let getProductByCategory2=getProductByCategory({token:localStorage.getItem("loginToken1"),
          listCategory:initialCategory,
          skip:startIndex1,
          take:itemsPerPage1,
          sortby:intialOrder1,
          search:e
          },dispatch)
      }else{
        const itemsPerPage1 = import.meta.env.VITE_ITEM_PER_PAGE;
        const currentPage1 = parseInt(searchParams.get('page')) || 1;
        const startIndex1 = (currentPage1 - 1) * itemsPerPage1;
        const intialOrder1 = searchParams.get("order");
        let menproduct= fetchMensData({skip:startIndex1,take:import.meta.env.VITE_ITEM_PER_PAGE,sortby:intialOrder1,
          search:e
        },dispatch);
      }
      let searchProductResult=searchProduct({key:e,search:"false"},dispatch);
    }
  }


  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // Gọi function tìm kiếm ở đây
      handleSearch(search1);
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [search1]);




  return (
    <Box borderRadius={"md"} pos="relative">
      <InputGroup>
        <InputLeftElement children={<BsSearch color="gray.300" />} />
        <Input
        value={search1}
        onChange={(e)=>setSearch1(e.target.value)}
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
