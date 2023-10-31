import React, { } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import product from './product';
import home from './home';
import Category from './category';
import Products from './catproducts';
import Cart from './cart';
import login from './login';
import signup from './signup';
import Profile from './profile';

const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <>

      <NavigationContainer >



        <Stack.Navigator initialRouteName='home' >

          <Stack.Screen name="home" component={home} />
          <Stack.Screen name='Product' component={product} />
          <Stack.Screen name='Products' component={Products} />
          <Stack.Screen name="Category" component={Category} />
          <Stack.Screen name='Cart' component={Cart} />
          <Stack.Screen name='login' component = {login} />
          <Stack.Screen name='register' component = {signup} />
          <Stack.Screen name='profile' component = {Profile} />
        </Stack.Navigator>

      </NavigationContainer>
    </>

  )



}

export default App;
