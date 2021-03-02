import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text,TextInput, View,FlatList,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,ImageBackground , Dimensions} from 'react-native';
const window = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
var EmailValidator = require("email-validator");
var DeviceInfo = require('react-native-device-info');
import NetInfo from "@react-native-community/netinfo";
import Header from 'react-native-custom-headers';
var randomString = require('random-string');
import { WebView } from 'react-native-webview';
const GLOBAL = require('./Global');
type Props = {};
export default class Terms extends Component<Props> {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      about_us:'',
      connected:true,
      loading:false,
    }

}
hideLoading() {
   this.setState({loading: false})
 }

showLoading() {
   this.setState({loading: true})
}



componentDidMount() {
  const url = 'http://139.59.76.223/shaktipeeth/api/terms_and_condition'
  fetch(url, {
      method: 'POST',
      headers: {
        'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: GLOBAL.user_id

      }),
    }).then((response) => response.json())
    .then((responseJson) => {

      this.hideLoading()
      if (responseJson.status == true) {
this.setState({about_us:responseJson.terms_condition})
      } else {

      }
    })
    .catch((error) => {
        this.hideLoading()
      console.error(error);
    });
}
  render() {
    if(this.state.loading){
           return(
               <View style={{flex:1,backgroundColor:'white'}}>
                   <ActivityIndicator style = {styles.loading}

                                      size="large" color= 'orange' />
               </View>
           )
       }
    return (
<View style = {{flex:1}}>

      <Header navigation={this.props.navigation}
                    showHeaderImage={false}
                    headerColor ={'#ff9445'}
                    backImagePath={require('./Resources/back.png')}
                    headerName={'Terms & Conditions'}
                    headerTextStyle={{fontFamily:'Nunito-SemiBold', color:'white',marginLeft:10}} />
<WebView scalesPageToFit={false} source={{ html: this.state.about_us }} />

</View>
    );
  }
}
const styles = StyleSheet.create({
    wrapper: {
    },
    container: {

        backgroundColor :'white'
    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,

        top: window.height/2,

        opacity: 0.5,

        justifyContent: 'center',
        alignItems: 'center'
    },
    AndroidSafeArea: {
       flex: 0,
       backgroundColor: '#FAFAFA',
       paddingTop: Platform.OS === "android" ? 0 : 0
   },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    account :{
        marginTop : 0,

        fontSize: 16,

        color : 'black',
        fontFamily:GLOBAL.semi,



    } ,
    createaccount :{
        marginLeft : 20,
        fontSize: 14,
        textAlign : 'left',
        marginTop : 8,

        color : '#1E1F20',




    } ,

    createaccounts :{
        marginLeft : 5,
        fontSize: 14,
        textAlign : 'center',
        marginTop : 30,
        color : '#ff9445',




    } ,
})
