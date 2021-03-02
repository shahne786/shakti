import React, {Component} from 'react';
import {Platform, StyleSheet,AsyncStorage, Text,TextInput, View,FlatList,ActivityIndicator,Image,TouchableOpacity ,Alert,Container,Linking ,ImageBackground , Dimensions} from 'react-native';
const window = Dimensions.get('window');
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from 'react-native-button';
var EmailValidator = require("email-validator");
var DeviceInfo = require('react-native-device-info');
import NetInfo from "@react-native-community/netinfo";
import {NavigationActions,StackActions} from 'react-navigation';
const GLOBAL = require('./Global');
type Props = {};
export default class ResetPassword extends Component<Props> {
  constructor(props){
    super(props)
    const { navigation } = this.props;
    this.state = {
      email:'',
      old_password:'',
      password:'',
      connected:true,
      loading:false,
      new_password:'',
    }

}
      hideLoading() {
         this.setState({loading: false})
       }

     showLoading() {
         this.setState({loading: true})
     }

login = () => {
//   if (this.state.email == "") {
// 		Alert.alert('ENTER New PASSWORD', 'Please enter a New Password.', [{
// 				text: "Okay"
// 			},

// 		], {
// 			cancelable: false
// 		})
// 	} else if (this.state.email.length < 6) {
// 		Alert.alert('Password Verification', 'New Password must be greater than 6 chracters.', [{
// 				text: "Okay"
// 			},

// 		], {
// 			cancelable: false
// 		})
// 	}
// else  if (this.state.password == "") {
//     Alert.alert('ENTER New Confirm PASSWORD', 'Please enter a Confirm Password.', [{
//         text: "Okay"
//       },

//     ], {
//       cancelable: false
//     })
//   } else if (this.state.password.length < 6) {
//     Alert.alert('Password Verification', 'Confirm New Password must be greater than 6 chracters.', [{
//         text: "Okay"
//       },

//     ], {
//       cancelable: false
//     })
//   }
//   else if (this.state.password != this.state.email ) {
//    Alert.alert('Password Mismatch', 'New Password and Confirm Password not match', [{
//        text: "Okay"
//      },

//    ], {
//      cancelable: false
//    })
//  }
//   else if (this.state.connected == false) {
// 		Alert.alert('Network Error', 'Please connect to Internet.', [{
// 				text: "Okay"
// 			},

// 		], {
// 			cancelable: false
// 		})
// 	} else {
		var k = JSON.stringify({
			old_password: this.state.old_password,
      new_password:this.state.new_password,
			password: this.state.password,

		})
		console.log(k)
    this.showLoading()
    const url = 'http://139.59.67.166/shaktipeeth_new/supervisor_api/change_password_user'
	//	const url = 'http://139.59.76.223/shaktipeeth/api/change_password_user'
		fetch(url, {
				method: 'POST',
				headers: {
					'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					phone: GLOBAL.email,
					password: this.state.password,
				}),
			}).then((response) => response.json())
			.then((responseJson) => {
        
				this.hideLoading()
				if (responseJson.status == true) {

          this.props
              .navigation
              .dispatch(StackActions.reset({
                  index: 0,
                  actions: [
                      NavigationActions.navigate({
                          routeName: 'Login',
                          params: { someParams: 'parameters goes here...' },
                      }),
                  ],
              }))
        } else {
          alert(responseJson.msg)
				}
			})
			.catch((error) => {
        	this.hideLoading()
				console.error(error);
			});
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
                                  //  source={require('./Resources/login-back.png')}
                                    style={{width: '100%', height: window.height}}
                                >




<View style={{ width: '100%', height: 60, elevation: 2, backgroundColor: '#F97012', justifyContent: 'center' }}>

<View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: "center" }} >


    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <Image style={{ height: 22, width: 12, resizeMode: 'contain' }} source={require('./backwhite.png')} />
    </TouchableOpacity>

    <Text style={{ fontFamily:'Avenir',fontSize: 20, fontFamily: 'Avenir', color: 'white', marginLeft: 20 }}>Change Password</Text>



</View>

</View>







<View style = {{marginTop:10,width:window.width - 40,height:50,elevation:3,borderRadius:4,backgroundColor:'#F7F7FB',marginLeft:20,marginLeft:20}}>
                    
                    
                    <TextInput
                                      style={{height: 40,marginLeft:20,marginTop:4, fontSize: 18,color:'#909090',fontFamily:GLOBAL.semi,marginTop:6}}
                                      placeholder="old Password"
                                      secureTextEntry={true}
                                      onChangeText={(text) => this.setState({old_password:text})}
                                  />



</View>
















                      <View style = {{marginTop:10,width:window.width - 40,height:50,elevation:3,backgroundColor:'#F7F7FB',borderRadius:4,marginLeft:20,marginLeft:20}}>
                    
                    
                      <TextInput
                                        style={{height: 40,marginLeft:20,marginTop:4, fontSize: 18,color:'#909090',fontFamily:GLOBAL.semi,marginTop:6}}
                                        placeholder="New Password"
                                        secureTextEntry={true}
                                        onChangeText={(text) => this.setState({new_password:text})}
                                    />



</View>
<View style = {{marginTop:10,width:window.width - 40,height:50,elevation:3,backgroundColor:'#F7F7FB',borderRadius:4,marginLeft:20,marginLeft:20}}>
<TextInput
style={{height: 40,marginLeft:20,marginTop:4, fontSize: 18,color:'#909090',fontFamily:GLOBAL.semi,marginTop:6}}
placeholder="Confirm Password"
secureTextEntry={true}
onChangeText={(text) => this.setState({new_password:text})}
/>
</View>



<Button
                            containerStyle={{padding:14, height:50,marginTop:100, overflow:'hidden', borderRadius:22, backgroundColor: '#F97012',marginLeft:20,width:window.width - 40}}
                      disabledContainerStyle={{backgroundColor: 'grey'}}
                      style={{fontSize: 16, color: 'white',fontFamily:GLOBAL.semi,}}
                                onPress={() => this.login()}>
                                SAVE
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
