import styled, { keyframes } from 'styled-components';
import { colors } from '../../styles/colors';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  border: 16px solid ${colors.primaryLighter};
  border-radius: 50%;
  border-top: 16px solid ${colors.accent};
  width: 120px;
  height: 120px;
  -webkit-animation: ${spin} 0.8s linear infinite; /* Safari */
  animation: ${spin} 0.8s linear infinite;
`;
