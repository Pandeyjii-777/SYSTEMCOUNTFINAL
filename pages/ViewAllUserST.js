

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { openDatabase } from 'react-native-sqlite-storage';



var db = openDatabase({ name: 'UserDatabase.db' });

const ViewAllUserST = ({navigation}) => {
  let [flatListItemsST, setFlatListItemsST] = useState([]);
  const[PRODUCTscreenST, setproductSCREENST] = useState('');
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_userST',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItemsST(temp);
        }
      );
    });
  }, []);

  let listViewItemSeparatorST = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };

  let listItemViewST = (item) => {
   
      return (<>
      <TouchableOpacity   
                          
                          style={{ marginVertical: 10, 
                            display: 'flex',
                           flexDirection:'row',
                           width: Dimensions.get('window').width,
                            height: 62,
                            backgroundColor: 'white',
                            opacity: 1,
                            borderRadius: 10,
                            elevation: 3,}}>

                          <View style={{top: 11, left: 5,}}>
                             <Icon name={item.user_addressST==='Active' ? 'checkcircle' : 'closecircle' } size={40} 
                             color={item.user_addressST==='Active' ? 'green' : 'red' }></Icon>
                            </View>

                          <View style={{position:'absolute', left: 55, top: 5,}}>
                             <Text style={{fontSize: 20, color: 'black'}}>{item.user_nameST}</Text>
                              <Text style={{ color: 'black',}}>Event id:{item.user_eventST},  {item.user_contactST} &#160;  {item.user_addressST}</Text>
                          </View>
                          
                          <View style={{position:'absolute', top: 13, right: 10}}>
                              <Icon name='delete' size={30} color='black' onPress={ ()=>{
                              
                                Alert.alert(
                                  `Student Name: ${item.user_nameST}`,
                                 'Do you want to delete this student ?',
                                  [
                                    {
                                      text: 'No',
                                      onPress: () => navigation.navigate('ViewAllST'),
                                    },
                                    {
                                      text: 'YES',
                                      onPress: () =>{ 
                                       
                                          db.transaction((tx) => {
                                            tx.executeSql(
                                              'DELETE FROM  table_userST where user_idd=?',
                                              [item.user_idd],
                                              (tx, results) => {
                                                console.log('Results', results.rowsAffected);
                                                
                                              }
                                            );
                                          }),
                                          navigation.navigate('HomeScreen');
                                   
                                      }
                                    }
                                  ]
                                );
                            

                              }} />
                          </View>

                         </TouchableOpacity >
       
      </>);
    
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItemsST}
            ItemSeparatorComponent={listViewItemSeparatorST}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemViewST(item)}
          />
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUserST;