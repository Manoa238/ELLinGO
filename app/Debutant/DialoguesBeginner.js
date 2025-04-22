import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

const DialoguesBeginner = () => {
    const [dialogues, setDialogues] = useState([
        {
            id: 1,
            title: 'Dialogue de salutation',
            alice: 'Alice: Hello, how are you?',
            tim: 'Tim: I\'m fine, thank you. And you?',
            alice2: 'Alice: I\'m fine too, thank you.',
             translationA: 'Alice: Bonjour, comment allez-vous ?',
            translationB: 'Tim: Je vais bien, merci. Et vous?',
            translationA2: 'Alice: Je vais bien aussi, merci.'
        },
        {
            id: 2,
            title: 'Dialogue pour demander le nom',
            alice: 'Alice: What\'s your name?',
            tim: 'Tim: My name is [Name]. And yours?',
            alice2: 'Alice: I\'m [Name].',
             translationA: 'Alice: Comment vous appelez-vous ?',
            translationB: 'Tim: Je m\'appelle [Nom]. Et vous ?',
            translationA2: 'Alice: Je suis [Nom].'
        },
        {
            id: 3,
             title: 'Dialogue pour demander de l\'aide',
             alice: 'Alice: Please, can you help me?',
            tim: 'Tim: Of course, how can i help you?',
            translationA: 'Alice: S\'il vous plaît, pouvez-vous m\'aider ?',
            translationB: 'Tim: Bien sûr, comment puis-je vous aider ?'
        },
        {
            id: 4,
            title: 'Dialogue au restaurant',
             alice: 'Alice: I would like a coffee, please.',
             tim: 'Tim: Sure, anything else?',
           translationA: 'Alice: Je voudrais un café, s\'il vous plaît.',
            translationB: 'Tim: Bien sûr, autre chose ?'
        }
    ]);
    const [activeIcons, setActiveIcons] = useState({});
    const handleGoBack = () => {
        router.back();
    };
    const speak = async (text, language, itemId) => {
         setActiveIcons(prev => ({ ...prev, [itemId]: true }));
          const options = {
                language: language === 'en' ? 'en-US' : language === 'fr' ? 'fr-FR' : 'mg-MG',
            };

        await Speech.speak(text, options);
         setActiveIcons(prev => ({ ...prev, [itemId]: false }));
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
                     <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Dialogues de base</Text>
                 <View style={styles.emptyView}/>
            </View>
            <View style={styles.TraductionContainer}>
                <Text style={styles.TextTraductor}>Anglais</Text>
            </View>
            {dialogues.map((dialogue) => (
                <View key={dialogue.id} style={styles.dialogueCard}>
                    <Text style={[styles.dialogueTitle, styles.dialogueTitleColor]}>{dialogue.title}</Text>

                        <View style={styles.dialogueLine}>
                            <Text style={styles.dialogueText}>{dialogue.alice}</Text>
                            <TouchableOpacity onPress={() => speak(dialogue.alice, 'en', dialogue.id)}>
                                <Animated.View>
                                    <Ionicons
                                        name="volume-high"
                                        size={24}
                                        color={activeIcons[dialogue.id] ? '#FF8C00' : '#4dd0e1'}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                         </View>
                     {dialogue.tim && (
                            <View style={styles.dialogueLine}>
                                  <Text style={styles.dialogueText}>{dialogue.tim}</Text>
                                    <TouchableOpacity onPress={() => speak(dialogue.tim, 'en', dialogue.id)}>
                                        <Animated.View>
                                            <Ionicons
                                                name="volume-high"
                                                size={24}
                                                color={activeIcons[dialogue.id] ? '#FF8C00' : '#4dd0e1'}
                                            />
                                        </Animated.View>
                                  </TouchableOpacity>
                            </View>
                        )}
                      {dialogue.alice2 && (
                            <View style={styles.dialogueLine}>
                                  <Text style={styles.dialogueText}>{dialogue.alice2}</Text>
                                    <TouchableOpacity onPress={() => speak(dialogue.alice2, 'en', dialogue.id)}>
                                        <Animated.View>
                                            <Ionicons
                                                name="volume-high"
                                                size={24}
                                                color={activeIcons[dialogue.id] ? '#FF8C00' : '#4dd0e1'}
                                            />
                                        </Animated.View>
                                  </TouchableOpacity>
                            </View>
                        )}

                        
                </View>
            ))}
            <View style={styles.TraductionContainer}>
                <Text style={styles.TextTraductor}>Français</Text>
            </View>

{dialogues.map((dialogue) => (
                <View key={dialogue.id} style={styles.dialogueCard}>
                    <Text style={[styles.dialogueTitle, styles.dialogueTitleColor]}>{dialogue.title}</Text>

                        <View style={styles.dialogueLine}>
                            <Text style={styles.dialogueText}>{dialogue.translationA}</Text>
                            <TouchableOpacity onPress={() => speak(dialogue.translationA, 'fr', dialogue.id)}>
                                <Animated.View>
                                    <Ionicons
                                        name="volume-high"
                                        size={24}
                                        color={activeIcons[dialogue.id] ? '#FF8C00' : '#4dd0e1'}
                                    />
                                </Animated.View>
                            </TouchableOpacity>
                         </View>
                     {dialogue.tim && (
                            <View style={styles.dialogueLine}>
                                  <Text style={styles.dialogueText}>{dialogue.translationB}</Text>
                                    <TouchableOpacity onPress={() => speak(dialogue.translationB, 'en', dialogue.id)}>
                                        <Animated.View>
                                            <Ionicons
                                                name="volume-high"
                                                size={24}
                                                color={activeIcons[dialogue.id] ? '#FF8C00' : '#4dd0e1'}
                                            />
                                        </Animated.View>
                                  </TouchableOpacity>
                            </View>
                        )}
                      {dialogue.alice2 && (
                            <View style={styles.dialogueLine}>
                                  <Text style={styles.dialogueText}>{dialogue.translationA2}</Text>
                                    <TouchableOpacity onPress={() => speak(dialogue.translationA2, 'en', dialogue.id)}>
                                        <Animated.View>
                                            <Ionicons
                                                name="volume-high"
                                                size={24}
                                                color={activeIcons[dialogue.id] ? '#FF8C00' : '#4dd0e1'}
                                            />
                                        </Animated.View>
                                  </TouchableOpacity>
                            </View>
                        )}

                        
                </View>
            ))}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
       container: {
        flex: 1,
         backgroundColor: '#f0f8ff',
         paddingLeft: 20,
         paddingRight: 20,
         paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10,
        backgroundColor: '#76D7C4',
        marginBottom: 20,
        padding: 20,
    },
    TraductionContainer: {
        alignItems: 'center',
        margin: 20,
    },
    TextTraductor: {
        fontSize: 28,
        fontWeight: 'medium'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
         color: '#333'
    },
    backButton: {
         padding: 10,
         borderRadius: 10,
        zIndex: 11, // Ajustement de zIndex
     },
    emptyView: {
        width: 44
    },
     dialogueCard: {
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
    dialogueTitle: {
        fontSize: 20,
        fontWeight: 'bold',
         marginBottom: 10,
          color: '#333'
    },
     dialogueTitleColor: {
         color: '#4dd0e1'
    },
   dialogueLine: {
       flexDirection: 'row',
        alignItems: 'center',
          justifyContent: 'space-between',
        marginBottom: 5,
        marginTop: 5
    },
   dialogueText: {
        fontSize: 16,
        color: '#555',
          flex: 1,
       marginRight: 10
    },
    translationContainer: {
          flexDirection: 'row',
        marginBottom: 5,
           marginTop: 5
    },
    translationText: {
        fontSize: 16,
          color: '#555',
         flex: 1,
    },
    translationIcon: {
        marginRight: 5
    }
});

export default DialoguesBeginner;