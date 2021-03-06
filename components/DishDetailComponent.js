import React, {Component} from 'react';
import { View,Text,ScrollView,FlatList,StyleSheet,Modal,Button,TextInput,Alert,PanResponder,Share} from 'react-native';
import { Card, Icon,Input,Rating}  from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { postFavourite,postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';



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
        const recognizeDrag = ({moveX,moveY,dx,dy}) => {
                if(dx < -200)
                        return true;
                else
                        return false;
        };
        const recognizeComment = ({moveX,moveY,dx,dy}) => {
                if(dx > 200)
                        return true;
                else
                        return false;
        };
        handleViewRef = ref => this.view = ref;

        const panResponder = PanResponder.create({
                onStartShouldSetPanResponder : (e,gestureState) => {
                        return true;
                },
                onPanResponderGrant : () => {
                        this.view.rubberBand(1000).then(endState => console.log(endState.finished ?  'finished' : 
                        'not finished'))
                },
                onPanResponderEnd : (e,gestureState) => {
                        if(recognizeDrag(gestureState)){
                                Alert.alert(
                                        'Add to Favourites ? ',
                                        'Are you sure you wish to add  ' + dish.name + ' to favourites ?',
                                        [
                                                {
                                                        text : 'Cancel',
                                                        onPress : () => console.log('Cancel Pressed'),
                                                        style : 'cancel'
                                                },
                                                {
                                                        text : 'OK',
                                                        onPress : () => props.favourite ? console.log("Already Favourite ! "):
                                                        props.onPress()
                                                }
                                        ],
                                        { cancelable : false}
                                )
                        }
                        else if(recognizeComment(gestureState)){
                                props.openReview();
                        }
                }
        });
        const shareDish = (title,message,url) => {
                Share.share({
                        title : title,
                        message : title + ': ' + message + ' ' + url,
                        url : url
                }, {
                        dialogTitle : 'Share ' + title
                });
        }
        if(dish != null){
                return(
                        <Animatable.View animation="fadeInDown" duration={2000}
                                        delay={600} {...panResponder.panHandlers}
                                        ref={this.handleViewRef} >
                        <Card
                                featuredTitle={dish.name}
                                image = {{uri : baseUrl + dish.image}}
                        >
                                <Text style={{margin:10}}>
                                        {dish.description}
                                </Text>
                                <View style={{flex:6,flexDirection:'row',justifyContent:'center',
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
                                <Icon  
                                        style={{flex:2}}
                                        raised
                                        reverse
                                        name={ 'share' }
                                        type='font-awesome'
                                        color='#51D2A8'
                                        onPress = {() => shareDish(dish.name,dish.description,baseUrl + dish.image)} 
                                         />
                                         
                                        </View>
                        </Card>
                        </Animatable.View>
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
                <Animatable.View animation="fadeInUp" duration={2000}
                                        delay={600}>
                        <Card title="Comments">
                                <FlatList
                                data={comments}
                                renderItem = {renderCommentItem}
                                keyExtractor = {item => item.id.toString()}
                                />
                        </Card>
                </Animatable.View>
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