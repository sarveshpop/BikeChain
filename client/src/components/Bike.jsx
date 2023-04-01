import { BlockchainContext } from "../context/BlockchainContext";
import { useContext, useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import { MdLocationOn } from "react-icons/md";
import {
  Button,
  Box,
  Image,
  Text,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const Bike = ({ bike }) => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API;

  const { checkOut, checkIn } = useContext(BlockchainContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const MapMarker = () => (
    <div style={{ color: "red", fontSize: "2rem" }}>📍</div>
  );

  const [userLocation, setUserLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  function handleMap() {
    if (userLocation) {
      const randomLocation = {
        lat: userLocation.lat + (Math.random() - 0.5) * 0.01,
        lng: userLocation.lng + (Math.random() - 0.5) * 0.01,
      };
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${randomLocation.lat},${randomLocation.lng}`;
      setMapUrl(mapUrl);
    }
  }

  const mapStyle = [
    {
      stylers: [
        {
          hue: "#ff1a00",
        },
        {
          invert_lightness: true,
        },
        {
          saturation: -100,
        },
        {
          lightness: 33,
        },
        {
          gamma: 0.5,
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#2D333C",
        },
      ],
    },
  ];

  return (
    <>
      <Box boxSize="sm" mx={2}>
        <Image src={bike.image} mb={10} className="h-52 w-max lg:h-80 " />
        <Text textAlign={"center"} fontWeight={600} fontSize={{base: "lg", lg: "xl"}}>
          {bike.name}
        </Text>
        <br />
        <Text textAlign={"center"} fontSize={{base: "sm", lg: "md"}}>{bike.description}</Text>
        <Stack
          spacing={4}
          direction={"row"}
          align={"center"}
          justify={"center"}
          mt={5}
        >
          <Button
            onClick={onOpen}
            m={2}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"gray.500"}
            _hover={{
              bg: "gray.300",
            }}
          >
            <MdLocationOn size={"1.5em"} />
          </Button>
          <Button
            onClick={checkOut}
            m={2}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"gray.500"}
            _hover={{
              bg: "gray.300",
            }}
          >
            Check Out
          </Button>
          <Button
            onClick={checkIn}
            m={2}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"gray.500"}
            _hover={{
              bg: "gray.300",
            }}
          >
            Return
          </Button>
        </Stack>
      </Box>
      <>
        <Modal onClose={onClose} size={"full"} isOpen={isOpen && handleMap}>
          <ModalOverlay />
          <ModalContent backgroundColor={"#202020"}>
            <ModalCloseButton mt={2} />
            {userLocation && (
              <div
                style={{
                  height: "95vh",
                  width: "100vw",
                  aspectRatio: "auto",
                }}
              >
                <ModalHeader>Bike Location</ModalHeader>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: googleMapsApiKey }}
                  yesIWantToUseGoogleMapApiInternals
                  defaultCenter={userLocation}
                  defaultZoom={19}
                  options={{ styles: mapStyle }}
                >
                  <MapMarker
                    lat={userLocation.lat}
                    lng={userLocation.lng}
                    draggable={false}
                    panToLocation={false}
                  />
                </GoogleMapReact>
              </div>
            )}
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default Bike;
