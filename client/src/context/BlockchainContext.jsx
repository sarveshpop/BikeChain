import React, { useState } from "react";
import { abi, contractAddress } from "../config.json";
import { ethers } from "ethers";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const BlockchainContext = React.createContext("");

export const BlockchainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [balance, setBalance] = useState();
  const [renterExists, setRenterExists] = useState();
  const [renter, setRenter] = useState();
  const [renterBalance, setRenterBalance] = useState();
  const [due, setDue] = useState();
  const [duration, setDuration] = useState();

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const address = contractAddress;

  const contractAbi = abi;

  // The Contract object
  const contract = new ethers.Contract(address, contractAbi, signer);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install Metamask");

      const accounts = await provider.send("eth_requestAccounts");
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return alert("Please install Metamask");

      const accounts = await provider.send("eth_accounts");

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const contractBalance = await contract.balanceOf();
      setBalance(ethers.utils.formatEther(contractBalance));
    } catch (error) {
      console.log(error);
    }
  };

  const checkRenterExists = async () => {
    try {
      if (currentAccount) {
        const renter = await contract.renterExists(currentAccount);
        setRenterExists(renter);
        if (renter) {
          await getRenter();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRenter = async () => {
    try {
      if (currentAccount) {
        const renter = await contract.getRenter(currentAccount);
        setRenter(renter);
      }
      const renter = await contract.getRenter(currentAccount);
      setRenter(renter);
    } catch (error) {
      console.log(error);
    }
  };

  const addRenter = async (
    walletAddress,
    firstName,
    lastName,
    canRent,
    active,
    balance,
    due,
    start,
    end
  ) => {
    try {
      const addRenter = await contract.addRenter(
        walletAddress,
        firstName,
        lastName,
        canRent,
        active,
        balance,
        due,
        start,
        end
      );
      await addRenter.wait();
      console.log(`${firstName} added!`);
      checkRenterExists();
    } catch (error) {
      console.log(error);
    }
  };

  const getRenterBalance = async () => {
    try {
      if (currentAccount) {
        const balance = await contract.balanceOfRenter(currentAccount);
        setRenterBalance(ethers.utils.formatEther(balance));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deposit = async (value) => {
    try {
      const ethValue = ethers.utils.parseEther(value);
      const deposit = await contract.deposit(currentAccount, {
        value: ethValue,
      });
      await deposit.wait();
      await getRenterBalance();
    } catch (error) {
      console.log(error);
    }
  };

  const getDue = async () => {
    try {
      if (currentAccount) {
        const due = await contract.getDue(currentAccount);
        setDue(ethers.utils.formatEther(due));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalDuration = async () => {
    try {
      if (currentAccount) {
        const totalDuration = await contract.getTotalDuration(currentAccount);
        setDuration(Number(totalDuration));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async (value) => {
    try {
      const ethValue = ethers.utils.parseEther(value);
      const deposit = await contract.makePayment(currentAccount, ethValue);
      await deposit.wait();
      await getRenter();
      await getRenterBalance();
      await getTotalDuration();
      await getDue();
    } catch (error) {
      //another method toast error(error.data.message), but it throws error
      toast.error(
        "execution reverted: You do not have anything due at this time or You do not have enough funds to cover payment. pls make a deposit.",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  const checkOut = async () => {
    try {
      const checkOut = await contract.checkOut(currentAccount);
      await checkOut.wait();
      await getRenter();
    } catch (error) {
      //another method toast error(error.data.message), but it throws error
      toast.error(
        "execution reverted: You have a pending balance. or You cannot rent at this time.",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
    }
  };

  const checkIn = async () => {
    try {
      const checkIn = await contract.checkIn(currentAccount);
      await checkIn.wait();
      await getRenter();
      await getDue();
      await getTotalDuration();
    } catch (error) {
      //another method toast error(error.data.message), but it throws error
      toast.error("execution reverted: Please check out a bike first", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkRenterExists();
    getRenterBalance();
    getDue();
    getBalance();
    getTotalDuration();
  }, [currentAccount]);

  return (
    <BlockchainContext.Provider
      value={{
        connectWallet,
        currentAccount,
        renterExists,
        addRenter,
        renterBalance,
        deposit,
        due,
        duration,
        renter,
        makePayment,
        checkOut,
        checkIn,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
