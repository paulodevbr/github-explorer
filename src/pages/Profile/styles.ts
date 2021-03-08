import styled, { css, keyframes } from 'styled-components';
import { colors } from '../../styles/colors';
import isMobile from '../../utils/isMobile';

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerCenter = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
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
  width: 95%;
  max-width: 700px;
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: ${isMobile() ? 'column' : 'row'};
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
    ${isMobile()
      ? css`
          margin-bottom: 16px;
          height: 140px;
          border-radius: 70px;
        `
      : css`
          height: 240px;
          border-radius: 120px;
        `}
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

export const SimpleCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  background-color: ${colors.primaryLighter};
  animation: ${fromBottom} 1s;
  padding: ${isMobile() ? 12 : 32}px;
  margin-top: ${isMobile() ? 12 : 32}px;
  margin-bottom: 16px;

  form {
    width: 100%;
  }
`;

export const ChartContainer = styled.div`
  height: 600px;
  width: 100%;
`;
