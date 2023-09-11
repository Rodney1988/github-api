import styled from '@emotion/styled';
import { OutlinedInput } from '@mui/material';

export const NameInput = styled(OutlinedInput)`
  height: 30px;
  width: 150px;
  @media only screen and (max-width: 290px) {
    width: 120px;
  }
`;

export const FollowersInput = styled(OutlinedInput)`
  height: 30px;
  width: 150px;
  @media only screen and (max-width: 290px) {
    width: 120px;
  }
`;

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 250px;
  padding-right: 10px;
  margin-top: 5px;
`;
