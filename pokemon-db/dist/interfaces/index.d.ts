export interface Pokemon {
    id: number;
    name: string;
    types: Types[];
    stats: Stats[];
    sprites: Sprites;
}
interface Types {
    type: Type;
}
interface Type {
    name: string;
}
interface Stats {
    base_stat: number;
    stat: Stat;
}
interface Stat {
    name: string;
}
interface Sprites {
    front_default: string;
}
export interface PokemonBasic {
    name: string;
    url: string;
}
export {};
//# sourceMappingURL=index.d.ts.map