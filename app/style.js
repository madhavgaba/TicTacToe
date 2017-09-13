import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';

const styles = StyleSheet.create({
    imageStyle:{
        height: height(20),
        width: height(20),
        padding: height(0.5)
    },
    start:{
        height: height(10),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textStyle:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: height(4)
    },
    button:{
        height: height(15),
        width: width(40)
    },
    turn:{
        marginTop: height(4),
        marginLeft: width(10),
        flexDirection:'row',
        alignItems: 'center',
    },
    tictac:{
        height: height(65)
    },
    home:{
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#17f808'
    }
});

export default styles;