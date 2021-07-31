
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight
  , TouchableNativeFeedback, Alert, Button, Platform, Dimensions, ScrollView, StatusBar} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';


import 'react-native-gesture-handler';




import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './pages/HomeScreen';
import RegisterUser from './pages/RegisterUser';
import UpdateUser from './pages/UpdateUser';
import ViewUser from './pages/ViewUser';
import ViewAllUser from './pages/ViewAllUser';
import DeleteUser from './pages/DeleteUser';

const Stack = createStackNavigator();

export default class EVENTMAINSCREEN extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: ' EVENTS',
      headerStyle: {
        backgroundColor: 'pink', //Set Header color
      },
      headerTintColor: '#fff', //Set Header text color
      headerTitleStyle: {
        fontWeight: 'bold', //Set Header text style
      },
      
      headerRight: (
        <Icon  name='bars'size={35} color='black' onPress={() => { 
          navigation.navigate('EVENTDRAWERSCREEN', {
            onNavigateBack: this.handleOnNavigateBack
          }); 
        }}> </Icon>
        
      ),
      
    };
  };
 


    
  render() {
    
    return (
        <>
        
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ViewAll">
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                title: 'Home', //Set Header Title
                headerStyle: {
                  backgroundColor: '#f4511e', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
              }}
            />
            <Stack.Screen
              name="View"
              component={ViewUser}
              options={{
                title: 'View User', //Set Header Title
                headerStyle: {
                  backgroundColor: '#f4511e', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
              }}
            />
            <Stack.Screen
              name="ViewAll"
              component={ViewAllUser}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Update"
              component={UpdateUser}
              options={{
                title: 'Update User', //Set Header Title
                headerStyle: {
                  backgroundColor: '#f4511e', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
              }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterUser}
              options={{
                title: 'Register User', //Set Header Title
                headerStyle: {
                  backgroundColor: '#f4511e', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
              }}
            />
            <Stack.Screen
              name="Delete"
              component={DeleteUser}
              options={{
                title: 'Delete User', //Set Header Title
                headerStyle: {
                  backgroundColor: '#f4511e', //Set Header color
                },
                headerTintColor: '#fff', //Set Header text color
                headerTitleStyle: {
                  fontWeight: 'bold', //Set Header text style
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
     </> );
  }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'pink',
      
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
      marginVertical: 10, 
      height: 50,
      backgroundColor: 'gold',
      borderRadius: 50,
    },
    btn5text:{
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
      color: "black",
      fontSize: 30
    },
    Addsearchbuttonhome:{
      
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'center',
      marginTop: 170,
      
    },
    Addbuttonhome: {
      marginRight: 60
    }

  });
  