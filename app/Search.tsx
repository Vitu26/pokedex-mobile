import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { tipoPtBrParaEn } from '../src/shared/constants/types';


import { getPokemonByName, getPokemons } from '../src/infra/services/pokemonService';
import { PokemonDetailsCard } from '../src/presentation/components/PokemonDetailsCard';

export default function SearchScreen() {
  const [nameOrId, setNameOrId] = useState('');
  const [type, setType] = useState('');
  const [minWeight, setMinWeight] = useState('');
  const [maxWeight, setMaxWeight] = useState('');
  const [minAttack, setMinAttack] = useState('');
  const [filtered, setFiltered] = useState<any[]>([]);

  const { data: list, isLoading } = useQuery({
    queryKey: ['filteredList'],
    queryFn: () => getPokemons(151, 0), // 151 primeiros
  });

  const handleFilter = async () => {
    if (!list?.results) return;

    const all = await Promise.all(
      list.results.map((p: any) => getPokemonByName(p.name))
    );

    const results = all.filter((pokemon) => {
      const { name, id, types, weight, stats } = pokemon;

      // Nome ou número
      if (nameOrId && !name.toLowerCase().includes(nameOrId.toLowerCase()) && id.toString() !== nameOrId) {
        return false;
      }

      // Tipo
      if (type) {
        const tipoEmIngles = tipoPtBrParaEn[type.toLowerCase()];
        if (!tipoEmIngles || !types.some((t: any) => t.type.name === tipoEmIngles)) {
          return false;
        }
      }


      // Peso
      const weightKg = weight / 10;
      if (minWeight && weightKg < Number(minWeight)) return false;
      if (maxWeight && weightKg > Number(maxWeight)) return false;

      // Ataque
      const attackStat = stats.find((s: any) => s.stat.name === 'attack')?.base_stat ?? 0;
      if (minAttack && attackStat < Number(minAttack)) return false;

      return true;
    });

    setFiltered(results);
  };

  useEffect(() => {
    if (list?.results?.length) {
      handleFilter();
    }
  }, [list, nameOrId, type, minWeight, maxWeight, minAttack]);


  return (
    <Container>
      <FiltersContainer>
        <Row>
          <Input placeholder="Nome ou número" value={nameOrId} onChangeText={setNameOrId} />
          <Input placeholder="Tipo (ex: grass)" value={type} onChangeText={setType} />
        </Row>
        <Row>
          <Input placeholder="Peso mín (kg)" keyboardType="numeric" value={minWeight} onChangeText={setMinWeight} />
          <Input placeholder="Peso máx (kg)" keyboardType="numeric" value={maxWeight} onChangeText={setMaxWeight} />
          <Input placeholder="Ataque mín" keyboardType="numeric" value={minAttack} onChangeText={setMinAttack} />
        </Row>
        <Button title="Buscar" onPress={handleFilter} />
      </FiltersContainer>

      {isLoading ? (
        <Centered><ActivityIndicator size="large" /></Centered>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {filtered.length === 0 ? (
            <Message>Nenhum Pokémon encontrado com os filtros.</Message>
          ) : (
            filtered.map((pokemon) => (
              <CardWrapper key={pokemon.id}>
                <PokemonDetailsCard pokemon={pokemon} />
              </CardWrapper>
            ))
          )}
        </ScrollView>
      )}
    </Container>
  );
}


const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

const FiltersContainer = styled.View`
  margin-bottom: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 8px;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 0 12px;
  background-color: #fff;
`;

const Centered = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.View`
  margin-bottom: 24px;
`;

const Message = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #777;
`;
