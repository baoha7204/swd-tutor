'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import {
  Typography,
  Row,
  Col,
  Card,
  Progress,
  Button,
  Divider,
  Space,
  Tag,
  Steps,
  Tooltip,
  Badge,
  Avatar,
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
  ArrowRightOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  TrophyOutlined,
  FileTextOutlined,
  RobotOutlined,
  StarFilled,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const PageHeader = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.$color}30 0%,
    ${(props) => props.$color}10 100%
  );
  border-radius: 20px;
  padding: 40px;
  margin-bottom: 36px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.07);
  border: 1px solid ${(props) => props.$color}15;

  &::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: ${(props) => props.$color}20;
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: 25%;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: ${(props) => props.$color}15;
    z-index: 0;
  }
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  margin-bottom: 28px;
  transition: all 0.3s ease;
  border: none;
  overflow: hidden;

  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
    padding: 16px 24px;
  }

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.09);
    transform: translateY(-2px);
  }
`;

const ModuleCard = styled(Card)<{ $status: string; $color: string }>`
  border-radius: 16px;
  margin-bottom: 22px;
  cursor: ${(props) =>
    props.$status === 'locked' ? 'not-allowed' : 'pointer'};
  opacity: ${(props) => (props.$status === 'locked' ? 0.85 : 1)};
  transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
  border: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.07);
  border-left: ${(props) =>
    props.$status === 'completed'
      ? '6px solid #52c41a'
      : props.$status === 'in-progress'
      ? `6px solid ${props.$color}`
      : 'none'};
  background: ${(props) =>
    props.$status === 'completed'
      ? 'linear-gradient(to right, #f6ffed, #ffffff)'
      : props.$status === 'in-progress'
      ? `linear-gradient(to right, ${props.$color}08, #ffffff)`
      : 'white'};

  &:hover {
    transform: ${(props) =>
      props.$status === 'locked' ? 'none' : 'translateY(-5px)'};
    box-shadow: ${(props) =>
      props.$status === 'locked'
        ? '0 6px 16px rgba(0, 0, 0, 0.07)'
        : '0 12px 28px rgba(0, 0, 0, 0.12)'};
  }

  .module-content {
    position: relative;
    z-index: 2;
  }

  .locked-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    border-radius: 16px;
    backdrop-filter: blur(4px);
  }
`;

const StatusBadge = styled(Tag)<{ $status: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  &.completed {
    background-color: #f6ffed;
    color: #52c41a;
  }

  &.in-progress {
    background-color: #e6f7ff;
    color: #1890ff;
  }

  &.locked {
    background-color: #fff2e8;
    color: #fa8c16;
  }

  &.not-started {
    background-color: #f5f5f5;
    color: #8c8c8c;
  }
`;

const ModuleIcon = styled.div<{ $type: string }>`
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &.theory {
    background: linear-gradient(135deg, #e6f7ff 0%, #bae7ff 100%);
    color: #1890ff;
  }

  &.practice {
    background: linear-gradient(135deg, #f0f5ff 0%, #d6e4ff 100%);
    color: #597ef7;
  }

  &.assessment {
    background: linear-gradient(135deg, #f9f0ff 0%, #efdbff 100%);
    color: #722ed1;
  }
`;

const PathNavigation = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  /* background-color: #fafafa; */
  border-radius: 12px;
  /* border: 1px solid #f0f0f0; */

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

const CircleBadge = styled.div<{ $status: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  transition: all 0.3s ease;
  background-color: ${(props) => {
    switch (props.$status) {
      case 'completed':
        return '#52c41a';
      case 'in-progress':
        return '#1890ff';
      case 'locked':
        return '#d9d9d9';
      default:
        return '#f5f5f5';
    }
  }};
  color: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
`;

const RelatedTopicCard = styled(Card)`
  border-radius: 14px;
  margin-bottom: 14px;
  transition: all 0.25s ease;
  cursor: pointer;
  border: 1px solid #f0f0f0;
  overflow: hidden;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: #d9d9d9;
  }
