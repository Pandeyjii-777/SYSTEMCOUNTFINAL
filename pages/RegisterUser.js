
import React,{ useState} from 'react';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import { openDatabase } from 'react-native-sqlite-storage';

import { RadioButton } from 'react-native-paper';
import { useEffect } from 'react';

var db = openDatabase({ name: 'UserDatabase.db' });

const RegisterUser = ({ navigation }) => {
  //const [userName, setUserName] = useState('');
  let userName='';
  const [userContactt, setContact] = useState('');
  let userContact='';
  //const [userAddress, setUserAddress] = useState('');
  let userAddress='';
  //const [userFrequency, setUserFrequency] = useState('');
  let userFrequency='';
  //const [userDate, setUserDate] = useState('');
  let userDate='';
  
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

  
    const EventName = <View>
      <Mytextinput
      placeholder="Enter Name"
      onChangeText={
        (Name) => userName=Name
      }
      style={{ padding: 10 }}
    />
    <Mybutton title="Next" backgroundcolor="green" customClick={()=>{ 
      if(userName.length>=1){
      setFill(EventContact) 
    }
    else{
      alert('Please fill name');
    }
      
      }} />
    </View>
   
   const zero=0;
   const one=1;
   const[Fill, setFill] = useState(EventName);
   const[FillLL, setFillLL] = useState(zero);
    const EventContact = <View style={{ position:'relative', top: 20, marginBottom: 33}}>
      
    <Text style={{ color:'green', fontSize: 21, padding: 7, paddingHorizontal: 12, marginBottom: 10, fontWeight:'bold', textAlign:'center'}}>Select Event Type</Text>
    <View style={{alignItems: 'center',}}>
    
<TouchableOpacity onPress={()=>{userContact="Continuous";  alert(`Event is ${userContact}`)}}>
       <Text    style={userContact=="Continuous" ? style1 : style2}>Continuous</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{userContact='Discontinuous';alert(`Event is ${userContact}`) }}>
       <Text  style={userContact=="Discontinuous" ? style1 : style2}>Discontinuous</Text>
       </TouchableOpacity>
       </View>  
       <Mybutton title="Next" color="green" customClick={()=>{ 
         if(userContact.length>=1){
         setFill(Eventdays) 
        }
        else{
          alert('Please Select Event Type');
        }
         }} />
  </View>;


    
    const Eventdays = <View style={{ position:'relative', top: 20, marginBottom: 33}}>
      <Text style={{ color:'green', fontSize: 21, padding: 7, paddingHorizontal: 12, marginBottom: 10, fontWeight:'bold', textAlign:'center'}}>Select a day</Text>
      <View style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap' ,alignItems: 'center',}}>
        <TouchableOpacity onPress={()=>{userAddress='Monday'; alert(`Event's day is ${userAddress}`)}}>
         <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 12, margin: 5, borderRadius: 40, fontWeight:'bold'}}>M</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{userAddress='Tuesday'; alert(`Event's day is ${userAddress}`)}}>
         <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 15, margin: 5, borderRadius: 40, fontWeight:'bold'}}>T</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{userAddress='Wednesday'; alert(`Event's day is ${userAddress}`)}}>
         <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 12, margin: 5, borderRadius: 40, fontWeight:'bold'}}>W</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{userAddress='Thursday'; alert(`Event's day is ${userAddress}`)}}>
         <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 15, margin: 5, borderRadius: 40, fontWeight:'bold'}}>T</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{userAddress='Friday'; alert(`Event's day is ${userAddress}`)}}>
         <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 15, margin: 5, borderRadius: 40, fontWeight:'bold'}}>F</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{userAddress='Saturday'; alert(`Event's day is ${userAddress}`)}}>
         <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 15, margin: 5, borderRadius: 40, fontWeight:'bold'}}>S</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{userAddress='Sunday'; alert(`Event's day is ${userAddress}`)}}>
         <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 15, margin: 5, borderRadius: 40, fontWeight:'bold'}}>S</Text>
         </TouchableOpacity>
      </View>  
      <Mybutton title="Next" color="green" customClick={()=>{ 
        if(userContact==="Continuous"){
          if(userAddress.length>=1){
        setFill(EventFrequency)
          }
          else{
            alert('Please Select Day');
          }
      }  
      if(userContact==="Discontinuous"){
        if(userAddress.length>=1){
        setFill(Eventdate)
            }
         else{
          alert('Please Select Day');
            }
      }
      
        }} />
    </View>;



  let register_user = () => {
    console.log(userName, userContact, userAddress, userDate, userFrequency);
   
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please Select Event Type');
      return;
    }
    if (!userAddress) {
      alert('Please Select Day');
      return;
    }
    if (!userFrequency && userContact==="Continuous") {
      alert('Please Select Eventfrequency');
      return;
    }
    if (!userDate && userContact==="Discontinuous") {
      alert("Please select event's Date");
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address, user_date ,user_frequency) VALUES (?,?,?,?,?)',
        [userName, userContact, userAddress, userDate ,userFrequency],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are adding a event successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              { cancelable: false }
            );
          } else alert('Event Adding Failed');
        }
      );
    });
  };

  const Eventdate = <View>
  <View style={{alignItems:'center'}}>
                     <Text style={{ color:'green', fontSize: 21, padding: 7, paddingHorizontal: 12, marginBottom: 10, fontWeight:'bold', textAlign:'center'}}>Select Date</Text>
                   <DatePicker style={{width: 200, marginTop: 20,}} 
                   date={userDate} // Initial date from state 
                   mode="date" // The enum of date, datetime and time 
                   placeholder="select date" 
                   format="DD-MM-YYYY" 
                   minDate="01-01-2016" 
                   maxDate="01-01-2029" 
                   confirmBtnText="Confirm" 
                   cancelBtnText="Cancel" 
                   customStyles={{ dateIcon: { //display: 'none', 
                    position: 'absolute', 
                    left: 0, top: 4, marginLeft: 0, }, 
                    dateInput: { marginLeft: 36, }, }} 
                    onDateChange={(date) => { userDate=date; 
                      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; 
                      let x=new String(date);
                      let yyyy=new String(x[6]+x[7]+x[8]+x[9]);
                      let mm=new String(x[5]+x[3]+x[4]);
                      let dd=new String(x[2]+x[0]+x[1]);
                      let final=yyyy+mm+dd;
                      var d = new Date(`${final}`); 
                      var dayName = days[d.getDay()];
                      userAddress=dayName;
                      alert(`Your event's date is ${userDate} and day is ${userAddress}`)
                    }} />
            </View>        
            <View>
            <TouchableOpacity
            style={{backgroundColor:'red', marginHorizontal: 15, borderRadius:10, marginVertical:20, paddingVertical:10, }}
            onPress={register_user}
          ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:15 }}>Submit</Text></TouchableOpacity>
          
            </View>
            
    </View>


  const EventFrequency = <View>
  <View style={{ position:'relative', top: 20, alignItems:"center", marginBottom: 33}}>
