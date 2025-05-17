import { useRouter } from 'expo-router';
import React from 'react';
import styled from 'styled-components/native';
import { bulbasaurTheme } from '../../shared/constants/theme';

type Props = {
  pokemon: any;
};

export const PokemonDetailsCard = ({ pokemon }: Props) => {
  const router = useRouter();

  if (!pokemon) {
    return <FallbackText>Carregando dados do Pokémon...</FallbackText>;
  }

  const imageUrl = pokemon?.sprites?.other?.['official-artwork']?.front_default;
  const types = pokemon.types?.map((t: any) => t.type.name).join(', ') ?? '-';
  const height = `${pokemon.height / 10} m`;
  const weight = `${pokemon.weight / 10} kg`;
  const ability = pokemon.abilities?.[0]?.ability?.name ?? '-';

  const handlePress = () => {
    router.push(`/PokemonDetailsScreen?name=${pokemon.name}`);
  };

  return (
    <Wrapper>
      <PressableImage onPress={handlePress}>
        <PokemonImage source={{ uri: imageUrl }} />
      </PressableImage>

      <PokemonName>#{pokemon.id} {pokemon.name}</PokemonName>
      <InfoText>Tipo: {types}</InfoText>
      <InfoText>Altura: {height}</InfoText>
      <InfoText>Peso: {weight}</InfoText>
      <InfoText>Habilidade: {ability}</InfoText>
    </Wrapper>
  );
};

const Wrapper = styled.View`
  align-items: center;
  margin: 8px 0;
`;

const FallbackText = styled.Text`
  text-align: center;
  margin-top: 24px;
  font-size: 16px;
  color: ${bulbasaurTheme.colors.placeholder};
`;

const PressableImage = styled.TouchableOpacity`
  margin-bottom: 12px;
`;

const PokemonImage = styled.Image`
  width: 160px;
  height: 160px;
`;

const PokemonName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-transform: capitalize;
  margin-bottom: 8px;
  color: ${bulbasaurTheme.colors.background};
`;

const InfoText = styled.Text`
  font-size: 15px;
  color: ${bulbasaurTheme.colors.text};
  margin-bottom: 2px;
`;
