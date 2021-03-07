import React, { useCallback, useRef } from 'react';
import { FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import logoImg from '../../assets/logo.svg';

import {
  Container,
  Content,
  AnimationContainer,
  UserFromSearch,
  SearchResults,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import { useSearch } from '../../hooks/search';

interface SearchFormData {
  search: string;
}

const Search: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const { searchUsers, userList } = useSearch();

  const handleSubmit = useCallback(
    async (data: SearchFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          search: Yup.string().required('Search required'),
        });

        await schema.validate(data, { abortEarly: false });

        await searchUsers({ searchText: data.search, per_page: 6, page: 1 });
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
          <img src={logoImg} alt="GoBarber" />
          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Search for github user</h1>
            <Input name="search" icon={FiUser} placeholder="github-user" />
            <Button type="submit">Search</Button>
          </Form>
        </AnimationContainer>
        {userList.length > 0 && (
          <SearchResults>
            {userList.map(user => (
              <UserFromSearch key={user.id}>
                <img src={user.avatar_url} alt={user.login} />

                <span>{user.login}</span>
              </UserFromSearch>
            ))}
          </SearchResults>
        )}
      </Content>
    </Container>
  );
};

export default Search;
