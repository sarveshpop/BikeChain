import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { BlockchainContext } from "../context/BlockchainContext";
import { useContext } from "react";

export default function Navbar() {
  const { connectWallet, currentAccount, renter } =
    useContext(BlockchainContext);

  return (
    <Box>
      <div
        className={`flex items-center min-h-[60px] py-2 px-4 ${
          renter && renter.active ? "bg-green-500" : "bg-transparent"
        }`}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={renter && renter.active ? "#121212" : "white"}
            fontWeight={900}
            fontSize={"2xl"}
          >
            {renter !== null ? (
              <Link to="/dashboard">BikeChain</Link>
            ) : (
              <Link to="/">BikeChain</Link>
            )}
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            onClick={connectWallet}
            display={{ md: "inline-flex" }}
            fontSize={"xl"}
            fontWeight={600}
            color={"white"}
            bg={"gray"}
            href={"#"}
            _hover={{
              bg: "gray",
            }}
          >
            {!currentAccount
              ? "Connect Wallet"
              : `${currentAccount.slice(0, 5)}...${currentAccount.slice(
                  currentAccount.length - 4
                )}`}
          </Button>
        </Stack>
      </div>
    </Box>
  );
}

const NAV_ITEMS = [];
