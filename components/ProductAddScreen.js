import React, { Component, useState } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import Database from '../Database';

const db = new Database();
let x=1;
export default class ProductAddScreen extends Component {
  static navigationOptions = {
    title: 'Add ',
   
  };




//Add a constructor inside the class bracket after the `navigationOptions`.
  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',
      prodImage: '',
      prodPrice: '',
      isLoading: false,
    };
  }


  //Add a function to update the input text values.
  updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
    
    state["prodId"] = `${x}`;
      
  }


//Add a function to save a product to the SQLite table.
  saveProduct() {
    x++;
    this.setState({
      isLoading: true,
    });
    let data = {
      prodId: this.state.prodId,
      prodName: this.state.prodName,
      prodDesc: this.state.prodDesc,
      prodPrice: this.state.prodPrice,
      prodImage: this.state.prodImage
    }
    db.addProduct(data).then((result) => {
      console.log(result);
      this.setState({
        isLoading: false,
      });
      this.props.navigation.state.params.onNavigateBack;
      this.props.navigation.goBack();
    }).catch((err) => {
      console.log(err);
      this.setState({
        isLoading: false,
      });
    })
  }


  //Add a function to render the whole add product view.
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        

        <View style={styles.subContainer}>
          <TextInput  maxLength={23}
              placeholder={' Name'}
              placeholderTextColor= 'black'
              value={this.state.prodName}
              onChangeText={(text) => this.updateTextInput(text, 'prodName')}
          />
        </View>
        
        <View style={styles.subContainer}>
          <Text    style={styles.OrganizationType}>Organization</Text>

          <View style={styles.Organization}>
            <RadioButton
              value="Left"
              status={ this.state.prodDesc==='Left' ? 'checked' : 'unchecked' }
              onPress={() => this.updateTextInput('Left', 'prodDesc')}
            ></RadioButton>
            <Text >Left Organization</Text>
            </View>

            <View style={styles.Organization}>
            <RadioButton
              value="Right"
              status={ this.state.prodDesc==='Right' ? 'checked' : 'unchecked' }
              onPress={() => this.updateTextInput('Right', 'prodDesc')}
            ></RadioButton>
            <Text>Right Organization</Text>
            </View>
            
          
        </View>
        
        <View style={styles.subContainer}>
           <Text style={styles.OrganizationType}>Status</Text>

         <View style={styles.Organization}>
            <RadioButton
              value="Active"
              status={ this.state.prodPrice==='Active' ? 'checked' : 'unchecked' }
              onPress={() => this.updateTextInput('Active', 'prodPrice')}
              ></RadioButton>
          <Text>Active</Text>
         </View>

         <View style={styles.Organization}>
            <RadioButton
             value="Inactive"
             status={this.state.prodPrice==='Inactive' ? 'checked' : 'unchecked' }
             onPress={() => this.updateTextInput('Inactive', 'prodPrice')}
            ></RadioButton>
            <Text>Inactive</Text>
         </View>
          
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.saveProduct()} />
        </View>
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


/*
   
        <View style={styles.subContainer}>
          <TextInput
              placeholder={'Employee ID'}
              value={this.state.prodId}
              keyboardType='numeric'
              onChangeText={(text) => this.updateTextInput(text, 'prodId')}
          />
        </View>
*/


