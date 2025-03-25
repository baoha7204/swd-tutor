'use client';

import React, { useState } from 'react';
import {
  Typography,
  Row,
  Col,
  Card,
  Input,
  Divider,
  Tag,
  Avatar,
  Tabs,
  Statistic,
  Progress,
  Space,
  Button,
  Empty,
  Badge,
  Rate,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FunctionOutlined,
  BorderOutlined,
  LineChartOutlined,
  PercentageOutlined,
  SearchOutlined,
  BookOutlined,
  FireOutlined,
  QuestionCircleOutlined,
  TrophyOutlined,
  StarOutlined,
  ClockCircleOutlined,
  RocketOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const TopicCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.12);
  }
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: ${(props) => props.color}15;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 16px;
`;

const ProgressBar = styled.div<{ percent: number; color: string }>`
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  margin-top: 16px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.percent}%;
    background-color: ${(props) => props.color};
    border-radius: 4px;
    transition: width 0.6s ease;
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

const StyledSearch = styled(Input.Search)`
  margin-bottom: 30px;
  max-width: 600px;
  .ant-input,
  .ant-btn {
    border-radius: 8px;
    /* height: 48px; */
  }
  .ant-input {
    font-size: 16px;
  }
`;

const StatBox = styled(Card)`
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

const RecommendedCard = styled(Card)`
  margin-bottom: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-left: 4px solid #1890ff;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const PopularTag = styled(Tag)`
  padding: 6px 12px;
  margin: 0 8px 8px 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

const LearningPathCard = styled(Card)`
  border-radius: 12px;
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
`;

const TopicTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin-bottom: 24px;
  }

  .ant-tabs-tab {
    padding: 12px 16px;
    font-size: 16px;
  }
`;

const InstructorCard = styled(Card)`
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const HeroStats = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 32px 0 16px;
  gap: 16px;
  flex-wrap: wrap;
