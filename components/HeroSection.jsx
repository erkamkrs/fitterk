'use client'

import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react';


export default function HeroSection() {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowImage(true);
    }, 50);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '5xl', md: '5xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}>
              FittErk
            </Text>
            <br />{' '}
            <Text color={'cyan.400'} as={'span'} fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
            More than an App, <br/>
            Your Partner on the Journey to a Healthier You
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Get Started
            </Button>
            <Button rounded={'full'}>How It Works</Button>
          </Stack>
        </Stack>
      </Flex>
      {useBreakpointValue({ base: null, md: 
      <Flex pt={{ base: '8', md: '10', lg: '8' }} flex={1}>
      <Image
        alt={'Squat Image'}
        src='/kettlebell.jpg'
        width={{ base: 'xl', md: 'lg', lg: 'xl' }}
        height={{ base: 'xl', md: 'md', lg: 'xl' }}
        borderRadius="xl"
        className={showImage ? 'fade-in show' : 'fade-in'}
      />
    </Flex> })}
    </Stack>
  )
}