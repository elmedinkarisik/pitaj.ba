import { Box, HStack, Text } from "@chakra-ui/core";
import React from "react";
import VoteButtons from "./vote-buttons";

const Question = ({ question }) => {
    return (
        <HStack key={question.id} w="100%" alignItems="flex-start">
            <VoteButtons question = {question} />
            <Box bg="gray.100" p={4} rounded="md" w="100%">
                <Text>{question.title}</Text>
            </Box>
        </HStack>
    );
};

export default Question;