`;

const TopicsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  // Hardcoded Math subject ID
  const mathSubjectId = 'math-101';

  // Hardcoded topics data
  const topics = [
    {
      id: 'algebra',
      name: 'Algebra',
      description: 'Learn about equations, functions, and algebraic structures',
      icon: <FunctionOutlined />,
      color: '#4361ee',
      progress: 44,
      lessons: 24,
      estimatedTime: '12 weeks',
      difficulty: 'Intermediate',
      tags: ['Equations', 'Functions', 'Variables'],
      newContent: true,
      popular: true,
      recentActivity: '2 days ago',
      completedExercises: 18,
      totalExercises: 32,
    },
    {
      id: 'geometry',
      name: 'Geometry',
      description:
        'Explore shapes, sizes, positions, and dimensions of objects',
      icon: <BorderOutlined />,
      color: '#7209b7',
      progress: 43,
      lessons: 20,
      estimatedTime: '10 weeks',
      difficulty: 'Beginner to Intermediate',
      tags: ['Shapes', 'Angles', 'Measurements'],
      newContent: false,
      popular: true,
      recentActivity: '1 week ago',
      completedExercises: 10,
      totalExercises: 25,
    },
    {
      id: 'analysis',
      name: 'Analysis',
      description: 'Study limits, continuity, differentiation, and integration',
      icon: <LineChartOutlined />,
      color: '#f72585',
      progress: 28,
      lessons: 28,
      estimatedTime: '14 weeks',
      difficulty: 'Advanced',
      tags: ['Calculus', 'Limits', 'Integrals'],
      newContent: true,
      popular: false,
      recentActivity: '3 weeks ago',
      completedExercises: 5,
      totalExercises: 30,
    },
    {
      id: 'probability',
      name: 'Probability',
      description:
        'Understand randomness, uncertainty, and statistical inference',
      icon: <PercentageOutlined />,
      color: '#4cc9f0',
      progress: 12,
      lessons: 18,
      estimatedTime: '9 weeks',
      difficulty: 'Intermediate',
      tags: ['Statistics', 'Chance', 'Data'],
      newContent: false,
      popular: true,
      recentActivity: '1 month ago',
      completedExercises: 3,
      totalExercises: 28,
    },
  ];

  // Learning Paths
  const learningPaths = [
    {
      id: 'path-1',
      title: 'Mathematics Fundamentals',
      description: 'Build a strong foundation in core mathematical concepts',
      duration: '6 months',
      level: 'Beginner',
      topics: ['Algebra', 'Geometry', 'Basic Statistics'],
      progress: 60,
      image: 'https://source.unsplash.com/random/300x200/?mathematics',
    },
    {
      id: 'path-2',
      title: 'Advanced Mathematics',
      description:
        'Deepen your understanding with advanced concepts and applications',
      duration: '8 months',
      level: 'Advanced',
      topics: ['Analysis', 'Probability', 'Linear Algebra'],
      progress: 25,
      image: 'https://source.unsplash.com/random/300x200/?calculus',
    },
  ];

  // Popular tags
  const popularTags = [
    'Algebra',
    'Calculus',
    'Geometry',
    'Statistics',
    'Linear Equations',
    'Trigonometry',
    'Probability',
    'Arithmetic',
    'Functions',
    'Logic',
  ];

  // Instructors
  const instructors = [
    {
      id: 'inst-1',
      name: 'Dr. Alan Smith',
      title: 'Mathematics Professor',
      specialty: 'Algebra & Calculus',
      rating: 4.9,
      students: 1240,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 'inst-2',
      name: 'Dr. Lisa Johnson',
      title: 'Applied Mathematics',
      specialty: 'Statistics & Geometry',
      rating: 4.8,
      students: 890,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
  ];

  const handleTopicClick = (topicId: string) => {
    navigate(`/topics/${topicId}`);
  };

  const filteredTopics = topics.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchValue.toLowerCase()) ||
      topic.tags.some((tag) =>
        tag.toLowerCase().includes(searchValue.toLowerCase())
      )
  );

  // User stats
  const userStats = {
    totalTopics: 4,
    completedTopics: 1,
    totalExercises: 115,
    completedExercises: 36,
    accuracy: 82,
    streakDays: 12,
  };

  return (
    <div>
      <StyledBanner>
        <Title level={1} style={{ color: 'white', marginBottom: 8 }}>
          Mathematics Topics
        </Title>
        <Paragraph
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: 18,
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          Explore our comprehensive collection of math topics designed to build
          your skills from fundamentals to advanced concepts.
        </Paragraph>

        <StyledSearch
          placeholder='Search topics, concepts, or tags...'
          allowClear
          enterButton={<SearchOutlined />}
          size='large'
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ maxWidth: 600 }}
        />

        <HeroStats>
          <StatBox>
            <Statistic
              title='Topics'
              value={topics.length}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#1890ff' }}
              style={{
                minWidth: 110,
              }}
            />
          </StatBox>
          <StatBox>
            <Statistic
              title='Overall Progress'
              value={userStats.completedExercises}
              suffix={`/ ${userStats.totalExercises}`}
              prefix={<RocketOutlined />}
              valueStyle={{ color: '#52c41a' }}
              style={{
                minWidth: 110,
              }}
            />
          </StatBox>
          <StatBox>
            <Statistic
              title='Accuracy'
              value={userStats.accuracy}
              suffix='%'
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#fa8c16' }}
              style={{
                minWidth: 110,
              }}
            />
          </StatBox>
          <StatBox>
            <Statistic
              title='Day Streak'
              value={userStats.streakDays}
              prefix={<FireOutlined />}
              valueStyle={{ color: '#eb2f96' }}
              style={{
                minWidth: 110,
              }}
            />
          </StatBox>
        </HeroStats>
      </StyledBanner>

      <TopicTabs defaultActiveKey='all'>
        <TabPane tab='All Topics' key='all'>
          {filteredTopics.length > 0 ? (
            <Row gutter={[24, 24]}>
              {filteredTopics.map((topic) => (
                <Col key={topic.id} xs={24} sm={12} lg={8} xl={6}>
                  <TopicCard onClick={() => handleTopicClick(topic.id)}>
                    <div style={{ position: 'relative' }}>
                      <Space
                        style={{
                          marginBottom: 16,
                          width: '100%',
                          justifyContent: 'space-between',
                        }}
                      >
                        <IconWrapper color={topic.color}>
                          {topic.icon}
                        </IconWrapper>

                        <Space>
                          {topic.newContent && (
                            <Badge
                              count='NEW'
                              style={{
                                backgroundColor: '#52c41a',
                                fontSize: '12px',
                                fontWeight: 'bold',
                              }}
                            />
                          )}

                          {topic.popular && (
                            <Badge
                              count='POPULAR'
                              style={{
                                backgroundColor: '#fa8c16',
                                fontSize: '12px',
                                fontWeight: 'bold',
                              }}
                            />
                          )}
                        </Space>
                      </Space>

                      <Title level={4} style={{ marginBottom: 8 }}>
                        {topic.name}
                      </Title>

                      <Tag
                        color={
                          topic.progress >= 70
                            ? 'success'
                            : topic.progress >= 30
                            ? 'processing'
                            : 'default'
                        }
                        style={{ marginBottom: 12 }}
                      >
                        {topic.difficulty}
                      </Tag>

                      <Paragraph
                        type='secondary'
                        style={{
                          marginBottom: 16,
                          height: 60,
                          overflow: 'hidden',
                        }}
                      >
                        {topic.description}
                      </Paragraph>

                      <Space wrap style={{ marginBottom: 16 }}>
                        {topic.tags.map((tag, i) => (
                          <Tag key={i} color='blue'>
                            {tag}
                          </Tag>
                        ))}
                      </Space>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 8,
                        }}
                      >
                        <Text type='secondary'>
                          <ClockCircleOutlined style={{ marginRight: 4 }} />
                          {topic.estimatedTime}
                        </Text>
                        <Text type='secondary'>
                          <BookOutlined style={{ marginRight: 4 }} />
                          {topic.lessons} lessons
                        </Text>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: 8,
                        }}
                      >
                        <Text type='secondary'>
                          <QuestionCircleOutlined style={{ marginRight: 4 }} />
                          {topic.completedExercises}/{topic.totalExercises}{' '}
                          exercises
                        </Text>
                      </div>

                      <ProgressBar
                        percent={topic.progress}
                        color={topic.color}
                      />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: 8,
                        }}
                      >
                        <Text type='secondary'>
                          {topic.progress}% completed
                        </Text>
                      </div>
                    </div>
                  </TopicCard>
                </Col>
              ))}
            </Row>
          ) : (
            <Empty
              description='No topics match your search'
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </TabPane>

        <TabPane tab='In Progress' key='progress'>
          <Row gutter={[24, 24]}>
            {topics
              .filter((t) => t.progress > 0 && t.progress < 100)
              .map((topic) => (
                <Col key={topic.id} xs={24} sm={12} lg={8} xl={6}>
                  <TopicCard onClick={() => handleTopicClick(topic.id)}>
                    <IconWrapper color={topic.color}>{topic.icon}</IconWrapper>
                    <Title level={4}>{topic.name}</Title>
                    <Paragraph type='secondary'>{topic.description}</Paragraph>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Text type='secondary'>
                        Last activity: {topic.recentActivity}
                      </Text>
                    </div>
                    <ProgressBar percent={topic.progress} color={topic.color} />
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
          </Row>
        </TabPane>

        <TabPane tab='Completed' key='completed'>
          <Row gutter={[24, 24]}>
            {topics.filter((t) => t.progress === 100).length > 0 ? (
              topics
                .filter((t) => t.progress === 100)
                .map((topic) => (
                  <Col key={topic.id} xs={24} sm={12} lg={8} xl={6}>
                    <TopicCard onClick={() => handleTopicClick(topic.id)}>
                      <IconWrapper color={topic.color}>
                        {topic.icon}
                      </IconWrapper>
                      <Title level={4}>{topic.name}</Title>
                      <Paragraph type='secondary'>
                        {topic.description}
                      </Paragraph>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text type='secondary'>
                          Completed on: {topic.recentActivity}
                        </Text>
                      </div>
                      <ProgressBar percent={100} color='#52c41a' />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          marginTop: 8,
                        }}
                      >
                        <Text type='secondary'>100% completed</Text>
                      </div>
                    </TopicCard>
                  </Col>
                ))
            ) : (
              <Empty
                description="You haven't completed any topics yet"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </Row>
        </TabPane>

        {/* <TabPane tab='Recommended' key='recommended'>
          <Row gutter={24}>
            <Col xs={24} lg={16}>
              <Title level={4} style={{ marginBottom: 24 }}>
                <RocketOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                Recommended Topics for You
              </Title>

              {topics
                .filter((t) => t.popular)
                .map((topic) => (
                  <RecommendedCard
                    key={topic.id}
                    hoverable
                    onClick={() => handleTopicClick(topic.id)}
                  >
                    <Space align='start'>
                      <IconWrapper color={topic.color} style={{ minWidth: 56 }}>
                        {topic.icon}
                      </IconWrapper>
                      <div>
                        <Title level={5} style={{ marginTop: 0 }}>
                          {topic.name}
                        </Title>
                        <Paragraph ellipsis={{ rows: 2 }}>
                          {topic.description}
                        </Paragraph>
                        <Space>
                          <Tag color='blue'>
                            <ClockCircleOutlined /> {topic.estimatedTime}
                          </Tag>
                          <Tag color='green'>
                            <BookOutlined /> {topic.lessons} lessons
                          </Tag>
                          <Tag color='orange'>{topic.difficulty}</Tag>
                        </Space>
                      </div>
                    </Space>
                  </RecommendedCard>
                ))}
            </Col>

            <Col xs={24} lg={8}>
              <Card
                title={
                  <Space>
                    <StarOutlined style={{ color: '#fa8c16' }} />
                    <span>Popular Tags</span>
                  </Space>
                }
                bordered={false}
                style={{
                  borderRadius: 12,
                  marginBottom: 24,
                }}
              >
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {popularTags.map((tag, i) => (
                    <PopularTag key={i} color='blue'>
                      {tag}
                    </PopularTag>
                  ))}
                </div>
              </Card>

              <Card
                title={
                  <Space>
                    <UserOutlined style={{ color: '#722ed1' }} />
                    <span>Top Instructors</span>
                  </Space>
                }
                bordered={false}
                style={{ borderRadius: 12 }}
              >
                {instructors.map((instructor) => (
                  <InstructorCard
                    key={instructor.id}
                    size='small'
                    bordered={false}
                    style={{ padding: 12 }}
                  >
                    <Space align='start'>
                      <Avatar src={instructor.image} size={64} />
                      <div>
                        <Text strong style={{ fontSize: 16 }}>
                          {instructor.name}
                        </Text>
                        <div>
                          <Text type='secondary'>{instructor.title}</Text>
                        </div>
                        <div style={{ marginTop: 4 }}>
                          <Tag color='purple'>{instructor.specialty}</Tag>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <Space>
                            <Rate
                              disabled
                              defaultValue={instructor.rating}
                              style={{ fontSize: 12 }}
                            />
                            <Text type='secondary'>{instructor.rating}</Text>
                          </Space>
                        </div>
                      </div>
                    </Space>
                  </InstructorCard>
                ))}
              </Card>
            </Col>
          </Row>
        </TabPane> */}

        {/* <TabPane tab='Learning Paths' key='paths'>
          <Title level={4} style={{ marginBottom: 24 }}>
            <RocketOutlined style={{ marginRight: 8, color: '#1890ff' }} />
            Mathematics Learning Paths
          </Title>

          <Row gutter={[24, 24]}>
            {learningPaths.map((path) => (
              <Col key={path.id} xs={24} md={12}>
                <LearningPathCard
                  cover={
                    <div
                      style={{
                        height: 160,
                        background: `url(${path.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          padding: '40px 20px 20px',
                          background:
                            'linear-gradient(to bottom, transparent, rgba(0,0,0,0.7))',
                          color: 'white',
                        }}
                      >
                        <Title level={4} style={{ color: 'white', margin: 0 }}>
                          {path.title}
                        </Title>
                      </div>
                    </div>
                  }
                  hoverable
                >
                  <Paragraph>{path.description}</Paragraph>

                  <Space wrap style={{ marginBottom: 16 }}>
                    <Tag color='purple'>{path.level}</Tag>
                    <Tag color='cyan'>{path.duration}</Tag>
                    {path.topics.map((topic, i) => (
                      <Tag key={i} color='blue'>
                        {topic}
                      </Tag>
                    ))}
                  </Space>

                  <Progress
                    percent={path.progress}
                    status={path.progress >= 100 ? 'success' : 'active'}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                  />

                  <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <Button type='primary'>Continue Path</Button>
                  </div>
                </LearningPathCard>
              </Col>
            ))}
          </Row>
        </TabPane> */}
      </TopicTabs>
    </div>
  );
};

export default TopicsPage;
