import { Link } from 'react-router-dom';

import { StyledDivContainer } from './Instructions.styled';

export const Instructions = () => {
  return (
    <StyledDivContainer aria-label="Instructions about this application">
      <h3>Instructions</h3>
      <div style={{ maxWidth: '500px' }}>
        <p>
          In this relatively simple app, you can write down any Github username
          in the <Link to="/">home input form</Link>. Doing so should render a
          maximum of 5 user accounts. It is also possible to select users based
          on their popularity, or as in Github, their 'follower' count.
        </p>
        <p>
          After rendering the Github users, you will be displayed clickeable
          cards which expand their repository and use React lazy to request the
          data of the respective user's repository, and on expanding the user
          boxes, the users repositories should be listed.
        </p>
      </div>
    </StyledDivContainer>
  );
};
