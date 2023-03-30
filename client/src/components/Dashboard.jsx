import CurrentTotals from "./CurrentTotals"
import { Stack, Box, Flex, Center } from "@chakra-ui/react"
import Bike from "./Bike"
import bike1 from '../assets/Bike1.jpg'
import bike2 from '../assets/Bike2.jpg'
import bike3 from '../assets/Bike3.jpg'
import RenterForm from "./RenterForm"
import { useContext, useState } from "react"
import { BlockchainContext } from "../context/BlockchainContext"
import ClipLoader from "react-spinners/ClipLoader";


const Dashboard = () => {
    const { renterExists, currentAccount } = useContext(BlockchainContext)
    let [loading, setLoading] = useState(true);
    console.log(renterExists)

    return (
        <Stack 
            as={Box}
            textAlign={'center'}
            spacing={{ base: 8, md: 14}}
            py= {{ base: 20, md: 36}}>
        { renterExists == null && currentAccount ? <Center><ClipLoader  loading={loading}  size={75} /></Center>: renterExists ? <CurrentTotals /> : <RenterForm />}
       
        <Flex justifyContent={'center'} alignItems={'center'}>
            <Bike bike={bike1}/>
            <Bike bike={bike2}/>
            <Bike bike={bike3}/>
        </Flex>
        </Stack>
    )
}

export default Dashboard 