

import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, SafeAreaView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import RegisterUserST from './RegisterUserST';
import ViewAllUserST from './ViewAllUserST';
import { openDatabase } from 'react-native-sqlite-storage';



var db = openDatabase({ name: 'UserDatabase.db' });
var dbb = openDatabase({ name: 'UserDatabase.db' });

const ViewAllUser = ({navigation}) => {
  let [flatListItems, setFlatListItems] = useState([]);
  let[PRODUCTscreen, setproductSCREEN] = useState('')
  let[PRODUCTscreencond, setproductSCREENcond] = useState(1);

  

  let [flatListItemsST, setFlatListItemsST] = useState([]);
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user',
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i)
            temp.push(results.rows.item(i));
          setFlatListItems(temp);
        }
      );
    });
  }, []);




  let listViewItemSeparator = () => {
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

  let listItemView = (item) => {
    if(item.user_date!=''){
      
    return (<>
            
      <TouchableOpacity  onPress={() =>{
          Alert.alert(
            `${item.user_name}`,
           'Do you want to add or view all Students ?',
            [
              {
                text: 'Delete',
                onPress: () =>{ 
                                     
                  db.transaction((tx) => {
                    tx.executeSql(
                      'DELETE FROM  table_user where user_id=?',
                      [item.user_id],
                      (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        
                      }
                    );
                  }),
                  navigation.navigate('HomeScreen');
                 }
              },
              {
                text: 'Add',
                onPress: () => {navigation.navigate('RegisterST'),
                alert(`You are adding a student to event id: ${item.user_id}`)},
              },
              {
                text: 'View',
                onPress: () =>{ 
                  
                  dbb.transaction((tx) => {
                    tx.executeSql(
                      'SELECT * FROM table_userST WHERE user_eventST = ?',
                      [item.user_id],
                      (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; i++){
                          temp.push(results.rows.item(i));
                        }
                        setFlatListItemsST(temp);
                        console.log(temp);
                        console.log(PRODUCTscreen);
                      }
                    );
                  });
                
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
                            left: 30,
                            elevation: 3,}}>

                          <View style={{top: 11, left: 5,}}>
                             <Icon name={item.user_addressST==='Active' ? 'checkcircle' : 'closecircle' } size={40} 
                             color={item.user_addressST==='Active' ? 'green' : 'red' }></Icon>
                            </View>

                          <View style={{position:'absolute', left: 55, top: 5,}}>
                             <Text style={{fontSize: 20, color: 'black'}}>{item.user_nameST}</Text>
                              <Text style={{ color: 'black',}}>{item.user_contactST} &#160;  {item.user_addressST}</Text>
                          </View>
                          
                          <View style={{position:'absolute', top: 13, right: 40}}>
                              <Icon name='delete' size={30} color='black' onPress={ ()=>{
                              
                              Alert.alert(
                                `Student Name: ${item.user_nameST}`,
                               'Do you want to delete this student ?',
                                [
                                  {
                                    text: 'No',
                                    onPress: () => navigation.navigate('ViewAll'),
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
                          

                            }}
                            />
                          </View>

                         </TouchableOpacity >
                     </> );
                    
                  };
                

                  if(PRODUCTscreencond==0){
                    setproductSCREEN(<View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1 }}>
                      <FlatList
                        data={flatListItemsST}
                        ItemSeparatorComponent={listViewItemSeparatorST}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemViewST(item)}
                      />
                    </View>
                    
                  </View>);
                    setproductSCREENcond(`${item.user_name}`);
                    
                  }
                  else if(PRODUCTscreencond==`${item.user_name}`){
                    setproductSCREEN('');
                    setproductSCREENcond(0);
                  }
                  else if(PRODUCTscreencond==1){
                    setproductSCREEN('');
                    setproductSCREENcond(0);
                  }
                  
                  else{
                    setproductSCREEN(<View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1 }}>
                      <FlatList
                        data={flatListItemsST}
                        ItemSeparatorComponent={listViewItemSeparatorST}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemViewST(item)}
                      />
                    </View>
                    
                  </View>);
                    setproductSCREENcond(`${item.user_name}`);
                  }
                  },
              },
              
            ],
            { cancelable: true }
          );
         }}
        key={item.user_id}

        style={{display:'flex',flexDirection:'row' ,marginVertical: 10, height: 62, backgroundColor: 'white', opacity: 1, borderRadius: 10, elevation: 3, }}>
         <View style={{top:8, height:45, width:45, borderRadius: 50, left: 5, backgroundColor:'black'}}>
        <Text style={{ color: 'white', fontWeight:'bold', textAlign:'center', top: 9}}>{item.user_id}</Text>
        </View>

        <View style={{position:'absolute', left: 60, top: 5,opacity: 1}}>
        <Text style={{fontSize: 20, color: 'black'}}>{item.user_name}</Text>
        <Text style={{ color: 'black',}}>{item.user_contact} &#160;  {item.user_address}</Text>
        </View>
        
        <Text style={{position:'absolute', top: 13, right: 10, color:'red'}}>{item.user_date}</Text>
      
      </TouchableOpacity >
        <View style={{backgroundColor:'white'}}>
          {
            PRODUCTscreencond==`${item.user_name}` ?( 
          <View><Text>{PRODUCTscreen}</Text></View>
          )
          : null
          }
        </View>
    </>);
  }
    if(item.user_frequency!=''){
      return (
      <>
        <TouchableOpacity   onPress={() =>{
          Alert.alert(
            `${item.user_name}`,
           'Do you want to add or view all Students ?',
            [
             
              {
                text: 'Delete',
                onPress: () =>{ 
                                     
                  db.transaction((tx) => {
                    tx.executeSql(
                      'DELETE FROM  table_user where user_id=?',
                      [item.user_id],
                      (tx, results) => {
                        console.log('Results', results.rowsAffected);
                        
                      }
                    );
                  }),
                  navigation.navigate('HomeScreen');
                 }
              },
              {
                text: 'Add',
                onPress: () =>{ navigation.navigate('RegisterST'),
                alert(`You are adding a student to event id: ${item.user_id}`)},
              },
              {
                text: 'View',
                onPress: () =>{ 
                  dbb.transaction((tx) => {
                    tx.executeSql(
                      'SELECT * FROM table_userST WHERE user_eventST = ?',
                      [item.user_id],
                      (tx, results) => {
                        
                        var temp = [];
                       
                        for (let i = 0; i < results.rows.length; ++i)
                          temp.push(results.rows.item(i));

                        setFlatListItemsST(temp);
                        console.log(temp);
                        console.log(PRODUCTscreen);
                      
                      }
                    );
                  });

                   
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
                            left: 30,
                            elevation: 3,}}>

                          <View style={{top: 11, left: 5,}}>
                             <Icon name={item.user_addressST==='Active' ? 'checkcircle' : 'closecircle' } size={40} 
                             color={item.user_addressST==='Active' ? 'green' : 'red' }></Icon>
                            </View>

                          <View style={{position:'absolute', left: 55, top: 5,}}>
                             <Text style={{fontSize: 20, color: 'black'}}>{item.user_nameST}</Text>
                              <Text style={{ color: 'black',}}>{item.user_contactST} &#160;  {item.user_addressST}</Text>
                          </View>
                          
                          <View style={{position:'absolute', top: 13, right: 40}}>
                              <Icon name='delete' size={30} color='black' onPress={ ()=>{
                              
                                Alert.alert(
                                  `Student Name: ${item.user_nameST}`,
                                 'Do you want to delete this student ?',
                                  [
                                    {
                                      text: 'No',
                                      onPress: () => navigation.navigate('ViewAll'),
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

                  if(PRODUCTscreencond==0){
                    setproductSCREEN(<View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1 }}>
                      <FlatList
                        data={flatListItemsST}
                        ItemSeparatorComponent={listViewItemSeparatorST}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemViewST(item)}
                      />
                    </View>
                    
                  </View>);
                    setproductSCREENcond(`${item.user_name}`);
                  }
                  else if(PRODUCTscreencond==`${item.user_name}`){
                    setproductSCREEN('');
                    setproductSCREENcond(0);
                  }
                  else if(PRODUCTscreencond==1){
                    setproductSCREEN('');
                    setproductSCREENcond(0);
                  }
                  else{
                    setproductSCREEN(<View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1 }}>
                      <FlatList
                        data={flatListItemsST}
                        ItemSeparatorComponent={listViewItemSeparatorST}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => listItemViewST(item)}
                      />
                    </View>
                    
                  </View>);
                    setproductSCREENcond(`${item.user_name}`);
                  }
                  },
              },
              
            ],
            { cancelable: true }
          );
         }}
          key={item.user_id}

          style={{display:'flex',flexDirection:'row' ,marginVertical: 10, height: 62, backgroundColor: 'white', opacity: 1, borderRadius: 10, elevation: 3, }}>
         <View style={{top:8, height:45, width:45, borderRadius: 50, left: 5, backgroundColor:'black'}}>
        <Text style={{ color: 'white', fontWeight:'bold', textAlign:'center', top: 9}}>{item.user_id}</Text>
        </View>

        <View style={{position:'absolute', left: 60, top: 5,opacity: 1}}>
        <Text style={{fontSize: 20, color: 'black'}}>{item.user_name}</Text>
        <Text style={{ color: 'black',}}>{item.user_contact} &#160;  {item.user_address}</Text>
        </View>
        
        <Text style={{position:'absolute', top: 13, right: 10, color:'green'}}>{item.user_frequency}</Text>
      </TouchableOpacity >
        <View style={{backgroundColor:'white'}} >
          {
            PRODUCTscreencond==`${item.user_name}` ?( 
          <Text>{PRODUCTscreen}</Text>
          )
          : null
          }
        </View>
      </>
      
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={flatListItems}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
          />
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;