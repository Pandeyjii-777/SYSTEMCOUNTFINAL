
import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight
  , TouchableNativeFeedback, Alert, Button, Platform, Dimensions, ScrollView, StatusBar} from 'react-native';

 
export default class DrawerMenu extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '',
    };


  };
   

  render() {
    
    return (<>
        <SafeAreaView style={styles.container}>
          <ScrollView>
         
         <View style={styles.allbtn}>
             
         <TouchableOpacity style={styles.btn5} >
         <Text style={styles.btn5text}>D2R Tech</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.btn4} 
           onPress={() => this.props.navigation.navigate('EVENTDRAWERSCREEN')}>
            <Text style={styles.btn2text}>EVENTS</Text>
           </TouchableOpacity>
          
           <TouchableOpacity style={styles.btn2} 
           onPress={() => this.props.navigation.navigate('RightOrganization')}>
            <Text style={styles.btn2text}>Right Organization</Text>
           </TouchableOpacity>
           
    
           <TouchableOpacity style={styles.btn3}
           onPress={() => this.props.navigation.navigate('LeftOrganization')}>
            <Text style={styles.btn3text}>Left Organization</Text>
           </TouchableOpacity>
          
           <TouchableOpacity style={styles.btn1}
           onPress={() => this.props.navigation.navigate('Active')}>
            <Text style={styles.btn1text}>Active Employee</Text>
           </TouchableOpacity>

           <TouchableOpacity style={styles.btn4}
           onPress={() => this.props.navigation.navigate('Inactive')}>
            <Text style={styles.btn4text}>Inactive Employee</Text>
           </TouchableOpacity>
           </View>
          
          </ScrollView>
        </SafeAreaView>
        
      </>);
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'gold',
      
    },
  
    NAVbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   
    },
    
    allbtn:{
      marginVertical: 25,
    },
  
    btn1:{
      marginVertical: 10, 
      height: 50,
      backgroundColor: 'blue',
      borderRadius: 50,
    },
    btn1text:{
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      color: "white",
      fontSize: 30
    },
  
    btn2:{
      marginVertical: 10, 
      height: 50,
      backgroundColor: 'green',
      borderRadius: 50,
    },
    btn2text:{
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      color: "white",
      fontSize: 30
    },
  
    btn3:{
      marginVertical: 10, 
      height: 50,
      backgroundColor: 'red',
      borderRadius: 50,
    },
    btn3text:{
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      color: "white",
      fontSize: 30
    },
    btn4:{
      marginVertical: 10, 
      height: 50,
      backgroundColor: 'gray',
      borderRadius: 50,
    },
    btn4text:{
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      color: "white",
      fontSize: 30
    },
    btn5:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10, 
      marginHorizontal: 110,
      height: 150,
      width: 150,
      backgroundColor: 'pink',
      borderRadius: 280
    },
    btn5text:{
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      color: "black",
      fontSize: 26,
      
    },
  });
  