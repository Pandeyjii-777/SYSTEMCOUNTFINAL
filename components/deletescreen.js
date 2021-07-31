import React, { Component, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Alert, Text, TextInput, } from 'react-native';

import Database from '../Database';

const db = new Database();

let x='';

export default class deletescreen extends Component {
  static navigationOptions = {
    header: null
  };

//Add a function as the constructor.
constructor() {
    super();
    this.state = {
      isLoading: true,
      product: {},
      id: '',
    };
  }
  
  
  //Add a function to initialize the screen.
  componentDidMount() {
   
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      const { navigation } = this.props;
     
      db.productById(navigation.getParam('prodId')).then((data) => {
        console.log(data);
      
      
        product = data;
        
        this.setState({
          product,
          isLoading: false,
          id: product.prodId
        });
      }).catch((err) => {
        console.log(err);
        this.setState = {
          isLoading: false
        }
      })
    });
  }
  
  
  //Add a function to delete a product data
  deleteProduct(id) {
    const { navigation } = this.props;
    this.setState({
      isLoading: true
    });
    db.deleteProduct(id).then((result) => {
      console.log(result);
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }
  

  x=Alert.alert(
    'Are you sure delete this user ?',
    "If you delete the user you can't recover it.",
   
    [
      {
        text: 'Ok',
        onPress: () => this.deleteProduct(this.state.id),
      },
      {
          text: 'cancel',
          onPress: () => this.props.navigation.goBack(),
    }
    ],
    { cancelable: false,
    
    }
  );

 
  render() {
    
    return (
      <ScrollView style={styles.container}>
        

        <View><Text>{x}</Text></View>
        

         
      </ScrollView>
    );
  }

}

//Finally, add the style for the whole screen.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },

  OrganizationType:{
    fontSize: 18,
  },

  Organization:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})




