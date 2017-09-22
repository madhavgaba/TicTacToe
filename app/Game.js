import React,{Component} from 'react';
import  { AppRegistry,StyleSheet,View,Text,Button, TouchableOpacity,Alert,Image,BackAndroid} from 'react-native';
import {height, width} from 'react-native-dimension';
import {StackNavigator} from 'react-navigation';
import styles from './style';
console.disableYellowBox = true;
export default class App extends Component{

chance(){
    let isStart = this.state.isStart;
    if(isStart){
        Alert.alert("Game already running!!");
        return;
    }
    Alert.alert(
        'Choose the turn',
        'Do you want the first turn?',
        [
            {text: 'No', onPress: ()=>this.setState({user: 2,comp: 1, isStart: true})},
            {text: 'Yes', onPress: ()=>this.setState({user: 1,comp: 2, isStart: true})}
        ]
    )
}
check(){
    let pic = this.state.pic;
    let comp = this.state.comp;
    let user = this.state.user;
    for(let i=1; i<=7; i+=3){
        if(pic[i] == pic[i+1] && pic[i+1] == pic[i+2]){
            if(pic[i] == require('../zero.jpg') && comp == 2){
                return 10;
            }
            else if(pic[i] == require('../cross.png') && comp == 1){
                return 10;
            }
            if(pic[i] == require('../zero.jpg') && user == 2){
                return -10;
            }
            if(pic[i] == require('../cross.png') && user == 1){
                return -10;
            }
        }
    }
    for(let i=1;i<=3;i++){
        if(pic[i] == pic[i+3] && pic[i+3] == pic[i+6]){
            if(pic[i] == require('../zero.jpg') && comp == 2){
                return 10;
            }
            else if(pic[i] == require('../cross.png') && comp == 1){
                return 10;
            }
            if(pic[i] == require('../zero.jpg') && user == 2){
                return -10;
            }
            if(pic[i] == require('../cross.png') && user == 1){
                return -10;
            }
        }
    }
    if(pic[1] == pic[5] && pic[5] == pic[9]){
        if(pic[1] == require('../zero.jpg') && comp == 2){
                return 10;
            }
            else if(pic[1] == require('../cross.png') && comp == 1){
                return 10;
            }
            if(pic[1] == require('../zero.jpg') && user == 2){
                return -10;
            }
            if(pic[1] == require('../cross.png') && user == 1){
                return -10;
            }
    }
    if(pic[3] == pic[5] && pic[5] == pic[7]){
    if(pic[3] == require('../zero.jpg') && comp == 2){
                return 10;
            }
            else if(pic[3] == require('../cross.png') && comp == 1){
                return 10;
            }
            if(pic[3] == require('../zero.jpg') && user == 2){
                return -10;
            }
            if(pic[3] == require('../cross.png') && user == 1){
                return -10;
            }
    }
}
minimax(isComp){
    let score = this.check();
    let pic = this.state.pic;
    let user = this.state.user;
    if(score == 10){
        return 10;
    }
    if(score == -10){
        return -10;
    }
    if(this.noMoves() == true){
        return 0;
    }
    if(isComp == true){
        let comp = -1000;
        for(let i=1;i<=9;i++){
                if(pic[i] == require('../white.jpg')){
                    if(user == 1){
                        pic[i] = require('../zero.jpg');
                    }
                    else{
                        pic[i] = require('../cross.png');
                    }
                    comp = Math.max(comp, this.minimax(false));
                    pic[i] = require('../white.jpg'); 
            }
        }
        return comp;
    }
    else{
        let usr = 1000;
        for(let i=1;i<=9;i++){
                if(pic[i] == require('../white.jpg')){
                    if(user == 1){
                        pic[i] = require('../cross.png');
                    }
                    else{
                        pic[i] = require('../zero.jpg');
                    }
                    usr = Math.min(usr, this.minimax(true));
                    pic[i] = require('../white.jpg'); 
            }
        }
        return usr;
    }
}   
noMoves(){
    let pic = this.state.pic;
    for(let i=1;i<=9;i++){
        if(pic[i] == require('../white.jpg')){
            return false;
        }
    }
    return true;
}
bestMove(){
    if(this.state.turns == 1){
            return 1;
    }
    let best = -1000, index=-1;
    let pic = this.state.pic;
    let user = this.state.user;
    for(let i=1;i<=9;i++){
        if(pic[i] == require('../white.jpg')){
           if(user == 1){
                pic[i] = require('../zero.jpg');
            }
            else{
                pic[i] = require('../cross.png');
            }
            let val = this.minimax(false);
            pic[i] = require('../white.jpg'); 
            if(val > best){
                best = val;
                index = i;
            }
        }
    }
    return index;
}
compMove(){
    let pos = this.bestMove();
    let user = this.state.user;
    let win = this.state.win;
    let board = this.state.board;
    let pic = this.state.pic;
            if(user == 1){
                pic[pos] = require('../zero.jpg');
            }
            else{
                pic[pos] = require('../cross.png');
            }
            let row = Math.floor((pos-1)/3),cpy=[];
            for(let i=1;i<=3;i++){
                cpy.push(
                    <TouchableOpacity key={row*3+i}  onPress={() => this.userInput(row*3+i) } style={{padding: width(0.5)}}>
                        <Image source={pic[row*3+i]} style={styles.imageStyle}/>
                    </TouchableOpacity>
                )
            }
            board[row] = (<View key={row} style={{flexDirection: 'row',backgroundColor: 'black'}}>{cpy}</View>)
            let score = this.check();
            if(score == 10){
                win = true;
            }
            this.setState({board: board, pic: pic, win: win});
            if(score == 10){
                setTimeout( () => {
                    Alert.alert("Computer Wins!!");
                },600);
            }
}
userInput(index){
    let board = this.state.board;
    let pic = this.state.pic;
    let user = this.state.user;
    let win = this.state.win;
    let isStart = this.state.isStart;
    if(!isStart){
        Alert.alert("Choose your turn first!");
        return;
    }
    if(pic[index] != require('../white.jpg')){
        Alert.alert('Invalid Move!');
        return;
    }
    if(win){
        Alert.alert("Game already Ended!!");
        return;
    }
    else{
            this.state.turns += 1;
            if(user==1){
                pic[index] = require('../cross.png');
            }
            else{
                pic[index] = require('../zero.jpg');
            }
            let row = Math.floor((index-1)/3),cpy=[];
            for(let i=1;i<=3;i++){
                cpy.push(
                    <TouchableOpacity key={i}  onPress={() => this.userInput(row*3+i)} style={{padding: width(0.5)}}>
                        <Image source={pic[row*3+i]} style={styles.imageStyle}/>
                    </TouchableOpacity>
                )
            }
            board[row] = (<View key={row} style={{flexDirection: 'row', backgroundColor: 'black'}}>{cpy}</View>)
            let score = this.check();
            if(score == -10){
                win = true;
                Alert.alert("You win!!");
            }
            this.setState({board: board, pic: pic, win: win});
    }
}
restart(){
    const {navigate} = this.props.navigation;
    Alert.alert(
        'Restart Game',
        'Do you want to restart?',
        [
            {text: 'Yes', onPress: () => this.setState({pic: [], board: [], flag: 1, user: 0, comp: 0, turns: 1, isStart: false, win: false })},
            {text: 'No'},
        ]
    )
}

