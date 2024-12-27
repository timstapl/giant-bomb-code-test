import { defineStore } from 'pinia';
import { searchForGame } from '@/utils/games';

type Nullable<T> = T | null;

export enum PageState {
  Loading,
  Ready,
  Results,
  Error,
  Empty
}

interface GamesState {
  pageState: PageState,
  results: GameResultsInfo[],
  selected: Nullable<GameFullInfo>,
  pagination: Nullable<PaginationInfo>,
  searchedQuery: Nullable<string>,
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
    pageState: PageState.Ready,
    results: [],
    selected: null,
    pagination: null,
    searchedQuery: null,
  }),
  actions: {
    async search(query: string, page: number = 1) {
      try {

        this.searchedQuery = query;
        this.pageState = PageState.Loading;

        const response = await searchForGame(query, page);

        this.setResults(response)

        if (response.error === "OK" && response.number_of_page_results > 0 && response.number_of_total_results > 0) {
          this.pageState = PageState.Results;
        } else {
          this.pageState = PageState.Empty;
        }
      } catch (e) {
        console.warn("error received: ", e);
        this.pageState = PageState.Error;
      }
    },
    async requestPage(page: number) {
      if (this.searchedQuery) {
        await this.search(this.searchedQuery, page);
      }
    },
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
    totalPages() : number {
      const total_results = this.pagination?.number_of_total_results;
      const limit = this.pagination?.limit;

      return (limit && total_results) ?  Math.ceil(total_results / limit) : -1;
    },
    currentPage() : number {
      const limit = this.pagination?.limit;
      const offset = this.pagination?.offset;

      return (limit && offset) ? Math.ceil(offset / limit) + 1 : 1;
    },
    nextPage() : Nullable<number> {
      return this.currentPage === this.totalPages ? null : this.currentPage + 1;
    },
    prevPage() : Nullable<number> {
      return this.currentPage === 1 ? null : this.currentPage - 1;
    }
  },
})
