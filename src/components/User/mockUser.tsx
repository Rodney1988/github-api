import { GithubUser } from '../../types/userTypes';

export const mockUser: GithubUser = {
  login: 'dummyUser',
  id: 123,
  node_id: 'node123',
  avatar_url: 'https://dummyurl.com/avatar',
  gravatar_id: 'gravatar123',
  url: 'https://dummyurl.com/user',
  html_url: 'https://dummyurl.com/user/html',
  followers_url: 'https://dummyurl.com/user/followers',
  following_url: 'https://dummyurl.com/user/following',
  gists_url: 'https://dummyurl.com/user/gists',
  starred_url: 'https://dummyurl.com/user/starred',
  subscriptions_url: 'https://dummyurl.com/user/subscriptions',
  organizations_url: 'https://dummyurl.com/user/organizations',
  repos_url: 'https://dummyurl.com/user/repos',
  events_url: 'https://dummyurl.com/user/events',
  received_events_url: 'https://dummyurl.com/user/received_events',
  type: 'dummyType',
  site_admin: false,
  score: 1.0,
};
