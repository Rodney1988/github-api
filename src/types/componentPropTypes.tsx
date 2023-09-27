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
  followerNum: string;
  setFollowerNum: React.Dispatch<React.SetStateAction<string>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}
