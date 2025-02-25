import { Box, Button, SimpleGrid, Heading, Text, Link, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useStore } from "../Store/store";
import { useEffect } from "react";  
import ProductCard from "../Components/ProductCard";

const Home = () => {
  const { products, fetchProducts } = useStore();
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Flex direction="column" align="center" p={6} minH="80vh" w="100%" maxW="1400px" mx="auto">
      <Heading mb={8} textAlign="center" bgGradient='linear(to-l, #7928CA, #FF0080)' bgClip='text'>Current Products</Heading>
      {products.length > 0 ? (
        <SimpleGrid 
          columns={[1, 2, 3]} 
          spacing='60px'
          w="100%"
          px={4}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              pid={product._id}
              imageUrl={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Text align="center" fontSize="2xl" fontWeight="bold">There is no product found</Text>
      )}
      <Button as={RouterLink} to="/create" mt={4} colorScheme="green">
        Create Product
      </Button>
    </Flex>
  );
};

export default Home;
