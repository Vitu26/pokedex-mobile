import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView } from 'react-native';
import styled from 'styled-components/native';

import { getPokemonByName, getPokemons } from '../src/infra/services/pokemonService';
import { PokemonDetailsCard } from '../src/presentation/components/PokemonDetailsCard';

export default function FilteredScreen() {
  const params = useLocalSearchParams<{
    name?: string;
    type?: string;
    minWeight?: string;
    maxWeight?: string;
    minAttack?: string;
  }>();

  const [filtered, setFiltered] = useState<any[]>([]);

  const { data: list, isLoading } = useQuery({
    queryKey: ['filteredList'],
    queryFn: () => getPokemons(151, 0), // Pega os 151 primeiros
  });

  useEffect(() => {
    const fetchFiltered = async () => {
      if (!list?.results) return;

      const all = await Promise.all(
        list.results.map((p: any) => getPokemonByName(p.name))
      );

      const results = all.filter((pokemon) => {
        const {
          name,
          types,
          weight,
          stats,
          id
        } = pokemon;

        // Nome ou número
        if (params.name && !name.toLowerCase().includes(params.name.toLowerCase()) && id.toString() !== params.name) {
          return false;
        }

        // Tipo
        if (params.type && !types.some((t: any) => t.type.name === params.type?.toLowerCase())) {
          return false;
        }

        // Peso
        const weightKg = weight / 10;
        if (params.minWeight && weightKg < Number(params.minWeight)) return false;
        if (params.maxWeight && weightKg > Number(params.maxWeight)) return false;

        // Ataque (stat base attack)
        const attackStat = stats.find((s: any) => s.stat.name === 'attack')?.base_stat ?? 0;
        if (params.minAttack && attackStat < Number(params.minAttack)) return false;

        return true;
      });

      setFiltered(results);
    };

    fetchFiltered();
  }, [list, params]);

  if (isLoading) return <Centered><ActivityIndicator size="large" /></Centered>;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {filtered.length === 0 ? (
        <Message>Nenhum Pokémon encontrado com os filtros selecionados.</Message>
      ) : (
        filtered.map((pokemon) => (
          <CardWrapper key={pokemon.id}>
            <PokemonDetailsCard pokemon={pokemon} />
          </CardWrapper>
        ))
      )}
    </ScrollView>
  );
}

const CardWrapper = styled.View`
  margin-bottom: 24px;
`;

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Message = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #777;
  margin-top: 32px;
`;
