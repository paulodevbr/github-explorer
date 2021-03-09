import styled, { css } from 'styled-components';
import isMobile from '../../utils/isMobile';

interface Props {
  marginBottom?: string;
}

export const Title = styled.h1<Props>`
  font-size: ${isMobile() ? 18 : 28}px;
  ${props =>
    props.marginBottom &&
    css`
      margin-bottom: ${props.marginBottom}px;
    `}
`;
