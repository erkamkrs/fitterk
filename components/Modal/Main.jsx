import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Button,
  Box,
  useDisclosure,
  useColorModeValue,
  useSteps,
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
  Text,
  VStack,
} from '@chakra-ui/react';
import { exerciseList } from '../../exerciseList';
import { HiPlus, HiOutlineTrash } from 'react-icons/hi2';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '@/firebase';
import { useAuth } from '@/app/context/AuthContext';

const Main = ({ setBodyPart }) => {
  const { user } = useAuth();
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [bodyPartSelected, setBodyPartSelected] = useState(null);
  const [exerciseSelected, setExerciseSelected] = useState(null);
  const [exercisesAdded, setAddedExercise] = useState([]);
  const [exerciseToEdit, setExerciseToEdit] = useState(null);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [note, setNote] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorDark = useColorModeValue('#151f21', 'gray.900');
  const today = new Date();
  const day = today.getDate(); 
  const month = today.getMonth() + 1; 
  const year = today.getFullYear(); 
  const formattedDate = `${day}-${month}-${year}`; 
  const steps = [
    { title: 'Body Part', description: '' },
    { title: 'Exercise', description: '' },
    { title: 'Add Sets', description: '' },
    { title: 'Exercises', description: ''}
  ];

  const { activeStep, setActiveStep  } = useSteps({
    index: 1,
    count: steps.length,
  })

  const SelectBodyPart = (e) => {
    setBodyPart(e.muscle);
    setBodyPartSelected(e.muscle);
    setActiveStep(2)
  };

  const SelectExercise = (exercise) => {
    setExerciseSelected(exercise);
    setActiveStep(3)
  };

  const SelectExerciseToEdit = (exercise) => {
    setExerciseToEdit(exercise)
    setActiveStep(5)
  }

  return (
    <>
      <Button
        w={'full'}
        mt={2}
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
         Start a Workout
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader 
            textAlign={'center'}
            fontSize={"2xl"}>
              Add Exercise
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {activeStep === 1 &&
            <Flex justifyContent="center" 
            flexWrap="wrap"
            flexDirection="row" 
            padding={"5"}>
            {exerciseList.map((e) => (
              <Box key={e.id}>
                <Button
                  textAlign={"center"}
                  aria-label="Muscle Select"
                  onClick={() => SelectBodyPart(e)}
                  size="xl"
                  fontSize="xl"
                  bg={colorDark}
                  color={'gray.200'}
                  rounded="full"
                  p={"2"}
                  m={'2'}
                  _focus={{ shadow: 'outline' }}
                  _hover={{ bg: 'indigo.800' }}
                  width="200px" 
                  >
                  {e.muscle}
                </Button>
              </Box>
            ))}
          </Flex>
            }
            {activeStep === 2 && bodyPartSelected && (
            <Flex 
            alignContent="left"
            justifyContent="center" 
            flexWrap="wrap"
            flexDirection="row" 
            padding={"2"}>
              {exerciseList
                .find((group) => group.muscle === bodyPartSelected)
                ?.exercises.map((exercise) => (
                  <Box key={exercise.id}>
                    <Button
                      textAlign={"center"}
                      aria-label="Exercise Select"
                      onClick={() => SelectExercise(exercise.exercise)}
                      size="lg"
                      fontSize="md"
                      bg={colorDark}
                      color={'gray.200'}
                      rounded="full"
                      p={"2"}
                      m={'2'}
                      _focus={{ shadow: 'outline' }}
                      _hover={{ bg: 'indigo.800' }}
                      width="230px" 
                     >
                      {exercise.exercise}
                    </Button>
                  </Box>
                ))
              }
            </Flex>
          )}
          {activeStep === 3 && setExerciseSelected && (
            <Flex
              align="center"
              justify="center"
              id="sets">
              <Box borderRadius="lg" m={{ base: 2, md: 4, lg: 6 }} >
                <Box>
                  <VStack spacing={{ base: 2, md: 4, lg: 6 }}>

                    <Heading
                      alignContent={"center"}
                      fontSize={{
                        base: '2xl',
                        md: 'xl',
                      }}>
                        {exerciseSelected}
                    </Heading>

                      <Box
                        borderRadius="lg"
                        p={8}
                        shadow="base">
                        <VStack spacing={5}>
                          <FormControl isRequired>
                            <FormLabel>Weight</FormLabel>
                            <InputGroup>
                              <InputLeftElement>
                              </InputLeftElement>
                              <Input type="number" name="weight" placeholder="Weight in Kg" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            </InputGroup>
                          </FormControl>

                          <FormControl isRequired>
                          <FormLabel>Reps</FormLabel>
                            <NumberInput min={0} step={1} value={reps} onChange={(value) => setReps(value)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                          </FormControl>

                          <FormControl isRequired>
                          <FormLabel>Sets</FormLabel>
                            <NumberInput min={1} step={1} value={sets} onChange={(value) => setSets(value)}>
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
                              rows={2}
                              resize="none"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            />
                          </FormControl>
                          <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                              setAddedExercise(prevExercises => {
                                const newExercise = {
                                  id: prevExercises.length, // Use the length of the array as the id
                                  exercise: exerciseSelected,
                                  weight: weight,
                                  reps: reps,
                                  sets: sets,
                                  note: note,
                                };
                                return [...prevExercises, newExercise];
                              });
                              setActiveStep(4);
                              setWorkoutStarted(true);
                            }}>
                            <HiPlus /> &nbsp; Add Exercise
                          </Button>
                        </VStack>
                      </Box>
                  </VStack>
                </Box>
              </Box>
            </Flex>
          )}
          {activeStep === 4 && exercisesAdded.length === 0 && (
            setActiveStep(1)
          )}
          {activeStep === 4 && exercisesAdded.length > 0 && (
            <Flex justifyContent="center" 
            flexWrap="wrap"
            flexDirection="row" 
            padding={"5"}>
               {exercisesAdded.map((x) => (
              <Box 
              alignItems={"left"}
              key={x.id}>
                <Button
                onClick={() => SelectExerciseToEdit(x)}
                size="lg"
                fontSize="md"
                bg={colorDark}
                color={'white'}
                rounded={'md'}
                p={"2"}
                m={'1'}
                >
                  <VStack 
                  spacing={{ base: 1, md: 2, lg: 2 }}
                  padding={"1"}>
                      <Text
                      spacing={{ base: 2 }}>
                        {x.exercise}
                      </Text>
                  </VStack>
                </Button>
              </Box>
               ))}
            </Flex>
          )}
          {activeStep === 5 &&  (
            <Flex justifyContent="center" flexWrap="wrap" flexDirection="row" padding={"5"}>
            <Box alignItems={"left"} key={exerciseToEdit.id}>
              <Box
                size="lg"
                fontSize="md"
                bg={colorDark}
                color={'white'}
                rounded={'md'}
                p={"2"}
                m={'1'}
              >
                <VStack spacing={{ base: 1, md: 2, lg: 2 }} padding={"1"}>
                  <Text spacing={{ base: 2 }}>
                    {exerciseToEdit.exercise}
                  </Text>
                </VStack>
                <VStack spacing={{ base: 1, md: 2, lg: 2 }} padding={"1"}>
                  <Text spacing={{ base: 1 }}>
                    Weight = {exerciseToEdit.weight} kg
                  </Text>
                  <Text spacing={{ base: 1 }}>
                    Reps = {exerciseToEdit.reps}
                  </Text>
                  <Text spacing={{ base: 1 }}>
                    Sets = {exerciseToEdit.sets}
                  </Text>
                  <Text spacing={{ base: 1 }}>
                    Note = {exerciseToEdit.note}
                  </Text>
                </VStack>
              </Box>
            </Box>
          </Flex>
          )}
          </ModalBody>
          <ModalFooter>
          {activeStep < 4 && exercisesAdded.length > 0 && (
            <Button 
            colorScheme="blue" 
            mr={3}  
            width={"200px"}
            onClick={() => setActiveStep(4)}>
              Workout Process
            </Button>
          )}
          {activeStep > 1 && (
              <Button 
              colorScheme="blue" 
              mr={3}  
              onClick={() => setActiveStep(activeStep-1)}>
                Back
              </Button>
            )}
            {activeStep === 4 && (
              <Button 
              colorScheme="blue" 
              mr={3}  
              onClick={() => {
                setActiveStep(1);
              }}>
                  <HiPlus /> &nbsp; Add Another Exercise
              </Button>
            )}
            {activeStep === 4 && (
              <Button 
              colorScheme="blue" 
              mr={3}  
              onClick={async () => {
                const docRef = doc(db, "workouts", user.displayName);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                  // Document exists, update the exercises and date
                  const existingData = docSnap.data();
                  const updatedData = {...existingData};
                  updatedData[formattedDate] = {
                    exercises: [...(existingData[formattedDate]?.exercises || []), ...exercisesAdded]
                  };

                  await setDoc(docRef, updatedData);
                } else {
                  // Document does not exist, create it
                  await setDoc(docRef, {
                    [formattedDate]: {
                      exercises: exercisesAdded,
                    },
                  });
                }
                setWorkoutFinished(true);
                onClose();
                setActiveStep(1);
                setAddedExercise([]); // Reset the exercisesAdded state to an empty array
              }}>
              Finish Workout
            </Button>
            )}
             {activeStep === 5 && (
              <Button 
              colorScheme="blue" 
              mr={3}  
              onClick={() => {
                setActiveStep(3);
              }}>
               <HiPlus /> &nbsp; Add More Sets
              </Button>
            )}
            {activeStep === 5 && (
              <Button 
              colorScheme="blue" 
              mr={3}  
              onClick={() => {
                setAddedExercise(prevExercises => {
                  const updatedExercises = prevExercises.filter(exercise => exercise.id !== exerciseToEdit.id);
                  return updatedExercises;
                });
                setActiveStep(4);
              }}
            >
              <HiOutlineTrash /> &nbsp; Remove Exercise
            </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Main;
