import styled from 'styled-components';

const getScreenPosition = (): number => window.scrollY;

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: ${getScreenPosition}px;
  padding: 30px;
  overflow: hidden;
`;
