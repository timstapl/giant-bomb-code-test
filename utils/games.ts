import axios from 'axios';

export const searchForGame = async function (query: string, page: number) {
  const response = await axios.get('/.netlify/functions/search', {
    params: {
      format: 'json',
      resources: 'game',
      query,
      page
    },
  })

  return response.data;
}

export const getGameDetails = async function (guid: string) {
  const response = await axios.get('/.netlify/functions/game', {
    params: {
      format: 'json',
      guid,
    },
  })

  return response.data;
}

export const checkoutGames = async function (cart: Array<any>) {
  const response = await axios.post('/.netlify/functions/checkout', {
    cart
  })

  return response.data;
}

