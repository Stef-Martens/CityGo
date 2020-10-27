import React from 'react'
import { View, Alert, Text, TextInput, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import GeoFencing from 'react-native-geo-fencing';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapZelf from './MapZelf'

const latitudeDelta = 0.0100
const longitudeDelta = 0.0080
const polygon = [
  { latitude: 3.1336599385978805, longitude: 101.31866455078125 },
  { latitude: 51.22369444, lnlongitudeg: 101.66198730468757 },
  { latitude: 3.091150714460597, longitude: 4.41138889 },
  { latitude: 3.1336599385978805, longitude: 101.31866455078125 } // last point has to be same as first point
];

export default class QuestionScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        locatie: {
          latitude: 0,
          longitude: 0,
          latitudeDelta,
          longitudeDelta,
        },
        coordinaten: {
          latitude: 0,
          longitude: 0
        }
      }
    }
  
    componentDidMount() {
      Permissions.askAsync(Permissions.LOCATION)
        .then(permission => {
          if (permission.status === 'granted') {
            this.locationWatcher = Location.watchPositionAsync({
              enableHighAccuracy: true,
              timeInterval: 500,
            }, (location) => {
              this.setState({
                locatie: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta,
                  longitudeDelta,
                },
                coordinaten: {
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }
              })
            })
          }
        })
    }
  
    //Hier wordt de vraag weergegeven die opgehaald wordt uit de api
    //Momenteel een vaste waarde aan gegeven
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>You are close to ....</Text>
          <Text style={styles.question}>Van wie is het standbeeld aan het begin van de Meir</Text>
          <TextInput
            style={styles.textinput}
            placeholder="Answer"
            onPress={text => onChangeText(text)}
          //value={value}
          />
          <TouchableOpacity style={styles.button1} onPress={() => this.props.changeComponent('One') }>
            <Text style={styles.btntext}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={() => this.props.changeComponent('One') }>
            <Text style={styles.btntext}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )
  
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#36485f',
      paddingLeft: 50,
      paddingRight: 50
    },
    header: {
      fontSize: 30,
      color: '#fff',
      paddingBottom: 0,
      marginBottom: 20,
      borderBottomWidth: 1,
      borderColor: '#199187'
    },
    textinput: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 30,
      color: '#fff',
      borderColor: '#f8f8f8',
      borderBottomWidth: 1
    },
    question: {
      fontSize: 20,
      color: '#fff',
      paddingBottom: 10,
      marginBottom: 20,
    },
    button1:{
      alignSelf:'stretch',
      alignItems:'center',
      padding:20,
      backgroundColor:'#59cbbd',
      marginBottom:30
    },
    button2:{
      alignSelf:'stretch',
      alignItems:'center',
      padding:20,
      backgroundColor:'#36485f',
      marginBottom:30,
      borderColor:'#808080',
      borderWidth:3
    },
    btntext:{
      color:'#fff',
      fontWeight:'bold'
    }
  })