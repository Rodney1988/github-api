import styled from '@emotion/styled';
import { StyledGithubUserProps } from '../../types';

export const StyledHead = styled.div`
  border: '1px solid blue';
  background: #b0aeae;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 15px;
`;

export const StyledRepoBox = styled.div`
  position: relative;
  background: #e0e0e0;
  width: 300px;
  padding-left: 15px;
  pre {
    text-wrap: wrap;
    font-family: monospace;
  }
`;

export const StyledGithubUser = styled.div`
  max-width: 300px;
  background: white;
  margin: 15px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    background-color: #fcf9f9;
  }
`;

export const StyledExpandableDiv = styled.div<StyledGithubUserProps>`
  max-height: ${({ expanded }) => (expanded ? '258px' : '0px')};
  overflow: scroll;
  transition: max-height 0.3s ease-in-out;
`;

export const StyledStarContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;
