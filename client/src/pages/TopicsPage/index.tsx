'use client';

import type React from 'react';
import { Typography, Row, Col, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  FunctionOutlined,
  BorderOutlined,
  LineChartOutlined,
  PercentageOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const TopicCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  height: 100%;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-color: ${(props) => props.color}15;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
`;

const ProgressBar = styled.div<{ percent: number; color: string }>`
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  margin-top: 16px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.percent}%;
    background-color: ${(props) => props.color};
    border-radius: 3px;
  }
`;

const TopicsPage: React.FC = () => {
  const navigate = useNavigate();

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
      progress: 75,
      lessons: 24,
      estimatedTime: '12 weeks',
    },
    {
      id: 'geometry',
      name: 'Geometry',
      description:
        'Explore shapes, sizes, positions, and dimensions of objects',
      icon: <BorderOutlined />,
      color: '#7209b7',
      progress: 45,
      lessons: 20,
      estimatedTime: '10 weeks',
    },
    {
      id: 'analysis',
      name: 'Analysis',
      description: 'Study limits, continuity, differentiation, and integration',
      icon: <LineChartOutlined />,
      color: '#f72585',
      progress: 25,
      lessons: 28,
      estimatedTime: '14 weeks',
    },
    {
      id: 'probability',
      name: 'Probability',
      description:
        'Understand randomness, uncertainty, and statistical inference',
      icon: <PercentageOutlined />,
      color: '#4cc9f0',
      progress: 10,
      lessons: 18,
      estimatedTime: '9 weeks',
    },
  ];

  const handleTopicClick = (topicId: string) => {
    navigate(`/topics/${topicId}`);
  };

  return (
    <div>
      <Title level={2}>Mathematics Topics</Title>
      <Paragraph type='secondary' style={{ marginBottom: 24 }}>
        Explore our comprehensive collection of math topics designed to build
        your skills from fundamentals to advanced concepts.
      </Paragraph>

      <Row gutter={[24, 24]}>
        {topics.map((topic) => (
          <Col key={topic.id} xs={24} sm={12} lg={8} xl={6}>
            <TopicCard onClick={() => handleTopicClick(topic.id)}>
              <IconWrapper color={topic.color}>{topic.icon}</IconWrapper>
              <Title level={4}>{topic.name}</Title>
              <Paragraph type='secondary'>{topic.description}</Paragraph>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type='secondary'>{topic.lessons} lessons</Text>
                <Text type='secondary'>{topic.estimatedTime}</Text>
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
    </div>
  );
};

export default TopicsPage;
