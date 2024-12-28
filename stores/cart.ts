import { defineStore } from 'pinia';
import { checkoutGames } from '@/utils/games';

export enum CartStatus {
  Loading,
  Ready,
  Empty,
  Checkedout,
  Error,
}

interface CartState {
  items: Array<CartItem>,
  checked_out_items: Array<CartItem>,
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
    checked_out_items: [],
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
    async checkout() {
      try {
        this.cart_status = CartStatus.Loading;

        const response = await checkoutGames(this.items)

        console.log("checked out! ", response);

        this.checked_out_items = this.items;
        this.items = [];

        this.cart_status = CartStatus.Checkedout;

      } catch(e) {
        console.warn("checkout error: ", e);

        this.cart_status = CartStatus.Error;
      }
    },
  },
  getters: {
    itemsInCart() : number {
      return this.items.length
    }
  },
})
