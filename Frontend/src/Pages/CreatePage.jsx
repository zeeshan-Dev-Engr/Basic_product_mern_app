import { useState } from 'react';
import { 
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast
} from '@chakra-ui/react';
import { useStore } from '../Store/store';
const AddProduct = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    imageUrl: ''
  });

const {createProduct} = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Add type checking logs
    console.log("Form Data Types:", {
      name: typeof formData.name,
      price: typeof formData.price,
      imageUrl: typeof formData.imageUrl,
    });
    console.log("Form Data Values:", formData);

    // Basic validation
    if (!formData.name || !formData.price || !formData.imageUrl) {
      toast({
        title: 'Error',
        description: 'Please fill all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Handle form submission here
    const {success, Message} = await createProduct(formData);
    console.log("success:",success)
    console.log("Message:",Message)

    setFormData({name: '', price: '', imageUrl: ''})
    
    if (!success) {
      toast({
        title: 'Error',
        description: Message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    // Reset form
    setFormData({ name: '', price: '', imageUrl: '' });
    
    toast({
      title: 'Success',
      description: 'Product added successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Center minH="80vh" p={4}>
      <Box 
        w="100%" 
        maxW="500px" 
        p={8} 
        borderWidth={1} 
        borderRadius="lg" 
        boxShadow="lg"
      >
        <Heading mb={8} textAlign="center" size="lg" bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>
          Add New Product
        </Heading>
        
        <form onSubmit={handleSubmit}>
          <VStack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Product Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Enter image URL"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              mt={4}
            >
              Add Product
            </Button>
          </VStack>
        </form>
      </Box>
    </Center>
  );
};

export default AddProduct;