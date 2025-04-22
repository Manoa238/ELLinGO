import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as Speech from 'expo-speech';
import { useLocalSearchParams } from 'expo-router';

const images = {
  cat: require('../../assets/images/cat.png'),
  dog: require('../../assets/images/dog.png'),
  bird: require('../../assets/images/bird.png'),
  fish: require('../../assets/images/fish.png'),
  house: require('../../assets/images/house.png'),
  hello: require('../../assets/images/hello.png'),
};

export default function Lesson() {
  const { level, lessonType } = useLocalSearchParams();

  const speak = async (text) => {
    Speech.speak(text, { language: 'en' });
  };

  const getLessonContent = () => {
    switch (lessonType) {
      case "vocabulary":
        return <VocabularyLesson images={images} speak={speak} level={level} />;
      case "grammar":
        return <GrammarLesson speak={speak} level={level} />;
      case "dialogues":
        return <DialoguesLesson speak={speak} level={level} />;
      default:
        return <Text>Invalid lesson type</Text>;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {getLessonContent()}
    </ScrollView>
  );
}

const VocabularyLesson = ({ images, speak, level }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Vocabulaire de base (level : {level})</Text>
      <View style={styles.wordContainer}>
        <WordItem text="Hello" imageName="hello" playSound={speak} />
        <WordItem text="Cat" imageName="cat" playSound={speak} />
        <WordItem text="Dog" imageName="dog" playSound={speak} />
        <WordItem text="Bird" imageName="bird" playSound={speak} />
        <WordItem text="Fish" imageName="fish" playSound={speak} />
        <WordItem text="House" imageName="house" playSound={speak} />
      </View>
    </View>
  );
};

const GrammarLesson = ({ speak, level }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Grammaire (level : {level})</Text>
      <Text style={styles.text}>Ici, on va mettre une leçon de grammaire</Text>
      <TouchableOpacity style={styles.grammarButton} onPress={() => speak("Le sujet fait l'action")}>
        <Text>Le sujet fait l'action</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.grammarButton} onPress={() => speak("Le complément subit l'action")}>
        <Text>Le complément subit l'action</Text>
      </TouchableOpacity>
    </View>
  );
};

const DialoguesLesson = ({ speak, level }) => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Dialogues (level : {level})</Text>
      <TouchableOpacity style={styles.grammarButton} onPress={() => speak("Hello, how are you?")}>
        <Text>Hello, how are you?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.grammarButton} onPress={() => speak("I'm fine, thank you, and you?")}>
        <Text>I'm fine, thank you, and you?</Text>
      </TouchableOpacity>
    </View>
  );
};

const WordItem = ({ text, imageName, playSound }) => (
  <TouchableOpacity style={styles.wordItem} onPress={() => playSound(text)}>
    <Image source={images[imageName]} style={styles.wordImage} />
    <Text style={styles.wordText}>{text}</Text>
  </TouchableOpacity>
);

const PhraseButton = ({ text, playSound }) => (
  <TouchableOpacity style={styles.phraseButton} onPress={() => playSound(text)}>
    <Text style={styles.phraseButtonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'OpenSans-Bold',
        color: '#333',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
        fontFamily: 'OpenSans-Bold',
        color: '#333',
    },
    vocabularySection: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    phraseSection: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    wordContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    wordItem: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    wordImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
        borderRadius: 5,
    },
    wordText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'OpenSans-Regular',
        color: '#333',
    },
    phraseContainer: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    phraseButton: {
        padding: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    phraseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'OpenSans-Regular',
    },
   grammarButton: {
     padding: 10,
       backgroundColor: '#80deea',
       borderRadius: 5,
       alignSelf: 'flex-start',
      marginBottom: 10,
      shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
     shadowRadius: 4,
     },
    text: {
        fontSize: 16,
    }
});