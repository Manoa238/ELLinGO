import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import lessonBeginner from '../../assets/datas/lessonBeginner.json';

// Importe les images des animaux utilisés dans l'exercice
import bear from '../../assets/images/bear.png';
import bird from '../../assets/images/bird.png';
import cat from '../../assets/images/cat.png';
import poulet from '../../assets/images/poulet.png';
import dinosaur from '../../assets/images/dinosaur.png';
import dog from '../../assets/images/dog.png';
import elephant from'../../assets/images/elephant.png';
import fish from '../../assets/images/fish.png';
import flamant from '../../assets/images/flamant.png';
import grenouille from '../../assets/images/grenouille.png';
import chevre from '../../assets/images/chevre.png';
import herisson from '../../assets/images/herisson.png';
import lion from '../../assets/images/lion.png';
import mouse from '../../assets/images/mouse.png';
import manchot from '../../assets/images/manchot.png';
import joint from '../../assets/images/joint.png';
import mouton from '../../assets/images/mouton.png';
import serpent from '../../assets/images/serpent.png';
import escargot from '../../assets/images/escargot.png';
import tortue from '../../assets/images/tortue.png';

const { width, height } = Dimensions.get('window');

const AnimalsBeginner = () => {
    const [showLesson, setShowLesson] = useState(true);
    const [animals, setAnimals] = useState(lessonBeginner.animals);

    // constante des animaux 
    const [exoAnimals, setExerciseAnimals] = useState([
        lessonBeginner.animals.find(animal => animal.english === 'Elephant'),
        lessonBeginner.animals.find(animal => animal.english === 'Bear'),
        lessonBeginner.animals.find(animal => animal.english === 'Chicken'),
        lessonBeginner.animals.find(animal => animal.english === 'Bird'),
        lessonBeginner.animals.find(animal => animal.english === 'Flamingo'),
        lessonBeginner.animals.find(animal => animal.english === 'Dinosaur'),
        lessonBeginner.animals.find(animal => animal.english === 'Cat'),
        lessonBeginner.animals.find(animal => animal.english === 'Fish'),
        lessonBeginner.animals.find(animal => animal.english === 'Frog'),
        lessonBeginner.animals.find(animal => animal.english === 'Dog'),
        lessonBeginner.animals.find(animal => animal.english === 'Lion'),
        lessonBeginner.animals.find(animal => animal.english === 'Goat'),
        lessonBeginner.animals.find(animal => animal.english === 'Hedgehog'),
        lessonBeginner.animals.find(animal => animal.english === 'Mouse'),
        lessonBeginner.animals.find(animal => animal.english === 'Penguin'),
        lessonBeginner.animals.find(animal => animal.english === 'Joint'),
        lessonBeginner.animals.find(animal => animal.english === 'Sheep'),
        lessonBeginner.animals.find(animal => animal.english === 'Snake'),
        lessonBeginner.animals.find(animal => animal.english === 'Snail'),
        lessonBeginner.animals.find(animal => animal.english === 'Turtle'),
    ]);

    const [indice, IndexAnimal] = useState(0);
    const [reponse, ReponseUser] = useState('');
    const [score, Score] = useState(0);
    const [exoFini, ExerciceTermine] = useState(false);
    const [isCorrect, Correct] = useState(true);

    const retour = () => {
        router.back();
    };

    const speak = (text, language) => {
        const options = {
            language: language === 'en' ? 'en-US' : 'fr-FR'
        };
        Speech.speak(text, options);
    };

    const [imageMap, ImageCliquable] = useState({});

    useEffect(() => {
        // Map
        const map = {
            "../../assets/images/bear.png": bear,
            "../../assets/images/bird.png": bird,
            "../../assets/images/cat.png": cat,
            "../../assets/images/dinosaur.png": dinosaur,
            "../../assets/images/dog.png": dog,
            "../../assets/images/elephant.png": elephant,
            "../../assets/images/fish.png": fish,
            "../../assets/images/flamant.png": flamant,
            "../../assets/images/chevre.png": chevre,
            "../../assets/images/grenouille.png": grenouille,
            "../../assets/images/lion.png": lion,
            "../../assets/images/poulet.png": poulet,
            "../../assets/images/herisson.png": herisson,
            "../../assets/images/mouse.png": mouse,
            "../../assets/images/manchot.png": manchot,
            "../../assets/images/joint.png": joint,
            "../../assets/images/mouton.png": mouton,
            "../../assets/images/serpent.png": serpent,
            "../../assets/images/escargot.png": escargot,
            "../../assets/images/tortue.png": tortue,
          
            
        };
        ImageCliquable(map);
    }, []);

    const Exercice = () => {
        setShowLesson(false);
        IndexAnimal(0);
        Score(0);
        ReponseUser('');
        ExerciceTermine(false);
        Correct(true);
    };

    const VerifierReponse = () => {
        const VraiRepons = exoAnimals[indice].french.toLowerCase();
        const userAnswerLower = reponse.toLowerCase();

        if (userAnswerLower === VraiRepons) {
            Alert.alert('Correct!', 'Bravo!', [{ text: 'OK' }]);
            Score(score + 1);
            Correct(true);
            QuestionSuivant();
        } else {
            Correct(false);
        }
    };

    const QuestionSuivant = () => {
        Correct(true);
        if (indice < exoAnimals.length - 1) {
            IndexAnimal(indice + 1);
            ReponseUser('');
        } else {
            ExerciceTermine(true);
        }
    };

    useEffect(() => {
        if (exoFini) {
            Alert.alert(
                'Fin de l\'exercice!',
                `Votre score est de ${score} sur ${exoAnimals.length}`,
                [
                    { text: 'Retour à la leçon', onPress: () => setShowLesson(true) }
                ]
            );
        }
    }, [exoFini, score, exoAnimals.length, setShowLesson]);


    const renderLesson = () => {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.btback} onPress={retour}>
                        <Ionicons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Learn Animals</Text>
                    <View style={styles.emptyView} />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {animals.map(animal => (
                        <View key={animal.id} style={styles.animalCard}>
                            <Image source={imageMap[animal.image]} style={styles.animalImage} />

                            <View style={styles.animalInfo}>
                                <Text style={styles.NomAnimal}>{animal.english}</Text>
                                <Text style={styles.TranducAnimimal}>French: {animal.french}</Text>
                            </View>

                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.btspeak} onPress={() => speak(animal.english, 'en')}>
                                    <Ionicons name="volume-high" size={24} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.btspeak} onPress={() => speak(animal.french, 'fr')}>
                                    <Ionicons name="volume-high" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.exerciseButton} onPress={Exercice}>
                        <Text style={styles.exerciseButtonText}>Go to Exercise</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    };

    const renderExercise = () => {
        const correctAnswer = exoAnimals[indice].french;
        const inputStyle = [
            styles.input,
            !isCorrect ? styles.entrerIncorrect : null,
        ];

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.btback} onPress={() => setShowLesson(true)}>
                        <Ionicons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Animal Exercise</Text>
                    <View style={styles.emptyView} />
                </View>

                {exoFini ? (
                    <Text style={styles.exoTermineText}>Terminé!</Text>
                ) : (
                    <>
                        <Text style={styles.exerciseTitle}>Translate the animal:</Text>
                        <Image source={imageMap[exoAnimals[indice].image]} style={styles.exerciseImage} />
                        <Text style={styles.questionText}>What is "{exoAnimals[indice].english}" in French?</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={inputStyle}
                                onChangeText={text => {
                                    ReponseUser(text);
                                }}
                                value={reponse}
                                placeholder="Your answer"
                            />
                             {!isCorrect && (
                                <Text style={styles.correctAnswerInline}>{correctAnswer}</Text>
                            )}
                        </View>
                       {isCorrect ? (
                            <TouchableOpacity
                                style={styles.submitButton}
                                onPress={VerifierReponse}
                            >
                                <Text style={styles.submitButtonText}>Check Answer</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity
                                style={styles.nextButton}
                                onPress={QuestionSuivant}
                            >
                                <Text style={styles.nextButtonText}>Next Question</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}

                <Text style={styles.scoreText}>Score: {score} / {exoAnimals.length}</Text>
            </View>
        );
    };

    return showLesson ? renderLesson() : renderExercise();
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6F7FF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
        backgroundColor: '#4DB6AC',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#fff',
    },
    btback: {
        padding: 10,
    },
    emptyView: {
        width: 44,
    },
    scrollContainer: {
        padding: 20,
    },
    animalCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
    },
    animalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 15,
        resizeMode: 'cover',
    },
    animalInfo: {
        flex: 1,
    },
    NomAnimal: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    TranducAnimimal: {
        fontSize: 16,
        color: '#777',
    },
    actionButtons: {
        flexDirection: 'row',
    },
    btspeak: {
        backgroundColor: '#009688',
        borderRadius: 25,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    exerciseButton: {
        backgroundColor: '#51E4BA',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
    },
    exerciseButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    exerciseTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    exerciseImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginVertical: 10,
    },
    questionText: {
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    entrerIncorrect: {
        borderColor: 'red',
    },
    correctAnswerInline: {
        marginLeft: 10,
        fontSize: 16,
        color: 'green',
    },
    submitButton: {
        backgroundColor: '#EFB6C8',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    nextButton: {
        backgroundColor: '#FFD461',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    exoTermineText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        color: 'green',
    },
});

export default AnimalsBeginner;