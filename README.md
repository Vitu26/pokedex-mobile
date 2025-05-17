
#  Pokedex Vitu App

Uma Pokédex moderna construída com **React Native** e **Expo**, utilizando **Clean Architecture** para uma arquitetura robusta e escalável.

![pokedex-banner](./assets/banner.png) <!-- Altere ou remova se necessário -->

---

##  Funcionalidades

- Listagem dos 151 primeiros Pokémon
- Busca por nome, número ou tipo
- Visualização de detalhes de cada Pokémon
- Favoritar/Desfavoritar Pokémon com persistência local (AsyncStorage)
- Layout responsivo com Styled Components
- Organização baseada em Clean Architecture

---

##  Estrutura de Pastas (Clean Architecture)

```
src/
├── domain/            # Lógica de negócio e contratos
│   ├── models/        # Entidades do domínio (ex: Pokemon.ts)
│   ├── repository/    # Interfaces para repositórios
│   └── usecases/      # Casos de uso (GetPokemonByName, GetFavorites, etc.)
│
├── infra/             # Implementações técnicas
│   ├── services/      # Comunicação com a API (pokeapi)
│   └── storage/       # Persistência local (AsyncStorage)
│
├── presentation/      # UI
│   ├── screens/       # Telas (FavoritesScreen, PokedexScreen, etc.)
│   ├── components/    # Componentes reutilizáveis
│   └── context/       # Contextos (FavoritesProvider)
│
├── providers/         # Providers globais (React Query, temas)
└── shared/            # Constantes, temas, utilitários
```

---

##  Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/query/v4)
- [Styled Components](https://styled-components.com/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [PokeAPI](https://pokeapi.co/)

---

##  Notificações com Expo e EAS

O projeto utiliza o Expo para gerenciamento de notificações. As rotas do EAS Notifications são configuradas automaticamente no painel do Expo.

- Documentação oficial: https://docs.expo.dev/push-notifications/overview/
- Importação recomendada:
```ts
import * as Notifications from 'expo-notifications';
```
- Cadastro do token para envio de notificações:
```ts
const token = await Notifications.getExpoPushTokenAsync();
```

> Lembre-se de configurar as permissões de notificação nas plataformas Android e iOS.

---

##  Casos de Uso

### Exemplo: GetPokemonByNameUseCase
```ts
export class GetPokemonByNameUseCase {
  constructor(private repository: IPokemonRepository) {}

  async execute(name: string): Promise<Pokemon> {
    return this.repository.getPokemonByName(name);
  }
}
```

Utilização:
```ts
const useCase = new GetPokemonByNameUseCase(repository);
const data = await useCase.execute("pikachu");
```

---

##  Instalação

```bash
git clone https://github.com/seu-usuario/pokedex-vitu-app.git
cd pokedex-vitu-app
npm install # ou yarn
npx expo start
```

---

##  Prévia

![preview-1](./assets/screen1.png)
![preview-2](./assets/screen2.png)

---

##  Melhorias Futuras

- [ ] Evoluções em cadeia
- [ ] Filtro por tipo
- [ ] Cache offline com React Query
- [ ] Testes unitários nos casos de uso
- [ ] Suporte a múltiplos idiomas

---

## Autor

**Victor Loic**  
GitHub: [@Vitu26](https://github.com/Vitu26)  
LinkedIn: [linkedin.com/in/victorloic](https://linkedin.com/in/victorloic)

---

##  Licença

Projeto licenciado sob a Licença MIT. Consulte [LICENSE](./LICENSE) para mais informações.
