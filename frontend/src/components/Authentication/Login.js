import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  const [show, setshow] = useState(false);
  const toast = useToast();
  const Navigate = useNavigate();
  const [picLoading, setPicLoading] = useState(false);

  const handleClick = () => setshow(!show);

  const submitHandler = async () => {
    setPicLoading(true);

    if (!email || !password) {
      toast({
        title: "Please Fill all the fields",
        description: "All fields are required(*).",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });

      setPicLoading(false);
      return;
    }

    // console.log(email, password);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        {
          email,
          password,
        },
        config
      );

      // console.log("data: ", data);

      toast({
        title: "Login Successful",
        description: "You have successfully logged in",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      Navigate("/chats"); // Navigate to /chats page after successful signup
    } catch (error) {
      toast({
        title: "Error Occoured",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });

      setPicLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="loginEmail" isRequired>
        <FormLabel>email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
      </FormControl>
      <FormControl id="loginPassword" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            value={password}
          />

          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Log In
      </Button>

      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setpassword("123456");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
