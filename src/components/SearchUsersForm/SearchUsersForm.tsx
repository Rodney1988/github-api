import { useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';

import * as S from './SearchUsersForm.styled';

interface SearchUsersFormProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  followerNum: string;
  setFollowerNum: React.Dispatch<React.SetStateAction<string>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SearchUsersForm: React.FC<SearchUsersFormProps> = ({
  userInput,
  setUserInput,
  followerNum,
  setFollowerNum,
  setSubmitted,
}) => {
  const [, setSearchParams] = useSearchParams();
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
  );
};
