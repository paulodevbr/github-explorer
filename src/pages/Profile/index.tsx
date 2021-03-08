import React, { useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import {
  BiGitRepoForked,
  FiBox,
  FiMapPin,
  FiStar,
  FiUsers,
} from 'react-icons/all';
import {
  Container,
  Content,
  ProfileCard,
  ProfileInformation,
  PhotoColumn,
  LanguagesCard,
  ChartContainer,
  ContainerCenter,
} from './styles';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useProfile } from '../../hooks/profile';
import { Row } from '../../components/Row';
import Button from '../../components/Button';
import { TextWithIcon } from '../../components/TextWithIcon';
import { LanguagesChart } from '../../components/LanguagesChart';
import { Title } from '../../components/Title';

const Profile: React.FC = () => {
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
        <LanguagesCard>
          <Title>Most used programming languages (%)</Title>
          <ChartContainer>
            <LanguagesChart data={repos.languages} />
          </ChartContainer>
        </LanguagesCard>
      </Content>
    </Container>
  );
};

export default Profile;
