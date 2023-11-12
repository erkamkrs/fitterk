'use client'

import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    useColorModeValue,
    useDisclosure,
    Spinner
  } from '@chakra-ui/react';
  import { useAuth } from '@/app/context/AuthContext';
  import { useState, useEffect } from 'react';
  import Main from '../Modal/Main';  
  import WorkoutHistoryModal from '../Modal/WorkoutHistory';  

  export default function ProfileCard(props) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);
    const colorDark = useColorModeValue('#151f21', 'gray.900');
    const colorLight = useColorModeValue('white', 'gray.800');
    const [addedExercise, setAddedExercise] = useState([]);

    useEffect(() => {
      const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
      };
      checkAuthentication();
    }, [user]);
  
    return (
      <>
        <Center py={6}>
          {loading ? (
            <Box maxW={'5xl'} py={'24'}>
              <Spinner p={6} />
            </Box>
          ) : user ? (
            <Box
              maxH={"500px"}
              maxW={'300px'}
              w={'100%'}
              bg={colorLight}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}
            >
              <Image
                h={'120px'}
                w={'full'}
                src='/kettlebell.jpg'
                objectFit='cover'
                alt='awatar'
              />
              <Flex justify={'center'} mt={-12}>
                <Avatar
                  size={'xl'}
                  src={user.photoURL}
                  css={{
                    border: '2px solid white',
                  }}
                />
              </Flex>
              <Box p={6}>
                <Box p={6}>
                  <Stack spacing={0} align={'center'} mb={5}>
                    <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
                      {user.displayName}
                    </Heading>
                    <Text color={'gray.500'}>Gym beast</Text>
                  </Stack>
                    {/* Button that opens Modal for Main */}
                  <Main
                  setBodyPart={setSelectedBodyPart}
                  setAddedExercise={setAddedExercise}   
                // Pass the openModal function to the modal component
                  />   
                  <WorkoutHistoryModal 
                  />
                </Box>
              </Box>
            </Box>
          ) : (
            <Flex
              h={'300px'}
              w={'full'}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}
              textAlign={'center'}
              alignSelf={'center'}
              m={20}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Text
              fontSize={"2xl"}>You must be logged in to view this page - protected route.</Text>
            </Flex>
          )}
        </Center>
   </>
    );
  }