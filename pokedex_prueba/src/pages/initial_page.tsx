import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getPokemonByName, getpokemons } from "../services/pokeapi";
import type {Pokemons} from "../interface/pokemon";
import type { AppDispatch } from "../store";
import PokemonList from "../components/pokelist";
import PokemonCard from "../components/pokecard";

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background-color: #dc2626;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #b91c1c;
  }
`;

const DivSearch = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const InputSearch = styled.input`
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 8px 12px;
  width: 300px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

const ButtonGroup = styled.div`
  margin-left:900px;
  display:flex;
  gap: 5px;
`;

const ViewButton = styled.button<{$active: boolean}>`
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${(props) => props.$active 
    ? `
      background-color: #242425ff;
      color: white;
    `
    : `
      background-color: #d9dde6ff;
      color: #374151;

      &:hover {
        background-color: #d0e2fcff;
      }
    `
  }
  
`;

const PokemonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

export default function Initial_Page() {
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  const limit = 10;
  const offset = (page - 1) * limit;

  useEffect(() => {
    loadPokemons();
  }, [page]);

  const loadPokemons = async () => {
    const data = await getpokemons(limit, offset);
    setPokemons(data);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === "") loadPokemons();
    else {
      try {
        const data = await getPokemonByName(e.target.value);
        setPokemons([data]);
      } catch (error) {
        console.error("Pokemon no encontrado");
      }
    }
  };
  return (
    <Container>
      <Header>
        <Title>Pokedex</Title>
        <LogoutButton onClick={() => dispatch(logout())}>Logout</LogoutButton>
      </Header>
      <DivSearch>
        <InputSearch 
          type="text"
          placeholder="Buscar Pokemon por nombre"
          value={search}
          onChange={handleSearch}
        />
        <ButtonGroup>
          <ViewButton 
            $active={viewMode === "list"}
            onClick={() => setViewMode("list")}
          >
            Lista
          </ViewButton>
          <ViewButton 
            $active={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
          >
            Cuadricula
          </ViewButton>
        </ButtonGroup>
      </DivSearch>
      {viewMode === "list" ? (
        <PokemonList Pokemons={pokemons} page={page} setPage={setPage} />
      ) : (
        <PokemonGrid>
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </PokemonGrid>
      )}
      
      </Container>
  );
};
