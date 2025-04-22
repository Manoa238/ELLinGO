import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView,Animated} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const GrammarBeginner = () => {
    // Définition des points de grammaire avec leurs exemples et traductions
    const [grammarPoints, setGrammarPoints] = useState([
        {
             id: 1,
             title: 'Le présent simple',
             explanation: 'Utilisé pour exprimer des faits ou des habitudes.',
             example: 'I work every day.',
              translation: 'Je travaille tous les jours.'
        },
        {
            id: 2,
            title: 'Les pronoms personnels',
             explanation: 'Les pronoms les plus utilisés: I, you, he, she, it, we, they.',
            example: 'She is a teacher.',
             translation: 'Elle est professeur.'
         },
        {
            id: 3,
            title: "L'utilisation de 'to be' au présent",
            explanation: "Formes courantes: is, am, are.",
            example: 'I am happy.',
             translation: 'Je suis heureux.'
        },
        {
             id: 4,
             title: 'Formation des questions',
            explanation: "Inversion du sujet et du verbe (souvent avec 'do' ou 'does').",
             example: 'Do you speak English?',
            translation: 'Parlez-vous anglais?'
        },
        {
            id: 5,
            title: "Les articles définis et indéfinis",
            explanation: "Définis: the. Indéfinis: a, an.",
            example: 'The book is on a table.',
             translation: 'Le livre est sur une table.'
        },
         {
            id: 6,
            title: "Les prépositions de lieu",
            explanation: "Les plus utilisés : in, on, at, under, next to, etc.",
            example: 'The cat is under the table.',
             translation: 'Le chat est sous la table.'
        }
    ]);
    // État pour gérer l'animation des icônes de lecture vocale
    const [activeIcons, setActiveIcons] = useState({});
    // Fonction pour naviguer en arrière
    const handleGoBack = () => {
        router.back();
    };
    // Fonction pour la synthèse vocale
    const speak = async (text, language, itemId) => {
        // Met à jour l'état de l'icône pour l'animation
        setActiveIcons(prev => ({ ...prev, [itemId]: true }));
            const options = {
                language: language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'mg-MG',
            };
        // Lance la synthèse vocale
        await Speech.speak(text, options);
        // Réinitialise l'état de l'icône après la lecture
        setActiveIcons(prev => ({ ...prev, [itemId]: false }));
    };


    return (
        <ScrollView style={styles.container}>
            {/* Header avec le bouton de retour et le titre */}
             <View style={styles.header}>
                 <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                 </TouchableOpacity>
                 <Text style={styles.title}>Grammaire de base</Text>
                 <View style={styles.emptyView}/>
             </View>
           {/* Boucle sur les points de grammaire pour les afficher */}
           {grammarPoints.map((point) => (
                <View key={point.id} style={styles.grammarCard}>
                    {/* Titre du point de grammaire */}
                    <Text style={[styles.grammarTitle, styles.grammarTitleColor]}>{point.title}</Text>
                    {/* Explication du point de grammaire */}
                    <Text style={styles.explanation}>{point.explanation}</Text>
                    {/* Conteneur pour l'exemple en anglais et son icône de lecture */}
                      <View style={styles.exampleContainer}>
                         <Text style={styles.exampleLabel}>Exemple:</Text>
                        <View style={styles.exampleView}>
                            <Text style={styles.example}>{point.example}</Text>
                            <TouchableOpacity onPress={() => speak(point.example, 'en', point.id)}>
                                 <Animated.View>
                                    <Ionicons
                                        name="volume-high"
                                        size={24}
                                         color={activeIcons[point.id] ? '#FF8C00' : '#4dd0e1'}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Conteneur pour la traduction en français et son icône de lecture */}
                    <View style={styles.exampleContainer}>
                         <Ionicons name="arrow-forward" size={24} color="#EA89B4"  style={styles.translationIcon}/>
                          <View style={styles.exampleView}>
                                <Text style={styles.example}>{point.translation}</Text>
                                <TouchableOpacity onPress={() => speak(point.translation, 'fr', point.id)}>
                                   <Animated.View>
                                        <Ionicons
                                            name="volume-high"
                                            size={24}
                                           color={activeIcons[point.id] ? '#FF8C00' : '#4dd0e1'}
                                        />
                                   </Animated.View>
                                </TouchableOpacity>
                          </View>
                   </View>
                </View>
            ))}
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
        marginBottom: 20,
        backgroundColor: '#76D7C4',
        padding: 20,
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
    grammarCard: {
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
    grammarTitle: {
         fontSize: 20,
        fontWeight: 'bold',
         marginBottom: 10,
          color: '#333'
    },
    grammarTitleColor: {
         color: '#4dd0e1'
      },
    explanation: {
        fontSize: 16,
         marginBottom: 10,
        color: '#555'
    },
    exampleContainer: {
         flexDirection: 'row',
        alignItems: 'center',
         marginBottom: 5
    },
    exampleLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 5,
        color: '#333'
    },
     exampleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    example: {
        fontSize: 16,
         color: '#555'
    },
    translationIcon: {
        marginRight: 5
    }
});

export default GrammarBeginner;