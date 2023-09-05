import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

export const StyledNavbarContainer = styled.nav`
  background-color: #010409;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

export const StyledLogo = styled(NavLink)`
  font-size: 1.5rem;
  color: white;
  text-decoration: none;
`;

export const StyledNavMenu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
`;

export const StyledNavMenuItem = styled.li`
  margin: 0 15px;
  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

export const StyledNavLinkStyled = styled(NavLink)`
  color: white;
  text-decoration: none;
  transition: color 0.3s;
  list-style: none;

  &:hover {
    color: lightblue;
  }

  &.active {
    font-weight: bold;
    color: lightblue;
  }
`;
