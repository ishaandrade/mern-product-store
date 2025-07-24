import React, { useState } from 'react'
import { Box, Image, Heading, Text, HStack, Dialog, Portal, Input, VStack, Button, CloseButton, useDisclosure} from '@chakra-ui/react'
import { useColorModeValue } from './ui/color-mode';
import { CiEdit } from "react-icons/ci"
import { MdDeleteOutline } from "react-icons/md";
import { useProductStore} from '@/store/product.js';
import { IoMdCloseCircleOutline } from "react-icons/io";


const ProductCard = ({product, onChange}) => {
    const textColor = useColorModeValue("gray.500", "gray.300");
    const bg = useColorModeValue("white", "gray.900");
    const [isDialogOpen, setIsDialogOpen] = useState(false);



    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        image: product.image
      });

    const { updateProduct } = useProductStore()
    const { deleteProduct } = useProductStore()


    const handleDeleteProduct = async (pid) => {

        const {success, message} = await deleteProduct(pid)
        if(!success){
            onChange(message, 'error');
        } else {
            onChange(message, 'success');
         }
    }
    

    const handleUpdateProduct = async (pid, updatedProductData) => {
        const {success, message} = await updateProduct(pid, updatedProductData)
        setIsDialogOpen(false);
        if(!success){
            onChange(message, 'error');
        } else {
            onChange(message, 'success');  
        }     
    }

  return (
    <>
        <Box
        padding={2}
        shadow='lg'
        rounded='lg'
        overflow='hidden'
        transition='all 0.3s'
        _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
        bg={bg}>

            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"}/>
            <Box p={1}>
                <Heading as='h3' mb={2}>
                    {product.name}
                </Heading>
            </Box>
            <Text p={1} fontWeight="bold" fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>

            <HStack p={1} spacing={5} fontSize={20} display="flex">
                <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen} size="xl" w="full">
                    <Dialog.Trigger asChild>
                        <Box onClick={() => setIsDialogOpen(true)} bg={'blue.200'} rounded={'lg'} shadow={'lg'} p={2} color={'gray.900'}>
                            <CiEdit/>
                        </Box>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop/>
                        <Dialog.Positioner>
                            <Dialog.Content>
                                <Dialog.Header justifyContent={"space-between"}>
                                    <Dialog.Title fontSize={25}>Edit Product</Dialog.Title>
                                    <Box fontSize={25} cursor={"pointer"} onClick={() => setIsDialogOpen(false)}><IoMdCloseCircleOutline/></Box>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Box w={"full"} bg={useColorModeValue("white", "gray.900")} 
                                    p={6} rounded={"lg"} shadow={"md"}>
                                        <VStack spacing={4}>
                                            <Input 
                                            placeholder='Product Name'
                                            name='name'
                                            value={updatedProduct.name}
                                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                                            <Input 
                                            placeholder='Price'
                                            name='price'
                                            value={updatedProduct.price}
                                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                                            <Input 
                                            placeholder='Image URL'
                                            name='image'
                                            value={updatedProduct.image}
                                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
                                            <HStack alignSelf={"end"} spacing={4} mt={2}>
                                                <Button colorPalette="blue" onClick={() => handleUpdateProduct(product._id, updatedProduct)} flex={1}>Update</Button>
                                                <Button variant={"ghost"} onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                            </HStack>
                                        </VStack>                               
                                    </Box>
                                </Dialog.Body>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
                <Button
                    onClick={() => handleDeleteProduct(product._id)}
                    bg="red.200"
                    color="gray.900"
                    rounded="lg"
                    shadow="lg"
                    p={2}
                    >
                    <MdDeleteOutline />
                </Button>
            </HStack>
        </Box>
    </>
  )
}
export default ProductCard;