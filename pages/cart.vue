<template>
  <div class="bg-shack-gray min-h-screen">
    <div v-if="cartStore.itemsInCart === 0" class="flex justify-center items-center pt-12">
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
              @click.prevent.stop="checkout"
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

const checkout = () => {
  console.log("checkout called!");
}

</script>
