
import ShinyModal from "./shinyModal";
import {useState} from "react";
import styled from "styled-components";
import type { Pokemons } from '../interface/pokemon';
import { useNavigate } from "react-router-dom";

interface props{
    Pokemons : Pokemons[];
    page: number;
    setPage: (page:number) => void;
}

const Table = styled.table`
    width: 100%;  
`;

const Thead = styled.thead`
    background-color: #f3f4f6;
    border-bottom: 2px solid #000000ff;
`;

const Th = styled.th`
    padding: 20px;
    text-align: center;
    
`;

const Tr = styled.tr`
    
    &:hover {
        background-color: #f9fafb;
    }
`;

const Td = styled.td`
    padding: 25px;
    vertical-align: middle;
    text-transform: capitalize;
`;

const ShinyButton = styled.button`
    background-color: #374151;
    color: white;
    padding: 0.4rem 0.75rem;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    &:hover {
        background-color: #111827;
    }
`;

const Pagesdiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
`;

const PageButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.25rem;

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`;

const PageInfo = styled.span`
    font-weight: 500;
`;

export default function PokeList({Pokemons, page, setPage}:props){
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemons | null>(null);
    const navigate = useNavigate();
    
    return(
        <div>
            <Table>
                <Thead>
                    <Tr>
                        <Th>#</Th>
                        <Th>Nombre</Th>
                        <Th>Vista Previa</Th>
                        <Th>Tipos</Th>
                        <Th>Habilidades</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <tbody>
                    {Pokemons.map((p) => (
                        <Tr key={p.id} onClick={()=>navigate(`/pokemon/${p.name}`)} style={{cursor: 'pointer'}}>
                            <Td>{p.id}</Td>
                            <Td>{p.name}</Td>
                            <Td>
                                <img src={p.sprites.front_default} alt={p.name} width="50" height="50"/>
                            </Td>
                            <Td>
                                {p.types.map((typeInfo) => typeInfo.type.name).join(", ")}
                            </Td>
                            <Td>
                                {p.abilities.map((abilityInfo) => abilityInfo.ability.name).join(", ")}
                            </Td>
                            <Td>
                                <ShinyButton onClick={(e) => {e.stopPropagation, setSelectedPokemon(p)}}>Ver Shiny</ShinyButton>
                            </Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>

            <Pagesdiv>
                <PageButton disabled={page === 1} onClick={() => setPage(page - 1)}>
                    ⬅️
                </PageButton>
                <PageInfo>Página {page}</PageInfo>
                <PageButton onClick={() => setPage(page + 1)}>
                    ➡️
                </PageButton>
            </Pagesdiv>

            {selectedPokemon && (
                <ShinyModal 
                    pokemon={selectedPokemon}
                    onClose={() => setSelectedPokemon(null)}
                />
            )}
        </div>
    );
}