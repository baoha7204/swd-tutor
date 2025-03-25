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
  Button,
  Divider,
} from 'antd';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  BookOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  LockOutlined,
  RightOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
`;

const ModuleCard = styled(Card)<{ status: string }>`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
  cursor: ${(props) => (props.status === 'locked' ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.status === 'locked' ? 0.7 : 1)};
  transition: all 0.3s ease;

  &:hover {
    transform: ${(props) =>
      props.status === 'locked' ? 'none' : 'translateY(-5px)'};
    box-shadow: ${(props) =>
      props.status === 'locked'
        ? '0 2px 8px rgba(0, 0, 0, 0.06)'
        : '0 10px 20px rgba(0, 0, 0, 0.1)'};
  }
`;

const StatusBadge = styled.div<{ status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${(props) => {
    switch (props.status) {
      case 'completed':
        return '#52c41a20';
      case 'in-progress':
        return '#1890ff20';
      case 'locked':
        return '#f5222d20';
      default:
        return '#d9d9d920';
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case 'completed':
        return '#52c41a';
      case 'in-progress':
        return '#1890ff';
      case 'locked':
        return '#f5222d';
      default:
        return '#d9d9d9';
    }
  }};
`;

const IconContainer = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  background-color: ${(props) => {
    switch (props.type) {
      case 'theory':
        return '#4361ee20';
      case 'practice':
        return '#7209b720';
      case 'assessment':
        return '#f7258520';
      default:
        return '#d9d9d920';
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case 'theory':
        return '#4361ee';
      case 'practice':
        return '#7209b7';
      case 'assessment':
        return '#f72585';
      default:
        return '#d9d9d9';
    }
  }};
