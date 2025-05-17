import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { getFavoritesUseCase } from '../../src/application/useCases'; // agora via use case
import { Pokemon } from '../../src/domain/models/Pokemon';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      async function loadFavorites() {
        try {
          const pokemons = await getFavoritesUseCase.execute(); // use case
          setFavorites(pokemons);
        } catch (err) {
          console.error('Erro ao carregar favoritos:', err);
        } finally {
          setLoading(false);
        }
      }

      loadFavorites();
    }, [])
  );

  if (loading) {
    return (
      <Centered>
        <ActivityIndicator size="large" color="#5F78EE" />
        <LoadingText>Carregando favoritos...</LoadingText>
      </Centered>
    );
  }

  if (favorites.length === 0) {
    return (
      <Centered>
        <EmptyText>Nenhum Pokémon favoritado.</EmptyText>
      </Centered>
    );
  }

// (substitua tudo abaixo do return do componente)

return (
  <Container>
    <Title>Favoritos</Title>
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <Separator />}
      contentContainerStyle={{ paddingBottom: 16 }}
      renderItem={({ item }) => {
        const imageUrl = item.sprites.other['official-artwork'].front_default;

        return (
          <Card onPress={() => router.push(`/PokemonDetailsScreen?name=${item.name}`)}>
            <PokemonImage source={{ uri: imageUrl }} />
            <Info>
              <PokemonName>#{item.id} {item.name}</PokemonName>
            </Info>
          </Card>
        );
      }}
    />
  </Container>
);

}

// ========== Styled Components ==========
const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #eaf7ed;
  padding: 16px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
  color: #2e7d32;
`;

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #eaf7ed;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: #666;
  margin-top: 12px;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #555;
  padding: 24px;
  text-align: center;
`;

const Card = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  padding: 12px;
  border-radius: 12px;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 8px;
  elevation: 2;
`;

const PokemonImage = styled.Image`
  width: 64px;
  height: 64px;
  margin-right: 16px;
`;

const Info = styled.View`
  flex-direction: column;
`;

const PokemonName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
  color: #2e7d32;
`;

const Separator = styled.View`
  height: 12px;
`;
