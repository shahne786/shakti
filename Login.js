import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text,TextInput, View,FlatList,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,ImageBackground , Dimensions} from 'react-native';
const window = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
var EmailValidator = require("email-validator");
var DeviceInfo = require('react-native-device-info');
import NetInfo from "@react-native-community/netinfo";
type Props = {};
const GLOBAL = require('./Global');
export default class Login extends Component<Props> {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      email:'',
      password:'',
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

     mobilevalidate = (text) => {
         const reg = /^[0]?[789]\d{9}$/;
         if (reg.test(text) === false) {

           return false;
         } else {

           return true;
         }
       }

     checkValid = () =>{
            if (isNaN(this.state.email)) {
               if (EmailValidator.validate(this.state.email) == false){
                  alert('Please enter valid email')
                  return false
              }else{
                return true
              }
          //if input is not a number then here

        } else {
           if (this.mobilevalidate(this.state.email) == false){
               alert('Please enter valid Mobile number')
             return false
           }else{
             return true
           }
          }
        }

login = () => {
  if (this.state.email.length == 0){

            alert('Please Enter Email/Mobile ')
        }
        else if (this.checkValid() == false){

       }
        else if (this.state.password == "") {
		Alert.alert('ENTER PASSWORD', 'Please enter a Password.', [{
				text: "Okay"
			},

		], {
			cancelable: false
		})
	} else if (this.state.password.length < 6) {
		Alert.alert('Password Verification', 'Password must be greater than 6 chracters.', [{
				text: "Okay"
			},

		], {
			cancelable: false
		})
	} else if (this.state.connected == false) {
		Alert.alert('Network Error', 'Please connect to Internet.', [{
				text: "Okay"
			},

		], {
			cancelable: false
		})
	} else {
		var k = JSON.stringify({
			phone: this.state.email,
			password: this.state.password,
      ip_address:'',
			deviceID: DeviceInfo.getUniqueId(),
			deviceType: Platform.OS,
			deviceToken: GLOBAL.firebaseToken,
      model_name:'',
      carrier_name:'',
      device_country:'',
      device_memory:'',
      has_notch:'',
      manufacture:''
		})
		console.log(k)
    this.showLoading()
		const url = 'http://139.59.76.223/shaktipeeth/api/Signin_supervisor'


    var s =  JSON.stringify({
      phone: this.state.email,
      password: this.state.password,
      deviceID: DeviceInfo.getUniqueId(),
      deviceType: Platform.OS,
      deviceToken: GLOBAL.firebaseToken,
    })

    console.log(s)
		fetch(url, {
				method: 'POST',
				headers: {
					'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
          phone: this.state.email,
    			password: this.state.password,
          ip_address:'',
    			deviceID: DeviceInfo.getUniqueId(),
    			deviceType: Platform.OS,
    			deviceToken:GLOBAL.firebaseToken,
          model_name:'',
          carrier_name:'',
          device_country:'',
          device_memory:'',
          has_notch:'',
          manufacture:''
				}),
			}).then((response) => response.json())
			.then((responseJson) => {

				this.hideLoading()
				if (responseJson.status == true) {

          GLOBAL.user_id = responseJson.user_detail.user_id
          AsyncStorage.setItem('userID', responseJson.user_detail.user_id);
              this.props.navigation.replace('DrawerNavigator')
        } else {
          Alert.alert('Invalid Credentials', 'Username and Password must be correct', [{
      				text: "Okay"
      			},

      		], {
      			cancelable: false
      		})
				}
			})
			.catch((error) => {
        	this.hideLoading()
				console.error(error);
			});
	}

}

//Forgt Password

valide = () =>{
  this.props.navigation.navigate('Forget')
}
componentDidMount() {
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    this.setState({connected:state.isConnected})
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
    <View style={{flex:1, flexDirection:'column', justifyContent:'center',alignItems:'center'}}>

  <KeyboardAwareScrollView keyboardShouldPersistTaps='always' style = {{width:window.width,height:window.height}}>
                 <ImageBackground
                 resizeMode= 'stretch'
                                   // source={require('./Resources/login-back.png')}
                                    style={{width: '100%', height: window.height}}
                                >

              <Image
              style={{
                  width: 182,
                  height: 250,
                  alignSelf:'center',
                  resizeMode:'contain',
                  marginTop :'12%',
              }}
              source={require('./Resources/logo1_03.png')}
              />
              <Text style = {{fontFamily:GLOBAL.bold,fontSize:28,width:290,color:"#1E1F20",marginLeft:20,marginTop:-50,fontWeight:'bold'}}>
              Welcome to Shaktipeeth Digital!
                                                   </Text>
                                                   {/* <Text style = {{fontFamily:GLOBAL.regular,fontSize:17,color:"#909090",marginLeft:20,width:260}}>
                                                                                      Enter your mobile number /Email address to continue
                                                                                        </Text> */}

                                                                                        <View style = {{marginTop:33,width:window.width - 40,height:50,borderColor:'#909090',borderWidth:0,borderRadius:4,backgroundColor:'#F7F7FB',marginLeft:20,marginLeft:20}}>
                      <TextInput
                                        style={{height: 45,marginLeft:20,marginTop:4, fontSize: 18,color:'#909090',fontFamily:GLOBAL.semi,marginTop:2}}
                                        placeholder="Mobile Number/Email address"
                                        onChangeText={(text) => this.setState({email:text})}
                                    />



</View>
<View style = {{marginTop:25,width:window.width - 40,height:50,borderColor:'#909090',borderWidth:0,backgroundColor:'#F7F7FB',borderRadius:4,marginLeft:20,marginLeft:20}}>
<TextInput
style={{height: 45,marginLeft:20,marginTop:4, fontSize: 18,color:'#909090',fontFamily:GLOBAL.semi,marginTop:2}}
placeholder="Password"
secureTextEntry={true}
onChangeText={(text) => this.setState({password:text})}
/>
</View>



<Button
                            containerStyle={{padding:14, height:50,marginTop:100, overflow:'hidden', borderRadius:22, backgroundColor: '#ff9445',marginLeft:20,width:window.width - 40}}
                      disabledContainerStyle={{backgroundColor: 'grey'}}
                      style={{fontSize: 16, color: 'white',fontFamily:GLOBAL.semi,}}
                                onPress={() => this.login()}>
                                LOGIN
                            </Button>


              </ImageBackground>
</KeyboardAwareScrollView>

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
