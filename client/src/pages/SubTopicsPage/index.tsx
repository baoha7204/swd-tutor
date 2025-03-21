'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { Typography, Row, Col, Card, Progress, Breadcrumb } from 'antd';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  FunctionOutlined,
  RightOutlined,
  HistoryOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
`;

const SubTopicCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.3s ease;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const HistoricalFigure = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const CircleAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

  return (
    <div>
      <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to='/'>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/topics'>Topics</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{topic.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Title level={2}>{topic.name}</Title>
      <Paragraph type='secondary' style={{ marginBottom: 24 }}>
        {topic.description}
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={8}>
          <StyledCard>
            <Title level={5}>Estimated Duration</Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ClockCircleOutlined />
              <Text>{topic.estimatedDuration}</Text>
            </div>
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Title level={5}>Total Lessons</Title>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FunctionOutlined />
              <Text>{topic.totalLessons} lessons</Text>
            </div>
          </StyledCard>
        </Col>
        <Col xs={24} md={8}>
          <StyledCard>
            <Title level={5}>Your Progress</Title>
            <Progress percent={topic.progress} />
          </StyledCard>
        </Col>
      </Row>

      <Title level={4} style={{ margin: '32px 0 16px' }}>
        Historical Context
      </Title>
      <Row gutter={[24, 24]}>
        {topic.historicalFigures.map((figure: any, index: number) => (
          <Col key={index} xs={24} sm={8}>
            <HistoricalFigure>
              <CircleAvatar>
                <img
                  src={figure.image || '/placeholder.svg'}
                  alt={figure.name}
                />
              </CircleAvatar>
              <Text strong>{figure.name}</Text>
              <Text type='secondary'>{figure.title}</Text>
              <Text type='secondary'>({figure.years})</Text>
            </HistoricalFigure>
          </Col>
        ))}
      </Row>

      <Title level={4} style={{ margin: '32px 0 16px' }}>
        Learning Path
      </Title>
      <Row gutter={[24, 24]}>
        {topic.subTopics.map((subTopic: any) => (
          <Col key={subTopic.id} xs={24} sm={12}>
            <SubTopicCard onClick={() => handleSubTopicClick(subTopic.id)}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <Title level={4} style={{ margin: 0 }}>
                  {subTopic.name}
                </Title>
                <RightOutlined />
              </div>
              <Paragraph type='secondary'>{subTopic.description}</Paragraph>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FunctionOutlined />
                  <Text type='secondary'>{subTopic.lessons} lessons</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ClockCircleOutlined />
                  <Text type='secondary'>{subTopic.duration}</Text>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <UserOutlined />
                  <Text type='secondary'>{subTopic.difficulty}</Text>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <HistoryOutlined />
                  <Text type='secondary'>{subTopic.progress}% complete</Text>
                </div>
              </div>
              <Progress
                percent={subTopic.progress}
                showInfo={false}
                strokeColor={topic.color}
              />
            </SubTopicCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SubTopicsPage;