`;

const ModulesPage: React.FC = () => {
  const { topicId, subtopicId } = useParams<{
    topicId: string;
    subtopicId: string;
  }>();
  const navigate = useNavigate();
  const [subtopic, setSubtopic] = useState<any>(null);
  const [topic, setTopic] = useState<any>(null);

  // Hardcoded data
  const topicsData = {
    algebra: {
      id: 'algebra',
      name: 'Algebra',
      color: '#4361ee',
      subTopics: {
        'linear-equations': {
          id: 'linear-equations',
          name: 'Linear Equations',
          description:
            'A linear equation is an equation where each term is either a constant or the product of a constant and a single variable raised to the first power.',
          progress: 65,
          modules: [
            {
              id: 'intro-linear-equations',
              name: 'Introduction to Linear Equations',
              type: 'theory',
              status: 'completed',
              duration: '25 min',
              description:
                'Learn the basic concepts and definitions of linear equations',
            },
            {
              id: 'slope-intercepts',
              name: 'Slope and Intercepts',
              type: 'theory',
              status: 'in-progress',
              duration: '30 min',
              description:
                'Understand the slope-intercept form and point-slope form',
            },
            {
              id: 'graphing-linear-equations',
              name: 'Graphing Linear Equations',
              type: 'practice',
              status: 'locked',
              duration: '45 min',
              description:
                'Practice plotting linear equations on the coordinate plane',
            },
            {
              id: 'systems-of-equations',
              name: 'Systems of Linear Equations',
              type: 'theory',
              status: 'locked',
              duration: '40 min',
              description:
                'Learn methods for solving systems of linear equations',
            },
            {
              id: 'linear-equations-mastery-quiz',
              name: 'Linear Equations Mastery Quiz',
              type: 'assessment',
              status: 'locked',
              duration: '60 min',
              description:
                'Test your knowledge of linear equations with this comprehensive quiz',
            },
          ],
          relatedTopics: [
            { id: 'graphing', name: 'Graphing' },
            { id: 'systems-of-equations', name: 'Systems of Equations' },
            { id: 'inequalities', name: 'Inequalities' },
          ],
        },
        'quadratic-equations': {
          id: 'quadratic-equations',
          name: 'Quadratic Equations',
          description:
            'A quadratic equation is a second-degree polynomial equation with the general form ax² + bx + c = 0, where a ≠ 0.',
          progress: 30,
          modules: [
            {
              id: 'intro-quadratic-equations',
              name: 'Introduction to Quadratic Equations',
              type: 'theory',
              status: 'completed',
              duration: '30 min',
              description:
                'Learn the basic concepts and definitions of quadratic equations',
            },
            {
              id: 'solving-by-factoring',
              name: 'Solving Quadratics by Factoring',
              type: 'practice',
              status: 'in-progress',
              duration: '45 min',
              description:
                'Practice solving quadratic equations using factorization',
            },
            {
              id: 'quadratic-formula',
              name: 'The Quadratic Formula',
              type: 'theory',
              status: 'locked',
              duration: '35 min',
              description:
                'Learn to use the quadratic formula to solve any quadratic equation',
            },
            {
              id: 'graphing-parabolas',
              name: 'Graphing Parabolas',
              type: 'practice',
              status: 'locked',
              duration: '50 min',
              description:
                'Practice plotting quadratic functions on the coordinate plane',
            },
            {
              id: 'quadratic-equations-mastery-quiz',
              name: 'Quadratic Equations Mastery Quiz',
              type: 'assessment',
              status: 'locked',
              duration: '60 min',
              description:
                'Test your knowledge of quadratic equations with this comprehensive quiz',
            },
          ],
          relatedTopics: [
            { id: 'polynomials', name: 'Polynomials' },
            { id: 'graphing', name: 'Graphing' },
            { id: 'functions', name: 'Functions' },
          ],
        },
      },
    },
  };

  useEffect(() => {
    if (
      topicId &&
      subtopicId &&
      topicsData[topicId as keyof typeof topicsData] &&
      topicsData[topicId as keyof typeof topicsData].subTopics[subtopicId]
    ) {
      setTopic(topicsData[topicId as keyof typeof topicsData]);
      setSubtopic(
        topicsData[topicId as keyof typeof topicsData].subTopics[subtopicId]
      );
    }
  }, [topicId, subtopicId]);

  const handleModuleClick = (moduleId: string, status: string) => {
    if (status !== 'locked') {
      navigate(
        `/topics/${topicId}/subtopics/${subtopicId}/modules/${moduleId}`
      );
    }
  };

  if (!subtopic || !topic) {
    return <div>Loading...</div>;
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'locked':
        return 'Locked';
      default:
        return 'Not Started';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'theory':
        return <BookOutlined />;
      case 'practice':
        return <EditOutlined />;
      case 'assessment':
        return <CheckCircleOutlined />;
      default:
        return <BookOutlined />;
    }
  };

  return (
    <div>
      {/* <Breadcrumb style={{ marginBottom: 16 }}>
        <Breadcrumb.Item>
          <Link to='/'>Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to='/topics'>Topics</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={`/topics/${topicId}`}>{topic.name}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{subtopic.name}</Breadcrumb.Item>
      </Breadcrumb> */}

      <Title level={2}>{subtopic.name}</Title>
      <Paragraph type='secondary' style={{ marginBottom: 24 }}>
        {subtopic.description}
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <StyledCard>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <Title level={4} style={{ margin: 0 }}>
                Course Progress
              </Title>
              <Text type='secondary'>{Math.round(subtopic.progress)}%</Text>
            </div>
            <Progress percent={subtopic.progress} strokeColor={topic.color} />
          </StyledCard>

          <Title level={4} style={{ margin: '24px 0 16px' }}>
            Modules
          </Title>

          {subtopic.modules.map((module: any, index: number) => (
            <ModuleCard
              key={module.id}
              status={module.status}
              onClick={() => handleModuleClick(module.id, module.status)}
            >
              <div style={{ display: 'flex', gap: 16 }}>
                <IconContainer type={module.type}>
                  {getModuleIcon(module.type)}
                </IconContainer>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Title level={5} style={{ margin: 0 }}>
                      {index + 1}. {module.name}
                    </Title>
                    {module.status === 'locked' ? (
                      <LockOutlined style={{ color: '#f5222d' }} />
                    ) : (
                      <RightOutlined />
                    )}
                  </div>
                  <Paragraph type='secondary' style={{ margin: '8px 0' }}>
                    {module.description}
                  </Paragraph>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                      <ClockCircleOutlined style={{ color: '#8c8c8c' }} />
                      <Text type='secondary'>{module.duration}</Text>
                    </div>
                    <StatusBadge status={module.status}>
                      {getStatusText(module.status)}
                    </StatusBadge>
                  </div>
                </div>
              </div>
            </ModuleCard>
          ))}
        </Col>

        <Col xs={24} lg={8}>
          <StyledCard title='Related Topics'>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {subtopic.relatedTopics.map((relatedTopic: any) => (
                <Link
                  key={relatedTopic.id}
                  to={`/topics/${topicId}/subtopics/${relatedTopic.id}`}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '8px 0',
                    }}
                  >
                    <Text>{relatedTopic.name}</Text>
                    <RightOutlined style={{ color: '#8c8c8c' }} />
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                </Link>
              ))}
            </div>
          </StyledCard>

          <StyledCard title='Need Help?'>
            <Paragraph>
              Stuck on a concept? Our AI tutor can help you understand the
              material better.
            </Paragraph>
            <Button type='primary' block>
              Ask AI Tutor
            </Button>
          </StyledCard>
        </Col>
      </Row>
    </div>
  );
};

export default ModulesPage;
