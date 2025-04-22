import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Question from './Question';
import Result from './Result';
import questions from './questions.json';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LevelTest = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [isTestFinished, setIsTestFinished] = useState(false);

    const handleAnswer = (isCorrect) => {
        if(isCorrect) {
            setScore(score + 1)
        }
        if (currentQuestion < filtererQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setIsTestFinished(true)
        }
    };

    const handleReset = () => {
        setCurrentQuestion(0);
        setScore(0);
        setIsTestFinished(false);
    };


    const filtererQuestions = questions.filter(question => !question.lang || question.lang === "en");
     const handleGoBack = () => {
         router.back();
     };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Test de Niveau</Text>
                 <View style={styles.backButton} />
            </View>
            {!isTestFinished ? (
                <Question
                    question={filtererQuestions[currentQuestion]}
                    onAnswer={handleAnswer}
                    currentQuestion={currentQuestion}
                />
            ) : (
                <Result
                    score={score}
                    totalQuestions={filtererQuestions.length}
                    onReset={handleReset}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'space-between'
      },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 10
    }
})
export default LevelTest;