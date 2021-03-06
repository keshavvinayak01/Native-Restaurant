import React, {Component} from 'react';
import {Text,View} from 'react-native';
import { Card,Button,Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';
import { MailComposer } from 'expo';

class Contact extends Component {
        static navigationOptions = {
                title : 'Contact'
        }

        sendMail(){
                MailComposer.composeAsync({
                        recipients : ['confusion@food.net'],
                        subject : 'Enquiry',
                        body : 'To whom it may concern: '
                })
        }

        render(){
        return(
                <View>
                  <Animatable.View animation="fadeInDown" duration={2000}
                                        delay={600}>
                <Card 
                        title = "Contact Information"
                         >
                                <Text style={{margin: 5}}>121,Clear Water Bay Road </Text>
                                <Text style={{margin: 5}}>Clear Water Bay, Kowloon </Text>
                                <Text style={{margin: 5}}>HONG KONG} </Text>
                                <Text style={{margin: 5}}>Tel : +852 1234 5678 </Text>
                                <Text style={{margin: 5}}>Fax : +852 8765 4321 </Text>
                                <Text style={{margin: 5}}>Email : confusion@food.net </Text>
                                <Button
                                        title='Send email'
                                        buttonStyle={{ backgroundColor : '#512DA8'}}
                                        icon = {<Icon name='envelope-o' type='font-awesome' 
                                        color='white' />}
                                        onPress = {this.sendMail}
                                        />
                                </Card>
                        </Animatable.View>
                        </View>
        );
                }
}

export default Contact;