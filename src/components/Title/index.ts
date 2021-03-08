import styled from 'styled-components';
import isMobile from '../../utils/isMobile';

export const Title = styled.h1`
  font-size: ${isMobile() ? 18 : 28}px;
`;
