import styled from '@emotion/styled';
import DoubleArrowDown from '@mui/icons-material/KeyboardDoubleArrowDown';
import SingleArrowUp from '@mui/icons-material/KeyboardArrowUp';
import SingleArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { StyledGithubUserProps } from '../../types/componentPropTypes';
import { CircularProgress } from '@mui/material';

export const Head = styled.div`
  background: #b0aeae;
  height: 60px;
  width: 300px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 340px) {
    width: 280px;
  }
  @media only screen and (max-width: 310px) {
    width: 260px;
  }
  @media only screen and (max-width: 285px) {
    width: 250px;
  }
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 15px;
`;

export const RepoBox = styled.div`
  position: relative;
  background: #e0e0e0;
  width: 95%;
  padding-left: 15px;
`;
export const GithubUser = styled.div`
  position: relative;
  max-width: 300px;
  background: white;
  margin: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    background-color: #fcf9f9;
  }
  @media only screen and (max-width: 340px) {
    width: 280px;
  }
  @media only screen and (max-width: 310px) {
    width: 260px;
  }
  @media only screen and (max-width: 285px) {
    width: 250px;
  }
`;

export const ExpandableDiv = styled.div<StyledGithubUserProps>`
  max-height: ${({ expanded }) => (expanded ? '258px' : '0px')};
  overflow: auto;
  transition: max-height 0.3s ease-in-out;
`;

export const StarContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const H4 = styled.h4`
  margin-left: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const RepoTitle = styled.h5`
  font-family: monospace;
  font-size: 14px;
  max-width: 75%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 15px 10px 15px 0;
  padding: 0px;
`;

export const repoDescription = styled.p`
  font-family: monospace;
  max-width: 90%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

export const ErrorP = styled.p`
  font-family: monospace;
  margin-left: 15px;
  ma-width: 90%;
`;

export const UpArrowIcon = styled(SingleArrowUp)`
  cursor: pointer;
`;

export const DownArrowIcon = styled(SingleArrowDown)`
  cursor: pointer;
`;

export const DoubleArrowDownIcon = styled(DoubleArrowDown)`
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -17.5px;
  transform: translateY(40px);
`;

export const ProgressBar = styled(CircularProgress)`
  position: absolute;
  bottom: -35px;
  left: 50%;
  margin-left: -10px;
`;
