import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import quiz from "../../assets/datas/quiz.json"

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const lesson = quiz[0];
  const questions = lesson.questions;

  const handleAnswer = (selectedOption) => {
    const correct = questions[currentQuestionIndex].correctAnswer;
    if (selectedOption === correct) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };


  if (completed) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headText}>Leçon niveau 3</Text>
        </View>
        <View style={styles.scoreContainer}>
          <View style={styles.imgcontainer}>
            <Image source ={require('../../assets/images/oiseau.png')} style={styles.img}/>
          </View>
          <View style={styles.scorequestion}>
            <Text style={styles.score}>Quiz terminé ! Score : {score}/{questions.length}</Text>
          </View>
        </View>
      </View>
    );
  }

 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={handleBackPress}>
            <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headText}>Leçon niveau 3</Text>
      </View>
      <View style={styles.corps}>
        <View style={styles.imgcontainer}>
          <Image source ={require('../../assets/images/oiseau.png')} style={styles.img}/>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.title}>Question {currentQuestionIndex + 1} :</Text>
          <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
          <FlatList
            data={questions[currentQuestionIndex].options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleAnswer(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  corps: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  header: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center",
    backgroundColor: "#ACE5F6",
    padding: 10,
  },
  headText :{
    fontSize: 24,
    fontWeight: "bold"
  },
  scoreContainer: {
    flex: 1,
    padding: 20,

  },
  scorequestion: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: '#4878bb',
    shadowColor: "black",
      shadowOffset: {
          width: 0,
          height: 4,
      },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  questionContainer: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: '#839dc5',
    shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6,
    width: 350,
    height: 350,
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  question: { 
    fontSize: 18, 
    margin: 15 
  },
  option: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
    borderRadius: 5,
  },
  score: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  img: {
    width: 200,
    height: 200,
  },
  imgcontainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  }
});

export default Quiz;
