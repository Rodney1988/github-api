import { useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

import { fetchGithubUsers } from '../../Api';
import { UserWithSuspense } from '../../components/User/UserWithSuspense';
import { SearchUsersForm } from '../../components/SearchUsersForm/SearchUsersForm';

/* HomePage passes its state as props to SearchUsersform */

export const HomePage = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [followerNum, setFollowerNum] = useState<string>('0');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const searchValueParam = searchParams.get('searchQuery');
  const followerCountParam = searchParams.get('followerNum');

  /* UseEffect in case the submitted state gets reset */

  // useEffect(() => {
  //   if (!!searchValueParam && !!followerCountParam) {
  //     setSubmitted(true);
  //   }
  // }, [searchValueParam, followerCountParam]);

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

  /* SearchUsersForm gets the state props from the HomePage parent */

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div style={{ marginLeft: '15px' }}>
        <h3 aria-label="Search Header">Search for a profile below:</h3>
        <SearchUsersForm
          userInput={userInput}
          setUserInput={setUserInput}
          followerNum={followerNum}
          setFollowerNum={setFollowerNum}
          setSubmitted={setSubmitted}
        />
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
