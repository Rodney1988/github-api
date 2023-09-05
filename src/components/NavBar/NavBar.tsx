import {
  StyledLogo,
  StyledNavLinkStyled,
  StyledNavMenu,
  StyledNavMenuItem,
  StyledNavbarContainer,
} from './NavBar.styled';

export const NavBar = () => {
  return (
    <StyledNavbarContainer>
      <StyledLogo to="/" aria-label="Home">
        Github API
      </StyledLogo>
      <StyledNavMenu>
        <StyledNavMenuItem>
          <StyledNavLinkStyled to="/" aria-label="Home">
            Home
          </StyledNavLinkStyled>
        </StyledNavMenuItem>
        <StyledNavMenuItem>
          <StyledNavLinkStyled to="/instructions" aria-label="Instructions">
            Instructions
          </StyledNavLinkStyled>
        </StyledNavMenuItem>
      </StyledNavMenu>
    </StyledNavbarContainer>
  );
};
