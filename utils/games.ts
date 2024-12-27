import axios from 'axios';

export const searchForGame = async function (query: string) {
  const response = await axios.get('/.netlify/functions/search', {
    params: {
      format: 'json',
      query,
    },
  })

  return response.data;
}

