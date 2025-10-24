import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';
 
export const getpokemons = async (limit = 10, offset = 10) => {
    const {data} = await axios.get(`${API_URL}/pokemon?Limit=${limit}&offset=${offset}`);
    const details = await Promise.all(
        data.results.map(async (p:any) =>{
            const res = await axios.get(p.url);
            return res.data;
        })
    );
    return details;
};

export const getPokemonByName = async (name: string) => {
    const {data} = await axios.get(`${API_URL}/pokemon/${name.toLowerCase()}`);
    return data;
};

export const getPokemonDescription = async (name: string) => {
  const { data } = await axios.get(`${API_URL}/pokemon-species/${name.toLowerCase()}`);
  
  const flavorText = data.flavor_text_entries.find(
    (entry: any) => entry.language.name === 'es' 
  )?.flavor_text?.replace(/\f|\n|\r/g, ' ') || 'Description not available.';

  return {
    description: flavorText,
    color: data.color?.name || null,
    habitat: data.habitat?.name || null,
    isLegendary: data.is_legendary,
  };
};