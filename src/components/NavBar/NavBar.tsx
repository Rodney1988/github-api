import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

import * as S from './NavBar.styled';
import { useAuth } from '../../hooks/useAuth';

export const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { userToken } = useAuth();
  return (
    <S.NavbarContainer>
      <S.Logo to="/" aria-label="Home">
        Github API
      </S.Logo>
      <S.NavMenu>
        <S.NavMenuItem>
          <S.NavLinkStyled to="/" aria-label="Home">
            Home
          </S.NavLinkStyled>
        </S.NavMenuItem>
        <S.NavMenuItem>
          <S.NavLinkStyled to="/instructions" aria-label="Instructions">
            Instructions
          </S.NavLinkStyled>
        </S.NavMenuItem>
        {userToken && (
          <S.MuiLogoutButton
            aria-label="Search Button"
            variant="contained"
            sx={{
              background: '#eaeaea',
              color: 'black',
              '&:hover': {
                background: '#3D4145',
                color: 'white',
              },
            }}
          >
            Logout
          </S.MuiLogoutButton>
        )}
      </S.NavMenu>
      <S.HamburgerMenu
        onClick={() => setIsExpanded(!isExpanded)}
        data-testid="hamburger-button"
      >
        <MenuIcon sx={{ color: '#f2f2f2' }} />
        {isExpanded && (
          <S.HamburgerBottom data-testid="expanded-section">
            <S.HamburgerUl>
              <S.HamburgerLi>
                <S.NavLinkStyled to="/" aria-label="Home">
                  Home
                </S.NavLinkStyled>
              </S.HamburgerLi>
              <S.HamburgerLi>
                <S.NavLinkStyled to="/instructions" aria-label="Instructions">
                  Instructions
                </S.NavLinkStyled>
              </S.HamburgerLi>
              {userToken && (
                <S.MuiLogoutButtonHambuger variant="text">
                  Logout
                </S.MuiLogoutButtonHambuger>
              )}
            </S.HamburgerUl>
          </S.HamburgerBottom>
        )}
      </S.HamburgerMenu>
    </S.NavbarContainer>
  );
};
