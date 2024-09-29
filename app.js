import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import ShoppingListScreen from './screens/ShoppingListScreen';
import { ShoppingListProvider } from './context/ShoppingListContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ShoppingListProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Velkommen' }} />
          <Stack.Screen name="AddItem" component={AddItemScreen} options={{ title: 'Tilføj Vare' }} />
          <Stack.Screen name="ShoppingList" component={ShoppingListScreen} options={{ title: 'Indkøbsliste' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </ShoppingListProvider>
  );
}
