import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const QuestionScreen = () => {
  const [question, setQuestion] = useState({
    text: 'Quel est le nom de la capitale de la France ?',
    options: ['Paris', 'Lyon', 'Marseille', 'Bordeaux'],
    correctAnswer: 'Paris',
  });

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswerPress = (answer) => {
    setSelectedAnswer(answer);
    if (answer === question.correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.text}</Text>
      {question.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswer === option && styles.selectedAnswer,
          ]}
          onPress={() => handleAnswerPress(option)}
        >
          <Text style={styles.answerText}>{option}</Text>
          {selectedAnswer === option && isCorrect === true && (
            <Ionicons name="checkmark-circle" size={24} color="#34C759" />
          )}
          {selectedAnswer === option && isCorrect === false && (
            <Ionicons name="close-circle" size={24} color="#FF3B30" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
  },
  answerButton: {
    width: '100%',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#F7F7F7',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedAnswer: {
    backgroundColor: '#E5E5E5',
  },
  answerText: {
    fontSize: 18,
  },
});

export default QuestionScreen;