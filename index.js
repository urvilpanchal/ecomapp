/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { store } from './Redux Files/Store';
import { Provider } from 'react-redux';

const RnRedux = () =>{
    return(
        <Provider store={store}>
            <App></App>
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () => RnRedux);
