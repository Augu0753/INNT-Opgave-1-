import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function HomeScreen({ navigation }) {

  const GroceryProduct = () => {
    const [productInfo, setProductInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchProductInfo = async () => {
        try {
          const response = await fetch('http://www.madopskrifter.nu/webservices/iphone/iphoneclientservice.svc/GetPopularRecipes/0');
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setProductInfo(data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProductInfo();
    }, []);
  
    if (loading) return <ActivityIndicator size="large" color="#ff6347" />;
    if (error) return <Text style={styles.errorText}>Error: {error.message}</Text>;

    // Render liste med billeder og navne
    const renderProductItem = ({ item }) => (
      <View style={styles.productBox}>
        <Image source={{ uri: item[2] }} style={styles.productImage} />
        <Text style={styles.productName}>{item[1]}</Text>
      </View>
    );

    return (
      <View style={styles.productListContainer}>
        <Text style={styles.header}>Ideer til aftensmad</Text>
        <FlatList
          data={productInfo}
          renderItem={renderProductItem}
          keyExtractor={(item) => item[0].toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Velkommen til Indkøbslisten</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ShoppingList')}>
        <Text style={styles.buttonText}>Gå til Indkøbsliste</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddItem')}>
        <Text style={styles.buttonText}>Tilføj Vare</Text>
      </TouchableOpacity>
      <GroceryProduct />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',  // Lys baggrund for et rent udseende
  },
  title: {
    fontSize: 28,  // Større skriftstørrelse for titlen
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff6347',  // Bruger en lys farve til knapper for at tiltrække opmærksomhed
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  productListContainer: {
    width: '100%',
    marginTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  productBox: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 120,  // Større billede for at fremhæve produkterne
    height: 120,
    borderRadius: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 10,
    color: '#555',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
  },
});
