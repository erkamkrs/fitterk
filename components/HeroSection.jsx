'use client'

import {
  Button,
  colorMode,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  useColorMode
} from '@chakra-ui/react'
import { useAuth } from '@/app/context/AuthContext'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';



export default function HeroSection() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, googleSignIn, logOut } = useAuth()
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);
  const logoSrc = colorMode === 'light' ? './fitterk-white-logo.png' : './fitterk-dark-logo.png'


  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Stack
     minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '5xl', md: '5xl', lg: '7xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              letterSpacing={'-0.04em'} 
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: '#ff914d',
                zIndex: -1,
              }}>
              FITTERK
            </Text>
            <br />{' '}
            <Text 
            color={'cyan.400'} as={'span'} fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
            More than an App, <br/>
            Your Partner on the Journey to a Healthier You
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
            onClick={handleSignIn}
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              size={{ base: 'lg', md: 'md', lg: 'lg'  }}
              _hover={{
                bg: 'blue.500',
              }}>
              Get Started
            </Button>
            <Button 
              size={{ base: 'lg', md: 'md', lg: 'lg'  }}
              rounded={'full'}>
              <Link 
                to="features" 
                smooth={true} 
                duration={500}
                >
                How It Works
              </Link>
          </Button>
          </Stack>
        </Stack>
      </Flex>
      {useBreakpointValue({ base: null, md: 
      <Flex pt={{ base: '8', md: '16', lg: '24' }} flex={1}>
      <Image
        alt={'logo'}
        src={logoSrc}
        width={{ base: 'xl', md: 'lg', lg: '2xl' }}
        height={{ base: 'xl', md: 'lg', lg: '2xl' }}
      />
    </Flex> })}
    </Stack>
  )
}