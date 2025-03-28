'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import {
  Typography,
  Card,
  Radio,
  Button,
  Progress,
  Space,
  Divider,
  message,
  Tooltip,
  Badge,
  Tag,
  Row,
  Col,
  Steps,
} from 'antd';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeftOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  RightOutlined,
  LeftOutlined,
  HomeOutlined,
  ThunderboltOutlined,
  RocketOutlined,
  TrophyOutlined,
  BookOutlined,
  FireOutlined,
  StarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 30px 24px;
  background-color: #f9fafc;
  min-height: 100vh;
  position: relative;

  &::before {
    content: '';
    /* position: absolute; */
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(
      135deg,
      rgba(67, 97, 238, 0.08),
      rgba(114, 9, 183, 0.05)
    );
    z-index: 0;
    border-bottom: 1px solid rgba(67, 97, 238, 0.07);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  border: none;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
    transform: translateY(-3px);
  }
`;

const HintCard = styled(Card)`
  border-radius: 12px;
  background: linear-gradient(135deg, #f0f5ff, #e6f7ff);
  border: 1px solid #bae7ff;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);

  .ant-card-body {
    padding: 16px 20px;
  }
`;

const SkillAnalysisCard = styled(Card)`
  border-radius: 12px;
  margin-top: 28px;
  border: none;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);

  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
    padding: 12px 20px;
  }

  .ant-card-body {
    padding: 20px;
  }
`;

const StrengthItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 14px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #f6ffed;
  border: 1px solid #b7eb8f;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(82, 196, 26, 0.15);
  }

  .icon {
    color: #52c41a;
    font-size: 16px;
    margin-top: 2px;
  }
`;

const WeaknessItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 14px;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: #fff2e8;
  border: 1px solid #ffccc7;
  transition: all 0.2s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 2px 8px rgba(245, 34, 45, 0.15);
  }

  .icon {
    color: #f5222d;
    font-size: 16px;
    margin-top: 2px;
  }
`;

const EquationCard = styled.div`
  font-size: 1.6rem;
  margin: 28px 0;
  padding: 30px;
  background: linear-gradient(135deg, #f0f5ff, #fafafa);
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 6px 16px rgba(67, 97, 238, 0.08);
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #333;
  border: 1px solid rgba(67, 97, 238, 0.1);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(
      circle,
      rgba(67, 97, 238, 0.05) 0%,
      transparent 70%
    );
    top: -100px;
    right: -100px;
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    width: 150px;
    height: 150px;
    background: radial-gradient(
      circle,
      rgba(114, 9, 183, 0.05) 0%,
      transparent 70%
    );
    bottom: -75px;
    left: -75px;
    border-radius: 50%;
  }
