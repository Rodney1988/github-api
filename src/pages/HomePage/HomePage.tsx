import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { Alert, CircularProgress } from '@mui/material';

// import { fetchGithubUsers } from '../../Api';
import { UserWithSuspense } from '../../components/User/UserWithSuspense';
import { SearchUsersForm } from '../../components/SearchUsersForm/SearchUsersForm';
import { useOctokit } from '../../hooks/useOctokit';

/* HomePage passes its state as props to SearchUsersform */

export const HomePage = () => {
  const { fetchGithubUsers, gitHubUsersError } = useOctokit();
  const [userInput, setUserInput] = useState<string>('');
  const [followerNum, setFollowerNum] = useState<string>('0');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const userInputParam = searchParams.get('searchQuery');
  const followerCountParam = searchParams.get('followerNum');

  /* UseEffect in case of browser refreshing and the submitted state gets reset, setting setSumitted to true
    forces re-fetch of users with react-query */

  useEffect(() => {
    setSubmitted(true);
  }, [searchParams]);

  const { data, isLoading, isError } = useQuery(
    ['fetchGithubUsers', userInputParam, followerCountParam],
    () => fetchGithubUsers(userInputParam, followerCountParam),
    {
      enabled: submitted && !!userInputParam && !!followerCountParam,
      refetchOnWindowFocus: false,
      retry: 0,
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
    return (
      <div
        style={{ margin: '50px 0 0 10px' }}
        aria-label="Error with users query"
      >
        <Alert severity="error">Error fetching users: {gitHubUsersError}</Alert>
      </div>
    );
  }

  let jsxResult;
  if (data?.length === 0) {
    jsxResult = (
      <pre style={{ marginLeft: '15px' }} aria-label="No Users Found">
        No Users found
      </pre>
    );
  } else {
    jsxResult = data?.map((user) => (
      <UserWithSuspense userProp={user} key={user.id} />
    ));
  }

  /* SearchUsersForm gets the state props from the HomePage parent and returns
    the state to the parent, which is fetched and then displayed in the jsxResult variable */

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h1 aria-label="Welcome to the Homepage GitHub API">
        Welcome to the Github API
      </h1>
      <h3 aria-label="Search Header">Search for a profile below:</h3>
      <SearchUsersForm
        userInput={userInput}
        setUserInput={setUserInput}
        userInputParam={userInputParam}
        followerNum={followerNum}
        setFollowerNum={setFollowerNum}
        followerCountParam={followerCountParam}
        setSubmitted={setSubmitted}
      />

      {/* Results are mapped and inserted below */}
      <div>{jsxResult}</div>
    </div>
  );
};
