import { useState } from 'react';
import { useQuery } from 'react-query';
import DownArrowIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import UpArrowIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { CircularProgress } from '@mui/material';
import Star from '@mui/icons-material/Star';

import { getRepos } from '../../Api';
import * as S from './User.styled';
import { UserProp } from '../../types/componentPropTypes';
import { GithubRepo } from '../../types/repoTypes';

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
    () => {
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
    <S.GithubUser onClick={() => setIsExpanded(!isExpanded)}>
      <S.Head>
        <S.H4 data-testid="title">Github User - {userProp.login}</S.H4>
        <S.IconContainer>{arrowJSXIcon}</S.IconContainer>
      </S.Head>

      <S.ExpandableDiv expanded={isExpanded}>
        {
          <>
            {reposData
              ? reposDataModified.map((repo: GithubRepo) => {
                  const starsCount = repo.stargazers_count;
                  const repoName = repo.name;
                  let repoDescription =
                    repo.description || 'No description given.';
                  if (
                    repoDescription &&
                    repoDescription.startsWith(':symbols:')
                  ) {
                    repoDescription = repoDescription?.slice(9);
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
                      <S.RepoBox key={repo.id}>
                        {!!starsCount && (
                          <S.StarContainer>
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
                          </S.StarContainer>
                        )}
                        <S.RepoTitle>{repoName}</S.RepoTitle>
                        <S.repoDescription>{repoDescription}</S.repoDescription>
                      </S.RepoBox>
                    </div>
                  );
                })
              : loadingPre}
          </>
        }
      </S.ExpandableDiv>
    </S.GithubUser>
  );
};

/* As of now, must export as default User for React lazy component to work */

export default User;
