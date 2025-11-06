type User1 = {
    userId : number,
    name : string
}

type Admin1 = {
    userId : number,
    name : string,
    role : 'admin',
    permissions : string[]
}

interface Jesper {
    isCool : true
}

interface User {
    userId : number,
    name : string
}
// En interface kan ärva egenskaper från en annan interface
interface Admin extends User, Jesper {
    role : 'admin',
    permissions : string[]
}