import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  useToast,
  Select,
} from "@chakra-ui/react";
import Navbar from "../Components/Home/Navbar";
import Footer from "../Components/Home/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const initialState = {
  cardno: "",
  ExpiringDate: "",
  cvv: "",
};


function Payment() {


  return (
    <Box>
      <Navbar />

      <Box
        width={{ base: "90%", sm: "90%", md: "90%", lg: "80%" }}
        margin="auto"
      >
        <Box pt={"20px"} pb="20px">
          <Text color={"gray.600"} fontSize={"24px"}>
            Payment & Place Order
          </Text>
        </Box>
        <Flex
          gap={20}
          flexDirection={{
            base: "column-reverse",
            sm: "column-reverse",
            md: "row",
            lg: "row",
          }}
          justifyContent="center"
          marginBottom={"30px"}
        >
          <Box
            border="1px solid #bab8b4"
            padding={"20px"}
            width={{ base: "100%", sm: "100%", md: "60%", lg: "60%" }}
          >
            <Text color={"black"} fontSize={"22px"} mb={"10px"}>
              Payment method
            </Text>

            <Flex
              flexDir={{
                base: "column",
                sm: "column",
                md: "column",
                lg: "row",
              }}
              justifyContent={"space-around"}
              gap={"20px"}
            >
              <RadioGroup
                // border="1px solid black"
                width={{ base: "100%", sm: "100%", md: "100%", lg: "40%" }}
                // onChange={handlePaymentOptionChange}
                // value={paymentOption}
              >
                <Stack spacing={2}>
                  <Radio colorScheme="yellow" value="debit-card">
                    Debit Card
                    <br />
                    <Text fontSize={"9px"}>(Use your Debit card)</Text>
                  </Radio>
                  <Radio colorScheme="yellow" value="upi">
                    UPI Payment
                    <br />
                    <Text fontSize={"9px"}>(Pay with UPI app)</Text>
                  </Radio>
                  <Radio colorScheme="yellow" value="netbanking">
                    Net Banking
                    <br />
                    <Text fontSize={"9px"}>(Pay by your prefered bank)</Text>
                  </Radio>
                  <Radio colorScheme="yellow" value="cash">
                    Cash on Delivery
                    <br />
                    <Text fontSize={"9px"}>(Pay as a Cash)</Text>
                  </Radio>
                </Stack>
              </RadioGroup>

              {/* {paymentOption === "debit-card" && ( */}
              {"debit-card" === "debit-card" && (
                <Box
                  // border="1px solid black"
                  width={{ base: "100%", sm: "100%", md: "100%", lg: "60%" }}
                  textAlign={"center"}
                >
                  <Box>
                    <FormControl>
                      <FormLabel>Card number</FormLabel>
                      <Input
                        type="number"
                        _focus={{ border: "1px solid #cea464" }}
                        placeholder="Enter card number"
                        // value={data.cardno}
                        // onChange={handleChange}
                        name="cardno"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Expiration date</FormLabel>
                      <Input
                        type="month"
                        _focus={{ border: "1px solid #cea464" }}
                        placeholder="MM/YY"
                        // value={data.ExpiringDate}
                        // onChange={handleChange}
                        name="ExpiringDate"
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>CVV</FormLabel>
                      <Input
                        type="password"
                        _focus={{ border: "1px solid #cea464" }}
                        placeholder="Enter CVV"
                        // value={data.cvv}
                        // onChange={handleChange}
                        name="cvv"
                      />
                    </FormControl>
                    <Button
                      bgColor="#df9018"
                      _hover={{ bgColor: "#f89f17" }}
                      color="white"
                      fontSize={{
                        base: "10px",
                        sm: "15px",
                        md: "18px",
                        lg: "20px",
                      }}
                      margin=" 10px auto"
                      // onClick={handlePaymentSubmit}
                    >
                      Get Otp
                    </Button>
                    {/* {carddetails !== "" ? ( */}
                    {true ? (
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your Otp"
                          // value={enteredotp}
                          // onChange={(e) => setEnteredOtp(e.target.value)}
                        />
                        <Button
                          bgColor="#df9018"
                          _hover={{ bgColor: "#f89f17" }}
                          color="white"
                          fontSize={{
                            base: "10px",
                            sm: "15px",
                            md: "18px",
                            lg: "20px",
                          }}
                          margin=" 10px auto"
                          // onClick={handlePay}
                        >
                          {" "}
                          Pay{" "}
                        </Button>
                      </FormControl>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              )}
              {/* {paymentOption === "upi" && ( */}

              {"upi" === "upi" && (
                <Box
                  // border="1px solid black"
                  width={{ base: "100%", sm: "100%", md: "100%", lg: "60%" }}
                  textAlign={"center"}
                  margin={"auto 0"}
                >
                  <Box>
                    <FormControl>
                      <FormLabel>Your UPI ID</FormLabel>
                      <Input
                        _focus={{ border: "1px solid #cea464" }}
                        placeholder="Enter your UPI ID"
                      />
                    </FormControl>
                    <Button
                      bgColor="#df9018"
                      _hover={{ bgColor: "#f89f17" }}
                      color="white"
                      fontSize={{
                        base: "10px",
                        sm: "15px",
                        md: "18px",
                        lg: "20px",
                      }}
                      margin=" 10px auto"
                      // onClick={handlePaymentSubmit}
                    >
                      Pay Now
                    </Button>
                  </Box>
                </Box>
              )}
              {/* {paymentOption === "netbanking" && ( */}

              {"netbanking" === "netbanking" && (
                <Box
                  // border="1px solid black"
                  width={{ base: "100%", sm: "100%", md: "100%", lg: "60%" }}
                  textAlign={"center"}
                  margin={"auto 0"}
                >
                  <Box>
                    <Select placeholder="Select your Bank">
                      <option value="SBI NB"> SBI NB</option>
                      <option value="Punjab Bank">Punjab Bank</option>
                      <option value="HDFC Bank">HDFC Bank</option>
                      <option value="Kotak Bank">Kotak Bank</option>
                      <option value="Punjab Bank">Punjab Bank</option>
                      <option value="Axis Bank">Axis Bank</option>
                      <option value="Bank of India">Bank of India</option>
                      <option value="Other Bank">Other Bank</option>
                    </Select>
                    <Button
                      bgColor="#df9018"
                      _hover={{ bgColor: "#f89f17" }}
                      color="white"
                      fontSize={{
                        base: "10px",
                        sm: "15px",
                        md: "18px",
                        lg: "20px",
                      }}
                      margin=" 10px auto"
                      // onClick={handlePaymentSubmit}
                    >
                      Pay Now
                    </Button>
                  </Box>
                </Box>
              )}

              {/* {paymentOption === "cash" && ( */}
              { "cash" === "cash" && (
                <Box
                  //  border="1px solid black"
                  width={{ base: "100%", sm: "100%", md: "100%", lg: "60%" }}
                  textAlign={"center"}
                  margin={"auto 0"}
                >
                  <Box>
                    <Text fontSize={"12px"} color="#939290" mt={"20px"}>
                      Pay at the time of delivery by cash or scan QR and pay
                      through UPI.
                    </Text>
                    <Image
                      margin={"auto"}
                      src="https://i1.lmsin.net/website_images/in/checkout/cod-theme-icon.svg"
                    />

                    <Button
                      bgColor="#df9018"
                      _hover={{ bgColor: "#f89f17" }}
                      color="white"
                      fontSize={{
                        base: "10px",
                        sm: "15px",
                        md: "18px",
                        lg: "20px",
                      }}
                      margin=" 10px auto"
                      // onClick={handlePaymentSubmit}
                    >
                      Place Order
                    </Button>
                  </Box>
                </Box>
              )}
            </Flex>
            <Box fontSize={"12px"} color="#939290">
              <Box mb="10px">
                <Image src="https://i1.lmsin.net/website_images/in/checkout/comodo-secure-icon.svg" />
              </Box>
              <Text mb="10px">
                Your credit card details are securely encrypted and passed
                directly to our PCI DSS compliant Payment Gateway for
                processing. We only store your credit card's last 4 digits and
                the expiration date. Your traffic to this page is secured using
                either a 256-bit or 128-bit SSL certificate depending on your
                browser version.
              </Text>
              <Text mb="10px">© 2021 RNA Intellectual Property Limited.</Text>
              <Text mb="10px">
                Privacy Policy-Terms of Use- Terms & Condition{" "}
              </Text>
            </Box>
          </Box>

          {/* -------- */}

          <Box
            border="1px solid #bab8b4"
            padding={"20px"}
            width={{ base: "80%", sm: "80%", md: "40%", lg: "40%" }}
            margin={"0 auto"}
          >
            <Text
              textAlign={"center"}
              color={"black"}
              fontSize={"22px"}
              marginBottom="15px"
            >
              Payable Amount
            </Text>
            <Box
              border="1px solid #bab8b4"
              width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
              margin={"0 auto"}
              height="150px"
            >
              <Flex
                justifyContent={"space-around"}
                marginBottom="20px"
                marginTop={"10px"}
              >
                <Text
                  fontSize={{
                    base: "14px",
                    sm: "17px",
                    md: "16px",
                    lg: "18px",
                  }}
                >
                  Total MRP
                </Text>
                <Text
                  fontSize={{
                    base: "14px",
                    sm: "17px",
                    md: "16px",
                    lg: "18px",
                  }}
                  fontWeight="bold"
                >
                  {/* ${getTotalPrice() - saved} /- */}
                </Text>
              </Flex>

              <Flex justifyContent={"space-around"} marginBottom="20px">
                <Text
                  fontSize={{
                    base: "14px",
                    sm: "17px",
                    md: "16px",
                    lg: "18px",
                  }}
                >
                  Standard Shipping
                </Text>
                <Text
                  fontSize={{
                    base: "14px",
                    sm: "17px",
                    md: "16px",
                    lg: "18px",
                  }}
                  fontWeight="bold"
                  color={"green"}
                >
                  Free
                </Text>
              </Flex>
              <Box width="90%" margin="0 auto 10px auto">
                <Divider />
              </Box>

              <Flex justifyContent={"space-around"} marginBottom="20px">
                <Text
                  fontSize={{
                    base: "14px",
                    sm: "17px",
                    md: "16px",
                    lg: "18px",
                  }}
                  fontWeight="semibold"
                >
                  Grand Total
                </Text>
                <Text
                  fontSize={{
                    base: "14px",
                    sm: "17px",
                    md: "16px",
                    lg: "18px",
                  }}
                  fontWeight="bold"
                >
                  {/* ${getTotalPrice() - saved} /- */}
                </Text>
              </Flex>
            </Box>
            <Box marginTop={"20px"}>
              <Text fontWeight={"bold"} color="#df9018" marginBottom={"5px"}>
                Order Summary
              </Text>

              {/* {cartItems.map((item) => {
                return (
                  <Flex
                    flexDir={{
                      base: "column",
                      sm: "row",
                      md: "column",
                      lg: "row",
                    }}
                    gap={3}
                    border="1px solid #bab8b4"
                    padding={"5px"}
                    mb="10px"
                  >
                    <Box>
                      <Image width="70px" height="100px" src={item.image} />
                    </Box>
                    <Box>
                      <Text
                        fontWeight={"bold"}
                        fontSize={{
                          base: "12px",
                          sm: "14px",
                          md: "16px",
                          lg: "16px",
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        fontWeight={"bold"}
                        fontSize={{
                          base: "12px",
                          sm: "14px",
                          md: "16px",
                          lg: "16px",
                        }}
                      >
                        ${item.price}/-
                      </Text>
                      <Text
                        fontSize={{
                          base: "12px",
                          sm: "14px",
                          md: "16px",
                          lg: "16px",
                        }}
                      >
                        Qty:{item.quantity}
                      </Text>
                      <Text
                        fontSize={{
                          base: "12px",
                          sm: "14px",
                          md: "16px",
                          lg: "16px",
                        }}
                      >
                        📆 Delivery by 3-4 days
                      </Text>
                    </Box>
                  </Flex>
                );
              })} */}
            </Box>
          </Box>
        </Flex>

        <Box
          width={{ base: "90%", sm: "90%", md: "90%", lg: "85%" }}
          margin="auto"
        >
          <Divider />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}

export default Payment;
