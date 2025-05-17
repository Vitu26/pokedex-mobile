import { getAllFavorites } from '@/infra/storage/favorites';
import { AntDesign } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { InfoCard } from '../src/presentation/components/InfoCard';
import { Section } from '../src/presentation/components/Section';
import { StatBar } from '../src/presentation/components/ui/StatBar';
import { useFavorites } from '../src/presentation/context/FavoritesContext';
import { getPokemonByName } from '../src/infra/services/pokemonService';
import { TypeBadge } from '../src/presentation/components/TypeBadge';
import { bulbasaurTheme } from '../src/shared/constants/theme';

export default function PokemonDetailsScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const { data: pokemon, isLoading, isError } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => getPokemonByName(name!),
    enabled: !!name,
  });

  const { isFavorite, toggle } = useFavorites();
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (pokemon) {
      setFavorite(isFavorite(pokemon.name));
    }
  }, [pokemon, isFavorite]);

  const handleToggleFavorite = async () => {
    if (pokemon) {
      await toggle(pokemon.name);
      const updatedFavorites = await getAllFavorites();
      setFavorite(updatedFavorites.includes(pokemon.name));
    }
  };



  if (isLoading) return <Centered><LoadingText>Carregando...</LoadingText></Centered>;
  if (isError || !pokemon) return <Centered><LoadingText>Erro ao carregar dados.</LoadingText></Centered>;

  return (
    <Container>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Centered>
          <PokemonImage source={{ uri: pokemon.sprites.other['official-artwork'].front_default }} />
          <NameRow>
            <PokemonName>#{pokemon.id} {pokemon.name}</PokemonName>
            <Pressable onPress={handleToggleFavorite}>
              <AntDesign name={favorite ? 'heart' : 'hearto'} size={24} color={favorite ? 'red' : 'gray'} />
            </Pressable>
          </NameRow>
        </Centered>

        <InfoRow>
          <InfoCard label="Altura" value={`${pokemon.height / 10} m`} />
          <InfoCard label="Peso" value={`${pokemon.weight / 10} kg`} />
        </InfoRow>


          <Row>
            {pokemon.types.map((t: any) => (
              <TypeBadge key={t.type.name} type={t.type.name} />
            ))}
          </Row>


        <Section title="Habilidades">
          {pokemon.abilities.map((a: any) => (
            <AbilityText key={a.ability.name}>- {a.ability.name}</AbilityText>
          ))}
        </Section>

        <Section title="Status Base">
          {pokemon.stats.map((s: any) => (
            <StatBar key={s.stat.name} label={s.stat.name} value={s.base_stat} />
          ))}
        </Section>
      </ScrollView>
    </Container>
  );
}

// ======== HEADER OPTIONS FOR EXPO-ROUTER STACK ========
PokemonDetailsScreen.options = {
  title: 'Detalhes do Pokémon',
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: bulbasaurTheme.colors.background,
    elevation: 0,          // Android
    shadowOpacity: 0,      // iOS
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
};

// ========== STYLED COMPONENTS ==========
const Container = styled.View`
  flex: 1;
  background-color: ${bulbasaurTheme.colors.background};
`;

const PokemonImage = styled.Image`
  width: 200px;
  height: 200px;
`;

const Centered = styled.View`
  align-items: center;
  margin-bottom: 12px;
`;

const NameRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const PokemonName = styled.Text`
  font-size: 28px;
  font-weight: bold;
  text-transform: capitalize;
  color: #000;
`;

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
   justify-content: center;
`;

const AbilityText = styled.Text`
  font-size: 14px;
  text-transform: capitalize;
  margin-bottom: 4px;
`;

const LoadingText = styled.Text`
  font-size: 16px;
  color: #555;
  text-align: center;
`;
