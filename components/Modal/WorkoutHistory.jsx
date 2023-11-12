import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useColorModeValue,
  Box,
  Button,
  Center,
  Flex,
  Text,
  VStack,
  useDisclosure,
  useSteps,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/firebase';
import { useAuth } from '@/app/context/AuthContext';
import 'react-datepicker/dist/react-datepicker.css';

const WorkoutHistoryModal = () => {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workoutData, setWorkoutData] = useState(null);
  const [totalExercises, setTotalExercises] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorDark = useColorModeValue('#151f21', 'gray.900');

  const { activeStep, setActiveStep } = useSteps({
    initialStep: 0,
    steps: ['Select Date', 'View Workout'],
  });

  useEffect(() => {
    if (activeStep === 1) {
      const fetchWorkoutData = async () => {
        const formattedDate = `${selectedDate.getDate()}-${selectedDate.getMonth() + 1}-${selectedDate.getFullYear()}`;
        const docRef = doc(db, "workouts", user.displayName);
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          const data = docSnap.data();
          const exercises = data[formattedDate]?.exercises || [];
          const total = exercises.length;
          setWorkoutData(exercises);
          setTotalExercises({ ...totalExercises, [formattedDate]: total });
        }
      };
      fetchWorkoutData();
    }
  }, [selectedDate, user, activeStep]);

  return (
    <>
      <Button
        my={5}

        textAlign={"center"}
        w={'full'}
        bg={colorDark}
        color={'white'}
        rounded={'full'}
        fontSize={'xl'}
        onClick={onOpen}
        _hover={{
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        }}
        _active={{
          transform: 'translateY(-1px)',
          boxShadow: 'md',
        }}
      >
        Workout History
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader
          textAlign={"center"}>
            {activeStep === 0 ? 'Select a date' : 'View workout history'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {activeStep === 0 && (
        <Center>
            <DatePicker 
            selected={selectedDate} 
            onChange={date => setSelectedDate(date)} 
            inline
            className="custom-datepicker"
            />
        </Center>
        )}
        {activeStep === 1 && workoutData && (
          <>
            {Object.entries(totalExercises).map(([date, total]) => (
              <Text textAlign={"center"} as="h1" fontSize="lg" fontWeight="bold" m={1} key={date}>
               Total Exercises for {date}: {total}
              </Text>
            ))}
          </>
        )}
        {activeStep === 1 && workoutData && 
        (workoutData.map((exercise, index) => (
          <>
            <Text as="h2" fontSize="lg" fontWeight="bold" m={2}>
              Exercise {index + 1}: {exercise.exercise}
            </Text>
            <Box
              size="md"
              fontSize="md"
              bg={colorDark}
              color={'white'}
              rounded={'md'}
              p={"2"}
              m={'1'}
              key={index}
            >
              <VStack spacing={{ base: 1, md: 2, lg: 2 }} padding={"1"} align="left">
                <Text fontWeight="bold">
                  Weight = {exercise.weight} kg
                </Text>
                <Text fontWeight="bold">
                  Reps = {exercise.reps}
                </Text>
                <Text fontWeight="bold">
                  Sets = {exercise.sets}
                </Text>
                <Text fontWeight="bold">
                  Note = {exercise.note}
                </Text>
              </VStack>
            </Box>
          </>
        )))}
          </ModalBody>
          <ModalFooter>
            {activeStep === 0 && (
              <Button colorScheme="blue" onClick={() => setActiveStep(1)}>
                Next
              </Button>
            )}
            {activeStep === 1 && (
              <Button colorScheme="blue" onClick={() => setActiveStep(0)}>
                Back
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WorkoutHistoryModal;