import { IconButton, Text, Textarea, VStack } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp} from "react-icons/fi";
import db from "../lib/firebase";

const VoteButtons = ({ question }) => {
    const [isVoting, setVoting] = useState(false);
    const [votedQuestions, setVotedQuestions] = useState([]);

    useEffect(() => {
        const votesFromLocalStorage = localStorage.getItem("votes") || [];
        let previousVotes = [];

        try {
            previousVotes = JSON.parse(votesFromLocalStorage);
        } catch (error) {
            console.error(error);
        }

        setVotedQuestions(previousVotes);
    }, []);

    const handleDisablingOfVoting = (questionId) => {
        const previousVotes = votedQuestions;
        previousVotes.push(questionId);

        setVotedQuestions(previousVotes);

        localStorage.setItem("votes", JSON.stringify(votedQuestions));
    };

    const handleClick = async (type) => {
        setVoting(true);
        
        // Do calculation to save the vote.
        let upVotesCount = question.upVotesCount;
        let downVotesCount = question.downVotesCount;

        const date = new Date();

        if (type === "upvote") {
            upVotesCount = upVotesCount + 1;
        } else {
            downVotesCount = downVotesCount + 1;
        }

        await db.collection("questions").doc(question.id).set({
            title: question.title,
            upVotesCount,
            downVotesCount,
            createdAt: question.createdAt,
            updatedAt: date.toUTCString(),
        });
        
        handleDisablingOfVoting(question.id);

        setVoting(true);
    };

    const checkIfQuestionIsAlreadyVoted = () => {
        if (votedQuestions.indexOf(question.id) > -1) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <>
            <VStack>
                <IconButton
                    size = "lg"
                    colorScheme = "purple"
                    aria-label = "Upvote"
                    icon = {<FiArrowUp />}
                    onClick = {() => handleClick("upvote")}
                    isLoading = {isVoting}
                    isDisabled = {checkIfQuestionIsAlreadyVoted()}
                />
                <Text bg = "gray.100" rounded = "md" w = "100%" p = {1}>
                    {question.upVotesCount}
                </Text>
            </VStack>
            <VStack>
                <IconButton
                    size = "lg"
                    colorScheme = "yellow"
                    aria-label = "Downvote"
                    icon = {<FiArrowDown />}
                    onClick = {() => handleClick("downvote")}
                    isLoading = {isVoting}
                    isDisabled = {checkIfQuestionIsAlreadyVoted()}
                />
                <Text bg = "gray.100" rounded = "md" w = "100%" p = {1}>
                    {question.downVotesCount}
                </Text>
            </VStack>
        </>
    );
};

export default VoteButtons;