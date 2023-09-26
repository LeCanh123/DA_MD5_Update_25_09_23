import { Box, Button, Center } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";



const Pagination1 = () => {
  const navigate = useNavigate();
  const { total } = useSelector((store:any) => {
    return store.MenReducer;
  });
  const getCurrentPage = (page:any) => {
    page = Number(page);

  if (typeof page !== "number" || page <= 0 || !page) {
      return 1;
    }
    return page;
  };

  const [searchParams, setSearchParams]:any = useSearchParams();
  const [page, setPage] = useState(getCurrentPage(searchParams.get("page")));

  const intialOrder = searchParams.get("order");
  const [order, setOrder] = useState(intialOrder || "");

  const initialCategory = searchParams.getAll("category");
  
  const [category, setCategory] = useState(initialCategory || []);


  const handlePage = (val:any) => {
    setPage((prev) => prev + val);
  const [category1, setCategory] = useState(initialCategory || []);

    const categoryParams = category1.map((cat:any) => `category=${cat}`).join("&");
    
    navigate(`/men?page=${ page + val}&${categoryParams}`)
  };

  useEffect(() => {
    let params = { 
      order,
      page,
      category,
    };
    order && (params.order = order);
    setSearchParams(params);
  }, [category, page, order]);

  return (
    <Box width={"80%"} margin="auto">
      <Center>
        <Box>
          <Button isDisabled={page === 1} onClick={() => handlePage(-1)}>
            Prev
          </Button>{" "}
          <span />
          <Button>{page}</Button> <span />
          <Button
            isDisabled={page === Math.ceil(total / import.meta.env.VITE_ITEM_PER_PAGE)}
            onClick={() => handlePage(+1)}
          >
            Next
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default Pagination1;