`;

const HelpCard = styled(StyledCard)`
  background: linear-gradient(135deg, #f9f0ff 0%, #efdbff 100%);
  border: none;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgba(114, 46, 209, 0.05);
    top: -30px;
    right: -30px;
  }

  .help-icon {
    font-size: 54px;
    margin-bottom: 20px;
    color: #722ed1;
    filter: drop-shadow(0 4px 6px rgba(114, 46, 209, 0.2));
  }
`;

const ProgressCircle = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background: white;
  }
`;

const ProgressValue = styled.div<{ $color: string }>`
  position: relative;
  z-index: 2;
  font-size: 40px;
  font-weight: bold;
  color: ${(props) => props.$color};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
        return <TrophyOutlined />;
      default:
        return <BookOutlined />;
    }
  };

  // Count completed modules
  const completedModules = subtopic.modules.filter(
    (module: any) => module.status === 'completed'
  ).length;
  const totalModules = subtopic.modules.length;

  return (
    <div>
      <PathNavigation>
        <Link to='/topics'>Topics</Link>
        <span className='divider'>/</span>
        <Link to={`/topics/${topicId}`}>{topic.name}</Link>
        <span className='divider'>/</span>
        <span className='current'>{subtopic.name}</span>
      </PathNavigation>

      <PageHeader $color={topic.color}>
        <Row gutter={[24, 24]} align='middle'>
          <Col xs={24} md={16}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <Title
                level={2}
                style={{ margin: 0, marginBottom: 16, fontSize: 32 }}
              >
                {subtopic.name}
              </Title>
              <Paragraph
                style={{ fontSize: 16, marginBottom: 24, maxWidth: '90%' }}
              >
                {subtopic.description}
              </Paragraph>

              <Space size={16} wrap>
                <Badge
                  count={`${completedModules}/${totalModules}`}
                  style={{
                    backgroundColor: '#52c41a',
                    fontSize: 12,
                    fontWeight: 'bold',
                    boxShadow: '0 2px 6px rgba(82, 196, 26, 0.2)',
                  }}
                >
                  <Tag
                    icon={<BookOutlined />}
                    color='blue'
                    style={{ padding: '8px 16px', borderRadius: '12px' }}
                  >
                    Modules
                  </Tag>
                </Badge>

                <Tag
                  icon={<ClockCircleOutlined />}
                  color='purple'
                  style={{ padding: '8px 16px', borderRadius: '12px' }}
                >
                  {/* Estimate total time based on module durations */}
                  Est.{' '}
                  {subtopic.modules.reduce((acc: number, module: any) => {
                    const timeStr = module.duration.split(' ')[0];
                    return acc + parseInt(timeStr);
                  }, 0)}{' '}
                  mins total
                </Tag>
              </Space>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  marginBottom: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text strong style={{ fontSize: 16 }}>
                  Your Progress
                </Text>
              </div>

              <Progress
                percent={subtopic.progress}
                strokeColor={topic.color}
                strokeWidth={12}
                style={{
                  marginBottom: 20,
                  height: 16,
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                }}
              />

              <Button
                type='primary'
                icon={<ThunderboltOutlined />}
                size='large'
                style={{
                  backgroundColor: topic.color,
                  borderColor: topic.color,
                  height: '44px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  boxShadow: `0 4px 12px ${topic.color}60`,
                  width: '100%',
                }}
                onClick={() => {
                  // Find the first non-completed module
                  const nextModule = subtopic.modules.find(
                    (m: any) =>
                      m.status === 'in-progress' || m.status === 'not-started'
                  );
                  if (nextModule) {
                    handleModuleClick(nextModule.id, nextModule.status);
                  } else {
                    // If all are completed, go to the first module
                    handleModuleClick(
                      subtopic.modules[0].id,
                      subtopic.modules[0].status
                    );
                  }
                }}
              >
                Continue Learning
              </Button>
            </div>
          </Col>
        </Row>
      </PageHeader>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <StyledCard
            title={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 16,
                }}
              >
                <FileTextOutlined style={{ color: topic.color }} />
                <span>Learning Path</span>
              </div>
            }
            extra={
              <Tag color='success' style={{ margin: 0 }}>
                {completedModules} of {totalModules} completed
              </Tag>
            }
          >
            <Steps
              direction='vertical'
              current={completedModules}
              progressDot={(dot, { status, index }) => {
                const module = subtopic.modules[index];
                return module ? (
                  <Tooltip
                    title={`${getStatusText(module.status)} - ${module.type}`}
                  >
                    <CircleBadge $status={module.status}>
                      {module.status === 'completed' ? (
                        <CheckCircleOutlined />
                      ) : (
                        index + 1
                      )}
                    </CircleBadge>
                  </Tooltip>
                ) : (
                  dot
                );
              }}
            >
              {subtopic.modules.map((module: any, index: number) => (
                <Step
                  key={module.id}
                  title={
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: module.status === 'in-progress' ? 600 : 400,
                        marginLeft: 20,
                      }}
                    >
                      {module.name}
                    </div>
                  }
                  description={
                    <Text
                      type='secondary'
                      style={{ fontSize: 14, marginLeft: 20 }}
                    >
                      {module.description}
                    </Text>
                  }
                  status={
                    module.status === 'completed'
                      ? 'finish'
                      : module.status === 'in-progress'
                      ? 'process'
                      : module.status === 'locked'
                      ? 'wait'
                      : 'wait'
                  }
                />
              ))}
            </Steps>
          </StyledCard>

          <Title
            level={4}
            style={{
              margin: '32px 0 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <BookOutlined style={{ color: topic.color }} />
            <span>Module Details</span>
          </Title>

          {subtopic.modules.map((module: any, index: number) => (
            <ModuleCard
              key={module.id}
              $status={module.status}
              $color={topic.color}
              onClick={() => handleModuleClick(module.id, module.status)}
              bodyStyle={{ padding: '28px', position: 'relative' }}
            >
              {/* Status badge positioned in the top right corner */}
              <StatusBadge
                $status={module.status}
                className={module.status}
                icon={
                  module.status === 'completed' ? (
                    <CheckCircleOutlined />
                  ) : module.status === 'in-progress' ? (
                    <ClockCircleOutlined />
                  ) : module.status === 'locked' ? (
                    <LockOutlined />
                  ) : (
                    <ClockCircleOutlined />
                  )
                }
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  zIndex: 3,
                }}
              >
                {getStatusText(module.status)}
              </StatusBadge>
              {module.status === 'locked' && (
                <div className='locked-overlay'>
                  <Space
                    direction='vertical'
                    align='center'
                    style={{
                      position: 'absolute',
                      bottom: '20px',
                      right: '20px',
                    }}
                  >
                    {/* <LockOutlined
                      style={{
                        fontSize: 32,
                        color: '#fa8c16',
                        marginBottom: 8,
                      }}
                    /> */}
                    <Text
                      strong
                      style={{
                        color: '#fa8c16',
                        fontSize: 16,
                        textAlign: 'end',
                      }}
                    >
                      Complete previous modules to unlock
                    </Text>
                  </Space>
                </div>
              )}

              <div className='module-content'>
                <Row gutter={[20, 20]} align='middle'>
                  <Col xs={24} sm={4}>
                    <ModuleIcon $type={module.type} className={module.type}>
                      {getModuleIcon(module.type)}
                    </ModuleIcon>
                  </Col>

                  <Col xs={24} sm={16}>
                    <div>
                      <Space align='center' style={{ marginBottom: 12 }}>
                        <Title level={4} style={{ margin: 0, fontSize: 18 }}>
                          {index + 1}. {module.name}
                        </Title>
                        {module.status === 'completed' && (
                          <CheckCircleOutlined
                            style={{ color: '#52c41a', fontSize: 18 }}
                          />
                        )}
                      </Space>

                      <Paragraph style={{ margin: '14px 0', color: '#595959' }}>
                        {module.description}
                      </Paragraph>

                      <Space size={16}>
                        <Tag
                          color={
                            module.type === 'theory'
                              ? 'blue'
                              : module.type === 'practice'
                              ? 'purple'
                              : 'magenta'
                          }
                          style={{ padding: '4px 12px', borderRadius: '10px' }}
                        >
                          {module.type.charAt(0).toUpperCase() +
                            module.type.slice(1)}
                        </Tag>

                        <Tag
                          icon={<ClockCircleOutlined />}
                          color='cyan'
                          style={{ padding: '4px 12px', borderRadius: '10px' }}
                        >
                          {module.duration}
                        </Tag>
                      </Space>
                    </div>
                  </Col>

                  <Col xs={24} sm={4} style={{ textAlign: 'right' }}>
                    {module.status !== 'locked' && (
                      <Button
                        type='primary'
                        shape='circle'
                        icon={<ArrowRightOutlined />}
                        size='large'
                        style={{
                          backgroundColor: topic.color,
                          borderColor: topic.color,
                          width: '46px',
                          height: '46px',
                          boxShadow: `0 4px 8px ${topic.color}60`,
                        }}
                      />
                    )}
                  </Col>
                </Row>
              </div>
            </ModuleCard>
          ))}
        </Col>

        <Col xs={24} lg={8}>
          {/* Progress Card */}
          <StyledCard
            title={
              <Space>
                <TrophyOutlined style={{ color: '#faad14' }} />
                <span style={{ fontSize: 16 }}>Your Progress</span>
              </Space>
            }
            style={{ marginBottom: 24 }}
          >
            <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
              <ProgressCircle>
                <CircleBackground />
                <Progress
                  type='circle'
                  percent={Math.round(subtopic.progress)}
                  strokeColor={topic.color}
                  strokeWidth={10}
                  width={160}
                  format={() => (
                    <ProgressValue $color={topic.color}>
                      {Math.round(subtopic.progress)}%
                    </ProgressValue>
                  )}
                />
              </ProgressCircle>
              <Text type='secondary' style={{ fontSize: 16 }}>
                Overall Completion
              </Text>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <Space direction='vertical' style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 15 }}>Completed Modules</Text>
                <Text strong style={{ fontSize: 15 }}>
                  {completedModules}/{totalModules}
                </Text>
              </div>
              <Progress
                percent={(completedModules / totalModules) * 100}
                showInfo={false}
                strokeColor='#52c41a'
                size='small'
                style={{ marginBottom: 16 }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 15 }}>Time Spent</Text>
                <Text strong style={{ fontSize: 15 }}>
                  45 mins
                </Text>
              </div>
              <Progress
                percent={50}
                showInfo={false}
                strokeColor='#1890ff'
                size='small'
                style={{ marginBottom: 16 }}
              />

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 15 }}>Exercises Completed</Text>
                <Text strong style={{ fontSize: 15 }}>
                  12/18
                </Text>
              </div>
              <Progress
                percent={(12 / 18) * 100}
                showInfo={false}
                strokeColor='#722ed1'
                size='small'
              />
            </Space>
          </StyledCard>

          {/* Related Topics */}
          {/* <StyledCard
            title={
              <Space>
                <FileTextOutlined style={{ color: '#1890ff' }} />
                <span style={{ fontSize: 16 }}>Related Topics</span>
              </Space>
            }
            style={{ marginBottom: 24 }}
          >
            {subtopic.relatedTopics.map((relatedTopic: any) => (
              <RelatedTopicCard
                key={relatedTopic.id}
                size='small'
                onClick={() =>
                  navigate(`/topics/${topicId}/subtopics/${relatedTopic.id}`)
                }
                style={{ marginBottom: 14 }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 4px',
                  }}
                >
                  <Space>
                    <Avatar
                      style={{
                        backgroundColor: topic.color,
                        verticalAlign: 'middle',
                        boxShadow: `0 2px 4px ${topic.color}40`,
                      }}
                      size='default'
                    >
                      {relatedTopic.name.charAt(0)}
                    </Avatar>
                    <Text strong style={{ fontSize: 15 }}>
                      {relatedTopic.name}
                    </Text>
                  </Space>
                  <RightOutlined style={{ color: '#8c8c8c' }} />
                </div>
              </RelatedTopicCard>
            ))}
          </StyledCard> */}

          {/* Help Card */}
          <HelpCard
            style={{
              background: `linear-gradient(135deg, ${topic.color}30 0%, ${topic.color}10 100%)`,
              border: `1px solid ${topic.color}15`,
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.07)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                padding: '20px 0',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <img
                src='/Frame.png'
                className='help-icon'
                style={{
                  display: 'flex',
                  margin: '0 auto',
                  marginBottom: 20,
                  filter: 'drop-shadow(0 4px 6px rgba(114, 46, 209, 0.2))',
                  width: 32,
                }}
              />
              <Title level={4}>Need Help?</Title>
              <Paragraph style={{ marginBottom: 24, fontSize: 15 }}>
                Stuck on a concept? Our AI tutor can help you understand the
                material better with personalized explanations.
              </Paragraph>
              <Button
                type='primary'
                icon={<BulbOutlined />}
                size='large'
                style={{
                  backgroundColor: topic.color,
                  borderColor: topic.color,
                  borderRadius: '12px',
                  height: '44px',
                  boxShadow: `0 4px 12px ${topic.color}60`,
                }}
              >
                Ask AI Tutor
              </Button>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '-80px',
                right: '-80px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: `${topic.color}20`,
                zIndex: 0,
              }}
            ></div>
            <div
              style={{
                position: 'absolute',
                bottom: '-60px',
                left: '25%',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `${topic.color}15`,
                zIndex: 0,
              }}
            ></div>
          </HelpCard>

          {/* Earning Badge Card */}
          <StyledCard
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, #fff8f0 0%, #fffbe6 100%)',
              border: '1px dashed #ffd591',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'rgba(250, 140, 22, 0.1)',
              }}
            />
            <Space
              direction='vertical'
              align='center'
              style={{ position: 'relative', zIndex: 1 }}
            >
              <div
                style={{
                  fontSize: 42,
                  color: '#fa8c16',
                  marginBottom: 12,
                  filter: 'drop-shadow(0 4px 6px rgba(250, 140, 22, 0.2))',
                }}
              >
                <StarFilled />
              </div>
              <Title level={4} style={{ margin: 0, marginBottom: 12 }}>
                Complete All Modules
              </Title>
              <Text style={{ fontSize: 15, color: '#8c8c8c' }}>
                Finish all modules to earn the "{subtopic.name} Master" badge
                and unlock advanced content.
              </Text>
            </Space>
          </StyledCard>
        </Col>
      </Row>

      {/* Action Buttons
      <div
        style={{
          marginTop: 48,
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button
          icon={<HomeOutlined />}
          onClick={() => navigate(`/topics/${topicId}`)}
          size='large'
          style={{
            borderRadius: '12px',
            height: '44px',
          }}
        >
          Back to {topic.name}
        </Button>

        <Button
          type='primary'
          icon={<ThunderboltOutlined />}
          size='large'
          style={{
            backgroundColor: topic.color,
            borderColor: topic.color,
            borderRadius: '12px',
            height: '44px',
            boxShadow: `0 4px 12px ${topic.color}60`,
          }}
          onClick={() => {
            // Find the first non-completed module
            const nextModule = subtopic.modules.find(
              (m: any) =>
                m.status === 'in-progress' || m.status === 'not-started'
            );
            if (nextModule) {
              handleModuleClick(nextModule.id, nextModule.status);
            } else {
              // If all are completed, go to the first module
              handleModuleClick(
                subtopic.modules[0].id,
                subtopic.modules[0].status
              );
            }
          }}
        >
          Continue Learning
        </Button>
      </div> */}
    </div>
  );
};

export default ModulesPage;
