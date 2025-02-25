import { Card, CardBody, Image, Heading, Text, Box, Stack, HStack, IconButton, useToast, useDisclosure } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useStore } from '../Store/store';
import EditProductModal from './EditProductModal';
import { px } from 'framer-motion';

const ProductCard = ({ imageUrl, name, price, pid }) => {
  const { DeleteProduct } = useStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    const res = await DeleteProduct(pid);
    if(res.success) {
      toast({
        title: 'Product deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: 'Failed to delete product',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <>
      <Card 
        maxW={{ base: "100%", sm: "400px", md: "500px", lg: "600px" }}
        w="100%"
        borderRadius="lg" 
        overflow="hidden" 
        margin={8}
        boxShadow="md"
        transition="all 0.3s ease-in-out"
        _hover={{
          transform: "translateY(-8px)",
          boxShadow: "xl",
          cursor: "pointer"
        }}
      >
        <Box position="relative" h="200px">
          <Image
            src={imageUrl}
            alt={name}
            objectFit="cover"
            w="100%"
            h="100%"
            borderTopRadius="lg"
          />
        </Box>

        <CardBody>
          <Stack spacing={3}>
            <Heading size="md" noOfLines={1}>
              {name}
            </Heading>
            
            <Text fontSize="2xl" fontWeight="bold" color="blue.600">
              Rs {price.toFixed(2)}
            </Text>
            <HStack>
              <IconButton
                icon={<EditIcon />}
                aria-label="Edit product"
                colorScheme="teal"
                onClick={onOpen}
              />
              <IconButton
                icon={<DeleteIcon />}
                aria-label="Delete product"
                colorScheme="red"
                onClick={handleDelete}
              />
            </HStack>
          </Stack>
        </CardBody>
      </Card>

      <EditProductModal 
        isOpen={isOpen}
        onClose={onClose}
        product={{ name, price, image: imageUrl, _id: pid }}
      />
    </>
  );
};

export default ProductCard;