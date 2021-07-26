
export const CREATE_ORDER = "CREATE_ORDER";


export type Product = {
    id: number,
    title: string,
    desc:string,
    price: number,
    date: string,
    category: string,
    userId: number,
    imageUrl: string,
    qty:number
}

export type Order = {
    products:Product[],
    total:number
}


export interface CreateOrder {
    type: typeof CREATE_ORDER,
    payload: Order
}



 export type OrderDispatchTypes = CreateOrder
