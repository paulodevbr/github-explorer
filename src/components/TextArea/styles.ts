import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';
import { colors } from '../../styles/colors';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;

  padding: 16px;
  min-height: 200px;
  width: 100%;

  color: #666360;
  border: 2px solid #232129;

  display: flex;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: ${colors.accent};
      border-color: ${colors.accent};
    `}
  ${props =>
    props.isFilled &&
    css`
      color: ${colors.accent};
    `}

  & + div {
    margin-top: 8px;
  }

  textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: #f4ede8;
    height: 190px;

    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
