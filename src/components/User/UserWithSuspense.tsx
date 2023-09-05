import { lazy, Suspense } from 'react';
import { UserProp } from '../../types';

const LazyUser = lazy(() => import('./User'));

// Wrap the LazyUser component with Suspense
const UserWithSuspense: React.FC<UserProp> = ({ userProp }) => (
  <Suspense fallback={<pre>Loading Repo...</pre>}>
    <LazyUser userProp={userProp} />
  </Suspense>
);

export default UserWithSuspense;
