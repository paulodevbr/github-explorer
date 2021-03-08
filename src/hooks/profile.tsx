import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface Profile {
  id: string;
  login: string;
  avatar_url: string;
  url: string;
  name: string;
  company: string;
  location: string;
  bio: string;
  followers: number;
  following: number;
  repos_url: string;
}

interface LanguageResponse {
  [key: string]: number;
}

export interface Language {
  id: string;
  value: number;
}

interface RepoResponse {
  language?: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  fork?: boolean;
}

interface Repo extends RepoResponse {
  count: number;
  languages: Language[];
}

interface ProfileState {
  profile: Profile;
  repos: Repo;
}

interface SearchProfileParams {
  username: string;
}

interface SearchContextData {
  profile: Profile;
  repos: Repo;
  getProfile(params: SearchProfileParams): Promise<void>;
  clearProfile(): void;
  loading: boolean;
}

const Profile = createContext<SearchContextData>({} as SearchContextData);

export const ProfileProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ProfileState>({} as ProfileState);
  const [loading, setLoading] = useState(true);

  // const countLanguages = async (languages: string[]): Promise<Language[]> => {
  //
  // };

  const getRepos = useCallback(
    async ({ profile }: { profile: Profile }): Promise<Repo> => {
      const params = { type: 'owner', per_page: 100 };
      let repos: RepoResponse[] = [];

      let reposLength = 100;
      const userHasMoreRepos = (length: number): boolean => length >= 100;
      let page = 1;

      do {
        const config = {
          params: { ...params, page },
        };
        const reposReponse =
          // eslint-disable-next-line no-await-in-loop
          (await api.get<RepoResponse[]>(profile.repos_url, config)).data;

        const filteredRepos = reposReponse.filter(repo => !repo.fork);

        reposLength = filteredRepos.length;

        repos = repos.concat(filteredRepos);

        page += 1;
      } while (userHasMoreRepos(reposLength));

      const repoData: RepoResponse = repos.length
        ? repos.reduce((previous, current) => ({
            stargazers_count:
              previous.stargazers_count + current.stargazers_count,
            watchers_count: previous.watchers_count + current.watchers_count,
            forks_count: previous.forks_count + current.forks_count,
          }))
        : { stargazers_count: 0, watchers_count: 0, forks_count: 0 };

      const repoLanguageList = repos.map(repo => repo.language || '');

      // const languages = countLanguages(repoLanguageList);

      return { ...repoData, count: repos.length, languages: [{} as Language] };
    },
    [],
  );

  const getProfile = useCallback(
    async ({ username }: SearchProfileParams) => {
      setLoading(true);
      try {
        const profile = (await api.get<Profile>(`/users/${username}`)).data;
        const repos = await getRepos({ profile });

        setData({ profile, repos });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    },
    [getRepos],
  );

  const clearProfile = useCallback(() => {
    setLoading(true);
    setData({} as ProfileState);
  }, []);

  return (
    <Profile.Provider
      value={{
        profile: data.profile,
        repos: data.repos,
        getProfile,
        clearProfile,
        loading,
      }}
    >
      {children}
    </Profile.Provider>
  );
};

export const useProfile = (): SearchContextData => {
  const context = useContext(Profile);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
