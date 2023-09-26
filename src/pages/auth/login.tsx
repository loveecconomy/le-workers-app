import Head from 'next/head';
import { Box, Flex, Text, useToast, Icon, Input, Button, Image,Link } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';


export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };


  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };


  
// gave type to event


  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };


  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };


  const handleLogin = () => {
    // Perform login logic here with the username/email and password
    console.log('Username/Email:', username);
    console.log('Password:', password);
  };


  return (
    <>
      <Head>
        <title>Swollen Sunday | Love Economy Church</title>
        <meta
          name="description"
          content="An app to record how God has blessed us with great increase"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{background:'black',minHeight: '100vh'}}>
        <Flex
          align="center"
          justify="center"
          direction="column"
          maxHeight="100vh" 
          
        >
          <Box
               maxW="500px" w="150%"
            
            p="2rem"
            // bg="#C5C6D0" 
            bg="black"
            rounded="md"
            shadow="lg" 
            margin="30px 20px"
            
          >
            <Flex direction="column" align="center">
              <Image src="/loginlogo.png" alt="Logo" width="220px" height="100px" mb={4} />


              <Text fontSize="xl" fontWeight="bold" colorScheme="white" mb={10}>
                Login
              </Text>
              <Text color="white" paddingRight="250px">Email</Text>
              {/* Username or Email Input */}
              <Input
                type="text"
                placeholder="example@email.com"
                fontSize="13px"
                value={username}
                onChange={handleUsernameChange}
                marginTop= "1px"
                border="none"
                borderBottom="1px solid white"
                bg="black"
                width="300px"
                mb={4}
              />

              <Text color="white" marginTop= "10px"paddingRight="220px">Password</Text>
              {/* Password Input */}
              <Input
                type="password"
                placeholder="Password"
                fontSize="13px"
                value={password}
                onChange={handlePasswordChange}
                border="none"
                borderBottom="1px solid white"
                bg="black" // Set the background color of the input field
                width="300px"
                mb={4}
              />
              


              {/* Login Button----Submit */}
              <Button colorScheme="blue" bg="#15215B" color="white" margin="2rem 5rem" padding="0.5rem 1rem" width="300px" borderRadius="5" onClick={handleLogin}>
                Submit
              </Button>
            </Flex>

            {/* <Button color="white" border="none" borderBottom="1px solid white" paddingLeft="240px">Forgot password?</Button> */}
            <Link
              color="white"
              textDecoration="none"
              paddingLeft="240px"
              _hover={{ textDecoration: "underline" }} // Add underline on hover
            >
              Forgot password?
            </Link>
          </Box>
        </Flex>
      </main>
    </>
  );
}

















