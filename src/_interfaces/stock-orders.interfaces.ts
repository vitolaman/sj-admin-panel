export interface StockOrderRes {
    data: StockOrderI[]
    meta: Meta
  }
  
  export interface StockOrderI {
    id: number
    createdAt: string
    createdBy: string
    reffNo: string
    status: string
    stockOrderItems: StockOrderItem[]
  }
  
  export interface StockOrderItem {
    id: number
    stockOrderId: number
    amount: number
    price: number
    item: Item
  }
  
  export interface Item {
    id: string
    name: string
    type: string
    stock: number
    normalStockValue: number
    price: number
  }
  
  export interface Meta {
    currentPage: number
    totalPages: number
    hasNextPage: boolean
  }