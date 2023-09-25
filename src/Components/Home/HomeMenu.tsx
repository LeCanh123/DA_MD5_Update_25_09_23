import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "../../CSS/HomeMenu.css"

const HomeMenu = () => {
    return (
        <Flex
            height={{ base: "3.2rem", md: "4.94rem" }}
            minW={"100%"}
            justify={"space-around"}
            pos="relative"
            align="center"
            display={{ base: "none", lg: "Flex" }}

            width="36%"
            gap={5}


        // border="1px solid red"

        >
            <Flex
                justify={"center"}
                className="dropDown"
                height="100%"
                align={"center"}
                width="15%"
                _hover={{ color: "#f89f17" }}


            >
                <Link to="#">Women</Link>
                <Box
                    top="4rem"
                    className="drop-down-content"
                    left="-2rem"
                    overflow="hidden"
                    bg="white"
                    pos={"absolute"}
                    width="1000px"
                    transition={"all 0.3s"}
                    height={"0vh"}
                    marginTop="14px"
                >
                    <Link to="#">
                        <div className="main-menu">
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Ethnic Wear</p>
                                    <li>
                                        <Link to="#">Kurta / Kurtis</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Kurta Sets</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Ethnic Dresses</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Tops/Tunics</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Leggings/Churidars</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Pants/Palazzos</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Skirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Dupattas/Stoles</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Rain Jackets</Link>
                                    </li>
                                </ul>

                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Western Wear</p>

                                    <li>
                                        <Link to="#">Top/Tees</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Dresses</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jumpsuits</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jeggings</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jeans</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Shorts/Skirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Trousers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Plus Size</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Sleepwear</p>
                                    <li>
                                        <Link to="#">Bras</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Briefs/Panties</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Cami/Slips</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Shapewear</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Nightwear</Link>
                                    </li>

                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Sports  Wear</p>

                                    <li>
                                        <Link to="#">Tops / Tees</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sports Bra</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Leggings</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Joggers / Tracks</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sweatshirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jackets</Link></li>
                                </ul>


                            </div>
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Top Brands</p>

                                    <li>
                                        <Link to="#">Melange</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Ginger</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Code</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Fame Forever</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Kappa</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Biba</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Aurelia</Link>
                                    </li>
                                    <li>
                                        <Link to="#">AND</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Allen Solly</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading"> Summer Essentials</p>
                                    <p className="category-heading"> Beauty</p>
                                    <p className="category-heading"> Footwear/Bags</p>
                                    <p className="category-heading"> Watches </p>
                                    <p className="category-heading"> Jewellery</p>
                                    <p className="category-heading"> Fragrances</p>
                                </ul>

                            </div>
                        </div>
                    </Link>
                </Box>
            </Flex>
            <Flex
                justify={"center"}
                className="dropDown"
                height="100%"
                align={"center"}
                width="15%"
                _hover={{ color: "#f89f17" }}

            >
                <Link to="/men">Men</Link>
                <Box
                    top="4rem"
                    className="drop-down-content"
                    left="-2rem"
                    overflow="hidden"
                    bg="white"
                    pos={"absolute"}
                    width="1000px"
                    transition={"all 0.3s"}
                    height={"0vh"}
                    marginTop="14px"
                >
                    <Link to="#">
                        <div className="main-menu">
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Topwear</p>
                                    <li>
                                        <Link to="#">Casual Shirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Formal Shirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Polos</Link>
                                    </li>
                                    <li>
                                        <Link to="#">T-Shirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jackets</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Hoodies</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sweatshirts</Link>
                                    </li>

                                </ul>
                                <ul>
                                    <p className="category-heading">Bottomwear</p>
                                    <li>
                                        <Link to="#">Casual Trousers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Formal Trousers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jeans</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Track Pants</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Shorts</Link>
                                    </li>


                                </ul>

                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Activewear</p>

                                    <li>
                                        <Link to="#">Polos</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sport T-shirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Track Pants</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sport shoes</Link>
                                    </li>
                                </ul>
                                <ul>
                                    <p className="category-heading">Ethnic</p>

                                    <li>
                                        <Link to="#">Kurta</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Waistcoats</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Pyjamas</Link>
                                    </li>

                                </ul>
                                <ul>
                                    <p className="category-heading">winterwear</p>

                                    <li>
                                        <Link to="#">Hoodies</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sweaters</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jackets</Link>
                                    </li>

                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Innerwear</p>
                                    <li>
                                        <Link to="#">Boxers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Briefs</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Vests</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Loungewear</Link>
                                    </li>

                                </ul>
                                <ul>
                                    <p className="category-heading">Top Brands</p>

                                    <li>
                                        <Link to="#">Us Polp</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Fahrenheit</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Kappa</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Levis</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Cellio</Link>
                                    </li>
                                    <li>
                                        <Link to="#">CODE</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Bossini</Link>
                                    </li>


                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Watches</p>

                                    <li>
                                        <Link to="#">Digital </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Analog </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Fitness</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Smart </Link>
                                    </li>

                                </ul>
                                <ul>
                                    <p className="category-heading">Sunglasses</p>

                                    <li>
                                        <Link to="#">Aviator </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Wayfarer</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Square</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sporty</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Rectangle</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Round</Link>
                                    </li>

                                </ul>


                            </div>
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Shoes</p>

                                    <li>
                                        <Link to="#">Loafers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Slip-Ons</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sports</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Lace up</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Floaters</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sandals</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sneakers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Boots</Link>
                                    </li>
                                    <li>
                                        <Link to="#">slippers</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading"> Grooming</p>
                                    <li>
                                        <Link to="#">Fragrances</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Face-wash</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Skin care</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Hair care</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Beard care</Link>
                                    </li>


                                </ul>
                                <ul>
                                    <p className="category-heading">Add-ons</p>
                                    <li>
                                        <Link to="#">Wallets</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Ties</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Belts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Socks</Link>
                                    </li>



                                </ul>


                            </div>
                        </div>
                    </Link>
                </Box>
            </Flex>
            <Flex
                justify={"center"}
                className="dropDown"
                height="100%"
                align={"center"}
                width="15%"
                _hover={{ color: "#f89f17" }}
            >
                <Link to="#">Kids</Link>
                <Box
                    top="4rem"
                    className="drop-down-content"
                    left="-2rem"
                    overflow="hidden"
                    bg="white"
                    pos={"absolute"}
                    width="900px"
                    transition={"all 0.3s"}
                    height={"0vh"}
                    marginTop="14px"
                >
                    <Link to="#">
                        <div className="main-menu">
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Boys</p>
                                    <li>
                                        <Link to="#">T-Shirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Shirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jeans</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Trackpants</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sweattshirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Hoodies</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Pants</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jackets</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Innerwear</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Joggers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Ethnicwear</Link>
                                    </li>


                                </ul>




                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Girls</p>

                                    <li>
                                        <Link to="#">Tops/Tees</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Dresses</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jumpsuits</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jeans</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Innerwear</Link>
                                    </li>
                                    <li>
                                        <Link to="#">TrackPants</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Ethnicwear</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Shorts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Skirts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Joggers</Link>
                                    </li>

                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Top brands</p>
                                    <li>
                                        <Link to="#">Fame foreverr</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Juniors</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Melange</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Bossini</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Mini Klub</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Allen Solly</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Pepe Jeans</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Lee Cooper</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Peppermint</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Gini</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Jony</Link>
                                    </li>


                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Accessories</p>

                                    <li>
                                        <Link to="#">Face Masks</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Hair Accessories</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Caps</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Hats</Link>
                                    </li>

                                </ul>

                                <ul>
                                    <p className="category-heading">Price point Store</p>

                                    <li>
                                        <Link to="#">Under 299</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Under 399</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Under 499</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Under 599</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Under 699</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Under 799</Link>
                                    </li>

                                </ul>


                            </div>
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Age Store</p>

                                    <li>
                                        <Link to="#">0-2 yrs</Link>
                                    </li>
                                    <li>
                                        <Link to="#">2-4 yrs</Link>
                                    </li>
                                    <li>
                                        <Link to="#">4-6 yrs</Link>
                                    </li>
                                    <li>
                                        <Link to="#">6-10 yrs</Link>
                                    </li>
                                    <li>
                                        <Link to="#">10-13 yrs</Link>
                                    </li>
                                    <li>
                                        <Link to="#">13-16 yrs</Link>
                                    </li>
                                </ul>
                                <ul>
                                    <p className="category-heading">Shop Boys Footwear</p>
                                    <p className="category-heading">Shop Girls Footwear</p>

                                </ul>
                            </div>



                        </div>
                    </Link>
                </Box>
            </Flex>
            <Flex
                justify={"center"}
                className="dropDown"
                height="100%"
                align={"center"}
                width="15%"
                _hover={{ color: "#f89f17" }}

            >
                <Link to="#">Shoes</Link>
                <Box
                    top="4rem"
                    className="drop-down-content"
                    left="-2rem"
                    overflow="hidden"
                    bg="white"
                    pos={"absolute"}
                    width="950px"
                    transition={"all 0.3s"}
                    height={"0vh"}
                    marginTop="14px"
                >
                    <Link to="#">
                        <div className="main-menu">
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Women</p>
                                    <li>
                                        <Link to="#">Ballerinas</Link>
                                    </li>
                                    <li>
                                        <Link to="#">flip-Flops</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sandals</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Heel</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Shoes</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sliders</Link>
                                    </li>


                                </ul>
                                <ul>
                                    <p className="category-heading">Top Brands</p>
                                    <li>
                                        <Link to="#">Ginger</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sketchers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Code</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Catwalk</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Melange</Link>
                                    </li>


                                </ul>

                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Men</p>

                                    <li>
                                        <Link to="#">Loafers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Slip-Ons</Link>
                                    </li>
                                    <li>
                                        <Link to="#">SportsShoes</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Lace up</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Boots</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Floaters</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Slippers</Link>
                                    </li>
                                </ul>
                                <ul>
                                    <p className="category-heading">Top Brands</p>

                                    <li>
                                        <Link to="#">Sketcher</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Forca</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Code</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Puma</Link>
                                    </li>


                                </ul>

                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Boys</p>
                                    <li>
                                        <Link to="#">Shoes</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sandals</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Slippers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Boots</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Socks</Link>
                                    </li>


                                </ul>
                                <ul>
                                    <p className="category-heading">Girls</p>

                                    <li>
                                        <Link to="#">Shoes</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sandals</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Slippers</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Boots</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Socks</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Women Accesories</p>

                                    <li>
                                        <Link to="#">Handbags </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Backpack </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Slings</Link>
                                    </li>
                                    <li>
                                        <Link to="#">clutches </Link>
                                    </li>

                                    <li>
                                        <Link to="#">Wallets</Link>
                                    </li>
                                    <li>
                                        <Link to="#">totes</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Laptop Bags</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Pouch</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Socks</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Fashion</Link>
                                    </li>

                                </ul>


                            </div>
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Men Accessories</p>

                                    <li>
                                        <Link to="#">Backpack</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Wallets</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Belts</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Masks</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Socks</Link>
                                    </li>

                                    <ul>
                                        <p className="category-heading"> Essentials</p>
                                        <li>
                                            <Link to="#">Flip-flop</Link>
                                        </li>
                                        <li>
                                            <Link to="#">MultiUtility Bag</Link>
                                        </li>

                                    </ul>
                                </ul>

                            </div>



                        </div>
                    </Link>
                </Box>
            </Flex>
            <Flex
                justify={"center"}
                className="dropDown"
                height="100%"
                align={"center"}
                width="15%"
                _hover={{ color: "#f89f17" }}

            >
                <Link to="#">Beauty</Link>
                <Box
                    top="4rem"
                    className="drop-down-content"
                    left="-2rem"
                    overflow="hidden"
                    bg="white"
                    pos={"absolute"}
                    width="1000px"
                    transition={"all 0.3s"}
                    height={"0vh"}
                    marginTop="14px"
                >
                    <Link to="#">
                        <div className="main-menu">
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Lips</p>
                                    <li>
                                        <Link to="#">Lipstick</Link>
                                    </li>
                                    <li>
                                        <Link to="#"> Liquis Lipstick</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Lip Crayon</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Lip Gloss</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Lip Liner</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Lip Balm</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Lip Stain</Link>
                                    </li>

                                </ul>
                            </div>
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Face</p>
                                    <li>
                                        <Link to="#">Face Primer</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Concealer</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Foundation</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Compact Powder</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Blush & Highlighter</Link>
                                    </li>
                                    <li>
                                        <Link to="#">BB & CC Cream</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Makeup Remover</Link>
                                    </li>

                                </ul>
                            </div>



                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Eyes</p>

                                    <li>
                                        <Link to="#">Kajal</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Eyeliner</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Mascara</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Eye Shadow</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Eyebrow</Link>
                                    </li>
                                </ul>
                                <ul>
                                    <p className="category-heading">Nails</p>

                                    <li>
                                        <Link to="#">Nail Polish</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Remover</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Nail Tools</Link>
                                    </li>

                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">SkinCare</p>
                                    <li>
                                        <Link to="#">Moisturizer</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sunscreen</Link>
                                    </li>
                                    <li>
                                        <Link to="#">FaceWash</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Masks</Link>
                                    </li>

                                    <li>
                                        <Link to="#">Serum</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Eye Cream</Link>
                                    </li>
                                    <li>
                                        <Link to="#">HandCare</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Body Lotions</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Bath & Body</p>

                                    <li>
                                        <Link to="#">Soaps </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Gel </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Scrub</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Wipes </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sanitisers </Link>
                                    </li>

                                </ul>


                            </div>
                            <div className="hoverlist">
                                <ul>
                                    <p className="category-heading">Fragrances</p>

                                    <li>
                                        <Link to="#">Deodorants </Link>
                                    </li>
                                    <li>
                                        <Link to="#">Perfumes</Link>
                                    </li>
                                    <li>
                                        <Link to="#">Sets</Link>
                                    </li>


                                </ul>
                            </div>

                        </div>
                    </Link>
                </Box>
            </Flex>

        </Flex>
    );
};

export default HomeMenu;