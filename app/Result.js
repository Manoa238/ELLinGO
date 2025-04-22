import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
//import Beginner from './Beginner'; 

const Result = ({ score, totalQuestions, onReset }) => {
    const [level, setLevel] = useState('beginner');

    useEffect(() => {
        const demiScore = totalQuestions / 2;

        if (score < demiScore) {
            setLevel('beginner');
        } else if (score === demiScore) {
            setLevel('intermediate');
        } else {
            setLevel('advanced');
        }
    }, [score, totalQuestions]);

    const handleLevelClick = (LevelSelectionner) => {
        setLevel(LevelSelectionner);
        console.log('Navigation vers:', `/${LevelSelectionner}`);
        router.push(`/${LevelSelectionner}`);
    };

    const LevelCliquable = (LevelCible) => {
        const demiScore = totalQuestions / 2;
        if (score < demiScore) {
            return LevelCible === 'beginner';
        } else if (score === demiScore) {
            return LevelCible === 'beginner' || LevelCible === 'intermediate';
        } else {
            return true;
        }
    };

    const getLevelButtonStyle = (LevelCible) => {
        if (LevelCible === level) {
            return styles.levelButtonSelected;
        }
        return LevelCliquable(LevelCible) ? styles.levelBouttonActive : styles.levelBouttonDisactive;
    };
    const getButtonContainerStyle = (LevelCible) => {
        return !LevelCliquable(LevelCible) ? styles.buttonContainerDisactive : null;
    };

    const beginner = () => {
        router.push('Debutant/Beginner')
    };

    const inter = () => {
        router.push('./intermed')
    };
    return (
        <View style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Test Finished!</Text>
                <Text style={styles.score}>Your Score: {score} / {totalQuestions}</Text>
                <Text style={styles.levelTitle}>Your Level: {level}</Text>

                <View style={styles.levelButtonsContainer}>
                    <View style={getButtonContainerStyle('beginner')}>
                        <TouchableOpacity
                            style={[
                                styles.BouttonLevel,
                                getLevelButtonStyle('beginner')
                            ]}
                            onPress={beginner}
                            disabled={!LevelCliquable('beginner')}
                        >
                            <Text style={styles.levelButtonText}>Beginner</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={getButtonContainerStyle('intermediate')}>
                        <TouchableOpacity
                            style={[
                                styles.BouttonLevel,
                                getLevelButtonStyle('intermediate')
                            ]}
                            onPress={inter}
                            disabled={!LevelCliquable('intermed')}
                        >
                            <Text style={styles.levelButtonText}>Intermediate</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={getButtonContainerStyle('advanced')}>
                        <TouchableOpacity
                            style={[
                                styles.BouttonLevel,
                                getLevelButtonStyle('advanced')
                            ]}
                        >
                            <Text style={styles.levelButtonText}>Advanced</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.resetButton} onPress={onReset}>
                    <Text style={styles.resetButtonText}>Restart Test</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        padding: 30,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    score: {
        fontSize: 22,
        marginBottom: 15,
        textAlign: 'center',
        color: '#555',
    },
    levelTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 25,
        textAlign: 'center',
        color: '#333',
    },
    levelButtonsContainer: {
        flexDirection: 'row',
        marginBottom: 25,
        justifyContent: 'center',
    },
    buttonContainerDisactive: {
        opacity: 0.5,
    },
    BouttonLevel: {
        padding: 12,
        marginHorizontal: 8,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    levelBouttonActive: {
        backgroundColor: '#e0f7fa',
        borderColor: '#4dd0e1',
    },
    levelBouttonDisactive: {
        backgroundColor: '#ffebee',
        borderColor: '#f48fb1',
    },
    levelButtonSelected: {
        backgroundColor: '#b2ebf2',
        borderColor: '#00bcd4',
    },
    levelButtonText: {
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center',
    },
    resetButton: {
        backgroundColor: '#41ABAE',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    resetButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default Result;