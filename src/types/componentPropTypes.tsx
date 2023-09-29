import { GithubUser } from './userTypes';

export interface StyledGithubUserProps {
  expanded: boolean;
}
export interface UserProp {
  userProp: GithubUser;
}
export interface SearchUsersFormProps {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  userInputParam: string | null;
  followerNum: string;
  setFollowerNum: React.Dispatch<React.SetStateAction<string>>;
  followerCountParam: string | null;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}
