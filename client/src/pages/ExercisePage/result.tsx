import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Typography,
  List,
  Card,
  Divider,
  Space,
  Tag,
  Row,
  Col,
  Progress,
  Statistic,
  Timeline,
  Avatar,
  Rate,
  Tabs,
  Empty,
  Steps,
  Tooltip,
  Table,
  Layout,
} from 'antd';
import {
  CheckCircleFilled,
  CloseCircleFilled,
  BookOutlined,
  RocketOutlined,
  BarChartOutlined,
  BulbOutlined,
  TrophyOutlined,
  CalendarOutlined,
  FileTextOutlined,
  StarOutlined,
  QuestionCircleOutlined,
  ThunderboltOutlined,
  HomeOutlined,
  LineChartOutlined,
  LikeOutlined,
  FieldTimeOutlined,
  SafetyOutlined,
  AimOutlined,
  TrophyFilled,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

// Mock AI recommendation data
const getRecommendations = (incorrectExerciseIds: string[]) => {
  const recommendationMap: Record<string, any> = {
    'linear-eq-1': {
      topic: 'Linear Equations',
      conceptsToReview: ['Moving terms between sides', 'Isolating variables'],
      practiceTopics: ['Single-variable equations', 'Simplifying expressions'],
      resources: [
        { title: 'Basic Algebraic Operations', type: 'video' },
        { title: 'Step-by-Step Linear Equation Solving', type: 'article' },
      ],
    },
    'linear-eq-2': {
      topic: 'Linear Equations with Negative Terms',
      conceptsToReview: [
        'Working with negative numbers',
        'Order of operations',
      ],
      practiceTopics: [
        'Equations with negative coefficients',
        'Multi-step equations',
      ],
      resources: [
        { title: 'Handling Negative Numbers in Equations', type: 'video' },
        { title: 'Common Mistakes with Signs in Algebra', type: 'interactive' },
      ],
    },
    'linear-eq-3': {
      topic: 'Simple Linear Equations',
      conceptsToReview: ['Coefficient operations', 'Basic equation structure'],
      practiceTopics: ['Simple algebraic equations', 'Step-by-step solving'],
      resources: [
        { title: 'Basics of Linear Equations', type: 'video' },
        {
          title: 'Practice Makes Perfect: Simple Equations',
          type: 'exercises',
        },
      ],
    },
    'linear-eq-4': {
      topic: 'Equations with Variables on Both Sides',
      conceptsToReview: ['Like terms', 'Transposing terms'],
      practiceTopics: ['Rearranging equations', 'Variable isolation'],
      resources: [
        {
          title: 'Solving Equations with Variables on Both Sides',
          type: 'interactive',
        },
        { title: 'Common Errors in Multi-Term Equations', type: 'article' },
      ],
    },
    'linear-eq-5': {
      topic: 'Equations with Parentheses',
      conceptsToReview: ['Distributive property', 'Expanding brackets'],
      practiceTopics: ['Bracket expansion', 'Simplifying expressions'],
      resources: [
        { title: 'Working with Brackets in Algebra', type: 'video' },
        { title: 'The Distributive Property Explained', type: 'article' },
      ],
    },
    'linear-eq-6': {
      topic: 'Multi-Step Equations with Parentheses',
      conceptsToReview: ['Bracket expansion', 'Combining like terms'],
      practiceTopics: ['Multi-step equations', 'Combining operations'],
      resources: [
        { title: 'Solving Complex Linear Equations', type: 'interactive' },
        {
          title: 'Step-by-Step Approach to Multi-Term Equations',
          type: 'video',
        },
      ],
    },
    'linear-eq-7': {
      topic: 'Complex Linear Equations',
      conceptsToReview: ['Multiple brackets', 'Term combination strategies'],
      practiceTopics: [
        'Advanced linear equations',
        'Complex expansion techniques',
      ],
      resources: [
        { title: 'Mastering Complex Linear Equations', type: 'video' },
        { title: 'Advanced Techniques for Linear Equations', type: 'workbook' },
      ],
    },
  };

  // If no wrong answers, provide general improvement suggestions
  if (incorrectExerciseIds.length === 0) {
    return {
      title: 'Continue Your Excellence!',
      description: "You're doing great! Here are some topics to explore next:",
      items: [
        {
          title: 'Advanced Algebra Concepts',
          description:
            'Challenge yourself with more complex equations and expressions',
          type: 'challenge',
        },
        {
          title: 'Speed Drills',
          description:
            'Practice solving equations faster for better test performance',
          type: 'practice',
        },
      ],
    };
  }

  // Combine recommendations from all missed questions
  const allConcepts = new Set<string>();
  const allPracticeTopics = new Set<string>();
  const allResources: any[] = [];

  incorrectExerciseIds.forEach((id) => {
    const rec = recommendationMap[id];
    if (rec) {
      rec.conceptsToReview.forEach((c: string) => allConcepts.add(c));
      rec.practiceTopics.forEach((t: string) => allPracticeTopics.add(t));
      allResources.push(...rec.resources);
    }
  });

  return {
    title: 'Areas to Improve',
    description:
      'Based on your performance, our AI recommends focusing on these areas:',
    items: [
      {
        title: 'Review These Concepts',
        description: Array.from(allConcepts).join(', '),
        type: 'review',
      },
      {
        title: 'Practice These Topics',
        description: Array.from(allPracticeTopics).join(', '),
        type: 'practice',
      },
      {
        title: 'Recommended Resources',
        description: allResources.map((r) => r.title).join(', '),
        type: 'resources',
      },
    ],
  };
};

// Helper function to format time
const formatTime = (milliseconds: number): string => {
  if (!milliseconds) return '0:00';

  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Helper function to get the appropriate icon for recommendation types
const getRecommendationIcon = (type: string) => {
  switch (type) {
    case 'review':
      return <BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />;
    case 'practice':
      return <RocketOutlined style={{ fontSize: 24, color: '#52c41a' }} />;
    case 'resources':
      return <FileTextOutlined style={{ fontSize: 24, color: '#722ed1' }} />;
    case 'challenge':
      return <TrophyOutlined style={{ fontSize: 24, color: '#fa8c16' }} />;
    default:
      return <BulbOutlined style={{ fontSize: 24, color: '#faad14' }} />;
  }
};

const ResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topicId, subtopicId, moduleId } = useParams();

  // Ensure we have default values and log the state for debugging
  const {
    results = [],
    exercises = [],
    totalTime = 0,
    exerciseTimes = {},
  } = location.state || {};

  console.log('Result page state:', {
    results,
    exercises,
    totalTime,
    exerciseTimes,
  });

  // Filter to get correct and incorrect answers
  const correctAnswers = results.filter((result: any) => result.isCorrect);

  // Get the corresponding exercises
  const correctExercises = correctAnswers
    .map((result: any) => exercises.find((ex: any) => ex.id === result.id))
    .filter(Boolean);

  // Calculate average time per question - handle division by zero
  const totalQuestions = results.length || 1; // Avoid division by zero
  const timeValues = Object.values(exerciseTimes).filter((t) => t > 0);
  const totalTimeSpent =
    timeValues.length > 0
      ? timeValues.reduce((sum: number, time: number) => sum + time, 0)
      : totalTime;
  const averageTimePerQuestion = totalTimeSpent / totalQuestions;

  // Format times for display
  const formattedTotalTime = formatTime(totalTimeSpent);
  const formattedAverageTime = formatTime(averageTimePerQuestion);

  // Calculate an overall score
  const scorePercentage =
    totalQuestions > 0
      ? Math.round((correctAnswers.length / totalQuestions) * 100)
      : 0;
  const scoreGrade =
    scorePercentage >= 90
      ? 'A'
      : scorePercentage >= 80
      ? 'B'
      : scorePercentage >= 70
      ? 'C'
      : scorePercentage >= 60
      ? 'D'
      : 'F';
  const stars = Math.round(scorePercentage / 20); // 0-5 stars based on score

  // Filter for all questions that need retry (both incorrect and unanswered)
  const incorrectAnswers = results.filter((result: any) => !result.isCorrect);

  // Find exercises that don't have a result (unanswered)
  const unansweredExercises = exercises.filter(
    (ex) => !results.some((r: any) => r.id === ex.id)
  );

  // Get the corresponding exercises for incorrect answers
  const incorrectExercises = incorrectAnswers
    .map((result: any) => exercises.find((ex: any) => ex.id === result.id))
    .filter(Boolean);

  // Combine incorrect and unanswered exercises for retry
  const exercisesToRetry = [...incorrectExercises, ...unansweredExercises];

  // Update retry function to include both incorrect and unanswered questions
  const retryIncorrect = () => {
    navigate(`/topics/${topicId}/subtopics/${subtopicId}/modules/${moduleId}`, {
      state: { exercises: exercisesToRetry },
    });
  };

  // Get AI recommendations
  const aiRecommendations = getRecommendations(
    incorrectExercises.map((ex: any) => ex.id)
  );

  // Add unanswered count to UI
  const unansweredCount = unansweredExercises.length;
  const incorrectCount = incorrectExercises.length;

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '24px 0' }}>
      {/* Enhanced Summary Card */}
      <Card
        bordered={false}
        style={{
          borderRadius: '16px',
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f8ff 100%)',
          marginBottom: 36,
          border: '1px solid #e6f7ff',
        }}
      >
        <div>
          <Row gutter={[24, 32]} align='middle'>
            <Col xs={24} md={12}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 180,
                    height: 180,
                    position: 'relative',
                    marginBottom: 20,
                  }}
                >
                  <Progress
                    type='circle'
                    percent={scorePercentage}
                    width={180}
                    strokeWidth={12}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    format={() => (
                      <div style={{ textAlign: 'center' }}>
                        <div
                          style={{
                            fontSize: '36px',
                            fontWeight: 'bold',
                            color: '#262626',
                          }}
                        >
                          {scorePercentage}%
                        </div>
                        <div style={{ fontSize: '14px', color: '#8c8c8c' }}>
                          Score
                        </div>
                      </div>
                    )}
                  />
                  {scorePercentage >= 70 && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        backgroundColor:
                          scorePercentage >= 90 ? '#ffd700' : '#95de64',
                        borderRadius: '50%',
                        width: 44,
                        height: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      <TrophyFilled style={{ fontSize: 24, color: 'white' }} />
                    </div>
                  )}
                </div>

                <div style={{ textAlign: 'center' }}>
                  <Rate disabled defaultValue={stars} />
                  <div style={{ marginTop: 8 }}>
                    <Text
                      strong
                      style={{
                        fontSize: '24px',
                        color:
                          scorePercentage >= 70
                            ? '#52c41a'
                            : scorePercentage >= 50
                            ? '#fa8c16'
                            : '#f5222d',
                      }}
                    >
                      Grade {scoreGrade}
                    </Text>
                  </div>

                  <div style={{ marginTop: 16 }}>
                    <Text type='secondary'>
                      {scorePercentage >= 90
                        ? 'Excellent!'
                        : scorePercentage >= 70
                        ? 'Good job!'
                        : scorePercentage >= 50
                        ? 'Keep practicing!'
                        : "Don't worry, practice makes perfect!"}
                    </Text>
                  </div>
                </div>
              </div>
            </Col>

            <Col xs={24} md={12}>
              <Card
                bordered={false}
                style={{
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.8)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Tooltip title='Total questions'>
                      <Statistic
                        title={<Text strong>Total</Text>}
                        value={exercises.length}
                        prefix={
                          <QuestionCircleOutlined
                            style={{ color: '#1890ff' }}
                          />
                        }
                        valueStyle={{ color: '#1890ff' }}
                      />
                    </Tooltip>
                  </Col>
                  <Col span={8}>
                    <Tooltip title='Correct answers'>
                      <Statistic
                        title={<Text strong>Correct</Text>}
                        value={correctExercises.length}
                        prefix={
                          <CheckCircleFilled style={{ color: '#52c41a' }} />
                        }
                        valueStyle={{ color: '#52c41a' }}
                      />
                    </Tooltip>
                  </Col>
                  <Col span={8}>
                    <Tooltip title='Incorrect answers'>
                      <Statistic
                        title={<Text strong>Incorrect</Text>}
                        value={incorrectExercises.length}
                        prefix={
                          <CloseCircleFilled style={{ color: '#ff4d4f' }} />
                        }
                        valueStyle={{ color: '#ff4d4f' }}
                      />
                    </Tooltip>
                  </Col>
                  <Col span={12}>
                    <Tooltip title='Total time spent'>
                      <Statistic
                        title={<Text strong>Time</Text>}
                        value={formattedTotalTime}
                        prefix={
                          <FieldTimeOutlined style={{ color: '#722ed1' }} />
                        }
                        valueStyle={{ color: '#722ed1' }}
                      />
                    </Tooltip>
                  </Col>
                  <Col span={12}>
                    <Tooltip title='Average time per question'>
                      <Statistic
                        title={<Text strong>Avg. Time</Text>}
                        value={formattedAverageTime}
                        prefix={
                          <LineChartOutlined style={{ color: '#fa8c16' }} />
                        }
                        valueStyle={{ color: '#fa8c16' }}
                      />
                    </Tooltip>
                  </Col>
                </Row>
              </Card>

              <div style={{ marginTop: 16 }}>
                <Steps
                  direction='vertical'
                  size='small'
                  current={1}
                  items={[
                    {
                      title: 'Completed',
                      description: 'You finished all questions',
                      status: 'finish',
                      icon: <SafetyOutlined />,
                    },
                    {
                      title: 'Analysis',
                      description: 'Review your performance',
                      status: 'process',
                      icon: <AimOutlined />,
                    },
                    {
                      title: 'Next Steps',
                      description:
                        exercisesToRetry.length > 0
                          ? 'Retry questions to improve'
                          : 'Move to next module',
                      status: 'wait',
                      icon: <LikeOutlined />,
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
        </div>
      </Card>

      {/* AI Recommendations Section */}
      <Card
        title={
          <Space>
            <BulbOutlined style={{ color: '#faad14', fontSize: 20 }} />
            <Text strong style={{ fontSize: 18 }}>
              {aiRecommendations.title}
            </Text>
          </Space>
        }
        style={{
          borderRadius: 12,
          marginBottom: 32,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}
      >
        <Paragraph style={{ fontSize: '16px', marginBottom: 24 }}>
          {aiRecommendations.description}
        </Paragraph>

        <List
          grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
          dataSource={aiRecommendations.items}
          renderItem={(item: any) => (
            <List.Item>
              <Card hoverable style={{ borderRadius: 8 }}>
                <Row>
                  <Col
                    xs={24}
                    md={4}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    {getRecommendationIcon(item.type)}
                  </Col>
                  <Col xs={24} md={20}>
                    <Title level={5}>{item.title}</Title>
                    <Paragraph>{item.description}</Paragraph>
                  </Col>
                </Row>
              </Card>
            </List.Item>
          )}
          style={{ marginBottom: '24px' }}
        />
      </Card>

      {/* Questions Review Section with Tabs */}
      <Card
        title={
          <Space>
            <FileTextOutlined style={{ color: '#1890ff', fontSize: 20 }} />
            <Text strong style={{ fontSize: 18 }}>
              Questions Review
            </Text>
          </Space>
        }
        style={{
          borderRadius: 12,
          marginBottom: 32,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        }}
      >
        <Tabs defaultActiveKey='all'>
          <Tabs.TabPane tab='All Questions' key='all'>
            <Table
              dataSource={exercises.map((exercise, index) => {
                const result = results.find((r: any) => r.id === exercise.id);
                const isCorrect = result?.isCorrect;
                const userAnswer = result?.userAnswer;
                const timeSpent = exerciseTimes[exercise.id] || 0;

                return {
                  key: index,
                  number: index + 1,
                  question: exercise.question,
                  equation: exercise.equation,
                  status:
                    isCorrect === undefined
                      ? 'Not Answered'
                      : isCorrect
                      ? 'Correct'
                      : 'Incorrect',
                  userAnswer: userAnswer
                    ? exercise.options.find((o: any) => o.value === userAnswer)
                        ?.label || 'N/A'
                    : 'Not answered',
                  correctAnswer:
                    exercise.options.find(
                      (o: any) => o.value === exercise.correctAnswer
                    )?.label || 'N/A',
                  time: formatTime(timeSpent),
                  isCorrect,
                  exercise,
                };
              })}
              columns={[
                {
                  title: '#',
                  dataIndex: 'number',
                  key: 'number',
                  width: 50,
                },
                {
                  title: 'Status',
                  dataIndex: 'status',
                  key: 'status',
                  width: 120,
                  render: (status, record: any) => {
                    let color = 'blue';
                    let icon = <QuestionCircleOutlined />;

                    if (status === 'Correct') {
                      color = 'success';
                      icon = <CheckCircleFilled style={{ color: '#52c41a' }} />;
                    } else if (status === 'Incorrect') {
                      color = 'error';
                      icon = <CloseCircleFilled style={{ color: '#ff4d4f' }} />;
                    }

                    return (
                      <Tag color={color} icon={icon}>
                        {status}
                      </Tag>
                    );
                  },
                },
                {
                  title: 'Question',
                  dataIndex: 'question',
                  key: 'question',
                  render: (text, record: any) => (
                    <div>
                      <div>{text}</div>
                      <div
                        style={{
                          fontFamily: 'Courier New, monospace',
                          backgroundColor: '#f5f5f5',
                          padding: '4px 8px',
                          borderRadius: 4,
                          marginTop: 4,
                          display: 'inline-block',
                        }}
                      >
                        {record.equation}
                      </div>
                    </div>
                  ),
                },
                {
                  title: 'Your Answer',
                  dataIndex: 'userAnswer',
                  key: 'userAnswer',
                  width: 120,
                  render: (text, record: any) => (
                    <Text
                      style={{
                        color: record.isCorrect
                          ? '#52c41a'
                          : record.isCorrect === false
                          ? '#ff4d4f'
                          : '#8c8c8c',
                      }}
                    >
                      {text}
                    </Text>
                  ),
                },
                {
                  title: 'Correct Answer',
                  dataIndex: 'correctAnswer',
                  key: 'correctAnswer',
                  width: 120,
                  render: (text) => (
                    <Text style={{ color: '#52c41a' }}>{text}</Text>
                  ),
                },
                {
                  title: 'Time',
                  dataIndex: 'time',
                  key: 'time',
                  width: 80,
                  render: (text) => (
                    <Tag icon={<FieldTimeOutlined />} color='purple'>
                      {text}
                    </Tag>
                  ),
                },
              ]}
              pagination={false}
              expandable={{
                expandedRowRender: (record) => (
                  <div style={{ padding: '12px' }}>
                    <Card
                      size='small'
                      title='Hint'
                      style={{ marginBottom: 12 }}
                    >
                      <Text>{record.exercise.hint.text}</Text>
                      <ul style={{ paddingLeft: 24, marginTop: 8 }}>
                        {record.exercise.hint.steps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ul>
                    </Card>

                    {record.isCorrect === false && (
                      <Card size='small' title='Explanation'>
                        <Text>
                          The correct answer is {record.correctAnswer}.
                        </Text>
                      </Card>
                    )}
                  </div>
                ),
              }}
            />
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={`Correct (${correctExercises.length})`}
            key='correct'
          >
            {/* Similar table for correct answers */}
            {correctExercises.length > 0 ? (
              // Similar table structure limited to correct answers
              <Table
                dataSource={correctExercises.map((exercise, index) => {
                  const result = results.find((r: any) => r.id === exercise.id);
                  const isCorrect = result?.isCorrect;
                  const userAnswer = result?.userAnswer;
                  const timeSpent = exerciseTimes[exercise.id] || 0;

                  return {
                    key: index,
                    number: index + 1,
                    question: exercise.question,
                    equation: exercise.equation,
                    status:
                      isCorrect === undefined
                        ? 'Not Answered'
                        : isCorrect
                        ? 'Correct'
                        : 'Incorrect',
                    userAnswer: userAnswer
                      ? exercise.options.find(
                          (o: any) => o.value === userAnswer
                        )?.label || 'N/A'
                      : 'Not answered',
                    correctAnswer:
                      exercise.options.find(
                        (o: any) => o.value === exercise.correctAnswer
                      )?.label || 'N/A',
                    time: formatTime(timeSpent),
                    isCorrect,
                    exercise,
                  };
                })}
                columns={[
                  {
                    title: '#',
                    dataIndex: 'number',
                    key: 'number',
                    width: 50,
                  },
                  {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    width: 120,
                    render: (status, record: any) => {
                      let color = 'blue';
                      let icon = <QuestionCircleOutlined />;

                      if (status === 'Correct') {
                        color = 'success';
                        icon = (
                          <CheckCircleFilled style={{ color: '#52c41a' }} />
                        );
                      } else if (status === 'Incorrect') {
                        color = 'error';
                        icon = (
                          <CloseCircleFilled style={{ color: '#ff4d4f' }} />
                        );
                      }

                      return (
                        <Tag color={color} icon={icon}>
                          {status}
                        </Tag>
                      );
                    },
                  },
                  {
                    title: 'Question',
                    dataIndex: 'question',
                    key: 'question',
                    render: (text, record: any) => (
                      <div>
                        <div>{text}</div>
                        <div
                          style={{
                            fontFamily: 'Courier New, monospace',
                            backgroundColor: '#f5f5f5',
                            padding: '4px 8px',
                            borderRadius: 4,
                            marginTop: 4,
                            display: 'inline-block',
                          }}
                        >
                          {record.equation}
                        </div>
                      </div>
                    ),
                  },
                  {
                    title: 'Your Answer',
                    dataIndex: 'userAnswer',
                    key: 'userAnswer',
                    width: 120,
                    render: (text, record: any) => (
                      <Text
                        style={{
                          color: record.isCorrect
                            ? '#52c41a'
                            : record.isCorrect === false
                            ? '#ff4d4f'
                            : '#8c8c8c',
                        }}
                      >
                        {text}
                      </Text>
                    ),
                  },
                  {
                    title: 'Correct Answer',
                    dataIndex: 'correctAnswer',
                    key: 'correctAnswer',
                    width: 120,
                    render: (text) => (
                      <Text style={{ color: '#52c41a' }}>{text}</Text>
                    ),
                  },
                  {
                    title: 'Time',
                    dataIndex: 'time',
                    key: 'time',
                    width: 80,
                    render: (text) => (
                      <Tag icon={<FieldTimeOutlined />} color='purple'>
                        {text}
                      </Tag>
                    ),
                  },
                ]}
                pagination={false}
                expandable={{
                  expandedRowRender: (record) => (
                    <div style={{ padding: '12px' }}>
                      <Card
                        size='small'
                        title='Hint'
                        style={{ marginBottom: 12 }}
                      >
                        <Text>{record.exercise.hint.text}</Text>
                        <ul style={{ paddingLeft: 24, marginTop: 8 }}>
                          {record.exercise.hint.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </Card>

                      {record.isCorrect === false && (
                        <Card size='small' title='Explanation'>
                          <Text>
                            The correct answer is {record.correctAnswer}.
                          </Text>
                        </Card>
                      )}
                    </div>
                  ),
                }}
              />
            ) : (
              <Empty description='No correct answers yet' />
            )}
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={`Incorrect (${incorrectExercises.length})`}
            key='incorrect'
          >
            {/* Similar table for incorrect answers */}
            {incorrectExercises.length > 0 ? (
              // Similar table structure limited to incorrect answers
              <Table
                dataSource={incorrectExercises.map((exercise, index) => {
                  const result = results.find((r: any) => r.id === exercise.id);
                  const isCorrect = result?.isCorrect;
                  const userAnswer = result?.userAnswer;
                  const timeSpent = exerciseTimes[exercise.id] || 0;

                  return {
                    key: index,
                    number: index + 1,
                    question: exercise.question,
                    equation: exercise.equation,
                    status:
                      isCorrect === undefined
                        ? 'Not Answered'
                        : isCorrect
                        ? 'Correct'
                        : 'Incorrect',
                    userAnswer: userAnswer
                      ? exercise.options.find(
                          (o: any) => o.value === userAnswer
                        )?.label || 'N/A'
                      : 'Not answered',
                    correctAnswer:
                      exercise.options.find(
                        (o: any) => o.value === exercise.correctAnswer
                      )?.label || 'N/A',
                    time: formatTime(timeSpent),
                    isCorrect,
                    exercise,
                  };
                })}
                columns={[
                  {
                    title: '#',
                    dataIndex: 'number',
                    key: 'number',
                    width: 50,
                  },
                  {
                    title: 'Status',
                    dataIndex: 'status',
                    key: 'status',
                    width: 120,
                    render: (status, record: any) => {
                      let color = 'blue';
                      let icon = <QuestionCircleOutlined />;

                      if (status === 'Correct') {
                        color = 'success';
                        icon = (
                          <CheckCircleFilled style={{ color: '#52c41a' }} />
                        );
                      } else if (status === 'Incorrect') {
                        color = 'error';
                        icon = (
                          <CloseCircleFilled style={{ color: '#ff4d4f' }} />
                        );
                      }

                      return (
                        <Tag color={color} icon={icon}>
                          {status}
                        </Tag>
                      );
                    },
                  },
                  {
                    title: 'Question',
                    dataIndex: 'question',
                    key: 'question',
                    render: (text, record: any) => (
                      <div>
                        <div>{text}</div>
                        <div
                          style={{
                            fontFamily: 'Courier New, monospace',
                            backgroundColor: '#f5f5f5',
                            padding: '4px 8px',
                            borderRadius: 4,
                            marginTop: 4,
                            display: 'inline-block',
                          }}
                        >
                          {record.equation}
                        </div>
                      </div>
                    ),
                  },
                  {
                    title: 'Your Answer',
                    dataIndex: 'userAnswer',
                    key: 'userAnswer',
                    width: 120,
                    render: (text, record: any) => (
                      <Text
                        style={{
                          color: record.isCorrect
                            ? '#52c41a'
                            : record.isCorrect === false
                            ? '#ff4d4f'
                            : '#8c8c8c',
                        }}
                      >
                        {text}
                      </Text>
                    ),
                  },
                  {
                    title: 'Correct Answer',
                    dataIndex: 'correctAnswer',
                    key: 'correctAnswer',
                    width: 120,
                    render: (text) => (
                      <Text style={{ color: '#52c41a' }}>{text}</Text>
                    ),
                  },
                  {
                    title: 'Time',
                    dataIndex: 'time',
                    key: 'time',
                    width: 80,
                    render: (text) => (
                      <Tag icon={<FieldTimeOutlined />} color='purple'>
                        {text}
                      </Tag>
                    ),
                  },
                ]}
                pagination={false}
                expandable={{
                  expandedRowRender: (record) => (
                    <div style={{ padding: '12px' }}>
                      <Card
                        size='small'
                        title='Hint'
                        style={{ marginBottom: 12 }}
                      >
                        <Text>{record.exercise.hint.text}</Text>
                        <ul style={{ paddingLeft: 24, marginTop: 8 }}>
                          {record.exercise.hint.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ul>
                      </Card>

                      {record.isCorrect === false && (
                        <Card size='small' title='Explanation'>
                          <Text>
                            The correct answer is {record.correctAnswer}.
                          </Text>
                        </Card>
                      )}
                    </div>
                  ),
                }}
              />
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div>
                    <Text strong style={{ color: '#52c41a' }}>
                      Perfect score!
                    </Text>
                    <br />
                    <Text type='secondary'>
                      You didn't get any answers wrong
                    </Text>
                  </div>
                }
              />
            )}
          </Tabs.TabPane>

          {unansweredCount > 0 && (
            <Tabs.TabPane
              tab={`Unanswered (${unansweredCount})`}
              key='unanswered'
            >
              {/* Similar table for unanswered questions */}
              <div>Unanswered questions table</div>
            </Tabs.TabPane>
          )}
        </Tabs>
      </Card>

      {/* Action Buttons */}
      <div
        style={{
          marginTop: 32,
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        {exercisesToRetry.length > 0 && (
          <Button
            type='primary'
            size='large'
            onClick={retryIncorrect}
            icon={<ThunderboltOutlined />}
            style={{
              fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            Retry Questions ({exercisesToRetry.length})
          </Button>
        )}

        <Button
          size='large'
          onClick={() => navigate('/topics')}
          icon={<HomeOutlined />}
          style={{
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          Back to Topics
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
