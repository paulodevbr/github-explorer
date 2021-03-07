import styled, { keyframes } from 'styled-components';
import { shade, lighten } from 'polished';

import signInBackgroundImg from '../../assets/sign-in-background.png';
import { colors } from '../../styles/colors';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
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
