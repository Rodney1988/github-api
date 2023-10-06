import { Octokit } from 'octokit';
import { GithubUser } from './types/userTypes';
import { GithubRepo } from './types/repoTypes';

const octokit = new Octokit();

export const fetchGithubUsers = async (
  name: string | null,
  followers: string | null
) => {
  const usersResponse = await octokit.rest.search.users({
    q: `${name}+followers:${followers}`,
    per_page: 5,
  });
  return usersResponse.data.items as GithubUser[];
};

export const getRepos = async (name: string, page: number) => {
  const response = await octokit.rest.repos.listForUser({
    username: name,
    per_page: 2,
    page: page,
  });
  return response.data as GithubRepo[];
};

export const signUp = async (email: string, password: string) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, returnSecureToken: true }),
  });

  const responseData = await response.json();
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(`Error 400: ${responseData.error.message}`);
    } else {
      throw new Error('Unknown error occurred');
    }
  }
  return responseData;
};
