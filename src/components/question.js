import { Box, HStack, Text } from "@chakra-ui/core";
import React from "react";
import VoteButtons from "./vote-buttons";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Button
  } from "@chakra-ui/react"

const Question = ({ question }) => {
    return (
        <HStack key={question.id} w="100%" alignItems="flex-start">
            <VoteButtons question = {question} />
            <Box bg="gray.100" p={4} rounded="md" w="100%">
                <Text>{question.title}</Text>
                <Popover>
                <PopoverTrigger>
                    <Button>Trigger</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>Confirmation!</PopoverHeader>
                    <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
                </PopoverContent>
                </Popover>
            </Box>
        </HStack>
    );
};

export default Question;