import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


const chatMessages = [
  { id: 1, sender: "user1", TxtFr: "Salut, comment ça va ?", TxtEn: "Hi, how are you?" },
  { id: 2, sender: "user2", TxtFr: "Ça va bien, merci ! Et toi ?", TxtEn: "I'm good, thank you! And you?" },
  { id: 3, sender: "user1", TxtFr: "Je vais bien aussi. Quoi de neuf ?", TxtEn: "I'm doing well too. What's new?" },
  { id: 4, sender: "user2", TxtFr: "Pas grand-chose, juste un peu occupé.", TxtEn: "Not much, just a bit busy." },
  { id: 5, sender: "user1", TxtFr: "Je comprends. Moi aussi, je suis assez occupé.", TxtEn: "I understand. I'm also pretty busy." },
  { id: 6, sender: "user2", TxtFr: "Tu fais quoi ce week-end ? On pourrait se voir.", TxtEn: "What are you doing this weekend? We could meet up." },
  { id: 7, sender: "user1", TxtFr: "Ce week-end, je suis libre samedi. Ça te va ?", TxtEn: "I'm free this Saturday. Does that work for you?" },
  { id: 8, sender: "user2", TxtFr: "Samedi ça me va, j'ai hâte de te voir !", TxtEn: "Saturday works for me, I can't wait to see you!" },
  { id: 9, sender: "user1", TxtFr: "Moi aussi ! Tu as une idée de l'endroit où on pourrait aller ?", TxtEn: "Me too! Do you have an idea of where we could go?" },
  { id: 10, sender: "user2", TxtFr: "Peut-être un café sympa ou un restaurant. Qu'en penses-tu ?", TxtEn: "Maybe a nice café or a restaurant. What do you think?" },
  { id: 11, sender: "user1", TxtFr: "Un café serait parfait, je connais un endroit super. On se retrouve là-bas ?", TxtEn: "A café sounds perfect, I know a great place. Shall we meet there?" },
  { id: 12, sender: "user2", TxtFr: "Oui, c'est une bonne idée ! Je serai là à 16h.", TxtEn: "Yes, that's a great idea! I'll be there at 4 PM." },
  { id: 13, sender: "user1", TxtFr: "Super ! À samedi alors.", TxtEn: "Great! See you on Saturday then." },
  { id: 14, sender: "user2", TxtFr: "À samedi, je suis impatient !", TxtEn: "See you on Saturday, I can't wait!" },
];

const ChatPage = () => {
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
      <ScrollView style={styles.chatContainer}>
        {chatMessages.map((message) => (
          <View key={message.id} style={[styles.messageContainer, message.sender === "user1" ? styles.user1Message : styles.user2Message]}>
            <View>
                <Image source ={require('../../assets/images/oiseau(2).png')} style={styles.img}/>
            </View>
            <View style={styles.messageBubble}>
              <Text style={[styles.messageText, { color: "#4CAF50" }]}>{message.TxtEn}</Text> {/* Texte en anglais */}
            </View>
            <View style={styles.messageBubble}>
              <Text style={[styles.messageText, { color: "#2196F3" }]}>{message.TxtFr}</Text> {/* Texte en français */}
            </View>
          </View>
        ))}
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
  chatContainer: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 15,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  messageContainer: {
    marginBottom: 20,
  },
  user1Message: {
    alignItems: "flex-end",   
  },
  user2Message: {
    alignItems: "flex-start",  
  },
  messageBubble: {
    backgroundColor: "#e3e3e3",
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
  },
});

export default ChatPage;
