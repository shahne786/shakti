import React, {Component} from 'react';
import {NavigationActions,StackActions} from 'react-navigation';
import PropTypes from 'prop-types';
import {ScrollView, Text, View ,Linking,    StyleSheet,
    Image,TouchableOpacity,Alert,Share} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';
import Button from 'react-native-button';
import AsyncStorage from '@react-native-community/async-storage';

const GLOBAL = require('./Global');

class Drawer extends React.Component {

    constructor(props){
        super(props)
        const { navigation } = this.props;
        this.state = {
            my: 'sdf',
            pic:'',
            userDetails:'',
        }
    }



    _fancyShareMessage=()=>{

        var a = 'Hey! Checkout Kundali Expert app from Play Store'

        Share.share({
                message:a
            },{
                tintColor:'green',
                dialogTitle:'Share this app via....'
            }
        ).then(this._showResult);
    }

    componentDidMount() {

     //    var value =  AsyncStorage.getItem('name');
     //    value.then((e)=>{

     //        GLOBAL.name = e;

     //        this.setState({my: GLOBAL.name})
     //    })
     // console.log('did')
     this.getProfile()
     this.props.navigation.addListener('willFocus',this._handleStateChange);

    }

    _handleStateChange = state => {
        this.getProfile()
     };

     getProfile(){
        const url = 'http://139.59.76.223/shaktipeeth/api/get_profile_supervisor';
      //  this.showLoading()
      fetch(url, {
        method: "POST",
        headers: {
          'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: GLOBAL.user_id,

        })
      })
        .then(response => response.json())
        .then(responseJson => {
          //       this.hideLoading()


        //Color in logs
        console.log("\x1b[36m%s\x1b[0m" ,"Background Color Is Blue");

        console.log("\x1b[36m",JSON.stringify(responseJson))
          if (responseJson.status == true) {

            this.setState({userDetails : responseJson.user_details})
          } else {

          }
        })
        .catch(error => {
          console.error(error);
        });

     }




    _YesLogout=()=>{


       const url = 'http://139.59.76.223/shaktipeeth/api/logout_superwiser'
//      this.showLoading()
      fetch(url, {
  method: 'POST',
  headers: {
    'HTTP_X_API_KEY': 'ShaktipeethAUTH@##@17$',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id : GLOBAL.user_id,
    device_id: 'rr'
  }),
}).then((response) => response.json())
    .then((responseJson) => {


  //     this.hideLoading()
       if (responseJson.status == true) {
        AsyncStorage.removeItem('userID');

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


        this.props.navigation.dispatch(DrawerActions.closeDrawer())

           }else {
               alert('Something Went Wrong.')
           }
        })
        .catch((error) => {
          console.error(error);
        });
    }

openMembers=()=>{
    GLOBAL.typelist='1'
    this.props.navigation.navigate('ListMember')

}
    navigateToScreen1 = (route) => () => {

        Alert.alert('Logout!','Are you sure you want to Logout?',
            [{text:"Cancel"},
                {text:"Yes", onPress:()=>this._YesLogout()
                },
            ],
            {cancelable:false}
        )

    }


    navigateToScreen = (route) => () => {

        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
    }







    render () {
        var yeah = this.state.userDetails

        return (
            <View style={{flex:1, backgroundColor:'white'}}>


                <ScrollView


                showsVerticalScrollIndicator ={false}>






<View style={{ width: '100%', height: 60, elevation: 2, backgroundColor: '#F97012', justifyContent: 'center' }}>

<View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: "center" }} >


    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
        <Image style={{ height: 22, width: 12, resizeMode: 'contain' }} source={require('./backwhite.png')} />
    </TouchableOpacity>

    <Text style={{ fontFamily:'Avenir',fontSize: 20, fontFamily: 'Avenir', color: 'white', marginLeft: 20 }}>My Account</Text>

</View>
</View>











<View style={{justifyContent:'center',alignSelf:'center',width:'90%'}}>

<View style={{height:115,width:'100%',
backgroundColor:'#FFF',borderRadius:8,marginTop:20,elevation:3}}>



      <View style={{ width: '100%', height: 80, elevation: 2, justifyContent: 'center' }}>

<View style={{ width: '90%',flexDirection: 'row', alignItems: "center",justifyContent:'space-between',alignSelf:'center' }} >


