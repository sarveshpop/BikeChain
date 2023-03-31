import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  useColorModeValue,
  FormLabel,
  FormControl,
  Input,
  Button,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useContext, useState } from "react";
import { BlockchainContext } from "../context/BlockchainContext";

export default function AddToBalanceForm() {
  const { deposit } = useContext(BlockchainContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values, null, 2));
    const { creditbalance } = values;
    await deposit(creditbalance);
  };

  const [isHovering, setIsHovering] = useState(false);

  function handleMouseEnter() {
    setIsHovering(true);
  }

  function handleMouseLeave() {
    setIsHovering(false);
  }

  return (
    <div
      onClick={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full revealing-element-container pb-4 pr-2"
    >
      <Flex justifyContent={"center"} alignItems={"center"}>
        {!isHovering && (
          <button
            className="w-full py-10 toggle-button"
            onClick={() => setIsHovering(!isHovering)}
          >
            {!isHovering && (
              <Flex justifyContent={"center"} alignItems={"center"}>
                <Box p={{ base: 2, md: 4 }}>
                  <Text
                    fontWeight={"medium"}
                    fontSize={{
                      base: "large",
                      md: "x-large",
                      xl: "2xl",
                      "2xl": "3xl",
                    }}
                    isTruncated
                  >
                    Credit Your Account
                  </Text>
                </Box>
                <Box
                  my={"auto"}
                  color={useColorModeValue("gray.800", "gray.200")}
                  alignContent={"center"}
                  mr={2}
                >
                  <MdOutlineAccountBalanceWallet size={"3em"} />
                </Box>
              </Flex>
            )}
          </button>
        )}
        {isHovering && (
          <div
            className={`revealing-element ${isHovering ? "visible" : ""} ml-4`}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text
                fontFamily={"heading"}
                fontSize={"x-large"}
                fontWeight={600}
                mb={4}
              >
                Credit Your Account
              </Text>
              <FormControl isInvalid={errors.creditbalance}>
                <Input
                  id="creditbalance"
                  className=" max-w-sm"
                  type="number"
                  step="any"
                  placeholder="Credit ETH"
                  {...register("creditbalance", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.payment && errors.payment.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                colorScheme="gray"
                isLoading={isSubmitting}
                type="submit"
              >
                Add ETH
              </Button>
            </form>
          </div>
        )}
      </Flex>
    </div>
  );
}
