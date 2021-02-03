import { Container, Flex, Spinner, VStack } from "@chakra-ui/core";
import React, { useEffect, useState } from "react";
import Question from "./components/question";
import db from "./lib/firebase";
import Navbar from "./components/navbar";

const App = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Hook to handle the initial fetching of posts

    db.collection("questions")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _questions = [];

        querySnapshot.forEach((doc) => {
          _questions.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setQuestions(_questions);
      });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxW="md" centerContent p={8}>
        <VStack spacing={8} w="100%">
          {questions.map((question) => (
            <Question question={question} key={question.id} />
          ))}
        </VStack>
      </Container>
    </>  
  );
};

export default App;