import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import * as Speech from 'expo-speech';

const pages =() => {

  const handleSpeak = () => {
    const textToRead = "Hello, how are you today?";

    const options = {
      language: 'en-US',  
      pitch: 1,          // Tonalité de la voix
      rate: 0.75,        // Vitesse de la voix
    };

    // Lire le texte avec des options
    Speech.speak(textToRead, options);
  }

  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  const [userInput, setUserInput] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('Hello, how are you today?');
  const [result, setResult] = useState(null);


  const handleSubmit = () => {
    if (userInput.trim().toLowerCase() === correctAnswer.toLowerCase()) {
        setResult('✅ Correct ! Bien joué ');
    } 
    else if (userInput.trim().toLowerCase() === ""){
        setResult('Veillez écrir le mot que vous écoute!');
    }
    else {
        setResult(`❌ Faux! La réponse correcte est : ${correctAnswer}`);
    }
    setUserInput('');
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={handleBackPress}>
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.headText}>Leçon niveau 1</Text>
        </View>
        <View style={styles.title}>
            <Text style={styles.titleTxt}>Ecoute</Text>
        </View>
        <View style={styles.btn_ecoute}>
            <Text style={styles.TxtoPlay}>Écouter la phrase</Text>
            <Button title="Play 🔊" onPress={handleSpeak} ></Button>
        </View>
        <View style={styles.imgcontainer}>
          <Image source ={require('../../assets/images/bird.png')} style={styles.img}/>
        </View>
        <View style={styles.corps}>
            <TextInput
                style={styles.input}
                placeholder="Écrivez votre réponse ici"
                value={userInput}
                onChangeText={setUserInput}
            />
            <TouchableOpacity onPress={handleSubmit} style= {styles.btn_soumet}>
              <Text style = {styles.TxOnBtn}>Soumettre</Text>
            </TouchableOpacity>
        </View>
        {result && <Text style={styles.result}>{result}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
},
header: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center",
    backgroundColor: "#ACE5F6",
    padding: 10,
  },
  title: {
    alignItems: "center",
    margin: 10,
    padding: 10,
  },
  titleTxt: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headText :{
    fontSize: 24,
    fontWeight: "semibold"
  },
  btn_ecoute: {
    margin: 30,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 15,
  },
  btn_soumet: {
    width: "auto",
    height: 45,
    backgroundColor: "#3ca9f1",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  TxtoPlay: {
    fontSize: 20,
  },
  TxOnBtn: {
    fontSize: 24,
    color: "white"
  },
  corps: {
    margin: 20,
    padding: 10,
  },
  input: { 
    fontSize: 20,
    color: "#494d52",
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 15,
    padding: 20, 
    width: '100%', 
    marginVertical: 10 ,
    marginBottom: 25,
},
  result: { 
    marginTop: 5, 
    fontSize: 18, 
    textAlign: 'center' 
},
img: {
  width: 200,
  height: 200,
},
imgcontainer: {
  justifyContent: "center",
  alignItems: "center",
}
});

export default pages;
