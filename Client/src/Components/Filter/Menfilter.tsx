import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


interface Props {
  type: string;
}

const Menfilter: React.FC<Props> = ({ type }) => {
  // const dispatch = useDispatch();
  const { category1 } = useSelector((store:any) => {
    return store.MenReducer;
  });




  const getCurrentPage = (page:number) => {
    page = Number(page);

    if (typeof page !== "number" || page <= 0 || !page) {
      return 1;
    }
    return page;
  };
  const initRef = React.useRef();
  const [searchParams, setSearchParams]:any = useSearchParams();
  const initialCategory = searchParams.getAll("category");
  const [category, setCategory] = useState(initialCategory || []);
  
  // const [page, setPage] = useState(getCurrentPage(Number(searchParams.get("page"))));
  // console.log("page mènfilter",page);
  let page=searchParams.get("page")
  
  const intialOrder = searchParams.get("order");
  const [order, setOrder] = useState(intialOrder || "");

  const handleSort = (e:any) => {
    setOrder(e.target.value);
  };

  const handleChange = (e:any) => {
    let newCategory = [...category];
    const value = e.target.value;
    if (newCategory.includes(value)) {
      newCategory = newCategory.filter((el) => {
        return el !== value;
      });
    } else {
      newCategory.push(value);
    }
    setCategory(newCategory);
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
    <Flex
      width="auto"
      flexDirection={{ base: "column", sm: "column", md: "row", lg: "row" }}
      gap="20px"
      margin="40px"
      padding="15px"
      backgroundColor="	#F0F0F0"
      justifyContent={"center"}
    >
      <div onChange={handleSort}>
        <Popover
          trigger={"hover"}
          closeOnBlur={false}
          placement="bottom-start"
          // initialFocusRef={initRef}
        >
          {({ isOpen, onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  fontSize={{ base: "15px", sm: "20px", md: "20px" }}
                  style={{ backgroundColor: "white" }}
                >
                  Filter By Price
                  <span style={{ marginLeft: "10px" }}>
                    {isOpen ? (
                      <ChevronDownIcon fontSize={"xl"} />
                    ) : (
                      <ChevronUpIcon fontSize={"xl"} />
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverBody>
                    <input
                      style={{ marginRight: "10px" }}
                      value={"asc"}
                      type="radio"
                      name="order"
                      defaultChecked={order === "asc"}
                    />
                    <label>Low To High</label>
                    <br />
                    <br />
                    <input
                      style={{ marginRight: "10px" }}
                      value={"desc"}
                      name="order"
                      type="radio"
                      defaultChecked={order === "desc"}
                    />
                    <label>High To Low</label>
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
      </div>

      <div>
        <Popover
          trigger={"hover"}
          closeOnBlur={false}
          placement="bottom-start"
          // initialFocusRef={initRef}
        >
          {({ isOpen, onClose }) => (
            <>
              <PopoverTrigger>
                <Button
                  fontSize={{ base: "15px", sm: "20px", md: "20px" }}
                  style={{ backgroundColor: "white" }}
                >
                  Filter By Category{" "}
                  <span style={{ marginLeft: "10px" }}>
                    {isOpen ? (
                      <ChevronDownIcon fontSize={"xl"} />
                    ) : (
                      <ChevronUpIcon fontSize={"xl"} />
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent>
                  <PopoverBody>
                    {category1.map((category2:any)=>
                      <>
                       <input
                      onChange={handleChange}
                      checked={category.includes(
                        category2.name
                      )}
                      style={{ marginRight: "10px" }}
                      value={category2.name}
                      type="checkbox"
                    />
                    <label>
                      {category2.name}
                    </label><br></br>
                      </>
                      )}
                  </PopoverBody>
                </PopoverContent>
              </Portal>
            </>
          )}
        </Popover>
      </div>
    </Flex>
  );
};

export default Menfilter;
