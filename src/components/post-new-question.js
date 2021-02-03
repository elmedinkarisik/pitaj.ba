import {
    Button,
    FormControl,
    FormLabel,
    Textarea,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    HStack,
    useDisclosure,
} from "@chakra-ui/core";
import React, { useState, useEffect } from "react";
import db from "../lib/firebase";

const PostNewQuestion = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [isSaving, setSaving] = useState(false);

    const handleSubmit = async () => {
        const date = new Date();

        await db.collection("questions").add({
            title,
            upVotesCount: 0,
            downVotesCount: 0,
            createdAt: date.toUTCString(),
            updatedAt: date.toUTCString()
        });

        onClose();
        setTitle("");
    };

    return (
        <>
            <Button onClick = {onOpen} colorScheme = "blue">
                Postavi pitanje
            </Button>

            <Modal onClose = {onClose} isOpen = {isOpen} isCentered>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Postavi pitanje</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl id = "question-title">
                                <FormLabel>Naslov pitanja</FormLabel>
                                <Textarea
                                    type = "question-title"
                                    value = {title}
                                    onChange = {(e) => setTitle(e.target.value)}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <HStack spacing = {4}>
                                <Button onClick = {onClose}>Zatvori</Button>
                                <Button
                                    onClick = {handleSubmit}
                                    colorScheme = "blue"
                                    disabled = {!title.trim()}
                                    isLoading = {isSaving}
                                >
                                    Postavi
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>
        </>
    );
};

export default PostNewQuestion;