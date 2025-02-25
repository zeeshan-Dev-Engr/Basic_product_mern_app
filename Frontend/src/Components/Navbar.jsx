import { Flex, HStack, IconButton, Text, useColorMode } from "@chakra-ui/react";
import { AddIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="transparent"
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "gray.700"}
    >
      {/* Left side with logo and title */}
      <HStack spacing={3}>
        <FiShoppingBag size="24px" color="#319795"/>
        <Link to="/">
        <Text fontSize="2xl" fontWeight="bold" letterSpacing="wide" bgGradient='linear(to-r, teal.500, green.500)' bgClip='text'>
          Product Store
        </Text>
        </Link>
      </HStack>

      {/* Right side with icons */}
      <HStack spacing={4}>
        <IconButton
          onClick={() => navigate('/create')}
          aria-label="Add product"
          icon={<AddIcon />}
          variant="ghost"
        />
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </HStack>
    </Flex>
  );
};

export default Navbar;