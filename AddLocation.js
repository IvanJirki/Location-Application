import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const AddLocationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const handleAddLocation = async () => {
    if (name && description && rating > 0) {
      try {
        const db = firebase.firestore();
        const userId = firebase.auth().currentUser.uid;

        const newLocation = {
          name,
          description,
          rating,
          userId,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };

        await db.collection('locations').add(newLocation);

        Alert.alert('Success', 'Location added successfully');
        
        setName('');
        setDescription('');
        setRating(0);
        
        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Failed to add location: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields');
    }
  };

  const handleStarPress = (starIndex) => {
    setRating(starIndex);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableWithoutFeedback key={i} onPress={() => handleStarPress(i)}>
          <Text style={[styles.star, i <= rating ? styles.filledStar : styles.emptyStar]}>
            ★
          </Text>
        </TouchableWithoutFeedback>
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Location Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Rating</Text>
      <View style={styles.starsContainer}>{renderStars()}</View>
      <TouchableOpacity style={styles.button} onPress={handleAddLocation}>
        <Text style={styles.buttonText}>Add Location</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '80%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  starsContainer: { flexDirection: 'row', marginVertical: 10 },
  star: { fontSize: 40, marginHorizontal: 5 },
  filledStar: { color: '#FFD700' }, 
  emptyStar: { color: '#D3D3D3' }, 
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default AddLocationScreen;
