import styled from 'styled-components';
import { lighten } from 'polished';
import Button from '../../../../components/Button';
import { SimpleCard } from '../../../../components/SimpleCard';
import { colors } from '../../../../styles/colors';

export const ActionButton = styled(Button)`
  max-width: 100px;
`;

export const NoteCard = styled(SimpleCard)`
  margin-top: 8px;
  margin-bottom: 0;
  span {
    font-size: 12px;
    color: ${lighten(0.3, colors.primaryLighter)};
  }
  p {
    margin-top: 8px;
    text-align: justify;
    text-justify: inter-word;
  }
`;
