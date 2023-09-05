import { lazy, Suspense } from 'react';

import { UserProp } from '../../types';

const LazyUser = lazy(() => import('./User'));

/* User component wrapped with React lazy for performance (user can perform large queries)*/

const UserWithSuspense: React.FC<UserProp> = ({ userProp }) => (
  <Suspense fallback={<pre>Loading Repo...</pre>}>
    <LazyUser userProp={userProp} />
  </Suspense>
);

export default UserWithSuspense;
