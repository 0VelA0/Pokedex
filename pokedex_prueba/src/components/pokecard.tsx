import { useState } from "react";
import styled from "styled-components";
import type { Pokemons } from "../interface/pokemon";
import ShinyModal from "./shinyModal";
import { useNavigate } from "react-router-dom";
import pokedexBg from "/src/assets/pokedex.png";

interface Props {
  pokemon: Pokemons;
}

const Card = styled.div`
  position: relative;
  background-image: url(${pokedexBg}),
  linear-gradient(to bottom, #8bcbf3ff 0%, #0080ffff 100%);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;


  
  padding: 4.2rem;
  border-radius: 1rem;
  box-shadow: 
    0 2px 6px #00000063,
    inset 0 -2px 4px #e9e1e1ff;
  text-align: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(207, 47, 47, .85);
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
