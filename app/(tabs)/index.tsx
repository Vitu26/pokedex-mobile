import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { PokemonDetailsCard } from '../../src/presentation/components/PokemonDetailsCard';
import { PokemonListItemCard } from '../../src/presentation/components/PokemonListItemCard';
import { bulbasaurTheme } from '../../src/shared/constants/theme';

import {
  getPokemonByNameUseCase,
  getPokemonsUseCase
} from '../../src/application/useCases';
import { Pokemon } from '../../src/domain/models/Pokemon';

export default function PokedexScreen() {
  const [search, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState<Pokemon[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon | null>(null);

  const { data: pokemonList, isLoading } = useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemonsUseCase.execute(151, 0),
  });

  useEffect(() => {
    if (selectedPokemon) {
      getPokemonByNameUseCase.execute(selectedPokemon.name).then(setPokemonDetails);
    }
  }, [selectedPokemon]);

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) return;

    const applyFilters = async () => {
      const allData = await Promise.all(
        pokemonList.map((p) => getPokemonByNameUseCase.execute(p.name))
      );

      const lowerSearch = search.toLowerCase();

      const filtered = allData.filter((pokemon) => {
        const nameMatch = pokemon.name.toLowerCase().includes(lowerSearch);
        const idMatch = pokemon.id.toString() === lowerSearch;
        const typeMatch = pokemon.types.some((t) =>
          t.type.name.toLowerCase().includes(lowerSearch)
        );

        return lowerSearch === '' || nameMatch || idMatch || typeMatch;
      });

      setFilteredList(filtered);
    };

    applyFilters();
  }, [search, pokemonList]);

  return (
    <Container>
      <SearchBarContainer>
        <StyledInput
          placeholder="Buscar por nome, número ou tipo"
          value={search}
          onChangeText={setSearch}
        />
      </SearchBarContainer>

      <Content>
        <LeftPanel>
          {isLoading ? (
            <ActivityIndicator size="large" />
          ) : (
            <FlatList
              data={filteredList.length > 0 ? filteredList : pokemonList}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <PokemonListItemCard
                  id={item.id.toString()}
                  name={item.name}
                  isSelected={item.name === selectedPokemon?.name}
                  onPress={() => setSelectedPokemon(item)}
                />
              )}
            />
          )}
        </LeftPanel>

        <RightPanel>
          {pokemonDetails ? (
            <PokemonDetailsCard pokemon={pokemonDetails} />
          ) : (
            <PlaceholderText>Selecione um Pokémon</PlaceholderText>
          )}
        </RightPanel>
      </Content>
    </Container>
  );
}



const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${bulbasaurTheme.colors.background};
`;

const SearchBarContainer = styled.View`
  padding: 8px 12px;
  background-color: ${bulbasaurTheme.colors.background};
`;

const StyledInput = styled.TextInput`
  height: 40px;
  border: 1px solid ${bulbasaurTheme.colors.border};
  border-radius: 8px;
  padding: 0 12px;
  background-color: ${bulbasaurTheme.colors.inputBackground};
  color: ${bulbasaurTheme.colors.text};
`;


const Content = styled.View`
  flex: 1;
  flex-direction: row;
`;
const LeftPanel = styled.View`
  width: 40%;
  padding: 8px;
`;

const RightPanel = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${bulbasaurTheme.colors.cardBackground};
`;

const PlaceholderText = styled.Text`
  font-size: 16px;
  color: ${bulbasaurTheme.colors.placeholder};
`;

