import axios from 'axios';

export const searchForGame = function (query) {
  axios.get('https://www.giantbomb.com/api/search/', {
    params: {
      format: 'json',
      query,
    },
  })
}

