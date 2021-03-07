import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface UserSearchResponse {
  items: UserSearch[];
}

interface UserSearch {
  id: string;
  login: string;
  avatar_url: string;
}

interface SearchState {
  userList: UserSearch[];
}

interface SearchUserParams {
  searchText: string;
  per_page: number;
  page: number;
}

interface SearchContextData {
  userList: UserSearch[];
  searchUsers(params: SearchUserParams): Promise<void>;
  loading: boolean;
}

const Search = createContext<SearchContextData>({} as SearchContextData);

export const SearchProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<SearchState>({ userList: [] });
  const [loading, setLoading] = useState(false);

  const searchUsers = useCallback(
    async ({ searchText, page, per_page }: SearchUserParams) => {
      setLoading(true);
      try {
        const response = (
          await api.get<UserSearchResponse>('/search/users', {
            params: {
              q: searchText,
              page,
              per_page,
            },
          })
        ).data;

        setData({ userList: response.items });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <Search.Provider value={{ userList: data.userList, searchUsers, loading }}>
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
