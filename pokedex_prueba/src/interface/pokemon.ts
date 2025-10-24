export interface PokemonType {
    type: {name: string};
}

export interface PokemonAbility{
    ability: {name: string};
}

export interface PokemonMove{
    move: {name: string};
}

export interface Pokemons {
    id: number;
    name: string;
    sprites: {
        front_default: string;
        front_shiny: string;
        back_shiny?: string;
        back_default?: string;
    };
    types: PokemonType[];
    abilities: PokemonAbility[];
    moves: PokemonMove[];
}