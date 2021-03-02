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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {user_id} from './Global';

const GLOBAL = require('./Global');

class PriestList extends React.Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      results: [],
      FlatListItems: [],
      data: '',
    };
  }

  loadBookings = (type) => {
    var k = JSON.stringify({
      user_id: GLOBAL.user_id,
      // "limit_from": this.state.limit,
      // "condition":type
    });

    //   console.log(k)

    //        this.showLoading()
    const url =
      'http://139.59.67.166/shaktipeeth_new/supervisor_api/priest_list';

    //  console.log(typeof GLOBAL.user_id)

    fetch(url, {
      method: 'POST',
      headers: {
        HTTP_X_API_KEY: 'ShaktipeethAUTH@##@17$',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        // "user_id": GLOBAL.user_id,

        user_id: '21',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert(JSON.stringify(responseJson));
        //           //   this.hideLoading()

        this.setState({
          data: responseJson,
        });
        if (responseJson.status == true) {
          if (responseJson.list.length == 0) {
          } else {
            var resu = this.state.FlatListItems;
            this.setState({FlatListItems: responseJson.list});
          }
        } else {
          //    if (this.pujabooking_details.length == 0){
          //      this.setState({FlatListItems:responseJson.pujabooking_details})
          //    }
          //this.setState({results: []})
        }
      })
      .catch((error) => {
        console.error(error);
        //            this.hideLoading()
      });
  };

  componentDidMount() {
    this.setState({FlatListItems: []});

    this.loadBookings();
    // this.listener = EventRegister.addEventListener('notification', (data) => {
    // this.setState({selectedTab:0})
    // this.categorySelect(0)

    // })

    // this.props.navigation.addListener('willFocus', this._handleStateChange);
    //  BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   console.log("Connection type", state.type);
    //   console.log("Is connected?", state.isConnected);
    //   this.setState({connected:state.isConnected})

    // });
  }

  _renderItemproducts = ({item, index}) => {
    // console.log(JSON.stringify(item))
    // var puja = item

    return (
      <TouchableOpacity
        //   onPress={() => this.selectedProduct(item, index)}

        activeOpacity={0.9}>
        <View
          style={{
            backgroundColor: 'white',
            color: 'white',
            flexDirection: 'column',
            flex: 1,
            borderRadius: 6,
            width: wp(95),
            margin: 9,
            elevation: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
              marginTop: 8,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Avenir',
                lineHeight: 18,
                fontWeight: 'bold',
                color: '#1E1F20',
              }}>
              Order Id:{item.booking_id}
            </Text>

            <Text
              style={{
                marginRight: 10,
                fontSize: 12,
                fontFamily: GLOBAL.regular,
                color: '#83878E',
              }}>
              orderId
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              borderColor: '#C8C8D3',
              borderWidth: 0.5,
              borderStyle: 'dashed',
              borderRadius: 0.1,
              marginTop: 10,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
              marginTop: 8,
            }}>
            <Text
              style={{
                marginRight: 10,
                fontSize: 12,
                fontFamily: GLOBAL.regular,
                color: '#83878E',
              }}>
              Priest
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Avenir',
                lineHeight: 18,
                fontWeight: 'bold',
                color: '#1E1F20',
                marginRight: 10,
              }}>
              {item.name}
              {/* {item.priest_name} */}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
              marginTop: 8,
            }}>
            <Text
              style={{
                marginRight: 10,
                fontSize: 12,
                fontFamily: GLOBAL.regular,
                color: '#83878E',
              }}>
              Customer Mobile
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Avenir',
                lineHeight: 18,
                fontWeight: 'bold',
                color: '#1E1F20',
                marginRight: 10,
              }}>
              {item.mobile}
              {/* {item.mobile} */}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
              marginTop: 8,
            }}>
            <Text
              style={{
                marginRight: 10,
                fontSize: 12,
                fontFamily: GLOBAL.regular,
                color: '#83878E',
              }}>
              Venue
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Avenir',
                lineHeight: 18,
                fontWeight: 'bold',
                color: '#1E1F20',
                marginRight: 10,
              }}>
              {item.venue_id}
              {/* {item.venue_id} */}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
              marginTop: 8,
            }}>
            <Text
              style={{
                marginRight: 10,
                fontSize: 12,
                fontFamily: GLOBAL.regular,
                color: '#83878E',
              }}>
              Location
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Avenir',
                lineHeight: 18,
                fontWeight: 'bold',
                color: '#1E1F20',
                marginRight: 10,
              }}>
              {item.booking_location}
              {/* {item.booking_location} */}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginLeft: 10,
              marginTop: 8,
            }}>
            <Text
              style={{
                marginRight: 10,
                fontSize: 12,
                fontFamily: GLOBAL.regular,
                color: '#83878E',
              }}>
              Puja Name
            </Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Avenir',
                lineHeight: 18,
                fontWeight: 'bold',
                color: '#1E1F20',
                marginRight: 10,
              }}>
              {item.pujabooking_details}
              {/* {item.puja_detail} */}
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              borderColor: '#C8C8D3',
              borderWidth: 0.3,
              borderStyle: 'dashed',
              borderRadius: 0.1,
              marginTop: 10,
            }}></View>

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginRight: 1,
              margin: 5,
              alignItems: 'center',
            }}>
            <Image
              style={{height: 13, width: 13, marginRight: 8}}
              source={require('./checkimg.png')}
            />
            <Text
              style={{
                marginRight: 10,
                fontSize: 12,
                fontFamily: GLOBAL.regular,
                color: '#83878E',
                fontWeight: 'bold',
                marginBottom: 2,
              }}>
              Assign
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
              Priest List
            </Text>
          </View>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: 5,
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: 60,
          }}>
          <FlatList
            style={{width: '100%'}}
            data={this.state.FlatListItems}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItemproducts}
          />
        </View>
      </SafeAreaProvider>
    );
  }
}

export default PriestList;
