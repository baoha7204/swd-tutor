'use client';

import type React from 'react';
import { useState } from 'react';
import {
  Typography,
  Card,
  Radio,
  Button,
  Progress,
  Space,
  Divider,
} from 'antd';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  ArrowLeftOutlined,
  BulbOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Group, Button: RadioButton } = Radio;

const StyledCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
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

const ExercisePage: React.FC = () => {
  const { topicId, subtopicId, moduleId } = useParams<{
    topicId: string;
    subtopicId: string;
    moduleId: string;
  }>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);

  // Hardcoded exercise data
  const exercise = {
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
      from: 'AI',
      text: 'To solve this equation, you should:',
      steps: ['Moving 5 to the right-hand side', 'Divide both sides by 2'],
    },
    progress: 70,
    skillAnalysis: {
      strengths: [
        'Addition and subtraction of integers',
        'Solve a simple equation',
      ],
      weaknesses: ['Complex equation', 'A problem with fractions'],
    },
  };

  const handleAnswerChange = (e: any) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsAnswered(true);
    }
  };

  const isCorrect = selectedAnswer === exercise.correctAnswer;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Link to={`/topics/${topicId}/subtopics/${subtopicId}`}>
          <Button icon={<ArrowLeftOutlined />} type='text'>
            Previous Question
          </Button>
        </Link>
        <Progress percent={exercise.progress} style={{ flex: 1 }} />
      </div>

      <StyledCard>
        <Title level={4}>First degree equation</Title>

        <div style={{ marginTop: 24 }}>
          <Text>Question 1/5:</Text>
          <Title level={5} style={{ marginTop: 8 }}>
            {exercise.question}
          </Title>
          <div
            style={{
              fontSize: '1.2rem',
              margin: '16px 0',
              padding: '16px',
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              textAlign: 'center',
            }}
          >
            {exercise.equation}
          </div>

          <Group
            onChange={handleAnswerChange}
            value={selectedAnswer}
            disabled={isAnswered}
          >
            <Space direction='vertical' style={{ width: '100%' }}>
              {exercise.options.map((option) => (
                <RadioButton
                  key={option.value}
                  value={option.value}
                  style={{
                    width: '100%',
                    height: 'auto',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d9d9d9',
                    backgroundColor: isAnswered
                      ? option.value === exercise.correctAnswer
                        ? '#f6ffed'
                        : option.value === selectedAnswer
                        ? '#fff1f0'
                        : 'white'
                      : 'white',
                    borderColor: isAnswered
                      ? option.value === exercise.correctAnswer
                        ? '#52c41a'
                        : option.value === selectedAnswer
                        ? '#f5222d'
                        : '#d9d9d9'
                      : '#d9d9d9',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text>{option.label}</Text>
                    {isAnswered && option.value === exercise.correctAnswer && (
                      <CheckCircleFilled style={{ color: '#52c41a' }} />
                    )}
                    {isAnswered &&
                      option.value === selectedAnswer &&
                      option.value !== exercise.correctAnswer && (
                        <CloseCircleFilled style={{ color: '#f5222d' }} />
                      )}
                  </div>
                </RadioButton>
              ))}
            </Space>
          </Group>

          {showHint && (
            <HintCard>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <BulbOutlined style={{ color: '#1890ff' }} />
                <Text strong>Suggestion from {exercise.hint.from}</Text>
              </div>
              <Text>{exercise.hint.text}</Text>
              <ul style={{ marginTop: 8, paddingLeft: 24 }}>
                {exercise.hint.steps.map((step, index) => (
                  <li key={index}>{step}</li>
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
              <Button type='link' onClick={() => setShowHint(true)}>
                Show Hint
              </Button>
            )}
            {showHint && !isAnswered && <div />}
            <Button
              type='primary'
              onClick={handleSubmit}
              disabled={!selectedAnswer || isAnswered}
            >
              Submit
            </Button>
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
              {exercise.skillAnalysis.strengths.map((strength, index) => (
                <StrengthItem key={index}>
                  <CheckCircleFilled className='icon' />
                  <Text>{strength}</Text>
                </StrengthItem>
              ))}
            </div>
            <Divider type='vertical' style={{ height: 'auto' }} />
            <div style={{ flex: 1 }}>
              <Title level={5} style={{ color: '#f5222d' }}>
                Needs improvement
              </Title>
              {exercise.skillAnalysis.weaknesses.map((weakness, index) => (
                <WeaknessItem key={index}>
                  <CloseCircleFilled className='icon' />
                  <Text>{weakness}</Text>
                </WeaknessItem>
              ))}
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
        <Button type='default'>Previous Question</Button>
        <Button type='primary' disabled={!isAnswered}>
          Next Question
        </Button>
      </div>
    </div>
  );
};

export default ExercisePage;
