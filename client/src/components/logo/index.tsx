import type React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
`;

const LogoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: ${(props) => props.theme.colors.primary};
`;

const LogoText = styled.span`
  white-space: nowrap;
`;

interface LogoProps {
  collapsed?: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <LogoContainer to='/'>
      <LogoIcon>
        <img src='./public/Vector.png' alt='MathGenius' />
      </LogoIcon>
      {!collapsed && <LogoText>MathGenius</LogoText>}
    </LogoContainer>
  );
};

export default Logo;
