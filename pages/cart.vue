<template>
  <div class="bg-shack-gray min-h-screen">
    <div v-if="cartStore.cart_status === 0" class="flex justify-center items-center pt-12">
      <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-shack-text animate-spin fill-shack-orange" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span>Loading...</span>
      </div>
    </div>
    <div v-else-if="cartStore.cart_status === 3" class="flex justify-center items-center pt-12">
      <div
        class="relative block w-2/3 rounded-lg border-2 border-shack-text p-12 text-center"
      >
        <span class="mt-2 block text-sm font-semibold text-shack-text">Thank you for your business!</span>
        <span class="mt-2 block text-sm font-semibold text-shack-text">Your Games are on the way!</span>
      </div>
    </div>
    <div v-else-if="cartStore.itemsInCart === 0" class="flex justify-center items-center pt-12">
      <NuxtLink
        href="/search"
        class="relative block w-2/3 rounded-lg border-2 border-dashed border-shack-text p-12 text-center hover:border-shack-orange focus:outline-none focus:ring-2 focus:ring-shack-bright-orange focus:ring-offset-2"
      >
        <span class="mt-2 block text-sm font-semibold text-shack-text">It's not safe to go alone!</span>
        <span class="mt-2 block text-sm font-semibold text-shack-text">Find a game to bring with you.</span>
      </NuxtLink>
    </div>
    <div v-else class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
      <h1 class="text-center text-3xl font-bold tracking-tight text-shack-orange sm:text-4xl">Shopping Cart</h1>

      <form class="mt-12">
        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
            <li v-for="product in cartStore.items" :key="product.id" class="flex py-6">
              <div class="shrink-0">
                <img :src="product.image" class="size-24 rounded-md object-cover sm:size-32" />
              </div>

              <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div class="flex justify-between">
                    <h4 class="text-sm">
                      <NuxtLink :href="`/games/${product.guid}`" class="font-medium text-shack-text hover:text-shack-bright-orange">{{ product.name }}</NuxtLink>
                    </h4>
                  </div>
                </div>
                <div class="mt-4 flex flex-1 items-end">
                  <button
                    type="button" 
                    class="text-sm font-medium text-shack-orange hover:text-shack-bright-orange"
                    @click.prevent.stop="cartStore.removeItemFromCart(product)"
                  >
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading" class="mt-10">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div>
            <dl class="space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-base font-medium text-shack-text">Games in cart:</dt>
                <dd class="ml-4 text-base font-medium text-shack-text"> {{ cartStore.itemsInCart }} </dd>
              </div>
            </dl>
          </div>

          <div class="mt-10">
            <button 
              type="submit"
              class="w-full rounded-md border border-transparent bg-shack-orange px-4 py-3 text-base font-medium text-shack-text shadow-sm hover:bg-shack-bright-orange focus:outline-none focus:ring-2 focus:ring-shack-orange focus:ring-offset-2 focus:ring-offset-shack-text"
              @click.prevent.stop="cartStore.checkout"
            >
              Checkout
            </button>
          </div>

          <div class="mt-6 text-center text-sm">
            <p class="text-shack-text">
              or &nbsp;
              <NuxtLink href="/search" class="font-medium text-shack-orange hover:text-shack-bright-orange">
                Find some more!
                <span aria-hidden="true"> &rarr;</span>
              </NuxtLink>
            </p>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon, ClockIcon } from '@heroicons/vue/20/solid'

const cartStore = useCartStore();
</script>
