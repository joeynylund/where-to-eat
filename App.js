import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as WebBrowser from 'expo-web-browser';
import { StyleSheet, Linking, ActivityIndicator, Text, View, Image, TextInput, KeyboardAvoidingView, Pressable, Keyboard } from 'react-native';

export default function App() {

  const [zip, setZip] = useState('');

  const [restaurant, setRestaurant] = useState('');

  const [location, setLocation] = useState('');

  const [url, setUrl] = useState('');

  const [phone, setPhone] = useState('');

  const [rating, setRating] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(true);

  const [step, setStep] = useState(1);

  function getRating(rating) {
    switch(rating) {
      case 1:
        return (
          <View style={{flexDirection:'row'}}>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
          </View>
        )
      case 1.5:
        return (
          <View style={{flexDirection:'row'}}>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star-half' size={30} color='#c43637' solid></Icon>
          </View>
        )
      case 2:
        return (
          <View style={{flexDirection:'row'}}>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
          </View>
        )
      case 2.5:
        return (
          <View style={{flexDirection:'row'}}>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star-half' size={30} color='#c43637' solid></Icon>
          </View>
        )
      case 3:
        return (
          <View style={{flexDirection:'row'}}>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
          </View>
        )
      case 3.5:
        return (
          <View style={{flexDirection:'row'}}>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star-half' size={30} color='#c43637' solid></Icon>
          </View>
        )
      case 4:
        return (
          <View style={{flexDirection:'row'}}>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
          </View>
        )
      case 4.5:
        return (
          <View style={{flexDirection:'row'}}>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star-half' size={30} color='#c43637' solid></Icon>
          </View>
        )
      case 5:
        return (
          <View style={{flexDirection:'row'}}>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
            <Icon name='star' size={30} color='#c43637' solid></Icon>
          </View>
        )
    }
  }

  function getRestaurants() {
    fetch('https://api.yelp.com/v3/businesses/search?food=restaurants&location=' + zip + '&radius=16093&open_now=true&limit=50', { headers: {
      'Authorization': 'Bearer v3wo7XsbNYk8_9oKV4VnIfoo_wK4A6Oa-vJBT3Oir0ikSUU9V-QEVmWtChvjE6TWtEVI7b2ZWb2VEtW7NWxesoODtZTrdb9IY81j_FKCZxeSnoldX86DuYD7d0DKYHYx'
    } })
    .then(response => response.json())
    .then (data => {
      if(data.businesses.length == 0) {
        setStep(1)
        setError('No Restaurants Currently Open!')
      } else {
        var restaurant = data.businesses[Math.floor(Math.random()*data.businesses.length)]
        console.log(restaurant.name)
        setPhone(restaurant.phone)
        setRestaurant(restaurant.name);
        setLocation(restaurant.location.address1 + ' ' + restaurant.location.city + ', ' + restaurant.location.state);
        setUrl(restaurant.url);
        setRating(restaurant.rating)
        setLoading(false)
      }
      
    })
  }

  return (
    <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={50} style={styles.container}>
      {step == 1 ? 
      <View style={styles.container}><Image source={require('./assets/logo.png')} style={{width:300,height:250}} />
        <View>
          <Text style={{color:'#000',fontSize:18,fontWeight:'600',textAlign:'center',paddingBottom:20}}>Let us help you decide where to eat! Enter your Zip Code and we will randomly select a restauruant for you. You're welcome.</Text>
        </View>
        {error != '' && <View style={{marginBottom:10}}><Text style={{color:'red'}}>{error}</Text></View>}
        <TextInput onChangeText={location => {
          setError('')
          setZip(location)
        }} 
        style={{
          borderWidth:1,
          padding:15,
          borderRadius:10,
          width:150,
          borderColor:'#bbb',
          fontSize:18
        }} 
        placeholder='Zip Code' 
        keyboardType='number-pad' 
        returnKeyType='done'></TextInput>
      <Pressable style={{
        backgroundColor: '#c43637',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 10
      }}
      onPress={() => {
        Keyboard.dismiss();
        if (zip.length == 5) {
          getRestaurants();
          setStep(step + 1)
        } else {
          setError('Invalid Zip Code!')
        }
        
      }}>
        <Text style={{fontSize:18,color:'#fff'}}>Let's Go</Text>
      </Pressable>
      </View> : null}
      {step == 2 ? loading == true ? <ActivityIndicator size="large"/> : <View style={styles.container}>
        <Text style={{fontSize:30,fontWeight:'700',textAlign:'center'}}>{restaurant}</Text>
        <Text>{location}</Text>
        {getRating(rating)}
        <View style={{flexDirection:'row'}}>
          <Pressable style={{height:75,width:75,borderRadius:50,backgroundColor:'#c43637',alignItems:'center',justifyContent:'center',margin:5}} onPress={() => {Linking.openURL('tel:' + phone.substring(2).replace(/\D/g,''))}}><Icon name="phone" size={30} color="#fff"></Icon></Pressable>
          <Pressable style={{height:75,width:75,borderRadius:50,backgroundColor:'#c43637',alignItems:'center',justifyContent:'center',margin:5}} onPress={async () => {
                console.log(location)
                Linking.openURL('http://maps.google.com/?q=' + location) 
              }}><Icon name="map-marker-alt" size={30} color="#fff"></Icon>
          </Pressable>          
          <Pressable style={{height:75,width:75,borderRadius:50,backgroundColor:'#c43637',alignItems:'center',justifyContent:'center',margin:5}} onPress={async () => {
                let result = await WebBrowser.openBrowserAsync(url);
              }}><Icon name="link" size={30} color="#fff"></Icon>
          </Pressable>
        </View>
        <View style={{marginTop:30}}>
        <Pressable style={{
        backgroundColor: '#c43637',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
      }}
      onPress={() => {
        setLoading(true);
        getRestaurants()
      }}>
        <Text style={{fontSize:18,color:'#fff'}}>Not Feeling That?</Text>
      </Pressable>
        </View>
        <View style={{marginTop:10}}>
        <Pressable style={{
          borderWidth:1,
        borderColor: '#c43637',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
      }}
      onPress={() => {
        setStep(1);
        setLoading(true)
      }}>
        <Text style={{fontSize:18,color:'#c43637'}}>Change Location</Text>
      </Pressable>
        </View>
      </View> : null}
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:20
  },
});
