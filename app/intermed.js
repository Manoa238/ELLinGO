import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import LeçonItems from "../components/Intermediaire/LeçonItems"
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const page = () =>{
  const navigation = useNavigation();
        const retour = () => {
          router.push('./Result');
        };
  return (
    <View style={styles.root}>
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <AntDesign name="arrowleft" size={30} color="black" onPress={retour}/>
        </TouchableOpacity>
        <View style={styles.headTextContainer}>
          <Text style={styles.headText}>Niveau intermediaire</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Découvrez les différents types de leçons et exercices</Text>
        <View style={styles.imgcontainer}>
          <Image source ={require('../assets/images/book .png')} style={styles.img}/>
        </View>
      </View>
      
      <LeçonItems/>
      

    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: "#76D7C4",
    flexDirection: 'row',
    alignItems: "center",
    padding: 15,
    paddingTop: 40,
    paddingBottom: 15,
    paddingHorizontal: 20,
  },
  headTextContainer: {
    marginLeft: 50,
  },
  headText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  titleContainer: {
    margin: 30,
    padding: 15,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    marginBottom: 20,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 20,
    textAlign: "center",
    color: "#525353",
  },
  
  imgcontainer: {
    margin: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  img: {
    width: 160,
    height: 160,
  },
})
export default page