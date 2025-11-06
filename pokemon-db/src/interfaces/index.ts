const dragonite = {
    id : 149,
    name : 'Dragonite',
    types : [
        {
            type : {
                name : 'Dragon'
            }
        },
        {
            type : {
                name : 'Flying'
            }
        }
    ],
    stats : [
        {
            base_stat : 100,
            stat : {
                name : 'Attack'
            }
        }
    ],
    sprites : {
        front_default : 'urladress......'
    }
}

export interface Pokemon {
    id : number,
    name : string,
    types : Types[],
    stats : Stats[],
    sprites : Sprites
}

interface Types {
    type : Type
}

interface Type {
    name : string
}

interface Stats {
    base_stat : number,
    stat : Stat
}

interface Stat {
    name : string
}

interface Sprites {
    front_default : string
}



export interface PokemonBasic {
    name : string,
    url : string
}