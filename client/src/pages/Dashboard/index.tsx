import React from 'react';
import {
  Typography,
  Row,
  Col,
  Card,
  Progress,
  Avatar,
  List,
  Button,
  Statistic,
  Tag,
  Calendar,
  Tooltip,
  Badge,
  Divider,
  Space,
} from 'antd';
import {
  BookOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  FireOutlined,
  RocketOutlined,
  BulbOutlined,
  LineChartOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  BarChartOutlined,
  ThunderboltOutlined,
  StarOutlined,
  RightOutlined,
  ScheduleOutlined,
  TeamOutlined,
  HeartOutlined,
  FunctionOutlined,
  BorderOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import type { Dayjs } from 'dayjs';

const { Title, Text, Paragraph } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  /* height: 100%; */
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const GradientCard = styled(StyledCard)<{
  $startColor: string;
  $endColor: string;
}>`
  background: linear-gradient(
    135deg,
    ${(props) => props.$startColor} 0%,
    ${(props) => props.$endColor} 100%
  );
  color: white;

  .ant-card-head-title,
  .ant-statistic-title,
  .ant-statistic-content {
    color: white !important;
  }
`;

const DailyGoalCard = styled(StyledCard)`
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: rgba(67, 97, 238, 0.1);
    z-index: 0;
  }
`;

const TopicCard = styled.div`
  margin-bottom: 16px;
  padding: 18px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ActiveModuleCard = styled(StyledCard)`
  border-left: 5px solid #4361ee;
`;

const StreakBadge = styled.div`
  background: linear-gradient(135deg, #ff9d00 0%, #ff6161 100%);
  color: white;
  border-radius: 20px;
  padding: 6px 16px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
`;

const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 8px;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RankBadge = styled.div<{ $rank: number }>`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  background-color: ${(props) =>
    props.$rank === 1
      ? '#FFD700'
      : props.$rank === 2
      ? '#C0C0C0'
      : props.$rank === 3
      ? '#CD7F32'
      : '#e0e0e0'};
  color: ${(props) => (props.$rank <= 3 ? 'white' : '#666')};
`;

const ProgressCircle = styled.div<{ $percent: number; $color: string }>`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${(props) =>
    `conic-gradient(${props.$color} ${props.$percent}%, #f0f0f0 0)`};
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    width: 70%;
    height: 70%;
    background-color: white;
    border-radius: 50%;
  }
`;

const AchievementTag = styled(Tag)`
  border-radius: 20px;
  padding: 4px 12px;
  margin-bottom: 8px;
  font-weight: 500;
`;

const UpcomingEvent = styled.div`
  border-left: 3px solid #4361ee;
  padding-left: 12px;
  margin-bottom: 16px;
`;

const RecommendCard = styled(StyledCard)`
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
  }

  .recommend-img {
    height: 120px;
    background-size: cover;
    background-position: center;
    border-radius: 8px 8px 0 0;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    }
  }
