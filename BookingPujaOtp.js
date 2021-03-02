import {
  SafeAreaView,
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
  Linking,
  FlatList,
  Dimensions,
  AsyncStorage,
  PermissionsAndroid,
  NativeModules,
  BackHandler,
} from 'react-native';

import React, {Component} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import OTPInputView from '@twotalltotems/react-native-otp-input';

class BookingPujaOtp extends React.Component {
  render() {
    return (
      <SafeAreaProvider style={{backgroundColor: 'white'}}>
        <StatusBar backgroundColor="#F97012" />

        <View
          style={{
            width: '100%',
            height: 60,
            elevation: 2,
            backgroundColor: '#F97012',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                style={{height: 22, width: 12, resizeMode: 'contain'}}
                source={require('./backwhite.png')}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Avenir',
                fontSize: 20,
                fontFamily: 'Avenir',
                color: 'white',
                marginLeft: 20,
              }}>
              Booking Puja
            </Text>
          </View>
        </View>

        <View style={{marginTop: 50}}>
          <OTPInputView
            style={{
              width: '80%',
              height: 5,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            pinCount={4}
            //   code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            //   onCodeChanged = {code => { this.setState({code})}}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
        </View>

        <TouchableOpacity
          style={{marginBottom: 25}}
          onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <View
            style={{
              width: '80%',
              borderRadius: 25,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 45,
              backgroundColor: '#FA9219',
              height: 50,
            }}>
            <Text
              style={{
                lineHeight: 30,
                fontSize: 18,
                color: 'white',
                alignSelf: 'center',
              }}>
              START
            </Text>
          </View>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignSelf: 'center',
            width: '80%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <View
              style={{
                backgroundColor: '#DDE5ED',
                width: '38%',
                height: 1,
              }}></View>
            <Text
              style={{
                lineHeight: 30,
                fontSize: 18,
                color: '#454555',
                alignSelf: 'center',
                marginLeft: 10,
                marginRight: 10,
              }}>
              OR
            </Text>
            <View
              style={{
                backgroundColor: '#DDE5ED',
                width: '38%',
                height: 1,
              }}></View>
          </View>
        </View>

        <Text
          style={{
            fontSize: 14,
            color: '#000',
            alignSelf: 'center',
            fontWeight: '500',
            fontFamily: 'AvenirLTStd-Medium',
          }}>
          SCAN QR CODE
        </Text>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <View
            style={{
              width: '80%',
              borderRadius: 25,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 20,
              backgroundColor: '#FA9219',
              height: 50,
            }}>
            <Text
              style={{
                lineHeight: 30,
                fontSize: 18,
                color: 'white',
                alignSelf: 'center',
              }}>
              SCAN
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('HomeScreen')}>
          <View
            style={{
              width: '80%',
              borderRadius: 25,
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: 30,
              backgroundColor: '#FA9219',
              height: 50,
            }}>
            <Text
              style={{
                lineHeight: 30,
                fontSize: 18,
                color: 'white',
                alignSelf: 'center',
              }}>
              START WITHOUT CODE
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaProvider>
    );
  }
}

export default BookingPujaOtp;

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderRadius: 22,
    backgroundColor: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: 'red',
  },
});
