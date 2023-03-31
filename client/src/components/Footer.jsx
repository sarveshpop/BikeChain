import { Box, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <div className="fixed justify-center items-center bottom-0 left-0 pb-2 w-full">
        <Text>© 2022 Chakra Templates. All rights reserved</Text>
      </div>
    </Box>
  );
}
