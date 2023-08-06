import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import { Provider } from 'react-redux'
import store from './store'
import StackNavigator from './StackNavigator'

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  )
}

export default App