import { useCallback, useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CircularProgress } from '@mui/material';
import Star from '@mui/icons-material/Star';
import ArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { getRepos } from '../../Api';
import * as S from './User.styled';
import { UserProp } from '../../types/componentPropTypes';

/* User renders each User box which is looped from its parent HomePage component */

const User: React.FC<UserProp> = ({ userProp }) => {
  const expContainerRef = useRef<HTMLDivElement | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const {
    data: reposData,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery(
    ['userRepos', userProp.id],
    ({ pageParam = 1 }) => getRepos(userProp.login, pageParam),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage =
          lastPage.length === 2 ? allPages.length + 1 : undefined;
        return nextPage;
      },
    }
  );

  let arrowJSXIcon;
  let loadingJSX = <></>;
  let errorJSX = <></>;

  if (isLoading) {
    loadingJSX = (
      <pre style={{ marginLeft: '15px' }}>Loading Repository...</pre>
    );
    arrowJSXIcon = <CircularProgress size={20} aria-label="Loading" />;
  } else {
    loadingJSX = <></>;
    arrowJSXIcon = isExpanded ? <S.UpArrowIcon /> : <S.DownArrowIcon />;
  }
  if (isError) {
    arrowJSXIcon = <></>;
    errorJSX = <S.ErrorP>{`Error getting Repos - ${error}`}</S.ErrorP>;
  }

  const reposDataFlattened = reposData?.pages.flat();

  if (reposDataFlattened?.length === 0) {
    arrowJSXIcon = '(no repos)';
  }

  const onScroll = useCallback(() => {
    if (expContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = expContainerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage]);

  useEffect(() => {
    const expElement = expContainerRef.current;

    if (expElement) {
      expElement.addEventListener('scroll', onScroll);

      // Clean-up on unmount
      return () => {
        expElement.removeEventListener('scroll', onScroll);
      };
    }
  }, [onScroll]);

  return (
    <S.GithubUser>
      <S.Head>
        <S.H4 data-testid="title">Github User - {userProp.login}</S.H4>
        <S.IconContainer onClick={() => setIsExpanded(!isExpanded)}>
          {arrowJSXIcon}
        </S.IconContainer>
      </S.Head>

      <S.ExpandableDiv expanded={isExpanded} ref={expContainerRef}>
        {loadingJSX}
        {errorJSX}
        {
          <>
            {reposDataFlattened?.map(
              ({ name, stargazers_count, description, id }) => {
                const repoNameWithFB = name || 'No Name';
                let repoDescriptionWithFB =
                  description || 'No description given.';
                if (
                  repoDescriptionWithFB &&
                  repoDescriptionWithFB.startsWith(':symbols:')
                ) {
                  repoDescriptionWithFB = repoDescriptionWithFB?.slice(9);
                }
                return (
                  <div
                    key={id}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '15px 15px 15px 15px',
                      height: '110px',
                    }}
                  >
                    <S.RepoBox key={id}>
                      {!!stargazers_count && (
                        <S.StarContainer>
                          <p
                            style={{
                              display: 'inline',
                              padding: '0',
                              margin: '0',
                              fontSize: '13px',
                            }}
                          >
                            {stargazers_count}
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
                      <S.RepoTitle>{repoNameWithFB}</S.RepoTitle>
                      <S.repoDescription>
                        {repoDescriptionWithFB}
                      </S.repoDescription>
                    </S.RepoBox>
                  </div>
                );
              }
            )}
          </>
        }
      </S.ExpandableDiv>
      {hasNextPage && isExpanded && (
        <ArrowDown
          fontSize="large"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            marginLeft: '-17.5px',
          }}
        />
      )}
    </S.GithubUser>
  );
};

/* As of now, must export as default User for React lazy component to work */

export default User;
