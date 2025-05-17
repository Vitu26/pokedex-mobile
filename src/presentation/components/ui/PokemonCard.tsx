import React from 'react';
import styled from 'styled-components/native';

type Props = {
  id: string;
  name: string;
  onPress: () => void;
};

export const PokemonCard = ({ id, name, onPress }: Props) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <CardContainer onPress={onPress}>
      <PokemonImage source={{ uri: imageUrl }} />
      <PokemonName>#{id} - {name}</PokemonName>
    </CardContainer>
  );
};

const CardContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px 8px;
  margin-bottom: 8px;
  background-color: #f0f4f7;
  border-radius: 12px;
  elevation: 1;
`;

const PokemonImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-right: 12px;
`;

const PokemonName = styled.Text`
  font-size: 18px;
  text-transform: capitalize;
`;
