import { User } from "./auth-api.interfaces";

export interface BillI {
  id: number;
  createdAt: string;
  total: number;
  paymentStatus: string;
  paymentType: string;
  duration: any;
  client: Client;
  createdBy: User;
  payments: any[];
  clientOrder: ClientOrder;
}

export interface Client {
  id: number;
  name: string;
  clientCode: string;
  createdAt: string;
  city: string;
}

export interface ClientOrder {
  id: number;
  createdAt: string;
}


export interface BillDetailI {
    id: number
    createdAt: string
    total: number
    paymentStatus: string
    paymentType: string
    duration: any
    client: Client
    createdBy: CreatedBy
    payments: any[]
    clientOrder: ClientOrder
    items: Item[]
  }
  
  export interface CreatedBy {
    id: number
    firstName: string
    lastName: string
    username: string
    password: string
    role: string
  }
  
  export interface ClientOrder {
    id: number
    createdAt: string
  }
  
  export interface Item {
    id: number
    clientOrderId: number
    quantity: number
    price: number
    item: ItemDetail
  }
  
  export interface ItemDetail {
    id: string
    name: string
    type: string
    stock: number
    normalStockValue: number
    price: number
  }
  