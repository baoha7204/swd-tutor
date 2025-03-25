'use client';

import type React from 'react';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Layout as AntLayout,
  Avatar,
  Badge,
  Button,
  Dropdown,
  Tooltip,
  Progress,
} from 'antd';
import {
  BellOutlined,
  TrophyOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
  RobotOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import Logo from '../logo/index';
import { useAuth } from '@/hooks/useAuth';

const { Header, Content } = AntLayout;

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  background-color: white;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  position: sticky;
  top: 0;
  z-index: 99;
  height: 64px;
`;

const StyledContent = styled(Content)<{ isHomepage?: boolean }>`
  background-color: ${(props) => props.theme.colors.background};
  padding: ${(props) => (props.isHomepage ? '0' : '24px')};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavMenu = styled.nav`
  display: flex;
  margin-left: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled(Link)<{ active?: boolean }>`
  padding: 0 16px;
  color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.text};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  height: 64px;
  display: flex;
  align-items: center;
  transition: color 0.3s;

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const MobileMenuButton = styled(Button)`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const AIChatButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, #4361ee, #3a0ca3);
  border: none;
  border-radius: 12px;
  height: 36px;
  padding: 0 16px;
  color: white;
  margin-right: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 3px 8px rgba(67, 97, 238, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(67, 97, 238, 0.4);
    background: linear-gradient(135deg, #3a56e7, #2b0a7a);
    color: white;
  }

  .icon {
    font-size: 16px;
  }

  @media (max-width: 576px) {
    .text {
      display: none;
    }
    padding: 0 12px;
  }
`;

const XPContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  /* background-color: #f6ffed; */
  padding: 4px 12px;
  /* border: 1px solid #b7eb8f; */
  margin-right: 5px;

  .xp-icon {
    color: #8a30f9;
    font-size: 16px;
  }

  .xp-text {
    font-size: 13px;
    font-weight: 600;
    color: #8a30f9;
  }

  .xp-progress {
    width: 60px;
  }
`;

const StyledBadge = styled(Badge)`
  .ant-badge-count {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  }
`;

const DefaultLayout: React.FC = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const isHomepage = location.pathname === '/'; // Kiểm tra nếu là trang homepage

  const currentPath = location.pathname.split('/')[1] || 'home';

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  const navItems = [
    { key: 'home', label: 'Home', path: '/' },
    // { key: "review", label: "Review", path: "/review" },
    { key: 'topics', label: 'Topics', path: '/topics' },
    { key: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    // { key: "community", label: "Community", path: "/community" },
  ];

  return (
    <StyledLayout>
      <StyledHeader>
        <HeaderLeft>
          <Logo />
          <NavMenu>
            {navItems.map((item) => (
              <NavItem
                key={item.key}
                to={item.path}
                active={
                  currentPath === item.key ||
                  (item.key === 'home' && currentPath === '')
                }
              >
                {item.label}
              </NavItem>
            ))}
          </NavMenu>
        </HeaderLeft>

        <HeaderRight>
          <MobileMenuButton
            type='text'
            icon={<MenuOutlined />}
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
          />

          {/* AI Chat Button */}
          <Tooltip title='Ask AI tutor for help'>
            <Button
              onClick={() => navigate('/ai-chat')}
              style={{
                padding: 0,
                border: 'none',
              }}
            >
              <img src='/AI.png' alt='AI Tutor' style={{ height: 36 }} />
            </Button>
          </Tooltip>

          {/* XP Indicator */}
          <Tooltip title='Your experience points - Level 4'>
            <XPContainer>
              <ThunderboltOutlined className='xp-icon' />
              <span className='xp-text'>120 XP</span>
              <Progress
                className='xp-progress'
                percent={68}
                size='small'
                showInfo={false}
                strokeColor='#8a30f9'
                trailColor='#e6f7ff'
              />
            </XPContainer>
          </Tooltip>

          {/* {currentUser && ( */}
          <>
            <Tooltip title='127 day streak! Keep it up!'>
              <Badge
                count={
                  <img src='/fire.png' alt='Fire' style={{ height: 16 }} />
                }
                offset={[-57, 8]}
              >
                <span style={{ fontWeight: 600 }}>12 days</span>
              </Badge>
            </Tooltip>

            <Dropdown menu={{ items: userMenuItems }} placement='bottomRight'>
              <Avatar
                src='/avatar.png'
                size='default'
                style={{
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              />
            </Dropdown>

            <StyledBadge count={5} size='small' offset={[0, 3]}>
              <Button
                type='text'
                icon={<BellOutlined />}
                size='middle'
                shape='circle'
                style={{ backgroundColor: '#f5f5f5' }}
              />
            </StyledBadge>
          </>
          {/* )} */}

          {/* {!currentUser && (
            <>
              <Button type="link" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button type="primary" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </>
          )} */}
        </HeaderRight>
      </StyledHeader>

      {/* Mobile menu would go here */}

      <StyledContent isHomepage={isHomepage}>
        <Outlet />
      </StyledContent>
    </StyledLayout>
  );
};

export default DefaultLayout;
