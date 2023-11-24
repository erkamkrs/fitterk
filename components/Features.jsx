'use client'

import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { IoAnalyticsSharp, IoLogoYoutube, IoSearchSharp } from 'react-icons/io5'
import { ReactElement } from 'react'

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex w={8} h={8} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

export default function Features() {
  return (
    <Container id={"features"} maxW={{ base: 'xl', lg: '5xl' }} py={{ base: 12, lg: 24 }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20}>
        <Flex>
          <Image
            rounded={'md'}
            alt={'lunge image'}
            src={"/lunge.jpg"}
            objectFit={'cover'}
            height={"100%"}
            width={"100%"}
          />
        </Flex>
        <Stack spacing={2}>
          <Text
            fontSize={{ base: 'xl', lg: '2xl' }}
            textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            Our Story
          </Text>
          <Heading fontSize={{ base: '3xl', lg: '5xl' }}>Join Fitterk, Join the Movement: Your Fitness, Your Way.</Heading>
          <Text color={'gray.500'} fontSize={{ base: 'md', lg: 'lg' }}>
            Register now and track your process while getting access to a variety of workouts and exercises.
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }>
            <Feature
              icon={<Icon as={IoAnalyticsSharp} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Workout Planning'}
            />
            <Feature
              icon={<Icon as={IoLogoYoutube} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Exercise Demonstrotion'}
            />
            <Feature
              icon={<Icon as={IoSearchSharp} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Tracking Workout Journey'}
            />
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  )
}