import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from "expo-router";
import {Ionicons} from  '@expo/vector-icons';
import * as Font from 'expo-font';  

const HomeScreen = () => {

  const niveau = () => {
    router.push('./LevelTest')
  }
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={require('./logo.png')} style={styles.logo} />
          <Text style={styles.title}>Bienvenue sur ELLinGO!!</Text>
          <Text style={styles.text}>Pour commencer vous devez passer un test de niveau.</Text>
        </View>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={niveau}>
              <Text style={styles.buttonText}>Commencer</Text>
            </TouchableOpacity>
        </View>
      
        <View style={styles.footer}>
          <Image source={require('./hi.png')} style={styles.hi} />
          <Text style={styles.languageText}>Investis dans une langue, récolte des amitiés!!</Text>
        </View>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    marginTop: 85,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 200,
    height: 200
  },
  hi: {
    width: 110,
    height: 110, 
  },
  title: {
      fontSize: 40,
      fontWeight: 'bold',
      textAlign: "center",
      fontFamily: 'Lobster-Regular',
      textShadowColor: 'rgba(5, 2, 2, 0.25)',
      color: '#41ABAE',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5, 
      marginBottom: 50
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center', 
    marginTop: 50
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#F4B5FC',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 115
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Regular',
    color: '#fff'
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10

  },
  languageIcon: {
    fontSize: 24,
    color: '#4CAF50'
  },
  languageText: {
    fontSize: 18,
    color: '#EA89B4',
    textAlign: "center"
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    textAlign: 'center',
  },
    text: {
        fontSize: 28,
        fontFamily: 'Oswald-Bold',
        color: '#333',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        textAlign: "center",
        marginBottom: -60
      }
});

export default HomeScreen;