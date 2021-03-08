import styled, { keyframes } from 'styled-components';
import { shade, lighten } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const fromUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  margin-top: 32px;
  margin-bottom: 32px;
  width: 100%;
  max-width: 80%;
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  border-radius: 20px;
  background-color: ${colors.primaryLighter};
  animation: ${fromUp} 1s;
  padding: 32px;
  margin-top: 32px;
`;

export const PhotoColumn = styled.div`
  display: flex;
  flex-direction: column;

  img {
    height: 240px;
    border-radius: 120px;
  }

  div {
    display: flex;
    margin-top: 32px;
    flex: 1;
    width: 100%;
    justify-content: flex-start;

    span {
      margin-left: 8px;
    }
  }
`;

export const ProfileInformation = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10%;

  h1 {
    font-size: 32px;
  }

  span.username {
    font-weight: bold;
    color: ${colors.textLighter};
  }

  p {
    font-weight: lighter;
    margin-top: 18px;
    margin-bottom: 18px;
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  animation: ${fromUp} 1s;

  form {
    margin: 80px 0;
    width: 100%;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
  }

  > a {
    color: #ff9000;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, '#ff9000')};
    }
  }
`;

const fromBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SearchResults = styled.div`
  width: 100%;
  animation: ${fromBottom} 1s;
`;

const changeColor = keyframes`
  from {
    transform: translateY(0);
    background-color: ${colors.primaryLighter};
  }
  to {
    transform: translateY(-4px);
    background-color: ${lighten(0.05, colors.primaryLighter)};
  }
`;

export const UserFromSearch = styled.div`
  margin-top: 16px;
  cursor: pointer;
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 18px;
  background-color: ${colors.primaryLighter};
  border-radius: 10px;

  &:hover {
    transform: translateY(-4px);
    animation: ${changeColor} 0.5s;
    background-color: ${lighten(0.05, colors.primaryLighter)};
  }

  img {
    height: 60px;
    border-radius: 30px;
  }

  span {
    color: #f4ede8;
    margin-left: 16px;
    font-size: 20px;
    font-weight: bold;

    &:hover {
      color: ${shade(0.2, '#f4ede8')};
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover;
`;
