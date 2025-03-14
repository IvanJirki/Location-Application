import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Image } from 'react-native';

const CapitalsScreen = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = countries.filter(
      (item) =>
        item.name.common.toLowerCase().includes(text.toLowerCase()) ||
        item.capital?.[0]?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={styles.locationItem}>
        <Image source={{ uri: item.flags[0] }} style={styles.flag} />
        <Text style={styles.text}>
          {item.name.common}: {item.capital ? item.capital[0] : 'No capital'}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Countries and Capitals</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search countries or capitals"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <FlatList
        data={filteredCountries}
        keyExtractor={(item) => item.name.common}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  searchInput: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  flag: {
    width: 40,
    height: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default CapitalsScreen;
