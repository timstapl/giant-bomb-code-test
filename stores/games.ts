import { defineStore } from 'pinia';

type Nullable<T> = T | null;

interface GamesState {
  results: GameResultsInfo[],
  selected: Nullable<GameFullInfo>,
  pagination: Nullable<PaginationInfo>,
}

type SearchResponse = {
  results: GameResultsInfo[]
  limit: number
  offset: number
  number_of_page_results: number
  number_of_total_results: number
}

enum ResourceType {
  Franchise = 'franchise',
  Game = 'game',
}

type GameResultsInfo = {
  id: number
  guid: string
  api_details_url: string
  deck: string
  description: string
  image: any
  name: string
  resource_type: ResourceType
};

type GameFullInfo = {
};

type PaginationInfo = {
  limit: number
  offset: number
  number_of_page_results: number
  number_of_total_results: number
};

export const useGamesStore = defineStore('games', {
  state: (): GamesState => ({
    results: [],
    selected: null,
    pagination: null,
  }),
  actions: {
    search(_query: string) {},
    setResults(response: SearchResponse) {
      this.results = response.results;
      this.pagination = {
        limit: response.limit,
        offset: response.offset,
        number_of_page_results: response.number_of_page_results,
        number_of_total_results: response.number_of_total_results,
      }
    },
  },
  getters: {
    gamesOnly() : GameResultsInfo[] {
      return this.results.filter(item => item.resource_type === ResourceType.Game)
    },
    franchisesOnly() : GameResultsInfo[] {
      return this.results.filter(item => item.resource_type === ResourceType.Franchise)
    },
  },
})
