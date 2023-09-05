import { GithubUser } from '../../types';

export const User = ({ userProp }: { userProp: GithubUser }) => {
  return (
    <div>
      <h4 style={{ marginLeft: '15px', border: '1px dashed blue' }}>
        User: {userProp.login}
      </h4>
    </div>
  );
};
