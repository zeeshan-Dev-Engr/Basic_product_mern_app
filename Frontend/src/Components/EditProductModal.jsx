import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useStore } from '../Store/store';

const EditProductModal = ({ isOpen, onClose, product }) => {
  const toast = useToast();
  const { updateProduct } = useStore();
  const [formData, setFormData] = useState({
    name: product?.name || '',
    price: product?.price || '',
    imageUrl: product?.image || ''
  });

  useEffect(() => {
    setFormData({
      name: product?.name || '',
      price: product?.price || '',
      imageUrl: product?.image || ''
    });
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.imageUrl) {
      toast({
        title: 'Error',
        description: 'All fields are required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updateData = {
      name: formData.name,
      price: Number(formData.price),
      image: formData.imageUrl
    };

    const res = await updateProduct(product._id, updateData);
    
    if (res.success) {
      toast({
        title: 'Success',
        description: 'Product updated successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      toast({
        title: 'Error',
        description: res.Message || 'Failed to update product',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={4}>
              <FormLabel>Product Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Price</FormLabel>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Image URL</FormLabel>
              <Input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
              />
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal; 