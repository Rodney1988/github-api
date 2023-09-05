import { useState } from 'react';
import { useQuery } from 'react-query';
import DownArrowIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import UpArrowIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { CircularProgress } from '@mui/material';

import { GithubRepo, UserProp } from '../../types';
import { getRepos } from '../../Api';
import {
  StyledExpandableDiv,
  StyledGithubUser,
  StyledHead,
  StyledIconContainer,
  StyledRepoBox,
} from './User.styled';

const User: React.FC<UserProp> = ({ userProp }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [queryIsFinished, setQueryIsFinished] = useState<boolean>(false);

  const {
    data: reposData,
    isLoading,
    isError,
  } = useQuery(
    ['userRepos', userProp.id],
    async () => {
      const data = getRepos(userProp.repos_url);
      return data;
    },
    {
      onSuccess: () => {
        setQueryIsFinished(true);
      },
    }
  );

  let reposDataModified = reposData || [];
  if (!Array.isArray(reposDataModified)) {
    reposDataModified = [];
  }

  let arrowJSXIcon;
  let loadingPre = (
    <pre style={{ marginLeft: '15px' }}>Loading Repository...</pre>
  );

  if (isLoading) {
    arrowJSXIcon = <CircularProgress size={20} aria-label="Loading" />;
  } else {
    arrowJSXIcon = isExpanded ? <DownArrowIcon /> : <UpArrowIcon />;
  }
  if (isError) {
    arrowJSXIcon = <></>;
    loadingPre = (
      <pre style={{ marginLeft: '15px' }}>Error loading repositories</pre>
    );
  }
  if (queryIsFinished) {
    if (reposDataModified.length === 0) {
      arrowJSXIcon = <></>;
    }
  }

  return (
    <StyledGithubUser onClick={() => setIsExpanded(!isExpanded)}>
      <StyledHead>
        <h4 data-testid="title" style={{ marginLeft: '15px' }}>
          User: {userProp.login}
        </h4>
        <StyledIconContainer>{arrowJSXIcon}</StyledIconContainer>
      </StyledHead>

      <StyledExpandableDiv expanded={isExpanded}>
        {
          <>
            {reposData
              ? reposDataModified.map((repo: GithubRepo) => {
                  const maxLength = 60;
                  let repoDescription = repo.description;

                  if (repoDescription && repoDescription.length > maxLength) {
                    repoDescription =
                      repoDescription.slice(0, maxLength) + '...';
                  }
                  if (
                    repoDescription &&
                    repoDescription.startsWith(':symbols:')
                  ) {
                    repoDescription =
                      repoDescription?.slice(9, maxLength) + '...';
                  }
                  return (
                    <div
                      key={repo.id}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '15px 15px 15px 15px',
                        height: '110px',
                      }}
                    >
                      <StyledRepoBox key={repo.id}>
                        <pre style={{ fontWeight: 'bold' }}>
                          Repo: {repo.name}
                        </pre>
                        <pre>
                          {repo.description
                            ? `Description: ${repoDescription}`
                            : 'No Description'}
                        </pre>
                      </StyledRepoBox>
                    </div>
                  );
                })
              : loadingPre}
          </>
        }
      </StyledExpandableDiv>
    </StyledGithubUser>
  );
};

export default User;
