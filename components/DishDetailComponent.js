import React, {Component} from 'react';
import { View,Text,ScrollView,FlatList,StyleSheet,Modal,Button,TextInput} from 'react-native';
import { Card, Icon,Input,Rating}  from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavourite,postComment } from '../redux/ActionCreators';

const mapStateToProps = state => {
        return{
                dishes:state.dishes,
                comments : state.comments,
                favourites : state.favourites
        }
}
const mapDispatchToProps = dispatch => ({
        postFavourite : (dishId) => dispatch(postFavourite(dishId)),
        postComment : (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
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
                                <View style={{flex:4,flexDirection:'row',justifyContent:'center',
                        alignItems:'center'}}>
                                <Icon  
                                        style={{flex:2}}
                                        raised
                                        reverse
                                        name={ props.favourite ? 'heart' : 'heart-o' }
                                        type='font-awesome'
                                        color='#f50'
                                        onPress = {() => props.favourite ? console.log("Already Favourite ! "):
                                        props.onPress() } />
                                <Icon  
                                        style={{flex:2}}
                                        raised
                                        reverse
                                        name={ 'pencil' }
                                        type='font-awesome'
                                        color='#512DA8'
                                        onPress = {() => props.openReview()} 
                                         />
                                         
                                        </View>
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
                                <Text style = {{fontSize : 12}} > {'---' + item.author + ',  ' + item.date}</Text>
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
        constructor(props){
                super(props);
                this.state = {
                        author : '',
                        comment : '',
                        rating : 3.3,
                        ReviewModalOpen  :  false
                }
        }
        markFavourite(dishId){
                this.props.postFavourite(dishId);
        }
        static navigationOptions = {
                title : 'Dish Details'
        };
        TriggerReviewModal(){
                this.setState({
                        author : '',
                        comment : '',
                        rating : 3.3,
                        ReviewModalOpen : !this.state.ReviewModalOpen
                }) ;
        }
        handleReview(dishId){
                this.props.postComment(dishId,this.state.rating,
                        this.state.author,this.state.comment);
                this.TriggerReviewModal();
        }
        render(){
        const dishId = this.props.navigation.getParam('dishId','');
        return(
         <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                favourite = {this.props.favourites.some(el => el=== dishId)}
                openReview = {() => this.TriggerReviewModal()}
                onPress = {() => this.markFavourite(dishId)} />
                <RenderComments comments={
                        this.props.comments.comments.filter((comment) =>
                        comment.dishId === dishId)} />
                         <Modal 
                                        animationType = {'slide'}
                                        transparent = {false}
                                        visible = {this.state.ReviewModalOpen}
                                        onDismiss = {() => {
                                                this.TriggerReviewModal()}        
                                        }
                                        onRequestClose =  {() => {
                                                this.TriggerReviewModal()}        
                                        }
                                        >
                                                <Rating showRating
                                                fractions={1} startingValue={3.3}
                                                onFinishRating ={(value) => this.setState({rating:value})} />
                                        <View style={styles.searchSection}>
                                                <Icon
                                                        style={styles.searchIcon}
                                                        name={'user'}
                                                        type='font-awesome'
                                                        size={30}
                                                        color='gray'
                                                  />
                                        <TextInput
                                                style={{height:50}}
                                                placeholder="Author"
                                                onChangeText={(text) => this.setState({author:text})}
                                                />
                                                </View>
                                                <View style={styles.searchSection}>
                                                <Icon
                                                        style={styles.searchIcon}
                                                        name={'comment'}
                                                        type='font-awesome'
                                                        size={30}
                                                        color='gray'
                                                  />
                                                <TextInput
                                                style={{height: 50}}
                                                placeholder="Comment"
                                                onChangeText={(text) => this.setState({comment:text})}
                                                />
                                                </View>
                                                <View style={{margin:2}}>
                                                <Button 
                                                        title = 'Post Comment'
                                                        color='#512DA8'
                                                        onPress = {() => this.handleReview(dishId)}
                                                        style={{marginBottom:2}}
                                                        accessibilityLabel =
                                                        'Learn more about this purple button'
                                                />
                                                </View>
                                                <View style={{margin:2}} >
                                                <Button 
                                                        title = 'Cancel'
                                                        color='#512DA8'
                                                        onPress = {() => this.TriggerReviewModal()}
                                                        accessibilityLabel =
                                                        'Learn more about this purple button'
                                                />
                                                </View>
                        </Modal>
        </ScrollView>
        );
        
}}
const styles = StyleSheet.create({
        searchSection : {
                marginBottom : 5,
                flexDirection : 'row',
                height : 50
        },
        formButton : {
                alignItems : 'center',
                justifyContent : 'center',
                flexDirection : 'row',
        },
        formInputRow : {
                alignItems : 'center',
                flexDirection : 'row',
                margin: 2
        }
});
export default connect(mapStateToProps,mapDispatchToProps)(DIshDetail);