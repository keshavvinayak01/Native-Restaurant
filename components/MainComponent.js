import React, {Component} from 'react';
import Menu from  './MenuComponent';
import Home from './HomeComponent';
import Reservation from './ReservationComponent';
import Contact from './ContactComponent';
import Login from './LoginComponent';
import About from './AboutComponent';
import DishDetail from './DishDetailComponent';
import {Platform,View,Image,StyleSheet,ScrollView,Text, NetInfo, ToastAndroid} from 'react-native';
import { Icon } from 'react-native-elements';
import Favourites from './FavouriteComponent';
import { createStackNavigator,createDrawerNavigator,DrawerItems,SafeAreaView } from 'react-navigation';
// import { requireNativeViewManager } from 'expo-core'; 
import {connect} from 'react-redux';
import { fetchDishes,fetchComments , fetchPromos,fetchLeaders} from
'../redux/ActionCreators';



const mapStateToProps = state => {
        return{
        }
}
const mapDispatchToProps = dispatch => ({
        fetchDishes : () => dispatch(fetchDishes()),
        fetchComments : () => dispatch(fetchComments()),
        fetchPromos : () => dispatch(fetchPromos()),
        fetchLeaders : () => dispatch(fetchLeaders()),
});

const ReservationNavigator  = createStackNavigator({
        Reservation : {screen : Reservation}
},{
        navigationOptions : ({ navigation } ) => ({
                headerStyle : {
                        backgroundColor : '#512DA8',
                        paddingLeft : 20
                },
                headerTintColor : '#fff',
                headerTitleStyle : {
                        color : '#BADA55'
                },
                headerLeft : <Icon name='menu'  size={24}
                color='white'
                onPress = {() => navigation.toggleDrawer()}  />
        })
});

const LoginNavigator  = createStackNavigator({
        Login : {screen : Login}
},{
        navigationOptions : ({ navigation } ) => ({
                headerStyle : {
                        backgroundColor : '#512DA8',
                        paddingLeft : 20
                },
                headerTintColor : '#fff',
                headerTitleStyle : {
                        color : '#BADA55'
                },
                headerLeft : <Icon name='menu'  size={24}
                color='white'
                onPress = {() => navigation.toggleDrawer()}  />
        })
});

const FavouritesNavigator  = createStackNavigator({
        Favourites : {screen : Favourites}
},{
        navigationOptions : ({ navigation } ) => ({
                headerStyle : {
                        backgroundColor : '#512DA8',
                        paddingLeft : 20
                },
                headerTintColor : '#fff',
                headerTitleStyle : {
                        color : '#BADA55'
                },
                headerLeft : <Icon name='menu'  size={24}
                color='white'
                onPress = {() => navigation.toggleDrawer()}  />
        })
});

const ContactNavigator  = createStackNavigator({
        Contact : {screen : Contact}
},{
        navigationOptions : ({ navigation } ) => ({
                headerStyle : {
                        backgroundColor : '#512DA8',
                        paddingLeft : 20
                },
                headerTintColor : '#fff',
                headerTitleStyle : {
                        color : '#BADA55'
                },
                headerLeft : <Icon name='menu' size={24}
                color='white'
                onPress = {() => navigation.toggleDrawer()}  />
        })
});

const AboutNavigator  = createStackNavigator({
        About : {screen : About}
},{
        navigationOptions :  ({ navigation } ) => ({
                headerStyle : {
                        backgroundColor : '#512DA8',
                        paddingLeft : 20
                },
                headerTintColor : '#fff',
                headerTitleStyle : {
                        color : '#BADA55'
                },
                headerLeft : <Icon name='menu' size={24}
                color='white'
              onPress = {() => navigation.toggleDrawer()}  />
        })
});


const MenuNavigator  = createStackNavigator({
        Menu : { screen : Menu,
                        navigationOptions : ({navigation} ) => ({
                                headerLeft : <Icon name='menu' size={24}
                                color='white'
                                onPress = {() => navigation.toggleDrawer()}  />
                        })                
        },
        DishDetail : {screen : DishDetail}
},{
        initialRouteName : 'Menu',
        navigationOptions : {
                headerStyle : {
                        backgroundColor : '#512DA8',
                        paddingLeft : 20
                },
                headerTintColor : '#fff',
                headerTitleStyle : {
                        color : '#BADA55'
                }
        }
});

