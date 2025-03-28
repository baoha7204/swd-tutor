'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import {
  Typography,
  Row,
  Col,
  Card,
  Progress,
  Breadcrumb,
  Space,
  Avatar,
  Tag,
  Button,
  Divider,
} from 'antd';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FunctionOutlined,
  RightOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
  UserOutlined,
  BookOutlined,
  TrophyOutlined,
  LineChartOutlined,
  RocketOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  BorderOutlined,
  PercentageOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const TopicHeader = styled.div`
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    ${(props) => props.$color}15 0%,
    ${(props) => props.$color}05 100%
  );
  padding: 40px;
  margin-bottom: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: ${(props) => props.$color}10;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -80px;
    left: 30%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: ${(props) => props.$color}08;
    z-index: 0;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  .ant-card-body {
    padding: 24px;
  }
`;

const StatCard = styled(StyledCard)`
  background: linear-gradient(
    135deg,
    ${(props) => props.$color}10 0%,
    ${(props) => props.$color}05 100%
  );
  border: 1px solid ${(props) => props.$color}20;

  .icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: ${(props) => props.$color}15;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    font-size: 24px;
    color: ${(props) => props.$color};
  }
`;

const SubTopicCard = styled(StyledCard)`
  cursor: pointer;
  border-left: 4px solid ${(props) => props.$color || '#1890ff'};

  &:hover {
    transform: translateY(-5px);
  }

  .progress-indicator {
    height: 6px;
    border-radius: 3px;
    background-color: #f0f0f0;
    margin-top: 16px;
    overflow: hidden;

    .progress-bar {
      height: 100%;
      border-radius: 3px;
      background-color: ${(props) => props.$color};
      width: ${(props) => props.$progress || 0}%;
      transition: width 0.6s ease;
    }
  }
`;

const HistorySectionCard = styled(StyledCard)`
  background: linear-gradient(160deg, #f8f9fa 0%, #f0f7ff 100%);
  padding: 24px;
  margin-bottom: 32px;
`;

const CircleAvatar = styled(Avatar)`
  width: 80px;
  height: 80px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 3px solid white;
  margin-bottom: 12px;
`;

const ProgressTag = styled(Tag)<{ $progress: number }>`
  margin: 0;
  font-weight: 500;

  background-color: ${(props) => {
    if (props.$progress >= 80) return '#f6ffed';
    if (props.$progress >= 40) return '#e6f7ff';
    if (props.$progress > 0) return '#fff7e6';
    return '#f5f5f5';
  }};

  border-color: ${(props) => {
    if (props.$progress >= 80) return '#b7eb8f';
    if (props.$progress >= 40) return '#91d5ff';
    if (props.$progress > 0) return '#ffd591';
    return '#d9d9d9';
  }};

  color: ${(props) => {
    if (props.$progress >= 80) return '#52c41a';
    if (props.$progress >= 40) return '#1890ff';
    if (props.$progress > 0) return '#fa8c16';
    return '#8c8c8c';
  }};
`;

const DifficultyTag = styled(Tag)<{ $difficulty: string }>`
  border-radius: 4px;
  font-weight: 500;

  background-color: ${(props) => {
    if (props.$difficulty.toLowerCase() === 'beginner') return '#f6ffed';
    if (props.$difficulty.toLowerCase() === 'intermediate') return '#e6f7ff';
    return '#fff0f6';
  }};

  border-color: ${(props) => {
    if (props.$difficulty.toLowerCase() === 'beginner') return '#b7eb8f';
    if (props.$difficulty.toLowerCase() === 'intermediate') return '#91d5ff';
    return '#ffadd2';
  }};

  color: ${(props) => {
    if (props.$difficulty.toLowerCase() === 'beginner') return '#52c41a';
    if (props.$difficulty.toLowerCase() === 'intermediate') return '#1890ff';
    return '#eb2f96';
  }};
`;

