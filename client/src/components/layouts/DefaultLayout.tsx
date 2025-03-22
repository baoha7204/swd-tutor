'use client';

import type React from 'react';
import { useState } from 'react';
import { Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import { Layout as AntLayout, Avatar, Badge, Button, Dropdown } from 'antd';
import {
  BellOutlined,
  TrophyOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
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
  z-index: 1;
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
    { key: 'review', label: 'Review', path: '/review' },
    { key: 'lessons', label: 'Lessons', path: '/topics' },
    { key: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { key: 'community', label: 'Community', path: '/community' },
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

          {/* {currentUser && ( */}
          <>
            <Badge count={5} size='small'>
              <Button
                type='text'
                icon={<BellOutlined />}
                size='small'
                shape='circle'
              />
            </Badge>
            <Badge
              count={<TrophyOutlined style={{ color: '#faad14' }} />}
              offset={[-2, 4]}
            >
              <Button type='text' size='small'>
                127 days
              </Button>
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement='bottomRight'>
              <Avatar
                src='./public/avatar.png'
                size='default'
                style={{ cursor: 'pointer' }}
              />
            </Dropdown>
          </>
          {/* )} */}

          {/* {!currentUser && (
            <>
              <Button type='link' onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button type='primary' onClick={() => navigate('/register')}>
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
