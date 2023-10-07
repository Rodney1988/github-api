import styled from '@emotion/styled';
import { Button, OutlinedInput } from '@mui/material';

export const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 250px;
  padding-right: 10px;
  margin-top: 5px;
`;

export const InputField = styled(OutlinedInput)`
  height: 30px;
  width: 150px;
  @media only screen and (max-width: 290px) {
    width: 120px;
  }
`;

export const SubmitButton = styled(Button)`
  margin: 15px 15px 15px 0;
  width: 160px;
`;

export const ExtraTextDiv = styled.div`
  margin-top: 10px;
`;
