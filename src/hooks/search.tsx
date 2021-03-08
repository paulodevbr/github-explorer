import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface UserSearchResponse {
  total_count: number;
  items: {
    id: string;
    login: string;
    avatar_url: string;
  }[];
}

interface UserFromList {
  id: string;
  username: string;
  avatar_url: string;
}

interface SearchState {
  searchText: string;
  total: number;
  perPage: number;
  selectedPage: number;
  userList: UserFromList[];
}

interface SearchPageParams {
  page: number;
}

interface SearchUserParams {
  searchText: string;
  perPage: number;
  page: number;
}

interface SearchContextData {
  userList: UserFromList[];
  total: number;
  selectedPage: number;
  searchUsers(params: SearchUserParams): Promise<void>;
  searchPage(params: SearchPageParams): Promise<void>;
  loading: boolean;
}

const Search = createContext<SearchContextData>({} as SearchContextData);

export const SearchProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<SearchState>({} as SearchState);
  const [loading, setLoading] = useState(false);

  const searchUsers = useCallback(
    async ({ searchText, page, perPage }: SearchUserParams) => {
      setLoading(true);
      try {
        const response = (
          await api.get<UserSearchResponse>('/search/users', {
            params: {
              q: searchText,
              page,
              per_page: perPage,
            },
          })
        ).data;

        setData({
          selectedPage: page,
          searchText,
          perPage,
          total: response.total_count,
          userList: response.items.map(user => ({
            ...user,
            username: user.login,
          })),
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const searchPage = useCallback(
    async ({ page }: SearchPageParams) =>
      searchUsers({ searchText: data.searchText, page, perPage: data.perPage }),
    [searchUsers, data],
  );

  return (
    <Search.Provider
      value={{
        userList: data.userList,
        total: data.total,
        selectedPage: data.selectedPage,
        searchUsers,
        searchPage,
        loading,
      }}
    >
      {children}
    </Search.Provider>
  );
};

export const useSearch = (): SearchContextData => {
  const context = useContext(Search);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
};
