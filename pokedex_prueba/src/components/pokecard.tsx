import { useState } from "react";
import styled from "styled-components";
import type { Pokemons } from "../interface/pokemon";
import ShinyModal from "./shinyModal";
import { useNavigate } from "react-router-dom";

interface Props {
  pokemon: Pokemons;
}

const Card = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const PokemonImage = styled.img`
  margin: 0 auto;
`;

const PokemonName = styled.h3`
  font-weight: bold;
  text-transform: capitalize;
  margin-top: 0.5rem;
`;

const PokemonType = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const Pokemonabilities = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const ShinyButton = styled.button`
  margin-top: 0.75rem;
  background-color: #374151;
  color: white;
  width: 100%;
  padding: 0.5rem 0;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1f2937;
  }
`;

export default function PokemonCard({ pokemon }: Props) {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleNavigate = () => {
        if (!showModal) navigate(`/pokemon/${pokemon.name}`);
    };

    return (
        <Card onClick={handleNavigate}>
            <PokemonImage src={pokemon.sprites.front_default} alt={pokemon.name} />
            <PokemonName>{pokemon.name}</PokemonName>
            <Pokemonabilities>{pokemon.abilities.map((a) => a.ability.name).join(", ")}</Pokemonabilities>
            <PokemonType>{pokemon.types.map((t) => t.type.name).join(", ")}</PokemonType>
            <ShinyButton
                onClick={(e) => {
                e.stopPropagation();
                setShowModal(true);
                }}
            >
            Shiny
            </ShinyButton>

            {showModal && (
                <ShinyModal pokemon={pokemon} onClose={() => { setShowModal(false)}} />
            )}
        </Card>
  );
}
