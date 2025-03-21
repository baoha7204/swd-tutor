import type React from 'react';
import styled from 'styled-components';
import { Avatar, Typography, Space } from 'antd';

const { Text } = Typography;

const UserInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
`;

interface UserInfoProps {
  name: string;
  avatar: string;
  days: number;
  points: number;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, avatar, days, points }) => {
  return (
    <UserInfoContainer>
      <Avatar src={avatar} size='large' />
      <Space direction='vertical' size={0}>
        <Text strong>{name}</Text>
        <Text type='secondary'>
          {days} days · {points} points
        </Text>
      </Space>
    </UserInfoContainer>
  );
};

export default UserInfo;
