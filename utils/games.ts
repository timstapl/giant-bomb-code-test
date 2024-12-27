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

