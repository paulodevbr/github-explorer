import React, { useCallback, useRef } from 'react';
import { FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import {
  Container,
  Content,
  AnimationContainer,
  UserFromSearch,
  SearchResults,
  Logo,
  LoadingContainer,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useSearch } from '../../hooks/search';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Pagination } from '../../components/Pagination';

interface SearchFormData {
  search: string;
}

const Search: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const {
    searchUsers,
    searchPage,
    total,
    userList,
    loading,
    selectedPage,
  } = useSearch();
  const history = useHistory();

  const hasUserList = userList && userList.length > 0;

  const handleSubmit = useCallback(
    async (data: SearchFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          search: Yup.string().required('Search required'),
        });

        await schema.validate(data, { abortEarly: false });

        await searchUsers({ searchText: data.search, perPage: 5, page: 1 });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Error in search',
          description: 'An error occurred in search, try again',
        });
      }
    },
    [searchUsers, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <Logo src={logoImg} alt="github_explorer" visible={!hasUserList} />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Search for github user</h1>
            <Input name="search" icon={FiUser} placeholder="github-user" />
            <Button type="submit" loading={loading}>
              Search
            </Button>
          </Form>
        </AnimationContainer>
        {loading && (
          <LoadingContainer>
            <LoadingSpinner />
          </LoadingContainer>
        )}
        {userList && userList.length > 0 && (
          <SearchResults>
            {!loading &&
              userList.map(user => (
                <UserFromSearch
                  key={user.id}
                  onClick={() => history.push(`/users/${user.username}`)}
                >
                  <img src={user.avatar_url} alt={user.username} />

                  <span>{user.username}</span>
                </UserFromSearch>
              ))}
            <Pagination
              total={total}
              selectedPage={selectedPage}
              perPage={5}
              onChangePage={async (page: number) => searchPage({ page })}
            />
          </SearchResults>
        )}
      </Content>
    </Container>
  );
};

export default Search;
