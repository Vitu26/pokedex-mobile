import React from 'react';
import styled from 'styled-components/native';

type Props = {
  id: string;
  name: string;
  onPress: () => void;
  isSelected: boolean;
};

export const PokemonListItemCard = ({ id, name, onPress, isSelected }: Props) => {
  return (
    <CardButton onPress={onPress} style={{ backgroundColor: isSelected ? '#fcd36e' : '#fff' }}>
      <PokemonText>#{id} {name}</PokemonText>
    </CardButton>
  );
};

const CardButton = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
`;

const PokemonText = styled.Text`
  font-size: 16px;
  text-transform: capitalize;
`;