<View style={{flexDirection:'row',alignItems:'center'}}>
    <View style={{height:60,width:60, backgroundColor:'#FFF',borderRadius:30,marginTop:15}}>
    <Image style={{ height:60, width:60, resizeMode: 'contain' }} source={require('./profile1.png')} />
    </View>

    <View style={{marginLeft:18,height:45,flexDirection:'column'}}>

    <Text style={{ lineHeight:20,fontSize: 16, color: '#1D252D',fontFamily:'Avenir',fontWeight:'bold' }}>{yeah.name}</Text>
   
    <Text style={{ lineHeight:18,fontSize: 14,fontWeight:'bold', color: '#273253',fontFamily:'Avenir',marginTop:3 }}>{yeah.email}</Text>

    <Text style={{ lineHeight:18,fontSize: 14,fontWeight:'bold', color: '#273253',fontFamily:'Avenir',marginTop:2 }}>Call: Video Call</Text>

   

    </View>
    </View>




  
    <TouchableOpacity   onPress={this.navigateToScreen('EditProfile')}
                        activeOpacity={0.9}>
  
      <Image style={{height:25,width:25}} source={require('./edits.png')}/>


</TouchableOpacity>  


</View> 
</View>
    </View>
</View>









<View style={{justifyContent:'center',alignSelf:'center',width:'90%'}}>

<View style={{width:'100%',
backgroundColor:'#FFF',borderRadius:8,marginTop:20,elevation:3}}>
    
    
    



    <TouchableOpacity   onPress={()=> this.props.navigation.navigate('About')}>
<View style={{ marginTop:34,width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: "center",justifyContent:'space-between' }} >
    <View style={{flexDirection:'row'}}>
    <Image style={{ height: 33, width: 33, resizeMode: 'contain' }} source={require('./abouts.png')} />

    <Text style={{ fontFamily:'Avenir',fontSize: 20,color: '#000',marginLeft:20,alignSelf:'center'}}>About Us</Text>
    </View>
    <Image style={{ height: 14, width: 8, resizeMode: 'contain' }} source={require('./rightArrow.png')} />

</View>
</TouchableOpacity>

<View style={{width:'90%',borderColor:'#C8C8D3', justifyContent:'center',alignSelf:'center', borderWidth:.3,marginTop:16}}></View>      


<TouchableOpacity onPress={()=>this.props.navigation.navigate('ResetPassword')}>
<View style={{ marginTop:30,width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: "center",justifyContent:'space-between' }} >
    <View style={{flexDirection:'row'}}>
    <Image style={{ height: 33, width: 33, resizeMode: 'contain' }} source={require('./changePassword.png')} />

    <Text style={{ fontFamily:'Avenir',fontSize: 20,color: '#000',marginLeft:20,alignSelf:'center'}}>Change Password</Text>
    </View>
    <Image style={{ height: 14, width: 8, resizeMode: 'contain' }} source={require('./rightArrow.png')} />

</View></TouchableOpacity>


<View style={{width:'90%',borderColor:'#C8C8D3', justifyContent:'center',alignSelf:'center', borderWidth:.3,marginTop:16}}></View>      




<TouchableOpacity  onPress={()=>this.props.navigation.navigate('Privacy')}>
<View style={{ marginTop:30,width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: "center",justifyContent:'space-between' }} >
    <View style={{flexDirection:'row'}}>
    <Image style={{ height: 33, width: 33, resizeMode: 'contain' }} source={require('./privacy.png')} />

    <Text style={{ fontFamily:'Avenir',fontSize: 20,color: '#000',marginLeft:20,alignSelf:'center'}}>Privacy Policy</Text>
    </View>
    <Image style={{ height: 14, width: 8, resizeMode: 'contain' }} source={require('./rightArrow.png')} />

</View></TouchableOpacity>


<View style={{width:'90%',borderColor:'#C8C8D3', justifyContent:'center',alignSelf:'center', borderWidth:.3,marginTop:16}}></View>      








