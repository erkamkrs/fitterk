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

const BodyPartsSelect = ({ setBodyPart, selectedBodyPart }) => {
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
    setBodyPart(e);
    setBodyPartSelected(selectedBodyPart);
    setActiveStep(2)
  }

  const SelectExercise = (exercise) => {
    setExerciseSelected(exercise);
    setActiveStep(3);
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
      >
        <CgAdd /> &nbsp; Start a Workout
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
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
            {activeStep == 1 &&
            <Flex justifyContent="center" flexWrap="wrap">
              {exerciseList.map((e) => (
                <Box key={e.id}>
                  <Button
                    aria-label="Muscle Select"
                    onClick={SelectBodyPart()}
                    size="sm"
                    fontSize="md"
                    m={1.5}
                    px={5}
                    color="white"
                    bg="indigo.700"
                    rounded="full"
                    _focus={{ shadow: 'outline' }}
                    _hover={{ bg: 'indigo.800' }}
                  >
                    {e.muscle}
                  </Button>
                </Box>
              ))}
            </Flex>
            }
            {activeStep == 2 && bodyPartSelected && (
              <Flex justifyContent="center" flexWrap="wrap">
                {exerciseList
                  .find((group) => group.muscle === bodyPartSelected)
                  .exercises.map((exercise) => (
                    <Box key={exercise.id}>
                      <Button
                        aria-label="Exercise Select"
                        onClick={() => SelectExercise(exercise.exercise)}
                        size="sm"
                        fontSize="md"
                        m={1.5}
                        px={5}
                        color="white"
                        bg="indigo.700"
                        rounded="full"
                        _focus={{ shadow: 'outline' }}
                        _hover={{ bg: 'indigo.800' }}
                      >
                        {exercise.exercise}
                      </Button>
                    </Box>
                  ))}
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={setActiveStep(1)}>
              Back
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  );
};

export default BodyPartsSelect;
