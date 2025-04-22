import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Lesonss from '../../components/leson/lesons';
import Preposs from '../../components/prepos/prepos';
import Exemple from '../../components/exemple/ExempleList'

const pages =() => {

  const navigation = useNavigation();
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headText}>Leçon niveau 3</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Lesonss />
        <Preposs />
        <View>
          <Exemple/>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  header: {
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems: "center",
    backgroundColor: "#ACE5F6",
    padding: 10,
  },
  headText :{
    fontSize: 24,
    fontWeight: "bold"
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
});

export default pages;
