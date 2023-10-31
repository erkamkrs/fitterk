"use client"
import ProfileCard from '@/components/Profile/ProfileCard'
import Addsets from "@/components/AddSets"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { db } from "../../firebase"
import React from 'react'
import 
{ Container,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'  



function Profile() {
  //if login credentials of user disappear, revert back to login page
  // const { user } = useAuth();
  const [exerciseAdded, setAddedExercise] = useState(null);

  return (
    <Container
    maxW={'5xl'} py={'24'}>


      
      {exerciseAdded && exerciseAdded.length > 0 ? (<ProfileCard
      setAddedExercise={setAddedExercise}
      exerciseSelected={exerciseSelected}/>)
      : (
        <Flex
      bg={useColorModeValue('gray.100', 'gray.900')}
      align="center"
      justify="center"
      id="sets">
      <Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              fontSize={{
                base: '4xl',
                md: '5xl',
              }}>

            </Heading>

              <Box
                bg={useColorModeValue('white', 'gray.700')}
                borderRadius="lg"
                p={8}
                color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                shadow="base">
                <VStack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel>Weight</FormLabel>
                    <InputGroup>
                      <InputLeftElement>
                      </InputLeftElement>
                      <Input type="number" name="weight" placeholder="Weight in Kg" />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                  <FormLabel>Reps</FormLabel>
                    <NumberInput min={0} step={5}>
                        <NumberInputField />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                  <FormLabel>Sets</FormLabel>
                    <NumberInput min={1} step={1}>
                        <NumberInputField />
                        <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Note</FormLabel>

                    <Textarea
                      name="note"
                      placeholder="Notes about the exercise"
                      rows={1}
                      resize="none"
                    />
                  </FormControl>

                  <Button
                    colorScheme="blue"
                    bg="blue.400"
                    color="white"
                    _hover={{
                      bg: 'blue.500',
                    }}
                    width="full">
                    Add Sets
                  </Button>
                </VStack>
              </Box>
          </VStack>
        </Box>
      </Box>
    </Flex>
  )}

    </Container>
  )
}

export default Profile