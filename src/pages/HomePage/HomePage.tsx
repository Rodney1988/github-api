import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Button, CircularProgress, OutlinedInput } from '@mui/material';

import { User } from '../../components/User/User';
import { getGithub } from '../../Api';

export const HomePage = () => {
  const [input, setInput] = useState<string>('');
  const [followerNum, setFollowerNum] = useState<string>('0');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValueParam = searchParams.get('searchQuery');
  const followerCountParam = searchParams.get('followerNum');

  useEffect(() => {
    if (!!searchValueParam && !!followerCountParam) {
      setSubmitted(true);
    }
  }, [searchValueParam, followerCountParam]);

  const { data, isLoading, isError, error } = useQuery(
    ['githubUsers', searchValueParam, followerCountParam],
    () => getGithub(searchValueParam, followerCountParam),
    {
      enabled: submitted && !!searchValueParam && !!followerCountParam,
      onSuccess: () => {
        setInput('');
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
      searchQuery: input ? input : '0',
      followerNum: followerNum ? followerNum : '0',
    });
    setSubmitted(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setSearchParams({
        searchQuery: input ? input : '0',
        followerNum: followerNum ? followerNum : '0',
      });
      setSubmitted(true);
    }
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ marginLeft: '15px' }}>
        <h3 aria-label="Search Header">
          Search for a profile below, max 5 users should appear
        </h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
          aria-label="Search Form"
        >
          <label aria-label="GitHub Name Label">
            GitHub Name:
            <OutlinedInput
              sx={{ height: '30px', marginTop: '10px', marginLeft: '15px' }}
              type="text"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="GitHub Name Input"
            />
          </label>
          <label aria-label="Followers Label">
            Followers (min):
            <OutlinedInput
              sx={{ height: '30px', marginTop: '10px', marginLeft: '2px' }}
              type="number"
              onChange={(e) => setFollowerNum(e.target.value)}
              aria-label="Followers Input"
            ></OutlinedInput>
          </label>
          <Button
            disabled={!input}
            type="submit"
            style={{ width: '200px', marginTop: '15px' }}
            aria-label="Search Button"
            variant="contained"
          >
            Search Accounts
          </Button>
        </form>
      </div>
      <div>
        {data?.length === 0 ? (
          <pre aria-label="No Users Found">No Users found</pre>
        ) : (
          data?.map((user) => <User userProp={user} key={user.id} />)
        )}
      </div>
    </div>
  );
};