<TouchableOpacity  onPress={()=>this.props.navigation.navigate('Terms')}>
<View style={{ marginTop:30,width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: "center",justifyContent:'space-between' }} >
    <View style={{flexDirection:'row'}}>
    <Image style={{ height: 33, width: 33, resizeMode: 'contain' }} source={require('./cond.png')} />

    <Text style={{ fontFamily:'Avenir',fontSize: 20,color: '#000',marginLeft:20,alignSelf:'center'}}>Terms & Conditions</Text>
    </View>
    <Image style={{ height: 14, width: 8, resizeMode: 'contain' }} source={require('./rightArrow.png')} />

</View></TouchableOpacity>
<View style={{width:'90%',borderColor:'#C8C8D3', justifyContent:'center',alignSelf:'center', borderWidth:.3,marginTop:16}}></View>      




<TouchableOpacity  onPress={this.navigateToScreen1('Login')}>
<View style={{ marginTop:30,width: '90%', alignSelf: 'center', flexDirection: 'row', alignItems: "center",justifyContent:'space-between' }} >
    <View style={{flexDirection:'row'}}>
    <Image style={{ height: 33, width: 33, resizeMode: 'contain' }} source={require('./logoutApp.png')} />

    <Text style={{ fontFamily:'Avenir',fontSize: 20,color: '#000',marginLeft:20,alignSelf:'center'}}>Logout</Text>
    </View>
    <Image style={{ height: 14, width: 8, resizeMode: 'contain' }} source={require('./rightArrow.png')} />

</View></TouchableOpacity>
<View style={{width:'90%',borderColor:'#C8C8D3', justifyContent:'center',alignSelf:'center', borderWidth:.3,marginTop:16}}></View>      

    </View>
    </View>















                    <View style={{}}>


                        
                        <TouchableOpacity  
                        onPress={this.navigateToScreen('Profile')}
                        activeOpacity={0.9}>

                        <View  style={{}}>

                            <View style={{marginTop:30, marginLeft:20, flexDirection: 'column'}}>

                         



{/* 
                                <TouchableOpacity style={{backgroundColor:'transparent', position:'absolute', top:5, left:55}}
                                onPress={this.navigateToScreen('Profile')}>

                                </TouchableOpacity>
                               
                                */}
                                <View style={{flexDirection:'column', marginTop:5,}}>

                                    {/* <Text style = {{marginTop:10,color : 'white',marginLeft : 10,fontSize: 17, height:'auto',fontFamily:'Nunito-Light'}} >
                                    {yeah.name}
                                    </Text>
                                    <Text style = {[styles.drawerText, {color:'white'}]} >
                                    {yeah.email}
                                    </Text> */}

                                </View>
                            </View>

                        </View>
                        </TouchableOpacity>


                        {/* <View style={styles.menuItem}>
                            <Image style={styles.drawericon}
                                   source={require('./Resources/drawer/d_home.png')} />
                            <Text style = {styles.drawerTexts}
                                  onPress={()=>this.props.navigation.toggleDrawer()}>
                                Home
                            </Text>
                        </View> */}



                    </View>




                </ScrollView>
            </View>
        );
    }
}

Drawer.propTypes = {
    navigation: PropTypes.object
};


const styles = StyleSheet.create({
    container: {
        backgroundColor :'#f1f1f1',

    },
    drawerText :{
        marginTop : 2,
        color : 'white',
        marginLeft : 10,
        fontSize: 13,
        fontFamily:'Nunito-Light'
    } ,
    headertop :{
        width : 300,
        height : 180,
        backgroundColor : '#ff9445',
        flexDirection:'column'
    } ,

    containers: {
        flex: 1,

    },
    menuItem:{
        padding: 10,
        borderWidth: 0.5,
        borderColor: '#d6d7da'
    },
    drawericon: {
        borderLeftWidth: 1,
        width: 20,
        height: 20,
        marginLeft : 8 ,
        marginTop : 3,
        resizeMode:'contain'
    },
    drawericons: {

        width: 20,
        height: 20,
        marginLeft : 8 ,
        marginTop : 3,
    },
    drawerTexts: {

        width: 'auto',
        height: 22,
        marginLeft : 45 ,
        marginTop : -20,
        color: 'black',
        fontFamily: 'Nunito-Light'

    },
    loading: {
        position: 'absolute',
        left: window.width/2 - 30,
        top: window.height/2,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    transcript: {
        textAlign: 'center',
        color: 'red',

    },
})

export default Drawer;