<Text style={{ color:'green', fontSize: 21, padding: 7, paddingHorizontal: 12, marginBottom: 10, fontWeight:'bold', textAlign:'center'}}>Select Event Frequency</Text>
<View style={{alignItems: 'center',}}>
<TouchableOpacity onPress={()=>{userFrequency='Weekly'; alert(`Event Frequency is ${userFrequency}`)}}>
   <Text style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 29, margin: 5, borderRadius: 4, fontWeight:'bold'}}>Weekly</Text>
 </TouchableOpacity > 
 <TouchableOpacity onPress={()=>{userFrequency='Biweekly'; alert(`Event Frequency is ${userFrequency}`)}}>
   <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 20, margin: 5, borderRadius: 4, fontWeight:'bold'}}>Biweekly</Text>
   </TouchableOpacity> 
  <TouchableOpacity onPress={()=>{userFrequency='Monthly'; alert(`Event Frequency is ${userFrequency}`)}}>
   <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 25, margin: 5, borderRadius: 4, fontWeight:'bold'}}>Monthly</Text>
   </TouchableOpacity> 
   <TouchableOpacity onPress={()=>{userFrequency='Yearly'; alert(`Event Frequency is ${userFrequency}`)}}>
   <Text  style={{backgroundColor: 'pink', color:'blue', fontSize: 21, padding: 7, paddingHorizontal: 35, margin: 5, borderRadius: 4, fontWeight:'bold'}}>Yearly</Text>
   </TouchableOpacity>
   </View>  
   </View>
     <View>
            <TouchableOpacity
            style={{backgroundColor:'red', marginHorizontal: 15, borderRadius:10, marginVertical:20, paddingVertical:10, }}
            onPress={register_user}
          ><Text style={{fontWeight:'bold', color: 'white', textAlign:'center', fontSize:15 }}>Submit</Text></TouchableOpacity>
          
       </View>
</View>;


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{ flex: 1, justifyContent: 'space-between' }}>
              
              <View>{Fill}</View>
              
              
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;