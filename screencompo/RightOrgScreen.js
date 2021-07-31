
import React, { Component } from 'react';
import { StyleSheet, FlatList, ActivityIndicator, Alert, View, Text, TouchableOpacity} from 'react-native';
import { ListItem, Button } from 'react-native-elements';
import { forModalPresentationIOS } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/CardStyleInterpolators';
import Icon from 'react-native-vector-icons/AntDesign';
import Database from '../Database';

const db = new Database();

export default class RightOrgScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: ' Right Organization',
      headerRight: (
        <Icon name='pluscircle'size={35} color='green'  onPress={() => { 
          navigation.navigate('AddProduct', {
            onNavigateBack: this.handleOnNavigateBack
          }); 
        }}></Icon>
        
      ),
    };
  };

//Add a constructor function.
  constructor() {
    super();
    this.state = {
      isLoading: true,
      products: [],
      notFound: 'User of Right Organization not found.\nPlease click (+) button to add it.'
    };
  }

//Add a function to initialize the screen.
  componentDidMount() {
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
      this.getProducts();
    });
  }


//Add a function to get the product list from Database class.
  getProducts() {
    let products = [];
    db.listProductR().then((data) => {
      products = data;
      this.setState({
        products,
        isLoading: false,
      });
    }).catch((err) => {
      console.log(err);
      this.setState = {
        isLoading: false,
      }
    })
  }

   
   
  //Add a variable to iterate the listed product in the view.
  keyExtractor = (item, index) => index.toString()


//Add a function to render the List Item.
  renderItem = ({ item }) => (<> 
   
   <TouchableOpacity style={styles.btn1} onPress={() => {
    this.props.navigation.navigate('ProductDetails', {
      prodId: `${item.prodId}`,
    });
  }}>
   <View style={styles.btn1text}>
     <Icon name={item.prodPrice==='Active' ? 'checkcircle' : 'closecircle' } size={40} 
     color={item.prodPrice==='Active' ? 'green' : 'red' }></Icon>
     </View>
  
  <View style={styles.btn2text}>
  <Text style={styles.btn2textprodname}>{item.prodName}</Text>
  <Text style={styles.btn2textdiscstats}>{item.prodDesc}  {item.prodPrice}</Text>
  </View>

  <View style={styles.deletIcon}>
  <Icon name='delete' size={30} color='black' 
  onPress={() => {
    this.props.navigation.navigate('Delete', {
      prodId: `${item.prodId}`,
    });
  }} ></Icon>
  </View>
  
    </TouchableOpacity>

  </>)


  //Add a function to render the rest of List view.
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="red"/>
        </View>
      )
    }
    if(this.state.products.length === 0){
      return(
        <View>
          <Text style={styles.message}>{this.state.notFound}</Text>
        </View>
      )
    }
    return (
      <FlatList backgroundColor='white'
        keyExtractor={this.keyExtractor}
        data={this.state.products}
        renderItem={this.renderItem}
      />
    );
  }
}


//Finally, add a stylesheet for the whole screen after the class bracket.
  const styles = StyleSheet.create({
    container: {
     flex: 1,
     paddingBottom: 22
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    activity: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    },
    message: {
      padding: 16,
      fontSize: 18,
      color: 'red'
    },
    btn1:{
      marginVertical: 10, 
      height: 62,
      backgroundColor: 'white',
      opacity: 1,
      borderRadius: 10,
      elevation: 3,
    },
  
    btn1text:{
      top: 11,
      left: 5,
    },
    btn2text:{
      position:'absolute',
      left: 55,
      top: 5,
      
      opacity: 1
    },
    btn2textprodname: {
       fontSize: 20,
       color: 'black',
    },
    btn2textdiscstats: {
      color: 'black'
    },
    deletIcon:{
      position:'absolute',
      top: 13,
      right: 10
    }
    

  });
  

