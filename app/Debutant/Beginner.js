import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const Beginner = () => {
    const retour = () => {
        router.push('../Result');
    };

    const fruits = () => {
      router.push('Debutant/FruitsBeginner');
    };

    const animaux = () => {
        router.push('Debutant/AnimauxBeginner');
    };

    const nombres = () => {
        router.push('Debutant/NumbresBeginner');
    };
  
    const Vocabulaire =  () => {
        router.push('Debutant/VocabularyBeginner');
    };

    const Grammaire = () => {
        router.push('Debutant/GrammarBeginner');
    };

    const Dialogues = () => {
        router.push('Debutant/DialoguesBeginner');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={retour}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Niveau Débutant</Text>
                <View style={styles.emptyView}/>
            </View>

            <View style={styles.buttonsContainer}>
               <TouchableOpacity style={styles.button} onPress={fruits}>
               <View style={styles.buttonContent}>
                    <Image source={require('../../assets/images/fruit.png')} style={styles.buttonImage} />
                    <Text style={styles.buttonText}>Fruits</Text>
                </View>
                </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={animaux}>
                     <View style={styles.buttonContent}>
                         <Image source={require('../../assets/images/animaux.png')} style={styles.buttonImage} />
                           <Text style={styles.buttonText}>Animaux</Text>
                      </View>
                 </TouchableOpacity>
               <TouchableOpacity style={styles.button} onPress={nombres}>
                    <View style={styles.buttonContent}>
                         <Image source={require('../../assets/images/nombre.png')} style={styles.buttonImage} />
                         <Text style={styles.buttonText}>Nombres</Text>
                    </View>
               </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={Vocabulaire}>
                    <View style={styles.buttonContent}>
                        <Image source={require('../../assets/images/vocabulaire.png')} style={styles.buttonImage} />
                         <Text style={styles.buttonText}>Vocabulaire</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={Grammaire}>
                    <View style={styles.buttonContent}>
                        <Image source={require('../../assets/images/grammaire.png')} style={styles.buttonImage} />
                        <Text style={styles.buttonText}>Grammaire</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={Dialogues}>
                    <View style={styles.buttonContent}>
                         <Image source={require('../../assets/images/dialogue.png')} style={styles.buttonImage} />
                         <Text style={styles.buttonText}>Dialogues</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#76D7C4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
         color: '#333'
    },
    backButton: {
       padding: 10,
         borderRadius: 10,
    },
    emptyView: {
        width: 44
    },
     buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
    },
    button: {
        gap: 10,
        backgroundColor: '#4dd0e1',
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
        width: 170,
        marginHorizontal: 10,
        alignItems: 'center',

    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
     buttonImage: {
      width: 50,
      height: 50,
      marginRight: 10
    }
});

export default Beginner;