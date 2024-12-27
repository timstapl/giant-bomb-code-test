import { defineStore } from 'pinia';

export enum CartStatus {
  Loading,
  Ready,
  Empty,
  Checkedout
}

interface CartState {
  items: Array<CartItem>,
  cart_status : CartStatus,
}

type CartItem = {
  id: number,
  guid: string,
  name: string,
  image: string,
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: [],
    cart_status: CartStatus.Ready,
  }),
  actions: {
    addItemToCart(game : CartItem) {
      if (!this.items.some(g => g.id === game.id)) {
        this.items.push(game);
      }
    },
    removeItemFromCart(game : CartItem) {
      this.items = this.items.filter(g => g.id !== game.id)
    },
    checkout() {
      console.log("TODO: handle checkout");
    },
  },
  getters: {
    itemsInCart() : number {
      return this.items.length
    }
  },
})
