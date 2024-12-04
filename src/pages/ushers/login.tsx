/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import { Box, Flex, Text, Icon } from '@chakra-ui/react'
import { useState } from 'react';
import {FaArrowsDownToPeople} from 'react-icons/fa6'
import PageWrapper from '@/frontend/components/layouts/pageWrapper';
import UshersLogin from '@/frontend/components/Accounts/ushersLogin';

export default function Home() {
    return (
      <PageWrapper>
        <Box maxW={"500px"} w="100%" p={2} minH="100vh">
          <Flex 
              mb={4} 
              gap={4}
              borderWidth={1}
              borderColor={"gray.200"}
              rounded="md"
              align={"center"}
              p={5}
          >
              <Flex align={"center"} justify={"center"}>
                  <Icon as={FaArrowsDownToPeople} color={"gray.500"} fontSize={52} />
              </Flex>
              <Flex 
              flex={1}
              direction={"column"} 
              align="left" 
              color="gray.500"
              >
                <Text fontSize={18} fontWeight={600} textTransform={"uppercase"}>Love Economy Ushers App</Text>
                <Text>Login</Text>
            </Flex>
          </Flex>

          <UshersLogin />
        </Box>
      </PageWrapper>
  )
}