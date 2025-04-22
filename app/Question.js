import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, PanResponder, Animated } from 'react-native';

const Question = ({ question, onAnswer, currentQuestion }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [orderedWords, setOrderedWords] = useState([]);
  const [motdispo, setAvailableWords] = useState(question.words || []);
  const [currentAssociation, setCurrentAssociation] = useState([]);
  const [draggingItem, setDraggingItem] = useState(null);
   const [availableDescriptions, setAvailableDescriptions] = useState(question.descriptions || []);
    const [availableImages, setAvailableImages] = useState(question.images || []);
  const itemPositions = useRef(
      question.images
      // réduire tableau
          ? question.images.reduce(
                (acc, item) => ({
                    ...acc,
                    [item.id]: new Animated.ValueXY({ x: 0, y: 0 }),
                }),
                {}
            )
          : null
  );
   const descriptionPositions = useRef(
      question.descriptions
          ? question.descriptions.reduce(
                (acc, item) => ({
                    ...acc,
                    [item.id]: new Animated.ValueXY({ x: 0, y: 0 }),
                }),
                {}
            )
          : null
  );
   const descriptionRefs = useRef({});
  const itemRefs = useRef({});


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  // glisser-déposer
  const handleDragStart = (id) => {
    setDraggingItem(id);
  };
  const handleDragEnd = () => {
    setDraggingItem(null);
  };

    const handleAnswerSubmit = () => {
      let isCorrect = false;
      switch (question.type) {
          case 'ChoixMultiple':
          case 'ChoixImage':
          case 'TexteEtImage':
             isCorrect = selectedOption === question.answer;
               break;
          case 'Traduction':
             isCorrect = selectedOption === question.answer;
               break;
          case 'VraiOuFaux':
              isCorrect = (selectedOption === "true") === question.answer;
              break;
          case 'ordering':
              const currentOrder = orderedWords.map(word => word.id)
               // convertir valeur en Json
               isCorrect = JSON.stringify(currentOrder) === JSON.stringify(question.answer);
              break;
          case 'association':
            isCorrect = JSON.stringify(currentAssociation) === JSON.stringify(question.answer);
              break;
          default:
              isCorrect = false;
      }
        onAnswer(isCorrect, currentQuestion);
        setSelectedOption(null);
        setOrderedWords([]);
        setAvailableWords(question.words || [])
        setCurrentAssociation([]);
        setAvailableDescriptions(question.descriptions || []);
        setAvailableImages(question.images || []);
    };

  const handleWordClick = (word) => {
    setOrderedWords([...orderedWords, word]);
    setAvailableWords(motdispo.filter(w => w.id !== word.id));
  };
  const handleWordRemove = (word) => {
    setAvailableWords([...motdispo, word]);
    // manipulation tableau
    setOrderedWords(orderedWords.filter(w => w.id !== word.id));
  };

  const panResponder = useRef(
      PanResponder.create({
          onStartShouldSetPanResponder: () => true,
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: (evt, gestureState) => {
              if (draggingItem) {
                itemPositions.current[draggingItem].setOffset({
                  x: itemPositions.current[draggingItem].x._value,
                  y: itemPositions.current[draggingItem].y._value,
                });
                itemPositions.current[draggingItem].setValue({ x: 0, y: 0 });
              }
          },
          onPanResponderMove: (evt, gestureState) => {
              if (draggingItem) {
                  Animated.event([null, { dx: itemPositions.current[draggingItem].x, dy: itemPositions.current[draggingItem].y }], {
                      useNativeDriver: false,
                  })(evt, gestureState);
              }
          },
          onPanResponderRelease: (evt, gestureState) => {
              if (draggingItem) {
                // animation
                itemPositions.current[draggingItem].flattenOffset();
                checkItemPositions();
              }
              handleDragEnd();
          },
      })
  ).current;


const checkItemPositions = () => {
  if (question.type === 'association') {
      const newAssociation = [];
      const images = Object.keys(itemPositions.current);
     
      // Parcourir 
        images.forEach((imageId, imageIndex) => {
            if (itemPositions.current[imageId]) {
              // Transformer objet en tableau
                const descriptions = Object.entries(descriptionPositions.current);
                    let minDistance = Infinity;
                    let closestDescriptionIndex = null;

              for (const [descriptionId, value] of descriptions) {
                    const ref = descriptionRefs.current[descriptionId];
                    if (ref) {
                      // retouurner position
                        const descriptionPos = ref.getBoundingClientRect();
                       const draggedItemPos = itemRefs.current[imageId].getBoundingClientRect();
                         const distance = Math.sqrt(
                          // calculer puissance
                            Math.pow(descriptionPos.x - draggedItemPos.x, 2) +
                              Math.pow(descriptionPos.y - draggedItemPos.y, 2)
                            );
                            if (distance < minDistance) {
                              minDistance = distance;
                              closestDescriptionIndex = availableDescriptions.findIndex(desc => desc.id === descriptionId);
                          }
                   }
            }
                if (closestDescriptionIndex !== null) {
                  newAssociation.push([imageIndex, closestDescriptionIndex]);
                 }
            }
         });
      setCurrentAssociation(newAssociation);
  }
};


  const renderQuestionContent = () => {
    switch (question.type) {
      case 'ChoixMultiple':
        return (
        <View style={styles.card}>
          <View style={[styles.questionContainer, styles.multipleChoiceContainer]}>
            <Text style={styles.questionText}>{question.question}</Text>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        );
      case 'ChoixImage':
        return (
          <View style={[styles.questionContainer, styles.imageChoiceContainer]}>
            <Text style={styles.questionImageText}>{question.question}</Text>
            <View style={styles.imageOptionsContainer}>
              {question.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.imageOptionButton,
                    selectedOption === option.id && styles.selectedOption,
                  ]}
                  onPress={() => handleOptionSelect(option.id)}
                >
                  <Text style={styles.imageText}>{option.image}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 'Traduction':
        return (
          <View style={styles.card}>
          <View style={[styles.questionContainer, styles.translationContainer]}>
            <Text style={styles.questionText}>{question.question}</Text>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          </View>
        );
      case 'VraiOuFaux':
        return (
          <View style={styles.card}>
          <View style={[styles.questionContainer, styles.card,  styles.trueFalseContainer]}>
            <Text style={styles.questionText}>{question.statement}</Text>
            <View style={styles.tfButtons}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedOption === 'true' && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect('true')}
              >
                <Text style={styles.optionText}>True</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  selectedOption === 'false' && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect('false')}
              >
                <Text style={styles.optionText}>False</Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
        );
        case 'association':
             if (itemPositions.current === null || descriptionPositions.current === null) {
                 return <Text>Loading...</Text>;
              }
            return (
                <View style={[styles.questionContainer, styles.associationContainer]}>
                    <Text style={styles.questionText}>{question.question}</Text>
                   <View style={styles.associationDescriptions}>
                      {availableDescriptions.map(item => (
                            <View
                                key={item.id}
                                style={[
                                    styles.associationItem,
                                    descriptionPositions.current[item.id]?.getLayout(),
                                ]}
                                  onLayout={event => descriptionRefs.current[item.id] = event.nativeEvent.layout}
                            >
                                <Text>{item.text}</Text>
                            </View>
                       ))}
                   </View>
                    <View style={styles.associationItems}>
                        {availableImages.map(item => (
                             <Animated.View
                                key={item.id}
                                 style={[
                                     styles.associationItem,
                                   itemPositions.current[item.id]?.getLayout(),
                                 ]}
                                 {...panResponder.panHandlers}
                                 onLayout={event => itemRefs.current[item.id] = event.nativeEvent.layout}
                                 onStartShouldSetResponder={() => { handleDragStart(item.id); return true}}
                             >
                                  <Text style={styles.associationImage}>{item.image}</Text>
                              </Animated.View>
                         ))}
                    </View>
                    <Text style={{ fontSize: 16, marginTop: 10 }}>
                        Match the items with their order
                    </Text>
               </View>
          );
      case 'ordering':
        return (
          <View style={[styles.questionContainer, styles.orderingContainer]}>
            <Text style={styles.questionText}>{question.question}</Text>
            <View style={styles.orderingWordsContainer}>
              {orderedWords.map((word, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.orderingItem}
                  onPress={() => handleWordRemove(word)}
                >
                  <Text>{word.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.orderingWordsContainer}>
              {motdispo.map((word, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.orderingItem}
                  onPress={() => handleWordClick(word)}
                >
                  <Text>{word.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );
      case 'TexteEtImage':
        return (
          <View style={[styles.questionContainer, styles.wordAndImageContainer]}>
            <Text style={styles.questionText}>{question.question}</Text>
            <Text style={styles.wordAndImageImage}>{question.image}</Text>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      default:
        return <Text>Question type non supporté</Text>;
    }
  };


    return (
        <View style={styles.questionContainer}>
            {renderQuestionContent()}
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleAnswerSubmit}
                disabled={(!selectedOption && (question.type === "ChoixMultiple" || question.type === "VraiOuFaux" || question.type === "Traduction" || question.type === 'ChoixImage' || question.type === 'TexteEtImage')) || (question.type === "ordering" && motdispo.length !== 0) || (question.type === "association" && currentAssociation.length !== question.images?.length)}
            >
                <Text style={styles.BoutonConfirmer}>Submit Answer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
    margin: 10,
    },
    questionContainer: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    },
    multipleChoiceContainer: {
    backgroundColor: '#e8f5e9',
    marginBottom: 50,
    padding: 25
    },
    translationContainer: {
    backgroundColor: '#e3f2fd',
    marginTop: 50, 
    marginBottom: 50
    },
    trueFalseContainer: {
    backgroundColor: '#fff3e0',
    marginTop: 35, 
    marginBottom: 35,
    textAlign: 'center',
    },
    imageChoiceContainer: {
    backgroundColor: '#f8bbd0',
    marginTop: 10, 
    marginBottom: 30,
    padding: 15
    },
    orderingContainer: {
    backgroundColor: '#ede7f6',
    },
    wordAndImageContainer: {
    backgroundColor: '#ffecb3'
    },
    questionText: {
    fontSize: 18,
    marginBottom: 30,
    color: '#333',
    textAlign: 'center',
    marginTop: 20, 
    },
    questionImageText: {
      fontSize: 18,
      marginBottom: 10,
      color: '#333',
      textAlign: 'center',
      marginTop: 85,
  },
    optionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 8,
    },
    optionText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    },
    selectedOption: {
    backgroundColor: '#c8e6c9',
    },
    textInput: {
    borderWidth: 1,
    fontSize: 18,
    marginBottom: 10,
    },
    submitButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    },
    BoutonConfirmer: {
    color: '#fff',
    fontWeight: 'bold',
    },
    associationContainer: {
    backgroundColor: '#f0f4c3',
    },
    associationDescriptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
    },
    associationItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
    },
    associationItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 5,
    alignItems: 'center',
    borderRadius: 8
    },
    associationImage: {
    fontSize: 20,
    marginTop: 5,
    },
    tfButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    marginTop: 50,
    marginBottom: 60,
    },
    imageOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    flexWrap: 'wrap',
    marginTop: 50,
    padding: -10
    },
    imageOptionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 50,
    marginHorizontal: 5,
    alignItems: 'center',
    },
    imageText: {
    fontSize: 55,
    textAlign: 'center', 
    },
    orderingWordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10
    },
    orderingItem: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5
    },
    wordAndImageImage: {
    fontSize: 100,
    marginBottom: 10,
    textAlign: 'center',
    }, 
    card: {
      backgroundColor: 'white',
      borderRadius: 15,
      padding: 25,
      shadowColor: '#000',
      marginTop: 10,
      backgroundColor: '#e8f5e9',
      shadowOffset: {
          width: 0,
          height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 6,
      elevation: 8,
  },
    });
    export default Question;