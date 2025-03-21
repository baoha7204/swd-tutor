import type React from 'react';
import { Typography, Row, Col, Card, Progress, Avatar, List } from 'antd';
import {
  BookOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 100%;
`;

const ProgressCard = styled(StyledCard)`
  .ant-card-body {
    padding: 16px;
  }
`;

const TopicCard = styled.div`
  margin-bottom: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const TopicProgress = styled.div`
  margin-top: 8px;
`;

const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Dashboard: React.FC = () => {
  // Hardcoded data
  const dailyGoals = [
    { title: 'Completed 3 lessons', value: 3, max: 3, color: '#4361ee' },
    { title: 'Get 100 XP', value: 75, max: 100, color: '#7209b7' },
    { title: 'Learned 60 minutes', value: 45, max: 60, color: '#4cc9f0' },
  ];

  const topics = [
    {
      id: 'algebra',
      name: 'Algebra',
      progress: 75,
      color: '#4361ee',
      lessons: '14/20 lesson',
    },
    {
      id: 'geometry',
      name: 'Geometry',
      progress: 45,
      color: '#7209b7',
      lessons: '9/20 lesson',
    },
    {
      id: 'analysis',
      name: 'Analysis',
      progress: 25,
      color: '#f72585',
      lessons: '5/20 lesson',
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'Hoàng Nam',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FaF0lSGYnxt2mEF2nDxLdJC8sL2VMg.png',
      xp: 520,
    },
    {
      rank: 2,
      name: 'Thu Hà',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FaF0lSGYnxt2mEF2nDxLdJC8sL2VMg.png',
      xp: 480,
    },
    {
      rank: 3,
      name: 'Minh Đức',
      avatar:
        'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-FaF0lSGYnxt2mEF2nDxLdJC8sL2VMg.png',
      xp: 450,
    },
  ];

  return (
    <div>
      <Title level={4}>Hello, Minh Anh!</Title>
      <Text type='secondary'>Continue your learning journey</Text>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col xs={24} md={16}>
          <StyledCard title='Daily goal' bordered={false}>
            <Row gutter={[16, 16]}>
              {dailyGoals.map((goal, index) => (
                <Col key={index} xs={24} md={8}>
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}
                    >
                      <Text>{goal.title}</Text>
                      <Text>
                        {goal.value}/{goal.max}
                      </Text>
                    </div>
                    <Progress
                      percent={(goal.value / goal.max) * 100}
                      showInfo={false}
                      strokeColor={goal.color}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </StyledCard>

          <Title level={4} style={{ margin: '24px 0 16px' }}>
            Topics
          </Title>

          {topics.map((topic) => (
            <TopicCard key={topic.id}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BookOutlined style={{ color: topic.color }} />
                <Text strong>{topic.name}</Text>
              </div>
              <Text type='secondary'>{topic.lessons}</Text>
              <TopicProgress>
                <Progress
                  percent={topic.progress}
                  showInfo={false}
                  strokeColor={topic.color}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Text type='secondary'>{topic.progress}% completed</Text>
                </div>
              </TopicProgress>
            </TopicCard>
          ))}
        </Col>

        <Col xs={24} md={8}>
          <StyledCard title='Week leaderboard' bordered={false}>
            <List
              dataSource={leaderboard}
              renderItem={(item) => (
                <LeaderboardItem>
                  <UserInfo>
                    <Text strong>{item.rank}</Text>
                    <Avatar src={item.avatar} size='small' />
                    <Text>{item.name}</Text>
                  </UserInfo>
                  <Text>{item.xp} XP</Text>
                </LeaderboardItem>
              )}
            />
          </StyledCard>

          <StyledCard
            title='Reminder'
            bordered={false}
            style={{ marginTop: 24 }}
          >
            <List
              dataSource={[
                {
                  icon: <ClockCircleOutlined style={{ color: '#f72585' }} />,
                  text: "It's almost time for your lesson!",
                },
                {
                  icon: <BookOutlined style={{ color: '#4361ee' }} />,
                  text: 'You have Algebra class at 3:00 pm today.',
                },
                {
                  icon: <TrophyOutlined style={{ color: '#7209b7' }} />,
                  text: '3 days left to complete weekly goal',
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta avatar={item.icon} title={item.text} />
                </List.Item>
              )}
            />
          </StyledCard>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
