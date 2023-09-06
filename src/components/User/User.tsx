import { useState } from 'react';
import { useQuery } from 'react-query';
import DownArrowIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import UpArrowIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { CircularProgress } from '@mui/material';
import Star from '@mui/icons-material/Star';

import { GithubRepo, UserProp } from '../../types';
import { getRepos } from '../../Api';
import {
  StyledExpandableDiv,
  StyledGithubUser,
  StyledHead,
  StyledIconContainer,
  StyledRepoBox,
  StyledStarContainer,
} from './User.styled';

/* User renders each User box which is looped from its parent HomePage component */

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
        /* this state was used to check when the user had no repositories at the end of the query */
        setQueryIsFinished(true);
      },
    }
  );

  function truncateString(string: string, number: number): string {
    if (string.length > number) {
      return string.slice(0, number) + '...';
    } else {
      return string;
    }
  }

  let reposDataModified = reposData || [];
  /* In case of alternate response, so the app doesn't crash */
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
    arrowJSXIcon = isExpanded ? <UpArrowIcon /> : <DownArrowIcon />;
  }
  if (isError) {
    arrowJSXIcon = <></>;
    loadingPre = (
      <pre style={{ marginLeft: '15px' }}>Error loading repositories</pre>
    );
  }
  if (queryIsFinished) {
    if (reposDataModified.length === 0) {
      arrowJSXIcon = '(no repos)';
    }
  }

  return (
    <StyledGithubUser onClick={() => setIsExpanded(!isExpanded)}>
      <StyledHead>
        <h4 data-testid="title" style={{ marginLeft: '15px' }}>
          Github User - {truncateString(userProp.login, 14)}
        </h4>
        <StyledIconContainer>{arrowJSXIcon}</StyledIconContainer>
      </StyledHead>

      <StyledExpandableDiv expanded={isExpanded}>
        {
          <>
            {reposData
              ? reposDataModified.map((repo: GithubRepo) => {
                  const starsCount = repo.stargazers_count;
                  const maxDescriptionLength = 38;
                  const repoName = repo.name;
                  let repoDescription = repo.description;

                  if (
                    repoDescription &&
                    repoDescription.startsWith(':symbols:')
                  ) {
                    repoDescription = repoDescription?.slice(
                      9,
                      maxDescriptionLength
                    );
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
                        {!!starsCount && (
                          <StyledStarContainer>
                            <p
                              style={{
                                display: 'inline',
                                padding: '0',
                                margin: '0',
                                fontSize: '13px',
                              }}
                            >
                              {starsCount}
                            </p>
                            <Star
                              fontSize="small"
                              sx={{
                                transform: 'translateY(2px)',
                                height: '13px',
                              }}
                            />
                          </StyledStarContainer>
                        )}
                        <pre
                          style={{
                            fontWeight: 'bold',
                            maxWidth: '90%',
                          }}
                        >
                          {truncateString(repoName, 23)}
                        </pre>
                        <pre
                          style={{
                            maxWidth: '90%',
                          }}
                        >
                          {repoDescription
                            ? `Description: ${truncateString(
                                repoDescription,
                                38
                              )}`
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

/* Exported as default User to be used as a react lazy component */

export default User;
