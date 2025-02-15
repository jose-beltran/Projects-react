export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

export type CartItem = Guitar & {
    quantity: number
}

export type GuitarID = Guitar['id']

// Pick sirve para seleccionar los atributos que desee
// export type CartItem =  Pick<Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }



