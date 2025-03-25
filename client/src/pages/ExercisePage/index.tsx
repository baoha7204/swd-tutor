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
} from '@ant-design/icons';

const { Title, Text } = Typography;

const StyledCard = styled(Card)`
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  overflow: hidden;
`;

const HintCard = styled(Card)`
  border-radius: 8px;
  background-color: #e6f7ff;
  border: 1px solid #91d5ff;
  margin: 16px 0;
`;

const SkillAnalysisCard = styled(Card)`
  border-radius: 8px;
  margin-top: 24px;
`;

const StrengthItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  .icon {
    color: #52c41a;
  }
`;

const WeaknessItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  .icon {
    color: #f5222d;
  }
`;

const EquationCard = styled.div`
  font-size: 1.4rem;
  margin: 24px 0;
  padding: 24px;
  background-color: #f9f9f9;
  border-radius: 12px;
  text-align: center;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #333;
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

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 0' }}>
      {contextHolder} {/* For message notifications */}
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            marginBottom: 16,
          }}
        >
          <Button
            type='text'
            icon={<HomeOutlined />}
            onClick={() =>
              navigate(`/topics/${topicId}/subtopics/${subtopicId}`)
            }
            style={{
              padding: 0,
            }}
          >
            Module Home
          </Button>
        </div>

        <Progress
          percent={progressPercentage}
          style={{ marginBottom: 8 }}
          strokeColor={{
            '0%': '#108ee9',
            '100%': '#87d068',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text type='secondary'>
            Question {currentExerciseIndex + 1} of {exercises.length}
          </Text>
          {/* <Text type='secondary'>
            {completedQuestionsCount} of {totalQuestionsCount} completed (
            {progressPercentage}%)
          </Text> */}
        </div>
      </div>
      <StyledCard>
        <div style={{ padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ThunderboltOutlined style={{ color: '#722ed1' }} />
            <Title level={4} style={{ margin: 0 }}>
              First degree equation
            </Title>
          </div>

          <div style={{ marginTop: 24 }}>
            <Title level={5} style={{ fontSize: '18px' }}>
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

                  const cardStyle: React.CSSProperties = {
                    width: '100%',
                    cursor: isAnswered ? 'default' : 'pointer',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                  };

                  // Only highlight selected answer before submission, without indicating correct/incorrect
                  let borderStyle = '1px solid #d9d9d9';
                  let backgroundColor = 'white';

                  if (!isAnswered && isSelectedAnswer) {
                    // When selected but not yet submitted
                    borderStyle = '1px solid #1890ff';
                    backgroundColor = '#f0f5ff';
                  } else if (isAnswered) {
                    // After submission - show correct/incorrect styling
                    if (isCorrectAnswer) {
                      backgroundColor = '#f6ffed';
                      borderStyle = '1px solid #52c41a';
                    } else if (isSelectedAnswer) {
                      backgroundColor = '#fff1f0';
                      borderStyle = '1px solid #f5222d';
                    }
                  }

                  return (
                    <Radio.Button
                      key={option.value}
                      value={option.value}
                      style={{
                        ...cardStyle,
                        border: borderStyle,
                        backgroundColor: backgroundColor,
                      }}
                    >
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
                              // Only change text color after submission
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

                        {/* Only show check/close icons after submission */}
                        {isAnswered && isCorrectAnswer && (
                          <CheckCircleFilled
                            style={{ color: '#52c41a', fontSize: '18px' }}
                          />
                        )}
                        {isAnswered && isSelectedAnswer && !isCorrectAnswer && (
                          <CloseCircleFilled
                            style={{ color: '#f5222d', fontSize: '18px' }}
                          />
                        )}
                      </div>
                    </Radio.Button>
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
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <Button onClick={() => setShowHint(false)} type='link'>
                    <img
                      src='\Frame.png'
                      style={{ color: '#1890ff', fontSize: '18px' }}
                    />
                    <Text strong style={{ fontSize: '16px' }}>
                      Suggestion from {currentExercise.hint.from}
                    </Text>
                  </Button>
                </div>
                <Text style={{ fontSize: '15px' }}>
                  {currentExercise.hint.text}
                </Text>
                <ul style={{ marginTop: 12, paddingLeft: 24 }}>
                  {currentExercise.hint.steps.map((step, index) => (
                    <li key={index} style={{ marginBottom: '8px' }}>
                      {step}
                    </li>
                  ))}
                </ul>
              </HintCard>
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 24,
              }}
            >
              {!showHint && !isAnswered && (
                <Button
                  type='link'
                  onClick={() => setShowHint(true)}
                  icon={<BulbOutlined />}
                  style={{
                    padding: 0,
                  }}
                >
                  Show Hint
                </Button>
              )}
              {(showHint || isAnswered) && <div />}

              {!isAnswered ? (
                <Button
                  type='primary'
                  onClick={handleSubmit}
                  disabled={!currentAnswer}
                  style={{ fontWeight: 600 }}
                >
                  Check Answer
                </Button>
              ) : (
                <Button
                  type='primary'
                  onClick={handleNext}
                  style={{ fontWeight: 600 }}
                >
                  {currentExerciseIndex < exercises.length - 1
                    ? 'Next Question'
                    : 'See Results'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </StyledCard>
      {isAnswered && (
        <SkillAnalysisCard title='Skill analysis:'>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ flex: 1 }}>
              <Title level={5} style={{ color: '#52c41a' }}>
                Strengths
              </Title>
              {currentExercise.skillAnalysis?.strengths.map(
                (strength, index) => (
                  <StrengthItem key={index}>
                    <CheckCircleFilled className='icon' />
                    <Text>{strength}</Text>
                  </StrengthItem>
                )
              )}
            </div>
            <Divider type='vertical' style={{ height: 'auto' }} />
            <div style={{ flex: 1 }}>
              <Title level={5} style={{ color: '#f5222d' }}>
                Needs improvement
              </Title>
              {currentExercise.skillAnalysis?.weaknesses.map(
                (weakness, index) => (
                  <WeaknessItem key={index}>
                    <CloseCircleFilled className='icon' />
                    <Text>{weakness}</Text>
                  </WeaknessItem>
                )
              )}
            </div>
          </div>
        </SkillAnalysisCard>
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 24,
        }}
      >
        {/* <Button
          icon={<LeftOutlined />}
          onClick={handlePrevious}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          Previous
        </Button> */}

        <div style={{ textAlign: 'center' }}>
          {exercises.map((_, index) => {
            const hasResult = results.some(
              (r) => r.id === exercises[index]?.id
            );
            const isCorrect = results.find(
              (r) => r.id === exercises[index]?.id
            )?.isCorrect;

            return (
              <Button
                key={index}
                type={index === currentExerciseIndex ? 'primary' : 'text'}
                shape='circle'
                size='small'
                style={{
                  margin: '0 4px',
                  // Only show styling for questions that have been answered (have results)
                  backgroundColor: hasResult
                    ? isCorrect
                      ? '#f6ffed'
                      : '#fff1f0'
                    : index === currentExerciseIndex
                    ? undefined
                    : 'transparent',
                  borderColor: hasResult
                    ? isCorrect
                      ? '#52c41a'
                      : '#f5222d'
                    : undefined,
                  color: hasResult
                    ? isCorrect
                      ? 'black'
                      : 'black'
                    : undefined,
                }}
                onClick={() => setCurrentExerciseIndex(index)}
              >
                {index + 1}
              </Button>
            );
          })}
        </div>

        {/* <Button
          type={isAnswered ? 'primary' : 'default'}
          icon={<RightOutlined />}
          onClick={handleNext}
          disabled={!isAnswered}
          style={{ display: 'flex', alignItems: 'center' }}
        ></Button>
          {currentExerciseIndex < exercises.length - 1 ? 'Next' : 'Finish'}
        </Button> */}
      </div>
      {/* Question navigation at the bottom */}
      {/* <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Space wrap>
          {exercises.map((exercise, index) => {
            const hasResult = results.some((r) => r.id === exercise.id);
            const isCorrect = results.find(
              (r) => r.id === exercise.id
            )?.isCorrect;

            return (
              <Button
                key={index}
                type={index === currentExerciseIndex ? 'primary' : 'text'}
                shape='circle'
                size='small'
                style={{
                  margin: '0 4px',
                  backgroundColor: hasResult
                    ? isCorrect
                      ? '#f6ffed'
                      : '#fff1f0'
                    : index === currentExerciseIndex
                    ? undefined
                    : 'transparent',
                  borderColor: hasResult
                    ? isCorrect
                      ? '#52c41a'
                      : '#f5222d'
                    : undefined,
                  color: 'black',
                }}
                onClick={() => setCurrentExerciseIndex(index)}
              >
                {index + 1}
              </Button>
            );
          })}
        </Space> */}
      {/* Add status indicator for completed questions
        <div style={{ marginTop: 8 }}>
          <Text type='secondary'>
            {results.length} of {exercises.length} questions answered
          </Text>
          {results.length === exercises.length ? (
            <Tag color='success' style={{ marginLeft: 8 }}>
              All Complete
            </Tag>
          ) : (
            <Tag color='warning' style={{ marginLeft: 8 }}>
              {exercises.length - results.length} Remaining
            </Tag>
          )}
        </div> */}
      {/* </div> */}
    </div>
  );
};

export default ExercisePage;
