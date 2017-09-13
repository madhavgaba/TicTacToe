import {StackNavigator} from 'react-navigation';
import {AppRegistry} from 'react-native';
import HomeScreen from './HomeScreen';
import App from './Game';

const SimpleApp = StackNavigator({
    Home: {screen: HomeScreen},
    Game: {screen: App}
});

AppRegistry.registerComponent('TicTacToe', () => SimpleApp);

