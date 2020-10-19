import React from 'react'
import { View } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { mapStyle } from './mapStyle';



const latitudeDelta = 0.0100
const longitudeDelta = 0.0080

export default class Map2 extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      locatie: {
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta,
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
              }
            })
          })

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
        <Marker
          coordinate={{
            latitude: 51.22369444,
            longitude: 4.41138889,
          }}/>
          </MapView>
      </View>
    );
  }
}

