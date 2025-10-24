import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {getPokemonByName, getPokemonDescription} from "../services/pokeapi";
import type {Pokemons} from "../interface/pokemon";

const Container = styled.div`
    padding: 20px;
    display: flex ;
    flex-direction: column;
    gap: 20px;
`;

const Top = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;

const Card = styled.div`
    background-color: #f9fafb;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 10px #20202020;
`;

const Title = styled.h1`
    text-transform: capitalize;
    font-size: 32px;
    font-weight: bold;
`;

const Gallery = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;

    img {
        width: 150px;
    }
`;

const Subtitle = styled.h2`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Lista = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
        margin-bottom: 5px;
    }
`;

const BackButton = styled.button`
    background-color: #374151;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 6px;
    width: fit-content;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
        background-color: #1f2937;
    }
`;

export default function DetailPage() {
    const {name} = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<Pokemons | null>(null);
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!name) return;
                const data = await getPokemonByName(name);
                setPokemon(data);
                const desc = await getPokemonDescription(name);
                setDescription(desc.description);
            } catch (error) {
                console.error("Fallo al buscar pokemon:", error);
            }
        };
        fetchData();

    }, [name]); 

    if (!pokemon) {
        return <Container>Cargando...</Container>;
    }

    return (
        <Container>
            <BackButton onClick={() => navigate(-1)}>Volver</BackButton>
            <Top>
                <Card>
                    <Title>{pokemon.name} (#{pokemon.id})</Title>
                    <p>
                        <b>Tipos:</b> {pokemon.types.map(t => t.type.name).join(", ")}
                    </p>
                    <p>
                        <b>Descripcion:</b> {description}
                    </p>
                </Card>

                <Card>
                    <Subtitle>Galeria</Subtitle>
                    <Gallery>
                        <img src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
                        <img src={pokemon.sprites.front_shiny} alt={`${pokemon.name} front shiny`} />
                        <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
                        <img src={pokemon.sprites.back_shiny} alt={`${pokemon.name} back shiny`} />
                    </Gallery>
                </Card>
            </Top>

            <Top>
                <Card>
                    <Subtitle>Habilidades</Subtitle>
                    <Lista>
                        {pokemon.abilities.map((abilityInfo) => (
                            <li key={abilityInfo.ability.name}>{abilityInfo.ability.name}</li>
                        ))}
                    </Lista>
                </Card>

                <Card>
                    <Subtitle>Movimientos</Subtitle>
                    <Lista>
                        {pokemon.moves.slice(0, 10).map((moveInfo) => (
                            <li key={moveInfo.move.name}>{moveInfo.move.name}</li>
                        ))}
                    </Lista>
                </Card>
            </Top>
        </Container>
    );


}