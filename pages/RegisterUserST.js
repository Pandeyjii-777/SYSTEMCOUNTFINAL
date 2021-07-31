
import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Button,
  Text,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

import { RadioButton } from 'react-native-paper';

var dbb = openDatabase({ name: 'UserDatabase.db' });
var db = openDatabase({ name: 'UserDatabase.db' });

const RegisterUserST = ({ navigation }) => {

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

  



    //const [userDate, setUserDate] = useState('');
  let usereventST='';

  //const [userName, setUserName] = useState('');
  let userNameST='';
  //const [userContact, setContact] = useState('');
  let userContactST='';
  //const [userAddress, setUserAddress] = useState('');
  let userAddressST='';
 
  
  
  const style1= {
    backgroundColor: 'blue', 
    color:'pink', 
    fontSize: 21, 
    padding: 7, 
    paddingHorizontal: 30, 
    margin: 5, 
    borderRadius: 4, 
    fontWeight:'bold'
  };

  const style2= {
    backgroundColor: 'pink', 
    color:'blue', 
    fontSize: 21, 
    padding: 7, 
    paddingHorizontal: 30, 
    margin: 5, 
    borderRadius: 4, 
    fontWeight:'bold'
  };

  

  const EventNameST = <View>
      <Mytextinput
      placeholder="Enter Event's id"
      onChangeText={
        (Name) => usereventST=Name
      }
      style={{ padding: 10 }}
      maxLength={10}
      keyboardType="numeric"

    />
    <Mybutton title="Next" customClick={()=>{ 
      if(usereventST.length>=1){

        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_user where user_id = ?',
            [usereventST],
            (tx, results) => {
              var len = results.rows.length;
              console.log('len', len);
              if (len > 0) {
                setFillST(StudentNameST)
              } else {
                alert('No event found');
              }
            }
          );
        });

    }
    else{
      alert("Please fill event's id");
    }
      
      }} />
    </View>
       const[FillST, setFillST] = useState(EventNameST);
   
       const StudentNameST = <View>
      <Mytextinput
      placeholder="Enter Student's Name"
      onChangeText={
        (Name) => userNameST=Name
      }
      style={{ padding: 10 }}
      maxLength={18}
    />
    <Mybutton title="Next" customClick={()=>{ 
      if(userNameST.length>=1){
      setFillST(EventContactST) 
    }
    else{
      alert("Please fill student's name");
    }
      
      }} />
    </View>
  
    
    const EventContactST = <View style={{ position:'relative', top: 20, marginBottom: 33}}>
    <Text style={{ color:'green', fontSize: 21, padding: 7, paddingHorizontal: 12, marginBottom: 10, fontWeight:'bold', textAlign:'center'}}>Select Organization</Text>
    <View style={{alignItems: 'center',}}>
      <TouchableOpacity onPress={()=>{userContactST='Right'; alert(`You are in ${userContactST} Organization`)}}>
       <Text style={userContactST=="Right" ? style1 : style2}>Right</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{userContactST='Left'; alert(`You are in ${userContactST} Organization`)}}>
       <Text  style={userContactST=="Left" ? style1 : style2}>Left</Text>
       </TouchableOpacity>
       </View>  
       <Mybutton title="Next" customClick={()=>{ 
         if(userContactST.length>=1){
         setFillST(EventdaysST) 
        }
        else{
          alert('Please Select Organization');
        }
         }} />
  </View>;


  let register_userST = () => {
    console.log(usereventST,userNameST, userContactST, userAddressST);
    if (!usereventST) {
        alert("Please fill Event's id");
        return;
      }
    if (!userNameST) {
      alert("Please fill student's name");
      return;
    }
    if (!userContactST) {
      alert('Please Select Organization');
      return;
    }
    if (!userAddressST) {
      alert('Please Select Status');
      return;
    }
    

    dbb.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_userST (user_eventST, user_nameST, user_contactST, user_addressST ) VALUES (?,?,?,?)',
        [usereventST, userNameST, userContactST, userAddressST ],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are adding a student to event successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('ViewAll'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Student Adding to Event Failed');
        }
      );
    });
  };
 


const EventdaysST = <View style={{ position:'relative', top: 20, marginBottom: 33}}>
<Text style={{ color:'green', fontSize: 21, padding: 7, paddingHorizontal: 12, marginBottom: 10, fontWeight:'bold', textAlign:'center'}}>Select Status</Text>
<View style={{alignItems: 'center',}}>
  <TouchableOpacity onPress={()=>{userAddressST='Active'; alert(`Your Current Status is ${userAddressST}`)}}>
<Text style={userAddressST=="Active" ? style1 : style2}>Active</Text>
</TouchableOpacity>
<TouchableOpacity onPress={()=>{userAddressST='Inactive'; alert(`Your Current Status is ${userAddressST}`)}}>
<Text style={userAddressST=="Inactive" ? style1 : style2}>Inactive</Text>
</TouchableOpacity>
</View>  

<View>
  <TouchableOpacity
  style={{backgroundColor:'red', marginHorizontal: 15, borderRadius:10, marginVertical:20, paddingVertical:10, }}
   onPress={register_userST}
     ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:15 }}>Submit</Text></TouchableOpacity>
          
 </View>
</View>



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              
              <View>{FillST}</View>
              
              
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default RegisterUserST;