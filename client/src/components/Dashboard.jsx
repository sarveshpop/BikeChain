import CurrentTotals from "./CurrentTotals";
import { Stack, Box, Flex, Center, Text, Button } from "@chakra-ui/react";

import RenterForm from "./RenterForm";
import { useContext, useState } from "react";
import { BlockchainContext } from "../context/BlockchainContext";
import ClipLoader from "react-spinners/ClipLoader";

const Dashboard = () => {
  const { renterExists, currentAccount } = useContext(BlockchainContext);
  let [loading, setLoading] = useState(true);

  return (
    <>
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        height={"90vh"}
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 30 }}
      >
        {renterExists == null && currentAccount ? (
          <Center>
            <ClipLoader loading={loading} size={100} />
          </Center>
        ) : renterExists ? (
          <CurrentTotals />
        ) : (
          <RenterForm />
        )}
      </Flex>
    </>
  );
};

export default Dashboard;
