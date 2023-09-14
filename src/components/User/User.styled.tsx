import styled from '@emotion/styled';
import DownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import UpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import { StyledGithubUserProps } from '../../types/componentPropTypes';

export const Head = styled.div`
  border: '1px solid blue';
  background: #b0aeae;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
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
  width: 265px;
  padding-left: 15px;
`;

export const GithubUser = styled.div`
  max-width: 300px;
  background: white;
  margin: 15px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    background-color: #fcf9f9;
  }
`;

export const ExpandableDiv = styled.div<StyledGithubUserProps>`
  max-height: ${({ expanded }) => (expanded ? '258px' : '0px')};
  overflow: scroll;
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

export const UpArrowIcon = styled(UpIcon)`
  cursor: pointer;
`;

export const DownArrowIcon = styled(DownIcon)`
  cursor: pointer;
`;