`;

const AnswerOption = styled(Radio.Button)<{
  $isSelected: boolean;
  $isAnswered: boolean;
  $isCorrect?: boolean;
}>`
  width: 100%;
  height: auto;
  border-radius: 8px !important;
  margin-bottom: 10px;
  padding: 12px 16px;
  transition: all 0.2s ease;
  display: block;
  text-align: left;
  border: 1px solid transparent;

  /* Clean background colors */
  background-color: ${(props) =>
    props.$isAnswered
      ? props.$isCorrect
        ? '#f6ffed'
        : props.$isSelected
        ? '#fff1f0'
        : '#ffffff'
      : props.$isSelected
      ? '#e6f7ff'
      : '#ffffff'};

  /* Border colors */
  border-color: ${(props) =>
    props.$isAnswered
      ? props.$isCorrect
        ? '#52c41a'
        : props.$isSelected
        ? '#ff4d4f'
        : '#d9d9d9'
      : props.$isSelected
      ? '#1890ff'
      : '#d9d9d9'};

  /* Box shadow for better dimension */
  box-shadow: ${(props) =>
    props.$isSelected ? '0 2px 8px rgba(0, 0, 0, 0.08)' : 'none'};

  &:hover {
    transform: translateY(-2px);
    border-color: ${(props) =>
      props.$isAnswered
        ? props.$isCorrect
          ? '#52c41a'
          : props.$isSelected
          ? '#ff4d4f'
          : '#d9d9d9'
        : '#1890ff'};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  &.ant-radio-button-wrapper-checked {
    color: ${(props) =>
      props.$isAnswered
        ? props.$isCorrect
          ? '#52c41a'
          : '#ff4d4f'
        : '#1890ff'};
    background-color: ${(props) =>
      props.$isAnswered
        ? props.$isCorrect
          ? '#d3f5c2'
          : '#f8cdce'
        : '#d0e7fd'};
    font-weight: 500;
  }

  .option-content {
    position: relative;
  }
`;

const ProgressWrapper = styled.div`
  margin-bottom: 40px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
`;

const ProgressBar = styled(Progress)`
  margin-bottom: 16px;

  .ant-progress-inner {
    border-radius: 8px;
    height: 12px;
    overflow: hidden;
  }

  .ant-progress-bg {
    border-radius: 8px;
    height: 12px !important;
  }
`;

const QuestionNavigator = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
  flex-wrap: wrap;
  gap: 8px;
`;

const NavigatorButton = styled(Button)<{ $status?: string }>`
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 4px;
  box-shadow: ${(props) =>
    props.$status ? '0 2px 6px rgba(0, 0, 0, 0.1)' : 'none'};
  background-color: ${(props) => {
    switch (props.$status) {
      case 'correct':
        return '#f6ffed';
      case 'incorrect':
        return '#fff1f0';
      default:
        return props.type === 'primary' ? undefined : 'white';
    }
  }};
  color: ${(props) => {
    switch (props.$status) {
      case 'correct':
        return 'black';
      case 'incorrect':
        return 'black';
      default:
        return props.type === 'primary' ? undefined : 'black';
    }
  }};
  border-color: ${(props) => {
    switch (props.$status) {
      case 'correct':
        return '#52c41a';
      case 'incorrect':
        return '#f5222d';
      default:
        return props.type === 'primary' ? undefined : '#d9d9d9';
    }
  }};

  &:hover {
    transform: scale(1.1);
    z-index: 1;
  }
`;

const ActionButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  align-items: center;
`;

const PrimaryButton = styled(Button)`
  border-radius: 8px;
  height: 40px;
  padding: 0 24px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(67, 97, 238, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
`;

const QuestionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #4361ee, #3a56d4);
  color: white;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);
`;

const ExercisePage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { topicId, subtopicId, moduleId } = useParams<{
    topicId: string;
    subtopicId: string;
    moduleId: string;
  }>();

  // Track all answers for each question
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [results, setResults] = useState<
    {
      id: string;
      isCorrect: boolean;
      userAnswer?: string;
      timeSpent?: number;
    }[]
  >([]);
  const [messageApi, contextHolder] = message.useMessage();

  // Add state for time tracking
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [exerciseStartTimes, setExerciseStartTimes] = useState<
    Record<string, number>
  >({});
  const [exerciseTimes, setExerciseTimes] = useState<Record<string, number>>(
    {}
  );
  const [totalTime, setTotalTime] = useState<number>(0);

  // Track whether all questions have been answered
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

  // Use exercises from location state if provided, otherwise use default
  const [exercises, setExercises] = useState<any[]>([
    {
      id: 'linear-eq-1',
      question: 'Solve the following equation:',
      equation: '2x + 5 = 13',
      options: [
        { value: 'a', label: 'x = 4' },
        { value: 'b', label: 'x = 6' },
        { value: 'c', label: 'x = 8' },
      ],
      correctAnswer: 'a',
      hint: {
        from: 'Math Genius',
        text: 'To solve this equation, you should:',
        steps: ['Move 5 to the right-hand side', 'Divide both sides by 2'],
      },
      skillAnalysis: {
        strengths: [
          'Addition and subtraction of integers',
          'Solve a simple equation',
        ],
        weaknesses: ['Complex equation', 'A problem with fractions'],
      },
    },
    {
      id: 'linear-eq-2',
      question: 'Solve the following equation:',
      equation: '3x - 7 = 11',
      options: [
        { value: 'a', label: 'x = 6' },
        { value: 'b', label: 'x = 5' },
        { value: 'c', label: 'x = 4' },
      ],
      correctAnswer: 'a',
      hint: {
        from: 'Math Genius',
        text: 'To solve this equation, you should:',
        steps: ['Add 7 to both sides', 'Divide both sides by 3'],
      },
      skillAnalysis: {
        strengths: [
          'Addition and subtraction of integers',
          'Solve a simple equation',
        ],
        weaknesses: ['Complex equation', 'A problem with fractions'],
      },
    },
    {
      id: 'linear-eq-3',
      question: 'Find the value of x in the equation:',
      equation: '4x + 2 = 10',
      options: [
        { value: 'a', label: 'x = 1' },
        { value: 'b', label: 'x = 2' },
        { value: 'c', label: 'x = 3' },
      ],
      correctAnswer: 'b',
      hint: {
        from: 'Math Genius',
        text: 'To solve this equation, follow these steps:',
        steps: ['Subtract 2 from both sides', 'Divide both sides by 4'],
      },
      skillAnalysis: {
        strengths: ['Basic algebraic operations', 'Linear equation solving'],
        weaknesses: ['Decimal operations', 'Complex equations'],
      },
    },
    {
      id: 'linear-eq-4',
      question: 'Solve for x:',
      equation: '5x - 3 = 2x + 9',
      options: [
        { value: 'a', label: 'x = 3' },
        { value: 'b', label: 'x = 4' },
        { value: 'c', label: 'x = 5' },
      ],
      correctAnswer: 'b',
      hint: {
        from: 'Math Genius',
        text: 'To solve this type of equation, you need to:',
        steps: [
          'Group like terms by moving all x terms to one side',
          'Simplify to find the value of x',
        ],
      },
      skillAnalysis: {
        strengths: ['Rearranging terms', 'Multi-step equations'],
        weaknesses: [
          'Handling negative coefficients',
          'Complex rearrangements',
        ],
      },
    },
    {
      id: 'linear-eq-5',
      question: 'Find the solution to the equation:',
      equation: '2(x + 3) = 16',
      options: [
        { value: 'a', label: 'x = 5' },
        { value: 'b', label: 'x = 6' },
        { value: 'c', label: 'x = 7' },
      ],
      correctAnswer: 'a',
      hint: {
        from: 'Math Genius',
        text: 'When dealing with brackets:',
        steps: [
          'Expand the brackets first using the distributive property',
          'Solve the resulting equation',
        ],
      },
      skillAnalysis: {
        strengths: [
          'Applying the distributive property',
          'Basic equation solving',
        ],
        weaknesses: ['Multiple nested brackets', 'More complex expressions'],
      },
    },
    {
      id: 'linear-eq-6',
      question: 'Solve the following equation for x:',
      equation: '3(x - 2) + 4 = 16',
      options: [
        { value: 'a', label: 'x = 6' },
        { value: 'b', label: 'x = 5' },
        { value: 'c', label: 'x = 4' },
      ],
      correctAnswer: 'a',
      hint: {
        from: 'Math Genius',
        text: 'For this equation with brackets, you should:',
        steps: [
          'Expand the brackets: 3x - 6 + 4 = 16',
          'Combine like terms on the left side',
          'Isolate x',
        ],
      },
      skillAnalysis: {
        strengths: ['Expanding brackets', 'Multi-step problem solving'],
        weaknesses: ['Complex expressions', 'Combining multiple operations'],
      },
    },
    {
      id: 'linear-eq-7',
      question: 'Find the value of x that satisfies the equation:',
      equation: '4(x + 1) - 2(x - 3) = 14',
      options: [
        { value: 'a', label: 'x = 2' },
        { value: 'b', label: 'x = 3' },
        { value: 'c', label: 'x = 4' },
      ],
      correctAnswer: 'c',
      hint: {
        from: 'Math Genius',
        text: 'This equation requires careful expansion of brackets:',
        steps: [
          'Expand the first bracket: 4x + 4',
          'Expand the second bracket: -2x + 6',
          'Combine all terms and solve for x',
        ],
      },
      skillAnalysis: {
        strengths: ['Handling multiple brackets', 'Advanced linear equations'],
        weaknesses: ['Very complex expressions', 'Systems of equations'],
      },
    },
  ]);

  // Use exercises from location state if available
  useEffect(() => {
    if (location.state?.exercises && location.state.exercises.length > 0) {
      console.log('Using exercises from state:', location.state.exercises);
      setExercises(location.state.exercises);
      // Reset other states when exercises change
      setCurrentExerciseIndex(0);
      setResults([]);
      setUserAnswers({});
      setIsAnswered(false);
      setShowHint(false);
    }
  }, [location.state]);

  const currentExercise = exercises[currentExerciseIndex];
  const currentAnswer = userAnswers[currentExercise?.id];

  // Check if we already have a result for the current exercise
  const hasCurrentResult = results.some(
    (result) => result.id === currentExercise?.id
  );

  useEffect(() => {
    // When changing questions, check if we already have an answer and result
    if (currentExercise && currentAnswer && hasCurrentResult) {
      setIsAnswered(true);
    } else {
      setIsAnswered(false);
    }

    // Reset hint when changing questions
    setShowHint(false);
  }, [currentExerciseIndex, currentExercise, currentAnswer, hasCurrentResult]);

  // Initialize start time when component mounts
  useEffect(() => {
    const now = Date.now();
    setStartTime(now);

    // Initialize the start time for the first exercise
    if (currentExercise) {
      setExerciseStartTimes((prev) => ({
        ...prev,
        [currentExercise.id]: now,
      }));
    }
  }, []);

  // Track time when changing questions
  useEffect(() => {
    if (currentExercise) {
      const now = Date.now();

      // Record time for the previous exercise if we have a start time for it
      const previousIndex =
        currentExerciseIndex > 0 ? currentExerciseIndex - 1 : 0;
      const previousExerciseId = exercises[previousIndex]?.id;

      if (
        previousExerciseId &&
        previousExerciseId !== currentExercise.id &&
        exerciseStartTimes[previousExerciseId]
      ) {
        const timeSpent = now - exerciseStartTimes[previousExerciseId];

        setExerciseTimes((prev) => ({
          ...prev,
          [previousExerciseId]: (prev[previousExerciseId] || 0) + timeSpent,
        }));
      }

      // Set start time for the current exercise
      setExerciseStartTimes((prev) => ({
        ...prev,
        [currentExercise.id]: now,
      }));
    }
  }, [currentExerciseIndex]);

  // Check if all questions are answered whenever results change
  useEffect(() => {
    if (results.length === exercises.length) {
      setAllQuestionsAnswered(true);
    } else {
      setAllQuestionsAnswered(false);
    }
  }, [results, exercises]);

  const handleAnswerChange = (e: any) => {
    const answer = e.target.value;
    // Save the answer for this specific question but don't validate yet
    setUserAnswers((prev) => ({
      ...prev,
      [currentExercise.id]: answer,
    }));
  };

  const handleSubmit = () => {
    if (currentAnswer) {
      const isCorrect = currentAnswer === currentExercise.correctAnswer;

      // Record the current time for this exercise
      const now = Date.now();
      const timeSpent =
        now - (exerciseStartTimes[currentExercise.id] || startTime);

      setExerciseTimes((prev) => ({
        ...prev,
        [currentExercise.id]: (prev[currentExercise.id] || 0) + timeSpent,
      }));

      // Only add to results if we don't already have a result for this exercise
      if (!hasCurrentResult) {
        setResults((prev) => [
          ...prev,
          {
            id: currentExercise.id,
            isCorrect,
            userAnswer: currentAnswer,
            timeSpent,
          },
        ]);
      }

      setIsAnswered(true);

      // Show success or error message
      if (isCorrect) {
        messageApi.success({
          content: 'Correct! Well done!',
          duration: 1.5,
        });
      } else {
        messageApi.error({
          content: 'Incorrect. Try to understand what went wrong.',
          duration: 1.5,
        });
      }
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      // Check if all questions have been answered
      const unansweredQuestions = exercises.filter(
        (ex) => !results.some((r) => r.id === ex.id)
      );

      if (unansweredQuestions.length > 0) {
        // Show a warning if there are unanswered questions
        messageApi.warning({
          content: `You have ${unansweredQuestions.length} unanswered question(s). Please answer all questions before proceeding.`,
          duration: 3,
        });

        // Navigate to the first unanswered question
        const firstUnansweredIndex = exercises.findIndex(
          (ex) => ex.id === unansweredQuestions[0].id
        );
        if (firstUnansweredIndex !== -1) {
          setCurrentExerciseIndex(firstUnansweredIndex);
        }
        return;
      }

      // Calculate total time spent
      const now = Date.now();
      const total = now - startTime;

      // Calculate time spent on current exercise if not yet recorded
      if (currentExercise && !exerciseTimes[currentExercise.id]) {
        setExerciseTimes((prev) => ({
          ...prev,
          [currentExercise.id]:
            now - (exerciseStartTimes[currentExercise.id] || startTime),
        }));
      }

      // Navigate to result page with all data
      navigate(
        `/topics/${topicId}/subtopics/${subtopicId}/modules/${moduleId}/result`,
        {
          state: {
            results,
            exercises,
            totalTime: total,
            exerciseTimes: exerciseTimes,
          },
        }
      );
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
    } else {
      // Go back to modules page if it's the first question
      navigate(`/topics/${topicId}/subtopics/${subtopicId}`);
    }
  };

  // Calculate progress based on completed questions, not current index
  const completedQuestionsCount = results.length;
  const totalQuestionsCount = exercises.length;
  const progressPercentage = Math.round(
    (completedQuestionsCount / totalQuestionsCount) * 100
  );

  // Get question status for the navigator
  const getQuestionStatus = (index: number) => {
    const exercise = exercises[index];
    if (!exercise) return undefined;

    const result = results.find((r) => r.id === exercise.id);
    if (!result) return undefined;

    return result.isCorrect ? 'correct' : 'incorrect';
  };

  return (
    <PageContainer>
      <ContentWrapper>
        {contextHolder} {/* For message notifications */}
        {/* Progress and navigation header */}
        <ProgressWrapper>
          <Row gutter={[24, 16]} align='middle'>
            <Col xs={24} md={16}>
              <div style={{ marginBottom: 12 }}>
                <Space align='center'>
                  <Button
                    type='link'
                    icon={<ArrowLeftOutlined />}
                    onClick={() =>
                      navigate(`/topics/${topicId}/subtopics/${subtopicId}`)
                    }
                    style={{ paddingLeft: 0 }}
                  >
                    Back to Module
                  </Button>
                  <Divider type='vertical' />
                  <Text strong>Exercise: First Degree Equations</Text>
                </Space>
              </div>

              <ProgressBar
                percent={progressPercentage}
                strokeColor={{
                  '0%': '#4361ee',
                  '100%': '#3a56d4',
                }}
                showInfo={false}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Space>
                  {/* <Tag color='#4361ee' style={{ borderRadius: '4px' }}>
                    {completedQuestionsCount}/{totalQuestionsCount} Completed
                  </Tag> */}
                  <Text type='secondary'>
                    Question {currentExerciseIndex + 1} of {exercises.length}
                  </Text>
                </Space>

                {totalTime > 0 && (
                  <Tag icon={<ClockCircleOutlined />} color='blue'>
                    {Math.floor(totalTime / 60000)}m{' '}
                    {Math.floor((totalTime % 60000) / 1000)}s
                  </Tag>
                )}
              </div>
            </Col>

            {/* <Col xs={24} md={8} style={{ textAlign: 'right' }}>
              <Steps
                progressDot
                current={currentExerciseIndex}
                size='small'
                style={{ maxWidth: 180, margin: '0 auto' }}
              >
                {exercises.map((_, index) => (
                  <Step key={index} />
                ))}
              </Steps>
            </Col> */}
          </Row>
        </ProgressWrapper>
        {/* Main question card */}
        <StyledCard bodyStyle={{ padding: '24px' }}>
          <QuestionHeader>
            <QuestionIcon>
              <ThunderboltOutlined />
            </QuestionIcon>
            <div>
              <Title level={4} style={{ margin: 0, fontSize: '18px' }}>
                First degree equation
              </Title>
              <Text type='secondary'>
                Solve the equation and select the correct answer
              </Text>
            </div>
          </QuestionHeader>

          <div>
            <Title level={5} style={{ fontSize: '18px', marginBottom: '16px' }}>
              {currentExercise.question}
            </Title>

            <EquationCard>{currentExercise.equation}</EquationCard>

            <Radio.Group
              onChange={handleAnswerChange}
              value={currentAnswer}
              disabled={isAnswered}
              style={{ width: '100%' }}
            >
              <Space direction='vertical' style={{ width: '100%' }}>
                {currentExercise.options.map((option) => {
                  const isCorrectAnswer =
                    option.value === currentExercise.correctAnswer;
                  const isSelectedAnswer = option.value === currentAnswer;

                  return (
                    <AnswerOption
                      key={option.value}
                      value={option.value}
                      $isSelected={isSelectedAnswer}
                      $isAnswered={isAnswered}
                      $isCorrect={isCorrectAnswer}
                    >
                      <div className='option-content'>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Space>
                            <Text
                              strong={isSelectedAnswer}
                              style={{
                                fontSize: '16px',
                                color: isAnswered
                                  ? isCorrectAnswer
                                    ? '#52c41a'
                                    : isSelectedAnswer
                                    ? '#f5222d'
                                    : 'inherit'
                                  : 'inherit',
                              }}
                            >
                              {option.label}
                            </Text>
                          </Space>

                          {isAnswered && isCorrectAnswer && (
                            <CheckCircleFilled
                              style={{ color: '#52c41a', fontSize: '18px' }}
                            />
                          )}
                          {isAnswered &&
                            isSelectedAnswer &&
                            !isCorrectAnswer && (
                              <CloseCircleFilled
                                style={{ color: '#f5222d', fontSize: '18px' }}
                              />
                            )}
                        </div>
                      </div>
                    </AnswerOption>
                  );
                })}
              </Space>
            </Radio.Group>

            {showHint && (
              <HintCard>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 16,
                  }}
                >
                  <BulbOutlined
                    style={{ color: '#1890ff', fontSize: '20px' }}
                  />
                  <div>
                    <Text strong style={{ fontSize: '16px', display: 'block' }}>
                      Suggestion from {currentExercise.hint.from}
                    </Text>
                    <Text type='secondary' style={{ fontSize: '13px' }}>
                      Here's how to approach this problem
                    </Text>
                  </div>
                  <Button
                    type='text'
                    icon={<CloseCircleFilled />}
                    style={{ marginLeft: 'auto' }}
                    onClick={() => setShowHint(false)}
                  />
                </div>

                <Paragraph style={{ fontSize: '15px', marginBottom: '16px' }}>
                  {currentExercise.hint.text}
                </Paragraph>

                <div
                  style={{
                    background: 'rgba(255, 255, 255, 0.5)',
                    borderRadius: '8px',
                    padding: '12px 16px',
                  }}
                >
                  {currentExercise.hint.steps.map((step, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '10px',
                        marginBottom:
                          index < currentExercise.hint.steps.length - 1
                            ? '12px'
                            : 0,
                      }}
                    >
                      <Badge
                        count={index + 1}
                        style={{
                          backgroundColor: '#1890ff',
                          marginTop: '2px',
                        }}
                      />
                      <Text style={{ lineHeight: '1.6' }}>{step}</Text>
                    </div>
                  ))}
                </div>
              </HintCard>
            )}

            <ActionButtonWrapper>
              {!showHint && !isAnswered && (
                <Button
                  type='default'
                  onClick={() => setShowHint(true)}
                  icon={<BulbOutlined />}
                >
                  Show Hint
                </Button>
              )}
              {(showHint || isAnswered) && <div />}

              {!isAnswered ? (
                <PrimaryButton
                  type='primary'
                  onClick={handleSubmit}
                  disabled={!currentAnswer}
                  size='large'
                >
                  Check Answer
                </PrimaryButton>
              ) : (
                <PrimaryButton type='primary' onClick={handleNext} size='large'>
                  {currentExerciseIndex < exercises.length - 1
                    ? 'Next Question'
                    : 'See Results'}
                </PrimaryButton>
              )}
            </ActionButtonWrapper>
          </div>
        </StyledCard>
        {/* Skill analysis section - only shown after answering */}
        {isAnswered && (
          <SkillAnalysisCard
            title={
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <RocketOutlined style={{ color: '#722ed1' }} />
                <span>Skill Analysis</span>
              </div>
            }
          >
            <Row gutter={[32, 24]}>
              <Col xs={24} md={12}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    <TrophyOutlined style={{ color: '#52c41a' }} />
                    <Title level={5} style={{ margin: 0, color: '#52c41a' }}>
                      Strengths
                    </Title>
                  </div>

                  {currentExercise.skillAnalysis?.strengths.map(
                    (strength, index) => (
                      <StrengthItem key={index}>
                        <CheckCircleFilled className='icon' />
                        <Text>{strength}</Text>
                      </StrengthItem>
                    )
                  )}
                </div>
              </Col>

              <Col xs={24} md={12}>
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    <FireOutlined style={{ color: '#f5222d' }} />
                    <Title level={5} style={{ margin: 0, color: '#f5222d' }}>
                      Areas for Improvement
                    </Title>
                  </div>

                  {currentExercise.skillAnalysis?.weaknesses.map(
                    (weakness, index) => (
                      <WeaknessItem key={index}>
                        <CloseCircleFilled className='icon' />
                        <Text>{weakness}</Text>
                      </WeaknessItem>
                    )
                  )}
                </div>
              </Col>
            </Row>

            {/* Recommendation section */}
            <div
              style={{
                marginTop: '24px',
                padding: '16px',
                background: 'linear-gradient(135deg, #f9f0ff 0%, #efdbff 100%)',
                borderRadius: '8px',
              }}
            >
              <Space align='start'>
                <StarOutlined
                  style={{
                    color: '#722ed1',
                    fontSize: '18px',
                    marginTop: '3px',
                  }}
                />
                <div>
                  <Text strong style={{ color: '#722ed1' }}>
                    Recommendation
                  </Text>
                  <Paragraph style={{ margin: '4px 0 0' }}>
                    Based on your performance, we suggest focusing on practicing
                    more{' '}
                    {isAnswered &&
                      currentExercise.skillAnalysis?.weaknesses[0].toLowerCase()}{' '}
                    problems.
                  </Paragraph>
                </div>
              </Space>
            </div>
          </SkillAnalysisCard>
        )}
        {/* Question navigator */}
        <QuestionNavigator>
          {exercises.map((_, index) => {
            const status = getQuestionStatus(index);

            return (
              <NavigatorButton
                key={index}
                type={index === currentExerciseIndex ? 'primary' : 'default'}
                shape='circle'
                $status={status}
                onClick={() => setCurrentExerciseIndex(index)}
              >
                {index + 1}
              </NavigatorButton>
            );
          })}
        </QuestionNavigator>
        {/* Bottom navigation controls */}
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '32px',
            borderTop: '1px solid #f0f0f0',
            paddingTop: '20px',
          }}
        >
          <Button icon={<LeftOutlined />} onClick={handlePrevious}>
            Previous
          </Button>

          <Button
            type='primary'
            disabled={
              !isAnswered && currentExerciseIndex === exercises.length - 1
            }
            onClick={handleNext}
          >
            {currentExerciseIndex < exercises.length - 1
              ? 'Next'
              : 'See Results'}
            <RightOutlined />
          </Button>
        </div> */}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ExercisePage;
