//AppComponents;

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer} from 'react-navigation';

import {createStackNavigator } from 'react-navigation-stack';

import EVENTDRAWERSCREEN from './EVENTDRAWERSCREEN';
import EVENTMAINSCREEN from './EVENTMAINSCREEN';

import InactiveEmplyScreen from './screencompo/InactiveEmplyScreen';
import ActiveEmplScreen    from './screencompo/ActiveEmplScreen';
import RightOrgScreen from './screencompo/RightOrgScreen';
import LeftOrgScreen from './screencompo/LeftOrgScreen';
import DrawerMenu from './screencompo/DrawerMenu';



import ProductScreen from './components/ProductScreen';
import ProductDetailsScreen from './components/ProductDetailsScreen';
import ProductAddScreen from './components/ProductAddScreen';
import ProductEditScreen from './components/ProductEditScreen';
import deletescreen from  './components/deletescreen';



//RightOrgScreen
const RootStack = createStackNavigator(
  {
    EVENTMAINSCREEN:  EVENTMAINSCREEN,
    EVENTDRAWERSCREEN: EVENTDRAWERSCREEN,

    Menu : DrawerMenu,
    Inactive: InactiveEmplyScreen,
    Active: ActiveEmplScreen,
    RightOrganization: RightOrgScreen,
    LeftOrganization : LeftOrgScreen,

    Product: ProductScreen,
    ProductDetails: ProductDetailsScreen,
    AddProduct: ProductAddScreen,
    EditProduct: ProductEditScreen,
    Delete:  deletescreen,
   
  },
  {
    initialRouteName: 'Product',
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#777777',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <RootContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

