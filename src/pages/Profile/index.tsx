import React, { useEffect, useRef } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import {
  BiGitRepoForked,
  FiBook,
  FiBox,
  FiMapPin,
  FiStar,
  FiUsers,
} from 'react-icons/all';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  Container,
  Content,
  ProfileCard,
  ProfileInformation,
  PhotoColumn,
  ChartContainer,
  ContainerCenter,
  SimpleCard,
} from './styles';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useProfile } from '../../hooks/profile';
import { Row } from '../../components/Row';
import Button from '../../components/Button';
import { TextWithIcon } from '../../components/TextWithIcon';
import { LanguagesChart } from '../../components/LanguagesChart';
import { Title } from '../../components/Title';
import TextArea from '../../components/TextArea';

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack } = useHistory();
  const { profile, repos, getProfile, loading, clearProfile } = useProfile();
  const { username } = useParams();

  useEffect(() => {
    if ((!profile && loading) || profile.login !== username) {
      getProfile({ username });
    }
  }, [getProfile, profile, loading, username]);

  if (loading || !profile || !repos) {
    return (
      <ContainerCenter>
        <LoadingSpinner />
      </ContainerCenter>
    );
  }

  const handleGoBack = (): void => {
    clearProfile();
    goBack();
  };

  return (
    <Container>
      <Content>
        <Button onClick={handleGoBack}>Voltar</Button>
        <ProfileCard>
          <PhotoColumn>
            <img src={profile.avatar_url} alt="avatar" />
          </PhotoColumn>

          <ProfileInformation>
            <Title>{profile.name}</Title>
            <span className="username">{profile.login}</span>

            {profile.location && (
              <TextWithIcon>
                <FiMapPin />
                <span>{profile.location}</span>
              </TextWithIcon>
            )}
            <Row>
              <TextWithIcon>
                <FiUsers />
                <span>{`${profile.followers} followers`}</span>
              </TextWithIcon>
              <TextWithIcon>
                <span>|</span>
                <span>{`${profile.following} following`}</span>
              </TextWithIcon>
            </Row>
            <Row>
              <TextWithIcon>
                <FiBox />
                <span>{`${repos.count} repositories`}</span>
              </TextWithIcon>
            </Row>
            <Row>
              <TextWithIcon>
                <FiStar />
                <span>{`${repos.stargazers_count} stars`}</span>
              </TextWithIcon>
              <TextWithIcon marginLeft="8px">
                <FiUsers />
                <span>{`${repos.watchers_count} watchers`}</span>
              </TextWithIcon>
              <TextWithIcon marginLeft="8px">
                <BiGitRepoForked />
                <span>{`${repos.forks_count} forks`}</span>
              </TextWithIcon>
            </Row>
          </ProfileInformation>
        </ProfileCard>
        <SimpleCard>
          <Title>Most used programming languages (%)</Title>
          <ChartContainer>
            <LanguagesChart data={repos.languages} />
          </ChartContainer>
        </SimpleCard>
        <SimpleCard>
          <Form ref={formRef} onSubmit={() => ({})}>
            <Title>Add note</Title>
            <TextArea name="note" icon={FiBook} />
            <Row full>
              <Button>Save</Button>
              <Button>Clear</Button>
            </Row>
          </Form>
        </SimpleCard>
      </Content>
    </Container>
  );
};

export default Profile;
