import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import { useNavigation } from '@react-navigation/native';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [newLocation, setNewLocation] = useState({
    name: '',
    review: '',
    rating: 0,  
  });

  const navigation = useNavigation();

  useEffect(() => {
    setLocations([
      { id: '1', name: 'New York', lat: 40.7128, lng: -74.0060, review: 'Great city!', rating: 5 },
      { id: '2', name: 'Paris', lat: 48.8566, lng: 2.3522, review: 'Romantic city!', rating: 4 },
      { id: '3', name: 'London', lat: 51.5074, lng: -0.1278, review: 'Historical city!', rating: 4 },
    ]);
  }, []);

  const handleLocationSelect = (location) => {
    navigation.navigate('Map', { location: { latitude: location.lat, longitude: location.lng } });
  };

  const handleAddLocation = () => {
    if (newLocation.name && newLocation.review && newLocation.rating > 0) {
      setLocations([
        ...locations,
        { 
          id: (locations.length + 1).toString(),
          name: newLocation.name,
          review: newLocation.review,
          rating: newLocation.rating,
          lat: 0,  
          lng: 0,  
        },
      ]);
      setIsModalVisible(false);
      setNewLocation({ name: '', review: '', rating: 0 });
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.locationItem} onPress={() => handleLocationSelect(item)}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.text}>{item.review}</Text>
      <View style={styles.ratingContainer}>
        {[...Array(item.rating)].map((_, index) => (
          <Ionicons key={index} name="star" size={20} color="#FFD700" />
        ))}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locations</Text>
      <TouchableOpacity
        style={styles.addLocationButton}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={styles.addLocationButtonText}>Add Location</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add New Location</Text>
          <TextInput
            style={styles.input}
            placeholder="City Name"
            value={newLocation.name}
            onChangeText={(text) => setNewLocation({ ...newLocation, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Review"
            value={newLocation.review}
            onChangeText={(text) => setNewLocation({ ...newLocation, review: text })}
          />
          <View style={styles.ratingContainer}>
            <Text style={styles.text}>Rating: </Text>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= newLocation.rating ? 'star' : 'star-outline'}
                size={30}
                color="#FFD700"
                onPress={() => setNewLocation({ ...newLocation, rating: star })}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleAddLocation}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  addLocationButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  addLocationButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationItem: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    width: '100%',
  },
  text: { fontSize: 18 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});

export default Locations;
