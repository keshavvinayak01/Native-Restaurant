import React, {Component} from 'react';
import { View,Text,ScrollView,FlatList} from 'react-native';
import { Card, Icon}  from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavourite } from '../redux/ActionCreators';
const mapStateToProps = state => {
        return{
                dishes:state.dishes,
                comments : state.comments,
                favourites : state.favourites
        }
}
const mapDispatchToProps = dispatch => ({
        postFavourite : (dishId) => dispatch(postFavourite(dishId))
});

function RenderDish(props){
        const dish = props.dish;

        if(dish != null){
                return(
                        <Card
                                featuredTitle={dish.name}
                                image = {{uri : baseUrl + dish.image}}
                        >
                                <Text style={{margin:10}}>
                                        {dish.description}
                                </Text>
                                <Icon  
                                        raised
                                        reverse
                                        name={ props.favourite ? 'heart' : 'heart-o' }
                                        type='font-awesome'
                                        color='#f50'
                                        onPress = {() => props.favourite ? console.log("Already Favourite ! ") : 
                                        props.onPress() } />
                        </Card>
                ); }
                else{
                        return(<View></View>);
                }
        }

function RenderComments(props){
        const comments = props.comments;

        const renderCommentItem = ({item,index}) => {
                return(
                        <View key = {index} style={{margin:10} }>
                                <Text style = {{fontSize : 14}}>{item.comment}</Text>
                                <Text style = {{fontSize : 12}} >{item.rating}  Stars</Text>
                                <Text style = {{fontSize : 12}} > {'---' + item.author + '. ' + item.date}  
                                Stars</Text>
                        </View>
                );
        }
        return(
                <Card title="Comments">
                        <FlatList
                        data={comments}
                        renderItem = {renderCommentItem}
                        keyExtractor = {item => item.id.toString()}
                        />
                </Card>
        )
}

class DIshDetail extends Component{
        markFavourite(dishId){
                this.props.postFavourite(dishId);
        }
        static navigationOptions = {
                title : 'Dish Details'
        };

        render(){
        const dishId = this.props.navigation.getParam('dishId','');

        return(
         <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                favourite = {this.state.favourites.some(el => el=== dishId)}
                onPress = {() => this.markFavourite(dishId)} />
                <RenderComments comments={
                        this.props.comments.comments.filter((comment) =>
                        comment.dishId===dishId)} />
        </ScrollView>
        );
        
}
}
export default connect(mapStateToProps,mapDispatchToProps)(DIshDetail);