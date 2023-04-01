import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  Text,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { useContext } from "react";
import { SiEthereum } from "react-icons/si";
import { VscChevronRight } from "react-icons/vsc";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BiTimeFive } from "react-icons/bi";
import PayForm from "./PayForm";
import AddToBalanceForm from "./AddToBalanceForm";
import { BlockchainContext } from "../context/BlockchainContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 4, md: 6 }}
      py={"5"}
      shadow={"xl"}
      border={"0.25px solid rgb(50, 50, 50)"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
      backgroundColor={"#202020"}
    >
      <Flex justifyContent={"space-between"}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={"medium"} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={"auto"}
          color={useColorModeValue("gray.800", "gray.200")}
          alignContent={"center"}
          ml={2}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function CurrentTotals() {
  let navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
  };
  const { renterBalance, due, duration, renter } =
    useContext(BlockchainContext);
  return (
    <>
      <Box maxW="7xl" mx={"auto"} pt={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"start"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Welcome {renter != null ? renter[0] : ""}
        </chakra.h1>
        <SimpleGrid
          className="statGrid"
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 5, lg: 8 }}
          pb={2}
        >
          <StatsCard
            title={"ETH Credit"}
            stat={renterBalance}
            icon={<SiEthereum size={"3em"} className="ml-2 px-1" />}
          />
          <StatsCard
            title={"Bill Due"}
            stat={due}
            icon={<RiMoneyDollarCircleLine size={"3em"} />}
          />
          <StatsCard
            title={"Ride Time"}
            stat={duration}
            icon={<BiTimeFive size={"3em"} />}
          />
          {/* <StatsCard
            title={"Bike Status"}
            bgColor={renter && renter.active ? "green" : "red"}
            // stat={'0'}
            // icon={<BiTimeFive size={'3em'} />}
          /> */}
        </SimpleGrid>
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 5, lg: 8 }}
          // backgroundColor={"#202020"}
          // border={"0.25px solid rgb(50, 50, 50)"}
          rounded={"lg"}
          my={10}
          justifyContent={"space-evenly"}
          alignItems={"center"}
        >
          <AddToBalanceForm />
          <PayForm />
        </SimpleGrid>
        <button
          onClick={() => handleNav("/rides")}
          className="w-full py-5 bg-transparent border-[#4f46e5] transition-all ease-in duration-300 discover"
        >
          <Flex
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box p={{ base: 2, md: 4 }}>
              <Text fontSize={"4xl"} m={4}>
                Find a Ride
              </Text>
            </Box>
            <Box>
              <VscChevronRight size={"4em"} className=" discover-svg w-full" />
            </Box>
          </Flex>
        </button>
      </Box>
      <ToastContainer theme="dark" autoClose={3000} />
    </>
  );
}
