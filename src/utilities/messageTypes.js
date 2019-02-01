import { theme } from '../styled';

export default {
  GENERAL: 1,
  UPDATED: 2,
  REJECTED: 3,
};

export const messageTypeColors = {
  GENERAL: theme.colours.unoBlue,
  UPDATED: theme.colours.yellow,
  REJECTED: theme.colours.red,
};
