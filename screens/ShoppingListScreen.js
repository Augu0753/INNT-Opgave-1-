import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ShoppingListContext } from '../context/ShoppingListContext';

export default function ShoppingListScreen() {
  const { items } = useContext(ShoppingListContext);

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>Ingen varer tilføjet endnu</Text>
      ) : (
        <FlatList
          data={items}
          renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
