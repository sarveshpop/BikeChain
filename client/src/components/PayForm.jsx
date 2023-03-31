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
import { MdPayment } from "react-icons/md";
import { BlockchainContext } from "../context/BlockchainContext";
import { useContext, useState } from "react";

export default function PayForm() {
  const { makePayment } = useContext(BlockchainContext);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    console.log(JSON.stringify(values, null, 2));
    const { payment } = values;
    await makePayment(payment);
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
      className="w-full revealing-element-container pb-4 pl-2"
    >
      <Flex justifyContent={"center"} alignItems={"center"}>
        {!isHovering && (
          <button
            type="button"
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
                    Pay Your Due
                  </Text>
                </Box>
                <Box
                  my={"auto"}
                  color={useColorModeValue("gray.800", "gray.200")}
                  alignContent={"center"}
                  ml={2}
                >
                  <MdPayment size={"3em"} />
                </Box>
              </Flex>
            )}
          </button>
        )}

        {isHovering && (
          <div
            className={`revealing-element ${isHovering ? "visible" : ""} mr-4`}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text
                fontFamily={"heading"}
                fontSize={"x-large"}
                fontWeight={600}
                mb={4}
              >
                Pay Your Due
              </Text>
              <FormControl isInvalid={errors.payment}>
                <Input
                  id="payment"
                  className=" max-w-sm"
                  type="number"
                  step="any"
                  placeholder="Payment"
                  {...register("payment", {
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
                Pay Due
              </Button>
            </form>
          </div>
        )}
      </Flex>
    </div>
  );
}
