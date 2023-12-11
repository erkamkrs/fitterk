'use client'

import {
  Avatar,
  Box,
  Flex,
  useColorMode,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa'
import {CgGym} from 'react-icons/cg'

const Logo = (props) => {
  const { colorMode } = useColorMode();
  const logoSrc = colorMode === 'light' ? './fitterk-white-logo.png' : './fitterk-dark-logo.png';

  return (
    <>
    <Avatar size={"md"}
      src={logoSrc}
      alt="FittErk Logo"
    />
    </>
  )
}

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      px={"10"}>
      <Flex
        as={Stack}
        py={"4"}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={'space-between'}
        align={{ base: 'center', md: 'center' }}>
        <Logo />
        <Flex justifyContent="center">
          <Text fontSize={"xl"}>© Made by Erkam Kiris. All rights reserved</Text>
        </Flex>
        <Stack direction={'row'} spacing={10}>
          <SocialButton label={'Twitter'} href={'https://twitter.com/erkamkiris'}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'Github'} href={'https://github.com/erkamkrs'}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'Instagram'} href={'https://instagram.com/erkamkiris'}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Flex>
    </Box>
  );
}