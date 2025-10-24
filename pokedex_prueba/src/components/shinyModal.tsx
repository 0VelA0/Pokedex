
import type {Pokemons} from "../interface/pokemon";
import styled from "styled-components";

interface Props {
    pokemon : Pokemons;
    onClose: () => void;
}

const FondoModal = styled.div`
    position: fixed;
    inset: 0;
    background-color: #00000080;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px #20202080
    text-align: center;
`;

const Title = styled.h2`
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 8px
    text-transform: capitalize;
`;

const ShinyImage = styled.img`
    display: block;
    margin: 0 auto;
`;

const CloseButton = styled.button`
    margin-top: 1rem;
    background-color: #403a4e;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #374151
    }
`;

export default function ShinyModal({ pokemon, onClose}: Props){
    return (
        <FondoModal>
            <ModalContent>
                <Title>{pokemon.name} - Shiny</Title>
                <ShinyImage src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} />
                <CloseButton onClick={onClose}>Cerrar</CloseButton>
            </ModalContent>
        </FondoModal>
    );
}