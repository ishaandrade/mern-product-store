import { Container, VStack, Heading, HStack, Link, Text, Box, SimpleGrid, Alert, Dialog, CloseButton} from '@chakra-ui/react'
import React, {useState} from 'react'
import { PiShoppingBagOpenFill } from "react-icons/pi";
import { HiOutlineEmojiSad } from "react-icons/hi";
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore } from '@/store/product';
import { useEffect } from 'react';
import  ProductCard  from '../components/ProductCard';


const HomePage = () => {
  const color = useColorModeValue("gray.500", "gray.400")
  const { fetchProducts, products } = useProductStore();

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    status: 'error' 
});
  const showAlert = (message, status) => {
    setAlert({
        show: true,
        message,
        status
    });
    
    setTimeout(() => {
        setAlert({ show: false, message: '', status: 'error' });
    }, 3000);
};

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  console.log("products:", products)

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={"2xl"} textAlign={"center"} mb={8}  color={'blue.500'} textTransform={"uppercase"} fontWeight={'bold'}>
          <HStack>Current Products<PiShoppingBagOpenFill fontSize={20}/></HStack>
        </Heading>
        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3
          }}
          spacing={20}
          w="full"
        >
          {products.map((product) => (
            <Box key={product._id} margin={5} spacing={20}><ProductCard product={product} onChange={showAlert}/></Box>
          ))}
           {alert.show && (
              <Alert.Root 
                  status={alert.status} 
                  variant="solid"
                  position="fixed"
                  bottom="20px"
                  left="50%"
                  transform="translateX(-50%)"
                  zIndex={9999}
                  maxW="400px"
                  boxShadow="2xl"
                  rounded="lg"
                   size="md"
              >
                  <Alert.Indicator />
                  <Alert.Content position={"relative"}>
                      <Alert.Title>
                          {alert.status === "error" ? "Error" : "Success"}
                      </Alert.Title>
                      <Alert.Description>
                          {alert.message}
                      </Alert.Description>
                    <CloseButton position="fixed" top="4px" right="4px" onClick={() => setAlert(prev => ({ ...prev, show: false }))} />
                  </Alert.Content>          
              </Alert.Root>
          )} 
        </SimpleGrid>
        {products.length === 0 && (
          <HStack>
          <Text color={color} fontWeight={'bold'}>No Products Found </Text> 
          <Box color={'blue.500'} fontSize={20}><HiOutlineEmojiSad/></Box>
          <Link href="/create" color={'blue.500'} fontWeight={'bold'}>Create a Product</Link>
        </HStack>
      )}


      </VStack>

    </Container>
  )
}

export default HomePage