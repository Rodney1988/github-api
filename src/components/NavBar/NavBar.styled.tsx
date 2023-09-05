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

export const StyledHamburgerMenu = styled.div`
  // position: relative;
  @media only screen and (min-width: 768px) {
    display: none;
  }
`;

export const StyledHamburgerBottom = styled.div`
  position: absolute;
  top: 36px;
  right: 0;
  background: #282626f2;
  border-radius: 2px;
  li {
    border-bottom: 0.5px dashed #4c4848;
  }
`;

export const StyledHamburgerUl = styled.ul`
  list-style: none;
  padding: 30px 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
`;

export const StyledHamburgerLi = styled.li`
  margin: 12px 0;
`;