const PathNavigation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  a {
    color: rgba(0, 0, 0, 0.45);
    transition: color 0.3s;

    &:hover {
      color: #1890ff;
    }
  }

  .divider {
    margin: 0 8px;
    color: rgba(0, 0, 0, 0.45);
  }

  .current {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
`;

const CompleteBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #f6ffed;
  color: #52c41a;
  border: 1px solid #b7eb8f;
  border-radius: 20px;
  padding: 4px 12px;
  margin-left: 12px;
  font-size: 12px;
  font-weight: 500;

  .complete-icon {
    margin-right: 4px;
  }
`;

const SubTopicsPage: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<any>(null);

  // Hardcoded topics data
  const topicsData = {
    algebra: {
      id: 'algebra',
      name: 'Algebra',
      description:
        'Discover the fundamental principles of Algebra, the language of mathematics that enables us to solve real-world problems through equations and mathematical relationships.',
      color: '#4361ee',
      progress: 75,
      totalLessons: 24,
      estimatedDuration: '12 weeks',
      historicalFigures: [
        {
          name: 'Al-Khwarizmi',
          title: 'Father of Algebra',
          years: '780-850',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
        {
          name: 'René Descartes',
          title: 'Cartesian Geometry',
          years: '1596-1650',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
        {
          name: 'Leonhard Euler',
          title: 'Mathematical Notation',
          years: '1707-1783',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
      ],
      subTopics: [
        {
          id: 'linear-equations',
          name: 'Linear Equations',
          description:
            'Master the fundamentals of linear equations and their applications',
          progress: 85,
          lessons: 6,
          duration: '2 weeks',
          difficulty: 'Beginner',
        },
        {
          id: 'quadratic-equations',
          name: 'Quadratic Equations',
          description:
            'Learn to solve and graph quadratic equations and functions',
          progress: 60,
          lessons: 8,
          duration: '3 weeks',
          difficulty: 'Intermediate',
        },
        {
          id: 'polynomials',
          name: 'Polynomials',
          description:
            'Understand polynomial functions, operations, and factorization',
          progress: 30,
          lessons: 7,
          duration: '3 weeks',
          difficulty: 'Intermediate',
        },
        {
          id: 'matrices',
          name: 'Matrices and Determinants',
          description:
            'Explore matrix operations and their applications in solving systems',
          progress: 0,
          lessons: 5,
          duration: '2 weeks',
          difficulty: 'Advanced',
        },
      ],
    },
    geometry: {
      id: 'geometry',
      name: 'Geometry',
      description:
        'Explore the properties and relationships of points, lines, surfaces, and solids in space.',
      color: '#7209b7',
      progress: 45,
      totalLessons: 20,
      estimatedDuration: '10 weeks',
      historicalFigures: [
        {
          name: 'Euclid',
          title: 'Father of Geometry',
          years: '300 BCE',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
        {
          name: 'Pythagoras',
          title: 'Pythagorean Theorem',
          years: '570-495 BCE',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
        {
          name: 'Archimedes',
          title: 'Calculation of Pi',
          years: '287-212 BCE',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
      ],
      subTopics: [
        {
          id: 'euclidean-geometry',
          name: 'Euclidean Geometry',
          description:
            'Study the basic principles of points, lines, angles, and shapes',
          progress: 70,
          lessons: 5,
          duration: '2 weeks',
          difficulty: 'Beginner',
        },
        {
          id: 'coordinate-geometry',
          name: 'Coordinate Geometry',
          description:
            'Learn to represent geometric objects in the coordinate plane',
          progress: 40,
          lessons: 6,
          duration: '3 weeks',
          difficulty: 'Intermediate',
        },
        {
          id: 'trigonometry',
          name: 'Trigonometry',
          description:
            'Explore the relationships between angles and sides of triangles',
          progress: 20,
          lessons: 7,
          duration: '3 weeks',
          difficulty: 'Intermediate',
        },
      ],
    },
    analysis: {
      id: 'analysis',
      name: 'Analysis',
      description:
        'Study the concepts of limits, continuity, differentiation, and integration.',
      color: '#f72585',
      progress: 25,
      totalLessons: 28,
      estimatedDuration: '14 weeks',
      historicalFigures: [
        {
          name: 'Isaac Newton',
          title: 'Calculus Development',
          years: '1643-1727',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
        {
          name: 'Gottfried Wilhelm Leibniz',
          title: 'Differential Calculus',
          years: '1646-1716',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
        {
          name: 'Bernhard Riemann',
          title: 'Riemann Integral',
          years: '1826-1866',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
      ],
      subTopics: [
        {
          id: 'limits',
          name: 'Limits and Continuity',
          description:
            'Understand the concept of limits and continuous functions',
          progress: 45,
          lessons: 6,
          duration: '3 weeks',
          difficulty: 'Intermediate',
        },
        {
          id: 'derivatives',
          name: 'Derivatives',
          description:
            'Learn differentiation techniques and their applications',
          progress: 30,
          lessons: 8,
          duration: '4 weeks',
          difficulty: 'Advanced',
        },
        {
          id: 'integration',
          name: 'Integration',
          description: 'Master integration techniques and their applications',
          progress: 10,
          lessons: 9,
          duration: '4 weeks',
          difficulty: 'Advanced',
        },
      ],
    },
    probability: {
      id: 'probability',
      name: 'Probability',
      description:
        'Understand randomness, uncertainty, and statistical inference.',
      color: '#4cc9f0',
      progress: 10,
      totalLessons: 18,
      estimatedDuration: '9 weeks',
      historicalFigures: [
        {
          name: 'Blaise Pascal',
          title: 'Probability Theory',
          years: '1623-1662',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
        {
          name: 'Pierre-Simon Laplace',
          title: 'Bayesian Probability',
          years: '1749-1827',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
        {
          name: 'Andrey Kolmogorov',
          title: 'Axioms of Probability',
          years: '1903-1987',
          image:
            'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aYH8TvgkHwUTgIWfDg98XJDfo5lqYp.png',
        },
      ],
      subTopics: [
        {
          id: 'basic-probability',
          name: 'Basic Probability',
          description:
            'Learn fundamental concepts of probability and random events',
          progress: 25,
          lessons: 5,
          duration: '2 weeks',
          difficulty: 'Beginner',
        },
        {
          id: 'random-variables',
          name: 'Random Variables',
          description: 'Understand discrete and continuous random variables',
          progress: 10,
          lessons: 6,
          duration: '3 weeks',
          difficulty: 'Intermediate',
        },
        {
          id: 'statistical-inference',
          name: 'Statistical Inference',
          description: 'Learn methods for drawing conclusions from data',
          progress: 0,
          lessons: 7,
          duration: '4 weeks',
          difficulty: 'Advanced',
        },
      ],
    },
  };

  useEffect(() => {
    if (topicId && topicsData[topicId as keyof typeof topicsData]) {
      setTopic(topicsData[topicId as keyof typeof topicsData]);
    }
  }, [topicId]);

  const handleSubTopicClick = (subtopicId: string) => {
    navigate(`/topics/${topicId}/subtopics/${subtopicId}`);
  };

  if (!topic) {
    return <div>Loading...</div>;
  }

  const totalProgress =
    topic.subTopics.reduce(
      (sum: number, subtopic: any) => sum + subtopic.progress,
      0
    ) / topic.subTopics.length;
  const completedSubtopics = topic.subTopics.filter(
    (subtopic: any) => subtopic.progress === 100
  ).length;

  return (
    <div>
      <PathNavigation>
        <Link to='/topics'>Topics</Link>
        <span className='divider'>/</span>
        <span className='current'>{topic.name}</span>
      </PathNavigation>

      <TopicHeader $color={topic.color}>
        <Row gutter={[24, 24]} align='middle'>
          <Col xs={24} md={16}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Space align='center'>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    background: `${topic.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 32,
                    color: topic.color,
                    marginRight: 16,
                  }}
                >
                  {topic.id === 'algebra' && <FunctionOutlined />}
                  {topic.id === 'geometry' && <BorderOutlined />}
                  {topic.id === 'analysis' && <LineChartOutlined />}
                  {topic.id === 'probability' && <PercentageOutlined />}
                </div>
                <div>
                  <Title level={2} style={{ margin: 0, marginBottom: 8 }}>
                    {topic.name}
                  </Title>
                  <Space size={16}>
                    <Tag icon={<BookOutlined />} color={'blue'}>
                      {topic.totalLessons} Modules
                    </Tag>
                    <Tag icon={<ClockCircleOutlined />} color={'yellow'}>
                      {topic.estimatedDuration}
                    </Tag>
                    {completedSubtopics > 0 && (
                      <CompleteBadge>
                        <CheckCircleOutlined className='complete-icon' />
                        {completedSubtopics} of {topic.subTopics.length}{' '}
                        completed
                      </CompleteBadge>
                    )}
                  </Space>
                </div>
              </Space>

              <Paragraph
                style={{ margin: '16px 0', fontSize: 16, maxWidth: 800 }}
              >
                {topic.description}
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  marginBottom: 8,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Text strong>Overall Progress</Text>
                <Text strong>{Math.round(totalProgress)}%</Text>
              </div>
              <Progress
                percent={Math.round(totalProgress)}
                showInfo={false}
                strokeColor={topic.color}
                strokeWidth={10}
                style={{ marginBottom: 16 }}
              />
              <Button
                type='primary'
                icon={<RocketOutlined />}
                style={{ background: topic.color, borderColor: topic.color }}
                onClick={() => {
                  // Find the first subtopic with progress < 100%
                  const nextSubtopic =
                    topic.subTopics.find((s: any) => s.progress < 100) ||
                    topic.subTopics[0];
                  handleSubTopicClick(nextSubtopic.id);
                }}
              >
                Continue Learning
              </Button>
            </div>
          </Col>
        </Row>
      </TopicHeader>

      <Row gutter={[24, 24]} style={{ marginBottom: 40 }}>
        <Col xs={24} md={8}>
          <StatCard $color={topic.color}>
            <div className='icon-wrapper'>
              <ClockCircleOutlined />
            </div>
            <Title level={4}>Duration</Title>
            <Paragraph style={{ fontSize: 16 }}>
              Complete this topic in approximately{' '}
              <strong>{topic.estimatedDuration}</strong>, learning at your own
              pace.
            </Paragraph>
          </StatCard>
        </Col>
        <Col xs={24} md={8}>
          <StatCard $color={topic.color}>
            <div className='icon-wrapper'>
              <BookOutlined />
            </div>
            <Title level={4}>Modules</Title>
            <Paragraph style={{ fontSize: 16 }}>
              Master <strong>{topic.totalLessons} modules</strong> with
              exercises, lessons, and assessments.
            </Paragraph>
          </StatCard>
        </Col>
        <Col xs={24} md={8}>
          <StatCard $color={topic.color}>
            <div className='icon-wrapper'>
              <TrophyOutlined />
            </div>
            <Title level={4}>Achievement</Title>
            <Paragraph style={{ fontSize: 16 }}>
              Completion of this topic will earn you the{' '}
              <strong>{topic.name} Master</strong> badge.
            </Paragraph>
          </StatCard>
        </Col>
      </Row>

      {/* <HistorySectionCard>
        <Title level={4} style={{ marginBottom: 24 }}>
          <Space>
            <HistoryOutlined style={{ color: topic.color }} />
            <span>Historical Context</span>
          </Space>
        </Title>

        <Row gutter={[32, 32]} justify='space-around'>
          {topic.historicalFigures.map((figure: any, index: number) => (
            <Col key={index} xs={24} sm={8}>
              <div style={{ textAlign: 'center' }}>
                <CircleAvatar
                  size={80}
                  src={figure.image || '/placeholder.svg'}
                />
                <Title level={5} style={{ marginBottom: 4, marginTop: 8 }}>
                  {figure.name}
                </Title>
                <div
                  style={{ color: '#1890ff', fontWeight: 500, marginBottom: 4 }}
                >
                  {figure.title}
                </div>
                <Text type='secondary'>{figure.years}</Text>
              </div>
            </Col>
          ))}
        </Row>
      </HistorySectionCard> */}

      <div style={{ marginBottom: 24 }}>
        <Space align='center' style={{ marginBottom: 16 }}>
          <Title level={3} style={{ margin: 0 }}>
            Learning Path
          </Title>
          <Text type='secondary'>
            Follow the sequence below for optimal learning
          </Text>
        </Space>

        <Divider style={{ margin: '16px 0 32px' }} />

        {topic.subTopics.map((subTopic: any, index: number) => (
          <SubTopicCard
            key={subTopic.id}
            onClick={() => handleSubTopicClick(subTopic.id)}
            $color={topic.color}
            $progress={subTopic.progress}
            style={{ marginBottom: 24 }}
          >
            <Row gutter={24} align='middle'>
              <Col xs={24} sm={4} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: `${topic.color}15`,
                    color: topic.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    margin: '0 auto',
                  }}
                >
                  {index + 1}
                </div>
              </Col>

              <Col xs={24} sm={16}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}
                  >
                    <Title level={4} style={{ margin: 0 }}>
                      {subTopic.name}
                    </Title>
                    {subTopic.progress === 100 && (
                      <Tag
                        color='success'
                        icon={<CheckCircleOutlined />}
                        style={{ marginLeft: 8 }}
                      >
                        Completed
                      </Tag>
                    )}
                  </div>

                  <Paragraph style={{ marginBottom: 16, fontSize: 15 }}>
                    {subTopic.description}
                  </Paragraph>

                  <Space wrap>
                    <DifficultyTag
                      $difficulty={subTopic.difficulty}
                      icon={<UserOutlined />}
                    >
                      {subTopic.difficulty}
                    </DifficultyTag>

                    <Tag icon={<BookOutlined />} color='blue'>
                      {subTopic.lessons} modules
                    </Tag>

                    <Tag icon={<ClockCircleOutlined />} color='purple'>
                      {subTopic.duration}
                    </Tag>

                    <ProgressTag
                      $progress={subTopic.progress}
                      icon={<LineChartOutlined />}
                    >
                      {subTopic.progress}% complete
                    </ProgressTag>
                  </Space>
                </div>
              </Col>

              <Col xs={24} sm={4} style={{ textAlign: 'right' }}>
                <Button
                  type='primary'
                  shape='circle'
                  icon={<ArrowRightOutlined />}
                  size='large'
                  style={{ background: topic.color, borderColor: topic.color }}
                />
              </Col>

              <Col span={24}>
                <div className='progress-indicator'>
                  <div className='progress-bar'></div>
                </div>
              </Col>
            </Row>
          </SubTopicCard>
        ))}
      </div>
    </div>
  );
};

export default SubTopicsPage;
