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
  ChartContainer,
  ContainerCenter,
  ProfileButtom,
} from './styles';

import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useProfile } from '../../hooks/profile';
import { Row } from '../../components/Row';
import Button from '../../components/Button';
import { TextWithIcon } from '../../components/TextWithIcon';
import { LanguagesChart } from '../../components/LanguagesChart';
import { Title } from '../../components/Title';
import { SimpleCard } from '../../components/SimpleCard';
import { NotesSection } from './components/NotesSection';
import { useScroll } from '../../hooks/scroll';
import { ActionButton } from './components/NotesSection/styles';
import { useNotes } from '../../hooks/notes';

const Profile: React.FC = () => {
  const { goBack } = useHistory();
  const { username } = useParams();
  const { profile, repos, getProfile, loading, clearProfile } = useProfile();
  const { scrollToComponent } = useScroll();
  const { notes } = useNotes();

  const userHasNotes = notes && notes.length > 0;

  useEffect(() => {
    getProfile({ username });

    return () => clearProfile();
  }, []);

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
        <Button onClick={handleGoBack}>Go back</Button>
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
            <Row withSpaceBetween width="100%">
              <ProfileButtom onClick={() => scrollToComponent('create-note')}>
                New note
              </ProfileButtom>
              {userHasNotes && (
                <ProfileButtom onClick={() => scrollToComponent('create-note')}>
                  Show notes
                </ProfileButtom>
              )}
            </Row>
          </ProfileInformation>
        </ProfileCard>
        <SimpleCard>
          <Title>Most used programming languages (%)</Title>
          <ChartContainer>
            <LanguagesChart data={repos.languages} />
          </ChartContainer>
        </SimpleCard>
        <NotesSection />
      </Content>
    </Container>
  );
};

export default Profile;
