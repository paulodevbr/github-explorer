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
} from './styles';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useProfile } from '../../hooks/profile';
import { Row } from '../../components/Row';
import Button from '../../components/Button';
import { TextWithIcon } from '../../components/TextWithIcon';

const Profile: React.FC = () => {
  const { goBack } = useHistory();
  const { profile, repos, getProfile, loading, clearProfile } = useProfile();
  const { username } = useParams();

  useEffect(() => {
    if (!profile && loading) {
      getProfile({ username });
    }
  }, [getProfile, profile, loading, username]);

  if (loading || !profile || !repos) {
    return (
      <Container>
        <Content>
          <LoadingSpinner />
        </Content>
      </Container>
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
            <h1>{profile.name}</h1>
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
      </Content>
    </Container>
  );
};

export default Profile;
