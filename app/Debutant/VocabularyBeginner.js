import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const VocabularyBeginner = () => {
    const [vocabulary, setVocabulary] = useState([
        { id: 1, english: 'Good morning', french: 'Bonjour', malagasy: 'Manahoana' },
        { id: 2, english: 'Goodbye', french: 'Au revoir', malagasy: 'Veloma' },
        { id: 3, english: 'Thank you', french: 'Merci', malagasy: 'Misaotra' },
        { id: 4, english: 'Please', french: 'S\'il vous plaît', malagasy: 'Azafady' },
        { id: 5, english: 'Yes', french: 'Oui', malagasy: 'Eny' },
        { id: 6, english: 'No', french: 'Non', malagasy: 'Tsia' },
        { id: 7, english: 'How are you?', french: 'Comment allez-vous?', malagasy: 'Manao ahoana ianao?' },
        { id: 8, english: 'I\'m fine, thank you', french: 'Je vais bien, merci', malagasy: 'Tsara fa misaotra' },
        { id: 9, english: 'What\'s your name?', french: 'Comment vous appelez-vous?', malagasy: 'Iza no anaranao?' },
        { id: 10, english: 'My name is...', french: 'Je m\'appelle...', malagasy: 'Ny anarako dia...' },
    ]);
    const [activeIcons, setActiveIcons] = useState({});
    const [speakingId, setSpeakingId] = useState(null);
    const [loadingVoices, setLoadingVoices] = useState(true);
    const [availableVoices, setAvailableVoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const handleGoBack = () => {
        router.back();
    };

    const speak = async (text, language, itemId) => {
        if (isSpeaking) {
            await Speech.stop();
            setIsSpeaking(false);
            setActiveIcons(prev => ({ ...prev, [itemId]: false }));
        }
        setIsSpeaking(true);
        setActiveIcons(prev => ({ ...prev, [itemId]: true }));
        console.log(`Tentative de synthèse vocale pour "${text}" en ${language} (ID: ${itemId})`);

        try {
            let voiceOptions = {};

            // Sélection de la voix en fonction de la langue
            if (language === 'en') {
                const englishVoices = availableVoices.filter(voice => voice.language.startsWith('en-'));
                if (englishVoices.length > 0) {
                    voiceOptions.voice = englishVoices[0].identifier;
                } else {
                    console.log("Aucune voix anglaise trouvée. Utilisation de la voix par défaut");
                }
            } else if (language === 'fr') {
                const frenchVoices = availableVoices.filter(voice => voice.language.startsWith('fr-'));
                if (frenchVoices.length > 0) {
                    voiceOptions.voice = frenchVoices[0].identifier;
                } else {
                    console.log("Aucune voix française trouvée. Utilisation de la voix par défaut");
                }
            } else if (language === 'mg') {
                const malagasyVoices = availableVoices.filter(voice => voice.language.startsWith('mg-'));
                if (malagasyVoices.length > 0) {
                    voiceOptions.voice = malagasyVoices[0].identifier;
                } else {
                    console.log("Aucune voix malgache trouvée. Utilisation de la voix par défaut");
                }
            }

            const options = {
                language: language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'mg-MG',
                ...voiceOptions
            };

            await Speech.speak(text, options);

        } catch (error) {
            console.error("Erreur lors de la synthèse vocale :", error);
        } finally {
            setIsSpeaking(false);
            setActiveIcons(prev => ({ ...prev, [itemId]: false }));
            console.log(`Synthèse vocale pour "${text}" terminée.`);
        }
    };

    useEffect(() => {
        const fetchAvailableVoices = async () => {
            setLoadingVoices(true);
            try {
                const voices = await Speech.getAvailableVoicesAsync();
                setAvailableVoices(voices);
                console.log("Langues disponibles pour la synthèse vocale :", voices);
            } catch (error) {
                console.error("Impossible de vérifier les langues disponibles", error);
            } finally {
                setLoadingVoices(false);
            }
        };
        fetchAvailableVoices();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.title}>Vocabulaire de base</Text>
                <View style={styles.emptyView} />
            </View>
            {loadingVoices ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4dd0e1" />
                    <Text style={styles.loadingText}>Chargement des langues...</Text>
                </View>
            ) : (
                vocabulary.map((item) => (
                    <View key={item.id} style={styles.wordCard}>
                        <View style={styles.wordHeader}>
                            <Text style={styles.englishWord}>{item.english}</Text>
                            <TouchableOpacity onPress={() => speak(item.english, 'en', item.id)}>
                                <Animated.View>
                                    <Ionicons
                                        name="volume-high"
                                        size={24}
                                        color={activeIcons[item.id] ? '#FF8C00' : '#4dd0e1'}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.translations}>
                            <Text style={styles.translation}>Français: {item.french}</Text>
                            <TouchableOpacity onPress={() => speak(item.french, 'fr', item.id)}>
                                <Animated.View>
                                    <Ionicons
                                        name="volume-high"
                                        size={24}
                                        color={activeIcons[item.id] ? '#FF8C00' : '#76D7C4'}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.translations}>
                            <Text style={styles.translation}>Malagasy: {item.malagasy}</Text>
                            <TouchableOpacity onPress={() => speak(item.malagasy, 'mg', item.id)}>
                                <Animated.View>
                                    <Ionicons
                                        name="volume-high"
                                        size={24}
                                        color={activeIcons[item.id] ? '#FF8C00' : '#76D7C4'}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f8ff',
        padding: 20,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        justifyContent: 'center'
    },
    backButton: {
        padding: 10,
        borderRadius: 10,
    },
    emptyView: {
        width: 44
    },
    wordCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    wordHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    englishWord: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
         fontFamily: 'Cochin', // Ajout de la propriété fontFamily
    },
    translations: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    translation: {
        fontSize: 18,
        color: '#555'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555'
    }
});

export default VocabularyBeginner;