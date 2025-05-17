import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  type: string;
};

export const TypeChip = ({ type }: Props) => (
  <View style={[styles.chip, { backgroundColor: getTypeColor(type) }]}>
    <Text style={styles.text}>{type}</Text>
  </View>
);

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    fire: '#f08030',
    water: '#6890f0',
    grass: '#78c850',
    electric: '#f8d030',
    bug: '#a8b820',
    normal: '#a8a878',
    poison: '#a040a0',
    ground: '#e0c068',
    psychic: '#f85888',
    rock: '#b8a038',
    ghost: '#705898',
    dragon: '#7038f8',
    dark: '#705848',
    steel: '#b8b8d0',
    ice: '#98d8d8',
    fairy: '#f0b6bc',
  };
  return colors[type] || '#ccc';
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginVertical: 4,
    marginHorizontal: 4,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