const HomeNavigator = createStackNavigator({
       Home : { screen : Home}
},{
        navigationOptions : ({ navigation } ) => ({
                headerStyle : {
                        backgroundColor : '#512DA8',
                        paddingLeft : 20
                },
                headerTintColor : '#fff',
                headerTitleStyle : {
                        color : '#BADA55'
                },
                headerLeft : <Icon name='menu' size={24}
                color='white'
                onPress = {() => navigation.toggleDrawer()}  />
        })
});
const CustomDrawerContentComponent = (props) => (
        <ScrollView>
                <SafeAreaView style={styles.container}
                forceInset = {{top:'always',horizontal:'never' }}>
                        <View style={styles.drawerHeader} >
                                <View style ={{flex:1}}>
                                        <Image source ={require('./images/logo.png')}
                                        style={styles.DrawerImage} />
                                </View>
                                <View style = {{flex:2}} >
                                <Text style = {styles.DrawerHeaderText} >
                                        Shitty knockoff Restaurant                                
                                </Text> 
                                </View>
                        </View>
                        <DrawerItems {...props} />
                </SafeAreaView>
        </ScrollView>      
);

const MainNavigator = createDrawerNavigator({ 
        Login : {
                screen : LoginNavigator,
                navigationOptions : {
                        title : 'Login',
                        drawerLabel : 'Login',
                        drawerIcon : ({ tintColor }) => (
                                <Icon name='sign-in'
                                type = 'font-awesome'
                                size={24}
                                color={tintColor}
                                />
                        )
                }
        },
        Home : {
                screen : HomeNavigator,
                navigationOptions : {
                        title : 'Home',
                        drawerLabel : 'Home',
                        drawerIcon : ({ tintColor }) => (
                                <Icon name='home'
                                type = 'font-awesome'
                                size={24}
                                color={tintColor}
                                />
                        )
                }
        },
        Menu : {
                screen : MenuNavigator,
                navigationOptions : {
                        title : 'Menu',
                        drawerLabel : 'Menu',
                        drawerIcon : ({ tintColor }) => (
                                <Icon name='list'
                                type = 'font-awesome'
                                size={24}
                                color={tintColor}
                                />
                        )
        }},
        About : {
                        screen : AboutNavigator,
                        navigationOptions : {
                                title : 'About us',
                                drawerLabel : 'About',
                                drawerIcon : ({ tintColor }) => (
                                        <Icon name='info-circle'
                                        type = 'font-awesome'
                                        size={24}
                                        color={tintColor}
                                        />
                                 ) }
                },
        Contact : {
                        screen : ContactNavigator,
                        navigationOptions : {
                                title : 'Contact Us',
                                drawerLabel : 'Contact',
                                drawerIcon : ({ tintColor }) => (
                                        <Icon name='address-card'
                                        type = 'font-awesome'
                                        size={22}
                                        color={tintColor}
                                        />
                                )},
        },
        Reservation : {
                screen : ReservationNavigator,
                navigationOptions : {
                        title : 'Reserve Table',
                        drawerLabel : 'Reserve Table',
                        drawerIcon : ({ tintColor }) => (
                                <Icon name='cutlery'
                                type = 'font-awesome'
                                size={24}
                                color={tintColor}
                                />
                        )}},
        Favourites : {
                screen : FavouritesNavigator,
                navigationOptions : {
                        title : 'My Favourites',
                        drawerLabel : 'My Favourites',
                        drawerIcon : ({ tintColor }) => (
                                <Icon name='heart'
                                type = 'font-awesome'
                                size={24}
                                color={tintColor}
                                />
                        )},
}
},{
        initialRouteName : 'Home',
        drawerBackgroundColor : '#D1C4E9',
        contentComponent : CustomDrawerContentComponent
});

const styles = StyleSheet.create({
        container : {
                flex : 1,
        },
        drawerHeader : {
                backgroundColor : "#512DA8",
                height : 140,
                alignItems : 'center',
                justifyContent : 'center',
                flex : 1,
                flexDirection : 'column'
        },
        DrawerHeaderText : {
                color :  'white',
                fontSize : 20,
                fontWeight : 'bold',
        },
        DrawerImage : {
                margin : 20,
                width : 150,
        }
});
class Main extends Component {
        componentDidMount(){
                this.props.fetchDishes();
                this.props.fetchComments();
                this.props.fetchPromos();
                this.props.fetchLeaders();
                NetInfo.getConnectionInfo()
                        .then((connectionInfo) => {
                                ToastAndroid.show('Initial Network Connectivitity Type : ' + 
                                connectionInfo.type + ', effectiveType : ' + connectionInfo.effectiveType,
                                ToastAndroid.LONG)
                        });
                NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
        }

        componentWillUnmount(){
                NetInfo.removeEventListener('connectionChange',this.handleConnectivityChange);
        }
        handleConnectivityChange = (connectionInfo) => {
                switch(connectionInfo.type) {
                        case 'none' :
                                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                                break;
                        case 'wifi' :  
                                ToastAndroid.show('You are now connected to WiFi !', ToastAndroid.LONG);
                                break;
                        case 'cellular' : 
                                ToastAndroid.show('You are now connected to cellular !', ToastAndroid.LONG);
                                break;
                        case 'unknown':
                                ToastAndroid.show('You now have an unknown connection  !', ToastAndroid.LONG);
                                break;
                        default : 
                                break;
                }
        }
        render(){
                return(
                        <MainNavigator />
                );
        }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);