`;

const StyledBanner = styled.div`
  background: linear-gradient(135deg, #1a365d 0%, #2563eb 100%);
  color: white;
  padding: 40px 30px;
  border-radius: 16px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: 30%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock user data
  const userData = {
    name: 'Minh Anh',
    streak: 12,
    xp: 2480,
    level: 8,
    todayXP: 120,
    weeklyGoalProgress: 68,
    studyMinutes: 480,
    totalCourses: 4,
    completedLessons: 36,
    completionRate: 72,
  };

  // Daily goals data
  const dailyGoals = [
    {
      title: 'Complete 3 lessons',
      value: 3,
      max: 3,
      color: '#4361ee',
      icon: <BookOutlined />,
    },
    {
      title: 'Get 100 XP',
      value: 75,
      max: 100,
      color: '#7209b7',
      icon: <RocketOutlined />,
    },
    {
      title: 'Study 60 minutes',
      value: 45,
      max: 60,
      color: '#4cc9f0',
      icon: <ClockCircleOutlined />,
    },
  ];

  // Topics data
  const topics = [
    {
      id: 'algebra',
      name: 'Algebra',
      progress: 75,
      color: '#4361ee',
      lessons: '14/20 lessons',
      description: 'Linear equations, quadratic equations, and functions',
      lastActive: '2 days ago',
      image: '/algebra.png',
    },
    {
      id: 'geometry',
      name: 'Geometry',
      progress: 45,
      color: '#7209b7',
      lessons: '9/20 lessons',
      description: 'Shapes, angles, and spatial relationships',
      lastActive: '1 week ago',
      image: '/geometry.png',
    },
    {
      id: 'analysis',
      name: 'Analysis',
      progress: 25,
      color: '#f72585',
      lessons: '5/20 lessons',
      description: 'Limits, derivatives, and integrals',
      lastActive: '3 weeks ago',
      image: '/analysis.png',
    },
  ];

  // Leaderboard data
  const leaderboard = [
    {
      rank: 1,
      name: 'Hoàng Nam',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      xp: 3240,
      levelIcon: <StarOutlined style={{ color: 'gold' }} />,
      level: 12,
    },
    {
      rank: 2,
      name: 'Thu Hà',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      xp: 2980,
      levelIcon: <StarOutlined style={{ color: 'silver' }} />,
      level: 11,
    },
    {
      rank: 3,
      name: 'Minh Đức',
      avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
      xp: 2790,
      levelIcon: <StarOutlined style={{ color: '#CD7F32' }} />,
      level: 10,
    },
    {
      rank: 4,
      name: 'Minh Anh',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      xp: 2480,
      level: 8,
    },
    {
      rank: 5,
      name: 'Quốc Anh',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      xp: 2340,
      level: 7,
    },
  ];

  // Achievements data
  const achievements = [
    { title: 'Perfect Week', icon: <CheckCircleOutlined />, color: '#52c41a' },
    { title: 'Math Wizard', icon: <BulbOutlined />, color: '#722ed1' },
    {
      title: `${userData.streak} Days Streak`,
      icon: <FireOutlined />,
      color: '#fa541c',
    },
  ];

  // Upcoming events
  const upcomingEvents = [
    {
      title: 'Algebra Practice Quiz',
      time: 'Today, 3:00 PM',
      type: 'quiz',
      duration: '30 min',
    },
    {
      title: 'Geometry Live Session',
      time: 'Tomorrow, 4:30 PM',
      type: 'session',
      duration: '45 min',
    },
    {
      title: 'Analysis Assignment Due',
      time: 'Friday, 11:59 PM',
      type: 'assignment',
      duration: 'N/A',
    },
  ];

  // Recommended modules
  const recommendedModules = [
    {
      title: 'System of Linear Equations',
      topic: 'Algebra',
      difficulty: 'Intermediate',
      image: 'https://source.unsplash.com/random/300x200/?mathematics',
      reason: 'Based on your progress in Algebra',
    },
    {
      title: 'Coordinate Geometry',
      topic: 'Geometry',
      difficulty: 'Beginner',
      image: 'https://source.unsplash.com/random/300x200/?coordinates',
      reason: 'Recommended for beginners in Geometry',
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      action: 'Completed',
      content: 'Linear Equations Quiz',
      time: '2 hours ago',
      result: 'Score: 90%',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
    },
    {
      action: 'Started',
      content: 'Geometry Module',
      time: 'Yesterday',
      result: 'Progress: 15%',
      icon: <RocketOutlined style={{ color: '#1890ff' }} />,
    },
    {
      action: 'Earned achievement',
      content: '10-Day Streak',
      time: '3 days ago',
      result: '+50 XP',
      icon: <TrophyOutlined style={{ color: '#faad14' }} />,
    },
  ];

  // Function to handle calendar data display
  const getCalendarData = (value: Dayjs) => {
    const listData = [
      { type: 'warning', content: 'Quiz' },
      { type: 'success', content: 'Session' },
    ];

    // Mock data - would be based on actual user schedule in real app
    const day = value.date();
    if (day === 15) return listData;
    if (day === 20) return [listData[0]];
    if (day === 25) return [listData[1]];
    return [];
  };

  // Calendar cell renderer
  const dateCellRender = (value: Dayjs) => {
    const listData = getCalendarData(value);
    return (
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type as any} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ padding: '0 0 40px 0' }}>
      {/* Welcome Banner */}
      <StyledBanner>
        <Row
          gutter={[24, 24]}
          align='middle'
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Col xs={24} md={16}>
            <div>
              <Title level={3} style={{ marginBottom: 8, color: 'white' }}>
                Welcome back, {userData.name}! 👋
              </Title>
              <Paragraph
                style={{
                  fontSize: 16,
                  marginBottom: 16,
                  color: 'rgba(255, 255, 255, 0.85)',
                }}
              >
                Continue your learning journey and improve your math skills
                today.
              </Paragraph>

              <StreakBadge>
                <FireOutlined /> {userData.streak} Day Streak!
              </StreakBadge>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title={<span style={{ color: 'white' }}>Today's XP</span>}
                  value={userData.todayXP}
                  suffix='XP'
                  valueStyle={{ color: 'white' }}
                  prefix={<RocketOutlined />}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title={<span style={{ color: 'white' }}>Level</span>}
                  value={userData.level}
                  valueStyle={{ color: 'white' }}
                  prefix={<TrophyOutlined />}
                />
              </Col>
              <Col span={24}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                      color: 'white',
                    }}
                  >
                    <Text style={{ color: 'white' }}>Weekly Goal</Text>
                    <Text style={{ color: 'white' }}>
                      {userData.weeklyGoalProgress}%
                    </Text>
                  </div>
                  <Progress
                    percent={userData.weeklyGoalProgress}
                    showInfo={false}
                    strokeColor={{
                      '0%': '#ffffff',
                      '100%': '#87d068',
                    }}
                    trailColor='rgba(255,255,255,0.3)'
                    strokeWidth={8}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </StyledBanner>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        {/* Left Column - Topics, Progress */}
        <Col xs={24} lg={16}>
          {/* Stats Cards */}
          <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={8}>
              <GradientCard
                $startColor='#4361ee'
                $endColor='#3f37c9'
                bordered={false}
              >
                <Statistic
                  title='Study Time'
                  value={userData.studyMinutes}
                  suffix='min'
                  prefix={<ClockCircleOutlined />}
                />
              </GradientCard>
            </Col>
            <Col xs={24} sm={8}>
              <GradientCard
                $startColor='#7209b7'
                $endColor='#560bad'
                bordered={false}
              >
                <Statistic
                  title='Total XP'
                  value={userData.xp}
                  prefix={<ThunderboltOutlined />}
                />
              </GradientCard>
            </Col>
            <Col xs={24} sm={8}>
              <GradientCard
                $startColor='#f72585'
                $endColor='#b5179e'
                bordered={false}
              >
                <Statistic
                  title='Completion Rate'
                  value={userData.completionRate}
                  suffix='%'
                  prefix={<BarChartOutlined />}
                />
              </GradientCard>
            </Col>
          </Row>

          {/* Daily Goals */}
          <DailyGoalCard
            title="Today's Goals"
            extra={<Tag color='success'>2/3 Completed</Tag>}
            style={{ marginBottom: 24 }}
          >
            <Row gutter={[24, 24]}>
              {dailyGoals.map((goal, index) => (
                <Col key={index} xs={24} md={8}>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      {goal.icon}
                      <Text strong>{goal.title}</Text>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}
                    >
                      <Text type='secondary'>Progress</Text>
                      <Text>
                        {goal.value}/{goal.max}
                      </Text>
                    </div>
                    <Progress
                      percent={(goal.value / goal.max) * 100}
                      showInfo={false}
                      strokeColor={goal.color}
                      trailColor='#f0f0f0'
                      strokeWidth={8}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </DailyGoalCard>

          {/* Active Module */}
          <ActiveModuleCard
            title='Continue Where You Left Off'
            extra={
              <Link
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  justifyContent: 'center',
                }}
                to='http://localhost:5173/topics/algebra/subtopics/linear-equations'
              >
                Resume <RightOutlined />
              </Link>
            }
            style={{ marginBottom: 24 }}
          >
            <Row gutter={16} align='middle'>
              <Col xs={24} sm={6}>
                <div
                  style={{
                    width: '100%',
                    height: 100,
                    background:
                      'url(/anotherAlgebra.png) no-repeat center center / cover',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 8,
                  }}
                />
              </Col>
              <Col xs={24} sm={18}>
                <Title level={5} style={{ marginBottom: 8 }}>
                  Linear Equations
                </Title>
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginBottom: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <Tag color='blue'>Algebra</Tag>
                  <Tag color='purple'>65% Complete</Tag>
                  <Tag color='cyan'>Lesson 3/5</Tag>
                </div>
                <Paragraph ellipsis={{ rows: 2 }}>
                  Master the basics of solving first-degree equations with one
                  variable. Learn how to isolate variables and find solutions.
                </Paragraph>
              </Col>
            </Row>
          </ActiveModuleCard>

          {/* Your Topics */}
          <Title level={4} style={{ margin: '24px 0 16px' }}>
            Your Topics
          </Title>

          <Row gutter={[16, 16]}>
            {topics.map((topic) => (
              <Col key={topic.id} xs={24} md={12} lg={8}>
                <TopicCard onClick={() => navigate(`/topics/${topic.id}`)}>
                  <div
                    style={{
                      height: '160px',
                      borderRadius: '8px',
                      marginBottom: '12px',
                      backgroundImage: `url(${topic.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '8px 12px',
                      }}
                    >
                      <Text strong style={{ color: 'white', fontSize: '16px' }}>
                        {topic.name}
                      </Text>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <Text type='secondary'>{topic.lessons}</Text>
                    <Text type='secondary'>
                      Last active: {topic.lastActive}
                    </Text>
                  </div>

                  <Paragraph
                    ellipsis={{ rows: 2 }}
                    style={{ marginBottom: 12, height: 44 }}
                  >
                    {topic.description}
                  </Paragraph>

                  <Progress
                    percent={topic.progress}
                    showInfo={false}
                    strokeColor={topic.color}
                    trailColor='#f0f0f0'
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginTop: 8,
                    }}
                  >
                    <Text type='secondary'>{topic.progress}% completed</Text>
                  </div>
                </TopicCard>
              </Col>
            ))}
            <Col xs={24} md={12} lg={8}>
              <TopicCard
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f0f5ff',
                  border: '2px dashed #bae7ff',
                }}
              >
                <Title level={5} style={{ marginBottom: 16 }}>
                  Explore New Topics
                </Title>
                <Button
                  type='primary'
                  icon={<BookOutlined />}
                  onClick={() => navigate('/topics')}
                >
                  Browse Topics
                </Button>
              </TopicCard>
            </Col>
          </Row>

          {/* Achievements */}
          <Title level={4} style={{ margin: '32px 0 16px' }}>
            Recent Achievements
          </Title>

          <StyledCard bordered={false} style={{ marginBottom: 24 }}>
            <Row gutter={[16, 16]}>
              {achievements.map((achievement, index) => (
                <Col key={index} xs={24} sm={8}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '16px 0',
                    }}
                  >
                    <div
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        backgroundColor: `${achievement.color}15`,
                        color: achievement.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 24,
                        marginBottom: 12,
                      }}
                    >
                      {achievement.icon}
                    </div>
                    <Text strong>{achievement.title}</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </StyledCard>

          {/* Recent Activity */}
          {/* <Title level={4} style={{ margin: '32px 0 16px' }}>
            Recent Activity
          </Title>

          <StyledCard bordered={false}>
            <List
              itemLayout='horizontal'
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        icon={item.icon}
                        style={{ backgroundColor: 'transparent' }}
                      />
                    }
                    title={
                      <Text strong>
                        {item.action} <Text>{item.content}</Text>
                      </Text>
                    }
                    description={
                      <Space>
                        <Text type='secondary'>{item.time}</Text>
                        <Divider type='vertical' />
                        <Text>{item.result}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </StyledCard> */}
        </Col>

        {/* Right Column - Leaderboard, Calendar, etc. */}
        <Col xs={24} lg={8}>
          {/* Weekly Leaderboard */}
          <StyledCard
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <TrophyOutlined style={{ color: '#faad14' }} />
                <span>Weekly Leaderboard</span>
              </div>
            }
            extra={
              <Button type='link' size='small'>
                View All
              </Button>
            }
            bordered={false}
            style={{ marginBottom: 24 }}
          >
            {leaderboard.map((user) => (
              <LeaderboardItem key={user.rank}>
                <UserInfo>
                  <RankBadge $rank={user.rank}>{user.rank}</RankBadge>
                  <Avatar src={user.avatar} />
                  <div>
                    <Text strong style={{ display: 'block' }}>
                      {user.name}
                    </Text>
                    <Space size={4}>
                      {user.levelIcon}
                      <Text type='secondary'>Level {user.level}</Text>
                    </Space>
                  </div>
                </UserInfo>
                <Tooltip title='Experience Points'>
                  <Tag color='blue' icon={<ThunderboltOutlined />}>
                    {user.xp} XP
                  </Tag>
                </Tooltip>
              </LeaderboardItem>
            ))}
          </StyledCard>

          {/* Upcoming Events */}
          {/* <StyledCard
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarOutlined style={{ color: '#1890ff' }} />
                <span>Upcoming Events</span>
              </div>
            }
            bordered={false}
            style={{ marginBottom: 24 }}
          >
            {upcomingEvents.map((event, index) => (
              <UpcomingEvent key={index}>
                <Title level={5} style={{ marginBottom: 4 }}>
                  {event.title}
                </Title>
                <Space
                  direction='vertical'
                  size={2}
                  style={{ marginBottom: 4 }}
                >
                  <Text>
                    <ScheduleOutlined /> {event.time}
                  </Text>
                  <Text>
                    <ClockCircleOutlined /> Duration: {event.duration}
                  </Text>
                </Space>
                <div>
                  <Tag
                    color={
                      event.type === 'quiz'
                        ? 'orange'
                        : event.type === 'session'
                        ? 'green'
                        : 'blue'
                    }
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Tag>
                </div>
              </UpcomingEvent>
            ))}
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <Button icon={<CalendarOutlined />}>View Calendar</Button>
            </div>
          </StyledCard> */}

          {/* Recommendations */}
          <StyledCard
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <BulbOutlined style={{ color: '#fa8c16' }} />
                <span>Recommended For You</span>
              </div>
            }
            bordered={false}
            style={{ marginBottom: 24 }}
          >
            <Row gutter={[16, 16]}>
              {recommendedModules.map((module, index) => (
                <Col key={index} xs={24}>
                  <RecommendCard bodyStyle={{ padding: 0 }} bordered={false}>
                    <div
                      className='recommend-img'
                      style={{ backgroundImage: `url(${module.image})` }}
                    />
                    <div style={{ padding: '16px' }}>
                      <Title level={5} style={{ marginBottom: 8 }}>
                        {module.title}
                      </Title>
                      <Space wrap>
                        <Tag color='blue'>{module.topic}</Tag>
                        <Tag color='purple'>{module.difficulty}</Tag>
                      </Space>
                      <Paragraph
                        type='secondary'
                        style={{ marginTop: 8, fontSize: 13 }}
                      >
                        <BulbOutlined /> {module.reason}
                      </Paragraph>
                    </div>
                  </RecommendCard>
                </Col>
              ))}
            </Row>
          </StyledCard>

          {/* Study Calendar */}
          {/* <StyledCard
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CalendarOutlined style={{ color: '#722ed1' }} />
                <span>Study Calendar</span>
              </div>
            }
            bordered={false}
            style={{ marginBottom: 24 }}
          >
            <Calendar fullscreen={false} dateCellRender={dateCellRender} />
          </StyledCard> */}

          {/* Quick Links */}
          {/* <StyledCard
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <LineChartOutlined style={{ color: '#13c2c2' }} />
                <span>Quick Access</span>
              </div>
            }
            bordered={false}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Button block icon={<LineChartOutlined />}>
                  Statistics
                </Button>
              </Col>
              <Col span={8}>
                <Button block icon={<TeamOutlined />}>
                  Community
                </Button>
              </Col>
              <Col span={8}>
                <Button block icon={<HeartOutlined />}>
                  Support
                </Button>
              </Col>
            </Row>
          </StyledCard> */}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
