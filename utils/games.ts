import axios from 'axios';

export const searchForGame = function (query) {
  axios.get('/.netlify/functions/search', {
    params: {
      format: 'json',
      query,
    },
  })
}

