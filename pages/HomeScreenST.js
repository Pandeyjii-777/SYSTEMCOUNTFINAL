

import React, { useEffect } from 'react';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import Mybutton from './components/Mybutton';
import Mytext from './components/Mytext';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });



const HomeScreenST = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_userST'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_userST', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_userST(user_idd INTEGER PRIMARY KEY AUTOINCREMENT, user_eventST, user_nameST , user_contactST , user_addressST)',
              []
            );
          }
        }
      );
    });
  }, []);


  let x=Alert.alert(
    'Alert',
    'Are you sure to add student to this event ?',
    
    [
      {
        text: 'Yes',
        onPress: () => navigation.navigate('RegisterST'),
      },
      {
          text: 'No',
          onPress: () => navigation.navigate('ViewAll'),
    }
    ],
    { cancelable: false,
    
    }
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
         <Text>{x}</Text>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default HomeScreenST;

//customClick={() => navigation.navigate('Update')};