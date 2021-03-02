import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  AsyncStorage,
  Text,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  Container,
  Linking,
  ImageBackground,
  Dimensions,
} from 'react-native';
const window = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
import ActionSheet from 'react-native-actionsheet';
import MaterialTabs from 'react-native-material-tabs';
import {EventRegister} from 'react-native-event-listeners';
import {BackHandler} from 'react-native';
import {withNavigationFocus} from 'react-navigation';
import DatePickers from 'react-native-date-picker';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import NetInfo from '@react-native-community/netinfo';
const GLOBAL = require('./Global');
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { Dialog, DialogContent, DialogComponent, DialogTitle, DialogButton } from 'react-native-dialog-component';
import Dialog, {
  DialogButton,
  DialogContent,
  DialogComponent,
  DialogTitle,
} from 'react-native-popup-dialog';
type Props = {};
const options = ['Male', 'Female', 'Cancel'];
class Home extends Component<Props> {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {
      username: '',
      gender: '',
      dates: '',
      selectedTab: 0,
      time: '',
      show: false,
      connected: true,
      date: new Date(),
      loading: false,
      myBanners: [],
      puja: [],
      results: [],
      limit: '0',

      about_us: '',
      connected: true,
      loading: false,
      userDetails: [],
      visible: false,
    };
  }

  hideLoading() {
    this.setState({loading: false});
  }
  categorySelect = (index) => {
    this.setState({results: []});
    this.setState({selectedTab: index});
    this.setState({limit: '0'});
    if (index == 0) {
      setTimeout(() => {
        this.loadBookings('accepted');
      }, 1000);
    } else if (index == 1) {
      this.setState({limit: '0'});

      setTimeout(() => {
        this.loadBookings('denied');
      }, 1000);
    } else if (index == 2) {
      this.setState({limit: '0'});

      setTimeout(() => {
        this.loadBookings('all');
      }, 1000);
    } else if (index == 3) {
      this.setState({limit: '0'});

      setTimeout(() => {
        this.loadBookings('pending');
      }, 1000);
    }
  };

  showLoading() {
    this.setState({loading: true});
  }

  handleBackButton = () => {
    if (this.props.isFocused == true) {
      BackHandler.exitApp();
    }

    console.log(this.props.isFocused);
  };

  handleBackButtonClick = () => {
    Alert.alert(
      'Tenon Prime!',
      'Are you sure you want to Exit?',
      [{text: 'Cancel'}, {text: 'Yes', onPress: () => BackHandler.exitApp()}],
      {cancelable: false},
    );
    return true;
  };
  deny = (item, index) => {
    const url = 'http://139.59.76.223/shaktipeeth/api/accept_reject_booking';

    fetch(url, {
      method: 'POST',
      headers: {
        HTTP_X_API_KEY: 'ShaktipeethAUTH@##@17$',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_id: GLOBAL.user_id,
        id: item.id,
        what: '2',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson));
        //              this.hideLoading()

        if (responseJson.status == true) {
          this.setState({selectedTab: 1});
          this.categorySelect(1);
        } else {
          alert(responseJson.message);
          //this.setState({results: []})
        }
      })
      .catch((error) => {
        console.error(error);
        //            this.hideLoading()
      });
  };

  accept = (item, index) => {
    const url = 'http://139.59.76.223/shaktipeeth/api/accept_reject_booking';

    fetch(url, {
      method: 'POST',
      headers: {
        HTTP_X_API_KEY: 'ShaktipeethAUTH@##@17$',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_id: GLOBAL.user_id,
        id: item.id,
        what: '1',
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson));
        //              this.hideLoading()

        if (responseJson.status == true) {
          this.setState({selectedTab: 0});
          this.categorySelect(0);
        } else {
          alert(responseJson.message);
          //this.setState({results: []})
        }
      })
      .catch((error) => {
        console.error(error);
        //            this.hideLoading()
      });
  };
  selectedProduct = (item, index) => {
    this.props.navigation.navigate('BookingHistory', item);
  };

  _renderItemproducts = ({item, index}) => {
    console.log(JSON.stringify(item));
    var puja = item;

    return (
      <TouchableOpacity
        onPress={() => this.selectedProduct(item, index)}
        activeOpacity={0.9}>
        <View
          style={{
            backgroundColor: 'white',
            color: 'white',
            flexDirection: 'column',
            flex: 1,
            margin: 5,
            borderRadius: 6,
            width: wp(93),
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
              Order Id: {item.booking_id}
            </Text>
            {/* 
 <Text style = {{fontSize:15,fontFamily:GLOBAL.regular,color:'black',}}>
 {puja.puja_detail}

               </Text> */}

            <Text
              style={{
                marginRight: 10,
                fontSize: 12,
                fontFamily: GLOBAL.regular,
                color: '#909090',
              }}>
              {item.booking_date} {item.booking_time}
              {/* {item.booking_time} */}
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
              marginTop: 8,
              alignItems: 'center',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {item.booking_status != '' && (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: GLOBAL.regular,
                    color: '#E60000',
                    margin: 10,
                    marginTop: -8,
                  }}>
                  Status : {item.booking_status}
                </Text>
              )}
              {item.priest_name != '' && (
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: GLOBAL.regular,
                    color: 'black',
                    margin: 10,
                    marginTop: -8,
                    width: 200,
                  }}>
                  Assigned To : {item.priest_name}
                </Text>
              )}
            </View>

            <View
              style={{
                height: 20,
                width: 105,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: '#F87B00',
                borderRadius: 6,
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Avenir',
                  lineHeight: 13,
                  fontWeight: 'bold',
                  color: '#FFF',
                  alignSelf: 'center',
                }}>
                On-Ground Puja
              </Text>
            </View>
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
              Customer Name
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
            </Text>
          </View>

          {/* 
<Text style = {{fontSize:15,fontFamily:GLOBAL.regular,color:'black',}}>
{puja.puja_detail}

             </Text> */}

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
              Date & Time
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
              {' '}
              {item.booking_date} {item.booking_time}
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
              {item.puja_detail}
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
              Sub Order Id
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
              {item.booking_id}
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
              {item.priest_name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 8,
              marginTop: -6,
            }}>
            {/* <Text style = {{fontSize:15,fontFamily:GLOBAL.regular,color:'black',}}>
           Name : {item.name}
               </Text> */}
            {/* <Text style = {{fontSize:14,fontFamily:GLOBAL.regular,color:'black',}}>
                              Booking ID: {item.booking_id}
                             </Text> */}

            {/* 
<Text style = {{fontSize:15,fontFamily:'Avenir',lineHeight:18,fontWeight:'bold',
color:'#1E1F20',marginRight:10}}>{item.booking_id}</Text>         */}
          </View>

          {/* <View style = {{flexDirection:'row',justifyContent:'space-between',margin:10,marginTop:-6}}>
 <Text style = {{fontSize:15,fontFamily:GLOBAL.regular,color:'black',}}>
           Mobile No : {item.mobile}
               </Text>

{item.venue_id != "" && (
  <Text style = {{fontSize:14,fontFamily:GLOBAL.regular,color:'grey',}}>
                 Venue:{item.venue_id}
                </Text>
)}




 </View> */}

          {/* <View style = {{flexDirection:'row',justifyContent:'space-between'}}>
{item.booking_status != "" && (
  <Text style = {{fontSize:14,fontFamily:GLOBAL.regular,color:'green',margin:10,marginTop:-8}}>
               Status : {item.booking_status}
                </Text>
)}
{item.priest_name != "" && (
  <Text style = {{fontSize:14,fontFamily:GLOBAL.regular,color:'black',margin:10,marginTop:-8,width:200}}>
              Assigned To : {item.priest_name}
                </Text>
)}


               </View> */}

          {this.state.selectedTab == 2 && (
            <Text
              style={{
                fontSize: 14,
                fontFamily: GLOBAL.regular,
                color: 'black',
                margin: 10,
                marginTop: -8,
                width: 200,
              }}>
              {item.status_line}
            </Text>
          )}

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
              alignSelf: 'flex-end',
              marginRight: 10,
              marginTop: 10,
            }}>
            {item.accept_power == '1' && (
              <TouchableOpacity
                onPress={() => this.accept(item, index)}
                activeOpacity={0.9}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: GLOBAL.regular,
                    color: '#00D600',
                    margin: 10,
                    marginTop: -8,
                  }}>
                  ACCEPT
                </Text>
              </TouchableOpacity>
            )}
            {item.deny_power == '1' && (
              <TouchableOpacity
                onPress={() => this.deny(item, index)}
                activeOpacity={0.9}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: GLOBAL.regular,
                    color: '#FF002F',
                    margin: 10,
                    marginTop: -8,
                  }}>
                  Decline
                </Text>
              </TouchableOpacity>
            )}
            {item.assign_power == '1' && (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Assign', item)}
                activeOpacity={0.9}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: GLOBAL.regular,
                    color: 'green',
                    margin: 10,
                    marginTop: -8,
                  }}>
                  ASSIGN
                </Text>
              </TouchableOpacity>
            )}
            {item.ressign_power == '1' && (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Reassign', item)}
                activeOpacity={0.9}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: GLOBAL.regular,
                    color: 'green',
                    margin: 10,
                    marginTop: -8,
                  }}>
                  REASSIGN
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  handleLoadMore = () => {
    // this.setState({limit: this.state.limit + 6})
    // this.loadBookings()

    this.setState(
      {
        limit: parseInt(this.state.limit) + 6,
      },
      () => {
        if (this.state.selectedTab == 1) {
          this.loadBookings('denied');
        } else if (this.state.selectedTab == 2) {
          this.loadBookings('all');
        } else if (this.state.selectedTab == 3) {
          this.loadBookings('pending');
        } else if (this.state.selectedTab == 0) {
          this.loadBookings('accepted');
        } else {
        }
      },
    );
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  loadBookings = (type) => {
    var k = JSON.stringify({
      user_id: GLOBAL.user_id,
      limit_from: this.state.limit,
      condition: type,
    });

    console.log(k);

    //        this.showLoading()
    const url = 'http://139.59.76.223/shaktipeeth/api/home_supervisor';

    fetch(url, {
      method: 'POST',
      headers: {
        HTTP_X_API_KEY: 'ShaktipeethAUTH@##@17$',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        user_id: GLOBAL.user_id,
        limit_from: this.state.limit,
        condition: type,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(JSON.stringify(responseJson));
        //              this.hideLoading()

        if (responseJson.status == true) {
          if (responseJson.lists.length == 0) {
          } else {
            var resu = this.state.results;
            this.setState({results: responseJson.lists});
          }
        } else {
          if (this.state.limit == 0) {
            this.setState({results: []});
          }
          //this.setState({results: []})
        }
      })
      .catch((error) => {
        console.error(error);
        //            this.hideLoading()
      });
  };

  _handleStateChange = (state) => {
    this.setState({selectedTab: 0});
    this.categorySelect(0);
  };

  componentDidMount() {
    this.setState({results: []});
    this.listener = EventRegister.addEventListener('notification', (data) => {
      this.setState({selectedTab: 0});
      this.categorySelect(0);
    });
    this.props.navigation.addListener('willFocus', this._handleStateChange);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      this.setState({connected: state.isConnected});

      if (state.isConnected == true) {
        this.loadBookings('accepted');
      }
    });
  }

  _renderItems({item, index}) {
    //  alert(JSON.stringify(item))
    return (
      <View
        style={{
          width: wp('95%'),
          height: hp('20%'),
          borderRadius: 10,
          marginRight: 10,
          marginTop: 10,
          elevation: 5,
          backgroundColor: 'white',
          shadowColor: 'black',
          marginBottom: 10,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 5}}
          source={{uri: item}}
        />
      </View>
    );
  }

  selectedFirst = (item) => {
    this.props.navigation.navigate('PujaDetail', item);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="orange"
          />
        </View>
      );
    }
    if (this.state.connected == false) {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Nunito-Bold',
              color: '#000000',
              marginLeft: 15,
              marginTop: -14,
              alignSelf: 'center',
              marginTop: 200,
            }}
            numberOfLines={2}>
            You are not connected to Internet
          </Text>
        </View>
      );
    }
    return (
      <KeyboardAwareScrollView style={{width: window.width}}>
        <View
          style={{
            width: '100%',
            height: 80,
            elevation: 2,
            backgroundColor: '#F97012',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: 45,
                  width: 45,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                }}>
                <Image
                  style={{height: 40, width: 40, resizeMode: 'contain'}}
                  source={require('./homelogo.png')}
                />
              </View>

              <View
                style={{
                  marginLeft: 18,
                  height: 45,
                  flexDirection: 'column',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    lineHeight: 15,
                    fontSize: 14,
                    color: 'white',
                    fontFamily: 'Avenir',
                  }}>
                  Welcome{' '}
                </Text>

                <Text
                  style={{
                    lineHeight: 18,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: 'white',
                    fontFamily: 'Avenir',
                  }}>
                  Vipul Pandey
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
              }}>
              <TouchableOpacity
                style={{marginLeft: 21}}
                onPress={() =>
                  this.props.navigation.navigate('BookingPujaOtp')
                }>
                <Image
                  style={{height: 26, width: 23, resizeMode: 'contain'}}
                  source={require('./notificationBell.png')}
                />
              </TouchableOpacity>

              <View>
                <TouchableOpacity
                  style={{marginLeft: 20}}
                  onPress={() => {
                    this.setState({visible: true});
                  }}

                  //onPress={() => this.props.navigation.navigate('ProfileScreen')}
                >
                  <Image
                    style={{height: 26, width: 23, resizeMode: 'contain'}}
                    source={require('./filter.png')}
                  />
                </TouchableOpacity>

                {/* <Dialog
                  visible={this.state.visible}
                  onTouchOutside={() => {
                    this.setState({visible: false});
                  }}>
                  <DialogContent>
                    <View
                      style={{
                        height: 300,
                        backgroundColor: 'white',
                        width: 300,
                      }}>
                      <Text
                        style={{
                          fontSize: 28,
                          color: '#1B202B',
                          fontFamily: 'Avenir',
                          fontWeight: 'bold',
                          alignSelf: 'center',
                          marginTop: 8,
                        }}>
                        Filter
                      </Text>

                      <View
                        style={{
                          flexDirection: 'column',
                          backgroundColor: 'white',
                          width: '100%',
                          marginTop: 20,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#6F6F7B',
                            fontFamily: 'Avenir',
                            fontWeight: 'bold',
                            marginTop: 8,
                          }}>
                          All Puja
                        </Text>

                        <View
                          style={{
                            width: '100%',
                            height: 0.5,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#EDEEEF',
                          }}></View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'column',
                          backgroundColor: 'white',
                          width: '100%',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#6F6F7B',
                            fontFamily: 'Avenir',
                            fontWeight: 'bold',
                            marginTop: 8,
                          }}>
                          Yet To Start
                        </Text>

                        <View
                          style={{
                            width: '100%',
                            height: 0.5,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#EDEEEF',
                          }}></View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'column',
                          backgroundColor: 'white',
                          width: '100%',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#6F6F7B',
                            fontFamily: 'Avenir',
                            fontWeight: 'bold',
                            marginTop: 8,
                          }}>
                          Ongoing
                        </Text>

                        <View
                          style={{
                            width: '100%',
                            height: 0.5,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#EDEEEF',
                          }}></View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'column',
                          backgroundColor: 'white',
                          width: '100%',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#6F6F7B',
                            fontFamily: 'Avenir',
                            fontWeight: 'bold',
                            marginTop: 8,
                          }}>
                          Completed
                        </Text>

                        <View
                          style={{
                            width: '100%',
                            height: 0.5,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#EDEEEF',
                          }}></View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'column',
                          backgroundColor: 'white',
                          width: '100%',
                          marginTop: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#6F6F7B',
                            fontFamily: 'Avenir',
                            fontWeight: 'bold',
                            marginTop: 8,
                          }}>
                          Declined
                        </Text>

                        <View
                          style={{
                            width: '100%',
                            height: 0.5,
                            marginTop: 10,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#EDEEEF',
                          }}></View>
                      </View>
                    </View>
                  </DialogContent>
                </Dialog> */}
              </View>

              <TouchableOpacity
                style={{marginLeft: 20}}
                onPress={() => this.props.navigation.navigate('Drawer')}>
                <Image
                  style={{height: 33, width: 30, resizeMode: 'contain'}}
                  source={require('./profile.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* <ImageBackground style = {{width :wp('100%'),height:60}}
                         source={require('./Resources/header.png')}>
                             <View style ={{width:wp('100%'),flexDirection:'row',justifyContent:'space-between',height:80,alignItems:'center'}}>

 <View style={{margin:10, width:wp('95%'), height:'auto', flexDirection:'row'}}>
 <TouchableOpacity onPress={() =>this.props.navigation.toggleDrawer()}>
 <Image source={require('./Resources/drawer.png')}
                             style  = {{width:30, height:30,margin:5,resizeMode:'contain'}}
                      />
                     </TouchableOpacity>
                     <Text style = {{width:wp('20%'),color:'white',fontSize: 17,fontFamily:'Nunito-SemiBold', alignSelf:'center',textAlign:'center',}}>
                                      HOME
                                      </Text>


 </View>

                             </View>

                         </ImageBackground> */}

        <View>
          <MaterialTabs
            items={['Accepted', 'Denied', 'All', 'Pending']}
            selectedIndex={this.state.selectedTab}
            onChange={(index) => this.categorySelect(index)}
            barColor="white"
            indicatorColor="#ff9445"
            activeTextColor="black"
            textStyle={{fontSize: 12}}
            inactiveTextColor="black"
          />

          <View
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              width: '95%',
              marginRight: 5,
              marginTop: 20,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                height: 40,
                width: '100%',
                backgroundColor: '#FFF',
                borderRadius: 20,
                elevation: 2,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '95%',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}>
                <Image
                  style={{height: 17, width: 16, resizeMode: 'contain'}}
                  source={require('./searchgrey.png')}
                />

                <TextInput
                  placeholder="Search by Puja Name, Mobile no, Customer Name"
                  style={{width: '90%', height: 35, marginLeft: 4}}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
          </View>

          <View
            style={{
              width: '98%',
              marginTop: 20,
              height: 36,
              alignSelf: 'center',
              alignItems: 'center',
              height: 38,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <TouchableOpacity
                style={{
                  height: 36,
                  backgroundColor: '#FFF',
                  width: '45%',
                  marginRight: 10,
                  borderRadius: 9,
                  borderWidth: 1,
                  borderColor: '#D1D1D1',
                  alignSelf: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'normal',
                    fontFamily: 'Avenir',
                    color: '#000',
                  }}>
                  Puja Start Date
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#FFF',
                  height: 36,
                  width: '45%',
                  borderColor: '#D1D1D1',
                  marginLeft: 10,
                  borderRadius: 9,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'normal',
                    fontFamily: 'Avenir',
                    color: '#000',
                    alignSelf: 'center',
                  }}>
                  Puja End Date
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {this.state.results.length != 0 && (
            <View style={{marginLeft: 7}}>
              <FlatList
                style={{flexGrow: 0, marginBottom: 5}}
                data={this.state.results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this._renderItemproducts}
                extraData={this.state}
                onEndReachedThreshold={0.01}
              />
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
export default withNavigationFocus(Home);
const styles = StyleSheet.create({
  wrapper: {},
  container: {
    backgroundColor: 'white',
  },
  loading: {
    position: 'absolute',
    left: window.width / 2 - 30,

    top: window.height / 2,

    opacity: 0.5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  AndroidSafeArea: {
    flex: 0,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? 0 : 0,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  account: {
    marginTop: 0,
    textAlign: 'center',
    alignSelf: 'center',

    fontSize: 16,

    color: 'black',
    fontFamily: GLOBAL.semi,
  },
  createaccount: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 10,

    color: '#1E1F20',
  },

  createaccounts: {
    marginLeft: 5,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 30,
    color: '#ff9445',
  },
});
