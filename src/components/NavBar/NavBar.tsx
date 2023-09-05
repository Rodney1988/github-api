import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  StyledLogo,
  StyledNavLinkStyled,
  StyledNavMenu,
  StyledNavMenuItem,
  StyledNavbarContainer,
  StyledHamburgerMenu,
  StyledHamburgerBottom,
  StyledHamburgerUl,
  StyledHamburgerLi,
} from './NavBar.styled';

export const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

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
      <StyledHamburgerMenu
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid="hamburger-button"
      >
        <MenuIcon sx={{ color: '#f2f2f2' }} />
        {isExpanded && (
          <StyledHamburgerBottom data-testid="expanded-section">
            <StyledHamburgerUl>
              <StyledHamburgerLi>
                <StyledNavLinkStyled to="/" aria-label="Home">
                  Home
                </StyledNavLinkStyled>
              </StyledHamburgerLi>
              <StyledHamburgerLi>
                <StyledNavLinkStyled
                  to="/instructions"
                  aria-label="Instructions"
                >
                  Instructions
                </StyledNavLinkStyled>
              </StyledHamburgerLi>
            </StyledHamburgerUl>
          </StyledHamburgerBottom>
        )}
      </StyledHamburgerMenu>
    </StyledNavbarContainer>
  );
};