    constructor(){
        super();
        this.state = {
            pic: [], board: [], flag: 1, user: 0, comp: 0, turns: 1, isStart: false, win: false   
        }
        this.check = this.check.bind(this);
        this.minimax = this.minimax.bind(this);
        this.noMoves = this.noMoves.bind(this);
        this.userInput = this.userInput.bind(this);
        this.bestMove = this.bestMove.bind(this);
        this.chance = this.chance.bind(this);
        this.compMove = this.compMove.bind(this);
        this.restart = this.restart.bind(this);
    }
static navigationOptions = {
    title: 'Tic Tac Toe',
};

render()
    {
        const {navigate} = this.props.navigation;
        let turn = this.state.turns;
        let user = this.state.user;
        let comp = this.state.comp;
        let isStart = this.state.isStart;
        if(turn == 10 && this.state.win == false){
            setTimeout(() => {
                Alert.alert("Game Draw!!");
            },500);
        }
        if(user == 1 && isStart){
            if(turn==2 || turn == 4 || turn == 6 || turn ==8){
                setTimeout( () => {
                    this.compMove();
                },800);
                this.state.turns+=1;
            }
        }
        else if(comp == 1 && isStart){
            if(turn == 1 || turn == 3 || turn == 5 || turn == 7 || turn == 9){
                if(turn == 1){
                        this.compMove();
                }
                else{
                    setTimeout( () => {
                        this.compMove();
                    },800);
                }
                this.state.turns += 1;
            }
        }
        if(this.state.flag==1){
            let pic = this.state.pic;
            for(let i=1;i<=10;i++){
                pic.push(require('../white.jpg'));
            }
            let board = this.state.board;
            for(let i=0;i<3;i++){
                var temp = [];
                for(let j=1;j<=3;j++){
                    temp.push(
                        <TouchableOpacity key={i*3+j} onPress = {() => this.userInput(i*3+j)} style={{padding: width(0.5)}}>
                                <Image source={pic[i*3+j]} style={styles.imageStyle}/>
                        </TouchableOpacity>
                    )
                }
                board.push(<View key={i} style={{flexDirection: 'row',backgroundColor: 'black'}}>{temp}</View>)
            }
            this.state.flag=0;
        }
        return(
            <View style={{flex: 1, backgroundColor: '#ff2700'}}>
                <View style={styles.turn}>
                <Button
                    onPress={this.chance}
                    title="Choose Turn"
                />
                <View style={{width: width(21)}} />
                <Button
                    onPress={this.restart}
                    title="Restart"
                />
                </View>
                <View style={{marginTop: height(5)}}>
                    {this.state.board}
                </View>
            </View>
        );
    }
}