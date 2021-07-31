
import React, { useState } from 'react';
import { Text, View, Alert, SafeAreaView, TouchableOpacity } from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

const DeleteUser = ({ navigation }) => {
  let [inputUserId, setInputUserId] = useState('');

  let deleteUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [inputUserId],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'Event deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else {
            alert('Please insert a valid event Id');
          }
        }
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <Mytextinput
            placeholder="Enter Event Id"
            onChangeText={
              (inputUserId) => setInputUserId(inputUserId)
            }
            style={{ padding: 10 }}
          />
          <View>
             <TouchableOpacity
              style={{backgroundColor:'red', marginHorizontal: 15, borderRadius:10, marginVertical:20, paddingVertical:10, }}
              onPress={deleteUser}
             ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:15 }}>Delete Event</Text></TouchableOpacity>
          
          </View>
          
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;