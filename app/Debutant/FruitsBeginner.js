import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import lessonBeginner from '../../assets/datas/lessonBeginner.json';

import apple from '../../assets/images/apple.png';
import avocado from '../../assets/images/avocado.png';
import banana from '../../assets/images/banana.png';
import blueberry from '../../assets/images/blueberry.png';
import cherry from '../../assets/images/cherry.png';
import kiwi from '../../assets/images/kiwi.png';
import litchis from '../../assets/images/litchis.png';
import mango from '../../assets/images/mango.png';
import orange from '../../assets/images/orange.png';
import pineapple from '../../assets/images/pineapple.png';
import strawberry from '../../assets/images/strawberry.png';
import tomato from '../../assets/images/tomato.png';
import watermelon from '../../assets/images/watermelon.png';

const FruitsBeginner = () => {
    const [MontrerLesson, setShowLesson] = useState(true);
    const [fruits, setFruits] = useState(lessonBeginner.fruits);
    const [IconActive, IconsActive] = useState({});

    // State pour l'exercice
    const [indice, IndexFruit] = useState(0);
    const [reponse, ReponseUser] = useState('');
    const [score, Score] = useState(0);
    const [exoFini, ExerciceTermine] = useState(false);
    const [isCorrect, Correct] = useState(true);

    const retour = () => {
        router.back();
    };

    const speak = async (text, language, itemId) => {
        IconsActive(prev => ({ ...prev, [itemId]: true }));
        const options = {
            language: language === 'en' ? 'en-US' : 'fr-FR'
        };

        try {
            await Speech.speak(text, options);
        } catch (error) {
            console.error("Erreur lors de la synthèse vocale :", error);
            // Gérer l'erreur ici, par exemple afficher un message à l'utilisateur
        } finally {
            IconsActive(prev => ({ ...prev, [itemId]: false }));
        }
    };


    const Exercice = () => {
        setShowLesson(false);
        IndexFruit(0);
        Score(0);
        ReponseUser('');
        ExerciceTermine(false);
        Correct(true);
    };

    const VerifierReponse = () => {
        const VraiRepons = fruits[indice].french.toLowerCase();
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
        Correct(true); // Réinitialiser pour la prochaine question
        if (indice < fruits.length - 1) {
            IndexFruit(indice + 1);
            ReponseUser('');
        } else {
            ExerciceTermine(true);
        }
    };

    useEffect(() => {
        if (exoFini) {
            Alert.alert(
                'Fin de l\'exercice!',
                `Votre score est de ${score} sur ${fruits.length}`,
                [
                    { text: 'Retour à la leçon', onPress: () => setShowLesson(true) }
                ]
            );
        }
    }, [exoFini, score, fruits.length, setShowLesson]);

    // Utilise un hook useState pour stocker le mapping
    const [imageMap, ImageCliquable] = useState({});

    useEffect(() => {
        // Crée le mapping une seule fois au montage du composant
        const map = {
            "../../assets/images/apple.png": apple,
            "../../assets/images/avocado.png": avocado,
            "../../assets/images/banana.png": banana,
            "../../assets/images/blueberry.png": blueberry,
            "../../assets/images/cherry.png": cherry,
            "../../assets/images/kiwi.png": kiwi,
            "../../assets/images/litchis.png": litchis,
            "../../assets/images/mango.png": mango,
            "../../assets/images/orange.png": orange,
            "../../assets/images/pineapple.png": pineapple,
            "../../assets/images/strawberry.png": strawberry,
            "../../assets/images/tomato.png": tomato,
            "../../assets/images/watermelon.png": watermelon,
        };
        ImageCliquable(map);
    }, []);

    const Lesson = () => {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={retour}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Fruits</Text>
                    <View style={styles.emptyView} />
                </View>
                <View style={styles.listContainer}>
                    {fruits.map((fruit, index) => (
                        <View key={index} style={styles.fruitCard}>
                            <View style={styles.imageContainer}>
                                {/* Mapping pour afficher l'image */ }
                                <Image source={imageMap[fruit.image]} style={styles.fruitImage} />
                            </View>
                            <View style={styles.textContainer}>
                                <View style={styles.nameContainer}>
                                    <Text style={styles.englishName}>{fruit.english}</Text>
                                    <TouchableOpacity onPress={() => speak(fruit.english, 'en', index)}>
                                        <Ionicons
                                            name="volume-high"
                                            size={24}
                                            color={IconActive[index] ? '#FF8C00' : '#76D7C4'}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.translations}>
                                    <Text style={styles.translation}>Fr: {fruit.french}</Text>
                                    <TouchableOpacity onPress={() => speak(fruit.french, 'fr', index)}>
                                        <Ionicons
                                            name="volume-high"
                                            size={24}
                                            color={IconActive[index] ? '#FF8C00' : '#76D7C4'}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                <TouchableOpacity style={styles.exerciseButton} onPress={Exercice}>
                    <Text style={styles.exerciseButtonText}>Go to Exercise</Text>
                </TouchableOpacity>
            </ScrollView>
        );
    };

    const renderExercise = () => {
        const correctAnswer = fruits[indice].french;
        const inputStyle = [
            styles.input,
            !isCorrect ? styles.entreIncorrect : null,
        ];

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => setShowLesson(true)}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Fruit Exercise</Text>
                    <View style={styles.emptyView} />
                </View>

                {exoFini ? (
                    <Text style={styles.exoTermineText}>Terminé!</Text>
                ) : (
                    <>
                        <Text style={styles.exerciseTitle}>Translate the fruit:</Text>
                        {/* Utilise le mapping pour l'image de l'exercice aussi */}
                        <Image source={imageMap[fruits[indice].image]} style={styles.exerciseImage} />
                        <Text style={styles.questionText}>What is "{fruits[indice].english}" in French?</Text>
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
                                <Text style={styles.bonneRepons}>{correctAnswer}</Text>
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
                                <Text style={styles.nextText}>Next Question</Text>
                            </TouchableOpacity>
                        )}
                    </>
                )}

                <Text style={styles.scoreText}>Score: {score} / {fruits.length}</Text>
            </View>
        );
    };

    return MontrerLesson ? Lesson() : renderExercise();
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
        padding: 20,
        backgroundColor: '#76D7C4',
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    backButton: {
        padding: 10,
        borderRadius: 10,
    },
    emptyView: {
        width: 44
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    fruitCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    imageContainer: {
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    fruitImage: {
        width: 90,
        height: 90,
        resizeMode: 'contain'
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    englishName: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Arial',
        color: '#333'
    },
    translations: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    translation: {
        fontSize: 18,
        color: '#555',
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
    backToLessonButton: {
        backgroundColor: '#76D7C4',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 20,
    },
    backToLessonButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
    entreIncorrect: {
        borderColor: 'red',
    },
    bonneRepons: {
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
    nextText: {
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

export default FruitsBeginner;