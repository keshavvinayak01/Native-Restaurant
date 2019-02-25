import React, {Component} from 'react';
import Menu from  './MenuComponent';
import Home from './HomeComponent';
import {DishDetail} from './components/DishDetailComponent';
import {View} from 'react-native';
import { createStackNavigator } from 'react-navigation';

const MenuNavigator  = createStackNavigator({
        Menu : { screen : Menu},
        DishDetail : {screen : DishDetail}
},{
        initialRouteName : 'Menu',
        navigationOptions : {
                headerStyle : {
                        backgroundColor : '#512DA8'
                },
                headerTintColor : '#fff',
                headerTitleStyle : {
                        color : '#BADA55'
                }
        }
})
const HomeNavigator = createStackNavigator({
       Home : { screen : Home}
},{
        navigationOptions : {
                headerStyle : {
                        backgroundColor : '#512DA8'
                },
                headerTintColor : '#fff',
                headerTitleStyle : {
                        color : '#BADA55'
                }
        }
});

const MainNavigator = createDrawNavigator({
        Home : {
                screen : HomeNavigator,
                navigationOptions : {
                        title : 'Home',
                        drawerLabel : 'Home'
                }
        },
        Menu : {
                screen : MenuNavigator,
                navigationOptions : {
                        title : 'Menu',
                        drawerLabel : 'Menu'
                }
},{
        drawerBackgroundColor : '#D1C4E9'
});

class Main extends Component { 
        render(){
                return(
                        <View style={{flex:1,
                        paddingTop : Platform.Os==='ios' ? 0 : Expo.Constants.statusBarHeight}}>
                                <MainNavigator />
                        </View>
                                 );
        }
}
export default Main;