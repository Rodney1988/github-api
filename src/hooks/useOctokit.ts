import { Octokit } from 'octokit';

import { useState } from 'react';
import { GithubUser } from '../types/userTypes';
import { GithubRepo } from '../types/repoTypes';

export const useOctokit = () => {
  const [gitHubUsersError, setGitHubUsersError] = useState<string>('');
  const [gitHubReposError, setGitHubReposError] = useState<string>('');

  const octokit = new Octokit();

  const fetchGithubUsers = async (
    name: string | null,
    followers: string | null
  ) => {
    try {
      const usersResponse = await octokit.rest.search.users({
        q: `${name}+followers:${followers}`,
        per_page: 5,
      });
      return usersResponse.data.items as GithubUser[];
    } catch (error) {
      if (error instanceof Error) {
        setGitHubUsersError(error.message);
      }
    }
  };

  const getRepos = async (name: string, page: number) => {
    try {
      const response = await octokit.rest.repos.listForUser({
        username: name,
        per_page: 2,
        page: page,
      });
      return response.data as GithubRepo[];
    } catch (error) {
      if (error instanceof Error) {
        setGitHubReposError(error.message);
      }
      return [] as GithubRepo[];
    }
  };

  return { fetchGithubUsers, gitHubUsersError, getRepos, gitHubReposError };
};
