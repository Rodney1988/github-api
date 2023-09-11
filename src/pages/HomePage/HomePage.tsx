import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';

import { fetchGithubUsers } from '../../Api';
import UserWithSuspense from '../../components/User/UserWithSuspense';
import * as S from './HomePage.styled';

/* HomePage renders a form and the result of the form query (Github users) */

export const HomePage = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [followerNum, setFollowerNum] = useState<string>('0');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValueParam = searchParams.get('searchQuery');
  const followerCountParam = searchParams.get('followerNum');

  /* UseEffect in case the submitted state gets reset */

  useEffect(() => {
    if (!!searchValueParam && !!followerCountParam) {
      setSubmitted(true);
    }
  }, [searchValueParam, followerCountParam]);

  const { data, isLoading, isError, error } = useQuery(
    ['fetchGithubUsers', searchValueParam, followerCountParam],
    () => fetchGithubUsers(searchValueParam, followerCountParam),
    {
      enabled: submitted && !!searchValueParam && !!followerCountParam,
      onSuccess: () => {
        setUserInput('');
        setFollowerNum('');
      },
    }
  );

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '200px',
        }}
      >
        <CircularProgress aria-label="Loading" />
      </div>
    );
  }

  if (isError) {
    const issue: Error | null = error as Error;
    return (
      <pre aria-label="Error with books query">
        Error with fetching the books query: {issue.message}
      </pre>
    );
  }

  if (!data && !!searchValueParam) {
    return (
      <pre aria-label="Error">Something went wrong with the data fetching</pre>
    );
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({
      searchQuery: userInput ? userInput : '',
      followerNum: followerNum ? followerNum : '0',
    });
    setSubmitted(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setSearchParams({
        searchQuery: userInput ? userInput : '',
        followerNum: followerNum ? followerNum : '0',
      });
      setSubmitted(true);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ marginLeft: '15px' }}>
        <h3 aria-label="Search Header">Search for a profile below:</h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          aria-label="Search Form"
        >
          <S.Label aria-label="GitHub Name Label">
            Name:
            <S.NameInput
              type="text"
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="GitHub Name Input"
            />
          </S.Label>
          <S.Label aria-label="Followers Label">
            Followers:
            <S.FollowersInput
              type="number"
              onChange={(e) => setFollowerNum(e.target.value)}
              aria-label="Followers Input"
            ></S.FollowersInput>
          </S.Label>
          <Button
            disabled={!userInput}
            type="submit"
            style={{ width: '160px', marginTop: '15px' }}
            aria-label="Search Button"
            variant="contained"
          >
            Search Users
          </Button>
        </form>
      </div>
      <div>
        {data?.length === 0 ? (
          <pre style={{ marginLeft: '15px' }} aria-label="No Users Found">
            No Users found
          </pre>
        ) : (
          data?.map((user) => (
            <UserWithSuspense userProp={user} key={user.id} />
          ))
        )}
      </div>
    </div>
  );
};
