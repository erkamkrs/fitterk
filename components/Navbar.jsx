'use client'

import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon} from '@chakra-ui/icons'
import {CgGym} from 'react-icons/cg'
import {FcGoogle} from "react-icons/fc"
import { useAuth } from '@/app/context/AuthContext'
import React, { useState, useEffect } from "react";


const NavLink = (props) => {
  const { children } = props

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={'#'}>
      {children}
    </Box>
  )
}

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user, googleSignIn, logOut } = useAuth()
  const [loading, setLoading] = useState(true);


  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSignOut = async () => {
    try {
      window.location.href = "/"
      await logOut()
    } catch(error) {
      console.log(error)
    }
  }

  const handleToProfile = () => {
    try {
      window.location.href = "/profile"
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Text style={{ fontSize: "2rem" }}>
                    <CgGym/>
                </Text>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

            {!user ? (
              <Button
              onClick={handleSignIn}
              display={{ base: 'inline-flex', md: 'inline-flex' }}
              fontSize={'md'}
              fontWeight={600}
              color={'white'}
              bg={'blue.400'}
              _hover={{
                bg: 'blue.500',
              }}>
              <FcGoogle/> &nbsp; Google Sign In 
            </Button>
            ) : (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={user.photoURL}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={user.photoURL}
                    />
                  </Center>
                  <br />
                  <Center>
                    <Text>{user.displayName}</Text>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem
                  as={"button"}
                  onClick={handleToProfile}>Profile</MenuItem>
                  <MenuItem
                  as={"button"}
                  onClick={handleSignOut}
                  >Logout</MenuItem>
                </MenuList>
              </Menu> 
            )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}


