import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { SearchUsersFormProps } from '../../types/componentPropTypes';
import * as S from './SearchUsersForm.styled';
import { useEffect } from 'react';

export const SearchUsersForm: React.FC<SearchUsersFormProps> = ({
  userInput,
  setUserInput,
  userInputParam,
  followerNum,
  setFollowerNum,
  followerCountParam,
  setSubmitted,
}) => {
  const [, setSearchParams] = useSearchParams();

  /* UseEffect in case of browser refreshing and the input states reset, if there are params, add those params
    to the state so that the inputs get automatically filled*/

  useEffect(() => {
    if (userInputParam) {
      setUserInput(userInputParam);
    }
    if (followerCountParam) {
      setFollowerNum(followerCountParam);
    }
  }, [userInputParam, setUserInput, followerCountParam, setFollowerNum]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({
      searchQuery: userInput ? userInput : '',
      followerNum: followerNum ? followerNum : '0',
    });
    setSubmitted(true);
  };

  /* Handle follower input change to prevent negative numbers */
  const handleFollowersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (parseInt(newValue) < 0) {
      setFollowerNum('0');
    } else {
      setFollowerNum(newValue);
    }
  };

  return (
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
          onKeyDown={() => handleSubmit}
          aria-label="GitHub Name Input"
          value={userInput}
        />
      </S.Label>
      <S.Label aria-label="Followers Label">
        Followers:
        <S.FollowersInput
          type="number"
          onChange={handleFollowersChange}
          aria-label="Followers Input"
          value={followerNum}
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
  );
};
