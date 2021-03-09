import styled, { keyframes } from 'styled-components';
import { colors } from '../../styles/colors';
import isMobile from '../../utils/isMobile';

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
  padding: ${isMobile() ? 12 : 16}px;
  margin-top: ${isMobile() ? 12 : 32}px;
  margin-bottom: 16px;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
