import { Octokit } from 'octokit';
import { GithubUser } from './types';

const octokit = new Octokit();

export const getGithub = async (
  name: string | null,
  followers: string | null
) => {
  const usersResponse = await octokit.rest.search.users({
    q: `${name}+followers:>${followers}`,
    per_page: 5,
  });
  return usersResponse.data.items as GithubUser[];
};
