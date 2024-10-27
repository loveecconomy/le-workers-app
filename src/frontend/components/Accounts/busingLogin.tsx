/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Flex, FormLabel, Icon, Input, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { handleChange } from '@/utils/form';

import { IBusAccount } from '@/interface/bus';
import { IAccountUser, getUser, saveBusUser, saveUserToken, setRefreshToken } from '@/frontend/store/auth';
import { LoginRequest } from '@/frontend/apis/base';
import { TbEye, TbEyeCheck, TbEyeClosed } from 'react-icons/tb';

export type GroupedUnits = Record<string, {name?: string, id?: string}>

export default function BusingLogin() {
    const toast = useToast()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [fields, setFIelds] = useState< Record<string, string | null | Record<string, string>>>({
      email: '',
      password:  ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const gotoBusPage = () => {
        router.push('/bus')
    }


    useEffect(() => {
        const user = getUser()
        if(user?.currentApp === 'BUSING'){
            gotoBusPage()
        }
    }, [])


    const handleContinue = async () => {
        setLoading(true)
        try {
            const loginData: any = await LoginRequest({email: fields.email as string, password: fields.password as string})
            if(loginData){
                let  userData: {user: any; accessToken: string; account: IBusAccount, refreshToken: string} = loginData?.data?.data as any
                const user: IAccountUser = {
                    name: userData?.account?.name,
                    bus: {},
                    accountId: userData?.account?._id as string,
                    roles: userData?.account?.accountType as any[],
                    currentApp: "BUSING"
                }
                setLoading(false)
                saveBusUser(user)
                saveUserToken(userData?.accessToken)
                setRefreshToken(userData?.refreshToken)
                gotoBusPage()
            }
        } catch (error: any) {
            console.log(error)
            setLoading(false)
            const _error = error as any
            toast({
                status: "error",
                duration: 2000,
                position: 'top-right',
                isClosable: true, 
                title: _error?.response?.data?.message || _error.message || 'Error occurred'
            })
        }
    }

    return (
    <>
        { (!fields['email']?.length || !fields['password']) &&  !(!fields['email']?.length && !fields['password']) ? 
            <Box 
                mb={4} 
                bg="red.400" 
                rounded={"sm"} 
                color="white" 
                px={4} py={3} 
                w="100%"
            >
                You&lsquo;ve either not entered an email or a password</Box>
                : null
        }
        <Box mb={6} fontSize={14}>
            <FormLabel color="gray.700">Enter email</FormLabel>
            <Input fontSize={14} placeholder='Enter ID Here ' value={fields.email as string } 
            onChange={v =>   handleChange(v.currentTarget?.value, 'email', fields, setFIelds)}
            />
        </Box>

         <Box mb={6} fontSize={14}>
            <FormLabel color="gray.700">Enter password</FormLabel>
            <Flex align={"center"} gap={2}>
                <Input type={showPassword ? 'text' : 'password'} fontSize={14} placeholder='Enter password Here ' value={fields.password as string } 
                    onChange={v =>   handleChange(v.currentTarget?.value, 'password', fields, setFIelds)}
                />
                <Icon as={showPassword ? TbEye : TbEyeClosed} fontSize={24} onClick={() => setShowPassword(!showPassword)} />
            </Flex>
        </Box>
        
        <Box as={Button} 
            colorScheme="black"
            px={5}
            py={3}
            mt={8}
            w={"100%"}
            color="white" 
            onClick={() => handleContinue()}
            bg={ "base.blue" }
            _hover={{bg:  "base.blue" }}
            isLoading={loading}
            isDisabled={loading || !fields['email']?.length || !fields['password']?.length}
        >Continue</Box>
    </>
  )
}
