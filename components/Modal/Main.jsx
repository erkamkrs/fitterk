import React, { useState, useEffect } from 'react';
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
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
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
import { CgAdd } from 'react-icons/cg';
import { exerciseList } from '../../exerciseList';
import { FaPlus } from 'react-icons/fa';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/firebase';
import { useAuth } from '@/app/context/AuthContext';



const Main = ({ setBodyPart }) => {
  const { user } = useAuth();
  const [bodyPartSelected, setBodyPartSelected] = useState(null);
  const [exerciseSelected, setExerciseSelected] = useState(null);
  const [exercisesAdded, setAddedExercise] = useState([]);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutFinished, setWorkoutFinished] = useState(false);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [note, setNote] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorDark = useColorModeValue('#151f21', 'gray.900');
  const today = new Date();
  const day = today.getDate(); // Day of the month (1-31)
  const month = today.getMonth() + 1; // Month number (1-12), note that JavaScript counts months from 0-11, so we add 1
  const year = today.getFullYear(); // Full year (e.g. 2022)
  const formattedDate = `${day}-${month}-${year}`; // Format the date as you like


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
  }

  const SelectExercise = (exercise) => {
    setExerciseSelected(exercise);
    setActiveStep(3)
  };

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
        <CgAdd /> &nbsp; Start a Workout
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
          {/* <Stepper index={activeStep}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink='0'>
                  <StepTitle padding="1" fontSize="sm">
                    {step.title}
                  </StepTitle>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper> */}
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
                              const newExercise = {
                                exercise: exerciseSelected,
                                weight: weight,
                                reps: reps,
                                sets: sets,
                                note: note,
                              };
                              setAddedExercise(prevExercises => {
                                console.log('Previous exercises:', prevExercises);
                                console.log('New exercise:', newExercise);
                                return [...prevExercises, newExercise];
                              });
                              setActiveStep(4);
                              setWorkoutStarted(true);
                            }}>
                            <FaPlus /> &nbsp; Add Exercise
                          </Button>
                        </VStack>
                      </Box>
                  </VStack>
                </Box>
              </Box>
            </Flex>
          )}
          {activeStep === 4 &&  (
            <Flex justifyContent="center" 
            flexWrap="wrap"
            flexDirection="row" 
            padding={"5"}>
               {exercisesAdded.map((x) => (
              <Box 
              alignItems={"left"}
              key={x.id}>
                <Box
                size="lg"
                fontSize="md"
                bg={colorDark}
                color={'white'}
                rounded={'md'}
                p={"2"}
                m={'1'}>
                  <VStack 
                  spacing={{ base: 1, md: 2, lg: 2 }}
                  padding={"1"}>
                      <Text
                      spacing={{ base: 2 }}>
                        {x.exercise}
                      </Text>
                  </VStack>
                  <VStack spacing={{ base: 1, md: 2, lg: 2 }}
                  padding={"1"}>
                      <Text
                      spacing={{ base: 1 }}>
                        Weight = {x.weight} kg
                      </Text>                      
                      <Text
                      spacing={{ base: 1 }}>
                        Reps = {x.reps}
                      </Text>
                      <Text
                      spacing={{ base: 1 }}>
                        Sets = {x.sets}
                      </Text>
                      <Text
                      spacing={{ base: 1 }}>
                        Note = {x.note}
                      </Text>
                  </VStack>
                </Box>
              </Box>
               ))}
            </Flex>
          )}
          </ModalBody>
          <ModalFooter>
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
               <FaPlus /> &nbsp; Add Another Exercise
              </Button>
            )}
            {activeStep === 4 && (
              <Button 
              colorScheme="blue" 
              mr={3}  
              onClick={async () => {
                setWorkoutFinished(true);
                onClose();
                setActiveStep(1);
            
                const docData = {
                  exercises: exercisesAdded,
                  date: formattedDate,
                  
                };  
                await setDoc(doc(db, "workouts", user.displayName), docData);
              }}>
              Finish Workout
            </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};

export default Main;
