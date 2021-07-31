import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Database from '../Database';
import { RadioButton } from 'react-native-paper';
//Instantiate the Database as a constant variable.
const db = new Database();

export default class ProductEditScreen extends Component {
  static navigationOptions = {
    title: 'Edit ',
  };


  //Add the constructor after the `navigationOptions` function.
  constructor() {
    super();
    this.state = {
      prodId: '',
      prodName: '',
      prodDesc: '',
      prodImage: '',
      prodPrice: '',
      isLoading: true,
    };
  }


//Add a function to initialize the screen that will get product data.
  componentDidMount() {
    const { navigation } = this.props;
    db.productById(navigation.getParam('prodId')).then((data) => {
      console.log(data);
      const product = data;
      this.setState({
        prodId: product.prodId,
        prodName: product.prodName,
        prodDesc: product.prodDesc,
        prodprodImage: product.prodprodImage,
        prodPrice: product.prodPrice,
       
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false
      }
    })
  }


  //Add a function to update the input text value.
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    console.log(state[field]);
    this.setState(state);

    
  }


//Add a function to update the product data.
  updateProduct() {
    
   
    this.setState({
      isLoading: true,
    });
    const { navigation } = this.props;
    console.log(this.state.prodId);
    let data = {
      prodId: this.state.prodId,
      prodName: this.state.prodName,
      prodDesc: this.state.prodDesc,
      prodPrice: this.state.prodPrice,
      prodImage: this.state.prodImage
    
    }
    db.updateProduct(data.prodId, data).then((result) => {
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



  //Add a function to render the whole Edit Product screen.
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
          <Text> ID</Text>
          <TextInput
              placeholder={' ID'}
              value={this.state.prodId}
              onChangeText={(text) => this.updateTextInput(text, 'prodId')}
              keyboardType='numeric'
          />
        </View>
        <View style={styles.subContainer}>
          <Text> Name</Text>
          <TextInput maxLength={23}
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

           <Text style={styles.Allreadtfiled}>{this.state.prodDesc}</Text>
     </View>

        <View style={styles.subContainer}>
            <Text style={styles.OrganizationType}>Status</Text>

             <View style={styles.Organization}>
             <RadioButton
                 value="Active"
                 status={this.state.prodPrice==='Active' ? 'checked' : 'unchecked' }
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

           <Text style={styles.Allreadtfiled}>{this.state.prodPrice}</Text>
        </View>
        <View style={styles.button}>
          <Button
            large
            leftIcon={{name: 'save'}}
            title='Save'
            onPress={() => this.updateProduct()} />
        </View>
      </ScrollView>
    );
  }

}


//Finally, add the stylesheet after the class bracket.
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

  Allreadtfiled:{
    color: 'red',
    fontWeight:'bold'
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







