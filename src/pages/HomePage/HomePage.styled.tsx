import styled from '@emotion/styled';
import { OutlinedInput } from '@mui/material';

export const StyledNameInput = styled(OutlinedInput)`
  height: 30px;
  margin-top: 10px;
  margin-left: 32px;
  width: 150px;
  @media only screen and (max-width: 290px) {
    width: 120px;
  }
`;

export const StyledFollowersInput = styled(OutlinedInput)`
  height: 30px;
  margin-top: 10px;
  margin-left: 7px;
  width: 150px;
  @media only screen and (max-width: 290px) {
    width: 120px;
  }
`;
