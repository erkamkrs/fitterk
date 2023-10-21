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
  import BodyPartsSelect from '../Modal/BodyPartsSelect';  

  export default function ProfileCard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);
    const colorDark = useColorModeValue('#151f21', 'gray.900');
    const colorLight = useColorModeValue('white', 'gray.800');
  
    useEffect(() => {
      const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setLoading(false);
      };
      checkAuthentication();
    }, [user]);
  


  
    return (
      <>
        <Center py={6}>
          {loading ? (
            <Box height={'full'}>
              <Spinner p={6} />
            </Box>
          ) : user ? (
            <Box
              maxW={'270px'}
              w={'full'}
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
                    {/* Button that opens Modal for BodyPartsSelect */}
                  <BodyPartsSelect
                  setBodyPart={setSelectedBodyPart}
                  selectedBodyPart={selectedBodyPart}               
                // Pass the openModal function to the modal component
                />   
  
                  <Button
                    w={'full'}
                    mt={8}
                    bg={colorDark}
                    color={'white'}
                    fontSize={'lg'}
                    rounded={'full'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                     Workout History
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              h={'300px'}
              w={'full'}
              boxShadow={'2xl'}
              rounded={'md'}
              overflow={'hidden'}
              alignItems={'center'}
              m={10}
            >
              <Text>You must be logged in to view this page - protected route.</Text>
            </Box>
          )}
        </Center>
  
   </>
    );
  }