

import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name , user_contact , user_address, user_date, user_frequency  )',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
         
        <TouchableOpacity
            style={{backgroundColor:'blue', marginHorizontal: 15, borderRadius:15, marginVertical:5, paddingVertical:15}}
            onPress={() => navigation.navigate('Register')}
          ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:17 }}>Add Event</Text></TouchableOpacity>
          
            
            <TouchableOpacity
            style={{backgroundColor:'blue', marginHorizontal: 15, borderRadius:15, marginVertical:5, paddingVertical:15}}
            onPress={() => navigation.navigate('ViewAllST')}
          ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:17}}>Students Of All Events</Text></TouchableOpacity>
          
          
           <TouchableOpacity
            style={{backgroundColor:'blue', marginHorizontal: 15, borderRadius:15, marginVertical:5, paddingVertical:15}}
            
          ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:17}}>Edit Event</Text></TouchableOpacity>
          
        
          <TouchableOpacity
            style={{backgroundColor:'blue', marginHorizontal: 15, borderRadius:15, marginVertical:5, paddingVertical:15}}
            onPress={() => navigation.navigate('View')}
          ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:17}}>View</Text></TouchableOpacity>
          

         
          <TouchableOpacity
            style={{backgroundColor:'blue', marginHorizontal: 15, borderRadius:15, marginVertical:5, paddingVertical:15}}
            onPress={() => navigation.navigate('ViewAll')}
          ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:17}}>View All</Text></TouchableOpacity>
         
         <TouchableOpacity
            style={{backgroundColor:'blue', marginHorizontal: 15, borderRadius:15, marginVertical:5, paddingVertical:15}}
            onPress={() => navigation.navigate('Delete')}
          ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:17}}>Delete</Text></TouchableOpacity>
          
          
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

//customClick={() => navigation.navigate('Update')};