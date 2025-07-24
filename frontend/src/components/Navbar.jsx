import React from 'react'
import { Container, Flex, Text, Link, HStack, Button} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'; 
import { CiSquarePlus } from "react-icons/ci";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { useColorMode, useColorModeValue } from './ui/color-mode';




const Navbar = () => {
  const { colorMode, toggleColorMode} = useColorMode();
  const bg = useColorModeValue("gray.100", "gray.800")
  return <Container maxW={"full"}>
    <Flex 
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base: "column",
            sm: "row"
        }}>
            <Link
                as={RouterLink}
                to="/"
                color={'blue.500'}
                fontSize={{base: 22, sm: 28}}
                fontWeight={"bold"}
                fontFamily={"revert"}
                textTransform={"uppercase"}
                textAlign={"center"}
                display="inline-block"
                >
                <HStack>Product Store <FaShoppingCart fontSize={20}/></HStack>
            </Link>
            
            <HStack spacing={2} alignItems={"center"}>
                <Link href={"/create"}>
                <Button bg={colorMode === "light" ? "white" : 'gray.900'} color={"blue.500"} _hover={{bg: 'blue.100'}}>
                    <CiSquarePlus fontSize={20}/>
                </Button></Link>
                <Button  onClick={toggleColorMode}  bg={colorMode === "light" ? "white" : 'gray.900'} color={"blue.500"} _hover={{bg: 'blue.100'}}>
                    {colorMode === "light" ? <MdDarkMode fontSize={20} color=''/> : <MdLightMode fontSize={20}/>}
                </Button>
            </HStack>

    </Flex>
  </Container>
}

export default Navbar;
