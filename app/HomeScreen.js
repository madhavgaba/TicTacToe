import React,{Component} from 'react';
import  { AppRegistry,StyleSheet,View,Text,Button, TouchableOpacity,Alert,Image,BackAndroid} from 'react-native';
import {StackNavigator} from 'react-navigation';
import styles from './style.js';
import {height, width} from 'react-native-dimension';

export default class HomeScreen extends Component{
    static navigationOptions = {
        title: 'Tic Tac Toe',
    };
    exit(){
        Alert.alert(
            'Exit App',
            'Do you want to exit',
            [
                {text: 'Yes', onPress: () => BackAndroid.exitApp()},
                {text: 'no'}
            ]
        )
    }
    render(){
        const {navigate} = this.props.navigation;
        return(
            <View style={styles.home}>
                <Image source={require('../tictac.gif')} style={styles.tictac} />
            <View style={styles.button}>
                <View style={{height: height(1)}}/>
                <Button 
                    onPress={() => navigate('Game')}
                    title="Start Game"
                />  
                <View style={{height: height(1)}}/>
                <Button 
                    onPress={this.exit.bind(this)}
                    title="Exit Game"
                /> 
            </View>
            </View>
        )
    }
}