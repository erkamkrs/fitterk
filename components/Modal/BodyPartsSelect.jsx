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
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from '@chakra-ui/react';
import { CgAdd } from 'react-icons/cg';
import { exerciseList } from '../../exerciseList';
import { FaPlus } from 'react-icons/fa';


const BodyPartsSelect = ({ setBodyPart, setAddedExercise}) => {
  const [bodyPartSelected, setBodyPartSelected] = useState(null);
  const [exerciseSelected, setExerciseSelected] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorDark = useColorModeValue('#151f21', 'gray.900');

  const steps = [
    { title: 'Body Part', description: '' },
    { title: 'Exercise', description: '' },
    { title: 'Detail', description: '' },
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
          <ModalHeader textAlign={'center'}>Add an Exercise</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Stepper index={activeStep}>
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
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
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
                  size="lg"
                  fontSize="md"
                  bg={colorDark}
                  color={'gray.200'}
                  rounded="full"
                  p={"2"}
                  m={'1'}
                  _focus={{ shadow: 'outline' }}
                  _hover={{ bg: 'indigo.800' }}
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
                      color={'white'}
                      rounded="full"
                      p={"2"}
                      m={'1'}
                      _focus={{ shadow: 'outline' }}
                      _hover={{ bg: 'indigo.800' }}
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
              alignContent="center"
              justifyContent="center" 
              flexWrap="wrap"
              flexDirection="row" 
              padding={"2"}>
                    <Box>
                      <Button
                        as={"a"}
                        textAlign={"center"}
                        aria-label="Add Details"
                        size="2xl"
                        fontSize="xl"
                        bg={colorDark}
                        color={'white'}
                        p={"2"}
                        m={'2'}
                        _focus={{ shadow: 'outline' }}
                        _hover={{ bg: 'indigo.800' }}
                       >
                        {exerciseSelected}
                      </Button>
                    </Box>
              </Flex>
          )}
          </ModalBody>
          <ModalFooter>
          {activeStep === 3 && (
              <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                setAddedExercise([...exerciseSelected]);
                onClose();
                setActiveStep(activeStep(1))
              }}
            >
              <FaPlus /> &nbsp; Add Exercise
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

          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};

export default BodyPartsSelect;
