import React from 'react'
import { View, Alert, Text, TextInput, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, Polygon } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import GeoFencing from 'react-native-geo-fencing';
import { TouchableOpacity } from 'react-native-gesture-handler';

const latitudeDelta = 0.0100
const longitudeDelta = 0.0080
const polygon = [
  { latitude: 3.1336599385978805, longitude: 101.31866455078125 },
  { latitude: 51.22369444, lnlongitudeg: 101.66198730468757 },
  { latitude: 3.091150714460597, longitude: 4.41138889 },
  { latitude: 3.1336599385978805, longitude: 101.31866455078125 } // last point has to be same as first point
];


export default class Map2 extends React.Component {

  constructor(props) {
    super(props);
    this.state =
    {
      componentSelected: 'One',
    }
  }

  changeComponent = (component) => {
    this.setState({ componentSelected: component });
  }

  renderComponent(component) {
    if (component == 'One') {
      return <Mapke changeComponent={this.changeComponent} />
    } else if (component == 'Two') {
      return <VraagComp changeComponent={this.changeComponent} />
    } else if (component == 'Three') {
      return <ComponentThree changeComponent={this.changeComponent} />
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.renderComponent(this.state.componentSelected)}
      </View>
    );
  }
}

class Mapke extends React.Component {
  AlertChallenge() {
    Alert.alert(
      "ALERT",
      "You are nearby a sight, do you want to do a challenge?",
      [
        {
          text: "Cancel",
          onPress: () => console.log(""),
          style: "cancel"
        },
        { text: "OK", onPress: () => (this.props.changeComponent('Two')) }
      ],
      { cancelable: false }
    );
  }

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

    this.locationWatcher = null
    this.spawnInterval = null

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
          const meir = [
            { lat: 3.1336599385978805, lng: 101.31866455078125 },
            { lat: 3.3091633559540123, lng: 101.66198730468757 },
            { lat: 3.091150714460597, lng: 101.92977905273438 },
            { lat: 3.1336599385978805, lng: 101.31866455078125 } // last point has to be same as first point
          ];

          let point = {
            lat: 2.951269758090068,
            lng: 101.964111328125
          };

          // Dit is code om te zien of je in een bepaald polygon bent
          GeoFencing.containsLocation(point, polygon)
            .then(() => this.AlertChallenge())
            .catch(() => this.AlertChallenge())
        }
      })
  }

  /*componentWillUnmount() {
    this.locationWatcher && this.locationWatcher.remove()
    this.spawnInterval && clearInterval(this.spawnInterval)
  }*/


  render() {
    return (
      <View style={{ flex: 1 }}>

        <MapView
          region={this.state.locatie}
          style={{ flex: 1 }}
          showsUserLocation
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          showsTraffic={false}
          showsIndoors={false}
          customMapStyle={mapStyle}
          showsPointsOfInterest={false}
        >
          <Marker //de prof
            coordinate={{
              latitude: 51.22369444,
              longitude: 4.41138889,
            }} />

        </MapView>
      </View>
    );
  }
}


class VraagComp extends React.Component {
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
