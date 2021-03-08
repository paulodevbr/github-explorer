import styled, { css } from 'styled-components';
import isMobile from '../../utils/isMobile';

interface Props {
  marginLeft?: string;
}

export const TextWithIcon = styled.div<Props>`
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  ${props =>
    props.marginLeft &&
    css`
      margin-left: ${props.marginLeft};
    `}

  span {
    ${isMobile()
      ? css`
          font-size: 14px;
          margin-left: 4px;
        `
      : css`
          margin-left: 8px;
        `};
  }
`;
