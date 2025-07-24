import React, {useState} from 'react'
import {Container, VStack, Heading, Box, Input, Button, Alert, CloseButton} from '@chakra-ui/react';
import { useColorModeValue } from '../components/ui/color-mode';
import { useProductStore} from '@/store/product.js';


const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const [alert, setAlert] = useState({
    show: false,
    message: '',
    staus: 'error'
  })

  const { createProduct } = useProductStore()

  const showAlert = (message, status) => {
        setAlert({
            show: true,
            message,
            status
        });
        
        setTimeout(() => {
            setAlert({ show: false, message: '', status: 'error' });
        }, 5000);
    };

  const handleAddProduct = async() => {
    const {success, message} = await createProduct(newProduct)
    console.log("Success:", success)
    console.log("Message:", message)
    if(!success){
      showAlert(message, 'error')
    }
    else{
      showAlert(message, 'success')
    }
    setNewProduct({
        name: "",
        price: "",
        image: ""
      });
  };

  return (
    <>
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
              <Alert.Content>
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
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>
            <Box w={"full"} bg={useColorModeValue("white", "gray.900")} 
            p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                    <Input
                    placeholder="Product Name"
                    name="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}/>
                    <Input
                    placeholder="Price"
                    name="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}/>
                    <Input
                    placeholder="Image URL"
                    name="image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}/>
                    <Button colorPalette="blue" onClick={handleAddProduct} w="full">Add Product</Button>
                </VStack>
            </Box>
        </VStack>
    </Container>
    </>
  )
}

export default CreatePage 