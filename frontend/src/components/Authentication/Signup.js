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

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  const [confirmPassword, setconfirmPassword] = useState("");
  const [pic, setPic] = useState();

  const [show, setshow] = useState(false);

  const toast = useToast();
  const Navigate = useNavigate();
  const [picLoading, setPicLoading] = useState(false);

  const handleClick = () => setshow(!show);

  const submitHandler = async () => {
    setPicLoading(true);

    if (!name || !email || !password || !confirmPassword) {
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

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Check both passwords.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    console.log(name, email, password, pic);

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      console.log("data: ", data);

      toast({
        title: "Registration Successful",
        description: "Account has been successfully created.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setPicLoading(false);
      Navigate("/chats"); // Navigate to login page after successful signup
    } catch (error) {
      toast({
        title: "Error Occoured",
        description: "Some error has occured.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });

      setPicLoading(false);
    }
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image!",
        description: "Select image.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });

      return;
    }

    console.log(pics);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ChatApp");
      data.append("cloud_name", "mytubecloud12");
      fetch("https://api.cloudinary.com/v1_1/myTubeCloud12/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Cloudinary Response:", data);
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        });
    } else {
      toast({
        title: "Please select an image",
        description: "Select an image.",
        status: "warning",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });

      setPicLoading(false);
      return;
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirmpassword" isRequired>
        <FormLabel>confirm password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="confirm password"
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
          />

          <InputRightElement>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your pic</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => {
            postDetails(e.target.files[0]);
          }}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={picLoading}
      >
        Sign up
      </Button>
    </VStack>
  );
};

export default Signup;
