'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Input,
  Button,
  Card,
  Typography,
  Space,
  Avatar,
  Divider,
  Select,
  Tag,
  Badge,
  Alert,
  Tooltip,
  List,
} from 'antd';
import {
  SendOutlined,
  RobotOutlined,
  UserOutlined,
  HistoryOutlined,
  BulbOutlined,
  SyncOutlined,
  PlusOutlined,
  CloseOutlined,
  BookOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  margin: 0 auto;
  padding: 0 20px;
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
  padding-top: 20px;
`;

const GradientTitle = styled(Title)`
  background: linear-gradient(90deg, #4361ee, #7209b7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ChatContainer = styled.div`
  display: flex;
  flex: 1;
  gap: 24px;
  overflow: hidden;
`;

const SidePanel = styled.div`
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MainChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #eaecf0;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
  background-color: white;
  transition: all 0.3s ease;
`;

const ChatHeader = styled.div`
  padding: 18px 24px;
  background: linear-gradient(
    90deg,
    rgba(67, 97, 238, 0.05),
    rgba(114, 9, 183, 0.05)
  );
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 28px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(67, 97, 238, 0.2);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ChatInputArea = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #f0f0f0;
  background-color: #fafcff;
`;

const MessageBubbleContainer = styled(motion.div)<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
  max-width: 80%;
  align-self: ${(props) => (props.$isUser ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  background: ${(props) =>
    props.$isUser
      ? 'linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)'
      : 'linear-gradient(135deg, #f8f9fa 0%, #f1f3f9 100%)'};
  color: ${(props) => (props.$isUser ? 'white' : 'rgba(0, 0, 0, 0.85)')};
  padding: 14px 18px;
  border-radius: ${(props) =>
    props.$isUser ? '18px 18px 0 18px' : '18px 18px 18px 0'};
  box-shadow: ${(props) =>
    props.$isUser
      ? '0 4px 12px rgba(67, 97, 238, 0.2)'
      : '0 4px 12px rgba(0, 0, 0, 0.05)'};
  line-height: 1.6;
  font-size: 15px;
`;

const ChatInput = styled(Input.TextArea)`
  border-radius: 16px;
  resize: none;
  padding: 14px 18px;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #eaecf0;
  transition: all 0.3s ease;

  &:hover {
    border-color: #4361ee;
  }

  &:focus {
    border-color: #4361ee;
    box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.15);
  }
`;

const StyledCard = styled(Card)`
  border-radius: 18px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  margin-bottom: 8px;
  transition: all 0.3s ease;
  border: none;
  overflow: hidden;

  .ant-card-head {
    border-bottom: 1px solid #f0f0f0;
    padding: 14px 18px;
  }

  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const ConversationButton = styled(Button)<{ $active?: boolean }>`
  text-align: left;
  display: flex;
  align-items: center;
  height: auto;
  padding: 14px 18px;
  border-radius: 14px;
  margin-bottom: 10px;
  box-shadow: ${(props) =>
    props.$active ? '0 4px 12px rgba(67, 97, 238, 0.15)' : 'none'};
  background-color: ${(props) => (props.$active ? 'white' : 'transparent')};
  border: ${(props) => (props.$active ? 'none' : '1px solid #eaecf0')};
  transition: all 0.2s ease;

  &:hover {
    background-color: white;
    border-color: white;
    transform: translateY(-2px);
  }
`;

const TopicTag = styled(Tag)`
  margin: 6px;
  padding: 6px 12px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 13px;
  border: none;

  &:hover {
    opacity: 0.9;
    transform: scale(1.05);
  }
`;

const SendButton = styled(Button)`
  height: auto;
  border-radius: 14px;
  background: linear-gradient(135deg, #4361ee 0%, #3a56d4 100%);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.25);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #3a56d4 0%, #304acd 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(67, 97, 238, 0.35);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 8px rgba(67, 97, 238, 0.35);
  }
`;

const EmptyChat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 24px;
  color: rgba(0, 0, 0, 0.55);
`;

const SuggestionButton = styled(Button)`
  border-radius: 12px;
  font-size: 13px;
  background-color: #f8f9fa;
  border: 1px solid #eaecf0;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f0f5ff;
    border-color: #d6e4ff;
    color: #4361ee;
    transform: translateY(-2px);
  }
`;

const QuickQuestionButton = styled(Button)`
  width: 100%;
  text-align: left;
  justify-content: flex-start;
  padding: 10px 16px;
  transition: all 0.2s ease;
  border-radius: 12px;
  margin-bottom: 8px;

  &:hover {
    background-color: #f0f5ff;
    color: #4361ee;
    transform: translateX(4px);
  }
`;

// Types for our data structures
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  unread?: boolean;
  messages?: Message[]; // Add messages array to store conversation history
}

interface SuggestionTopic {
  id: string;
  name: string;
  color: string;
}

const AIChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState('math');
  const [selectedConversation, setSelectedConversation] = useState<string>('1'); // Store selected conversation ID
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const inputRef = useRef<null | HTMLTextAreaElement>(null);

  // Sample past conversations with complete message history
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Linear equations help',
      lastMessage: 'Thanks, I understand now!',
      timestamp: new Date(2023, 7, 15, 14, 30),
      messages: [
        {
          id: '1-1',
          content: 'How do I solve systems of linear equations?',
          isUser: true,
          timestamp: new Date(2023, 7, 15, 14, 22),
        },
        {
          id: '1-2',
          content:
            'To solve systems of linear equations, you can use several methods:\n\n1. **Substitution Method**: Solve for one variable in one equation and substitute it into the other equation.\n\n2. **Elimination Method**: Add or subtract equations to eliminate a variable.\n\n3. **Matrix Method**: Use matrices and row operations (Gaussian elimination).\n\nWhich method would you like me to explain in more detail?',
          isUser: false,
          timestamp: new Date(2023, 7, 15, 14, 23),
        },
        {
          id: '1-3',
          content: 'Can you show me an example using the elimination method?',
          isUser: true,
          timestamp: new Date(2023, 7, 15, 14, 25),
        },
        {
          id: '1-4',
          content:
            "Sure! Let's solve this system using elimination:\n\n2x + 3y = 8\n4x - 5y = 2\n\nStep 1: Multiply the first equation by 2 to get:\n4x + 6y = 16\n\nStep 2: Add this to the second equation:\n4x - 5y = 2\n4x + 6y = 16\n---------\n8x + y = 18\n\nStep 3: Solve for x:\ny = 18 - 8x\n\nStep 4: Substitute back into the first equation:\n2x + 3(18 - 8x) = 8\n2x + 54 - 24x = 8\n-22x = -46\nx = 2.09\n\nStep 5: Find y by substituting x back:\ny = 18 - 8(2.09) = 1.28\n\nSolution: (2.09, 1.28)",
          isUser: false,
          timestamp: new Date(2023, 7, 15, 14, 27),
        },
        {
          id: '1-5',
          content: 'Thanks, I understand now!',
          isUser: true,
          timestamp: new Date(2023, 7, 15, 14, 30),
        },
      ],
    },
    {
      id: '2',
      title: 'Quadratic formula',
      lastMessage: 'That makes sense, thank you!',
      timestamp: new Date(2023, 7, 14, 10, 15),
      messages: [
        {
          id: '2-1',
          content: 'Can you explain the quadratic formula?',
          isUser: true,
          timestamp: new Date(2023, 7, 14, 10, 10),
        },
        {
          id: '2-2',
          content:
            'The quadratic formula is used to solve quadratic equations of the form ax² + bx + c = 0, where a, b, and c are coefficients.\n\nThe formula is:\n\nx = (-b ± √(b² - 4ac)) / (2a)\n\nThis gives you two solutions for x, one using the plus sign and one using the minus sign. The term under the square root (b² - 4ac) is called the discriminant, and it tells you how many real solutions the equation has:\n\n- If b² - 4ac > 0: Two distinct real solutions\n- If b² - 4ac = 0: One real solution (a repeated root)\n- If b² - 4ac < 0: No real solutions (two complex solutions)',
          isUser: false,
          timestamp: new Date(2023, 7, 14, 10, 12),
        },
        {
          id: '2-3',
          content: 'How do I use this to solve x² - 5x + 6 = 0?',
          isUser: true,
          timestamp: new Date(2023, 7, 14, 10, 13),
        },
        {
          id: '2-4',
          content:
            "Let's solve x² - 5x + 6 = 0 using the quadratic formula.\n\nFirst, identify the coefficients:\na = 1, b = -5, c = 6\n\nNow substitute into the formula x = (-b ± √(b² - 4ac)) / (2a):\n\nx = -(-5) ± √((-5)² - 4(1)(6)) / (2(1))\nx = 5 ± √(25 - 24) / 2\nx = 5 ± √1 / 2\nx = 5 ± 1 / 2\n\nSo x = 3 or x = 2\n\nYou can verify these solutions by substituting them back into the original equation.",
          isUser: false,
          timestamp: new Date(2023, 7, 14, 10, 14),
        },
        {
          id: '2-5',
          content: 'That makes sense, thank you!',
          isUser: true,
          timestamp: new Date(2023, 7, 14, 10, 15),
        },
      ],
    },
    {
      id: '3',
      title: 'Polynomial factoring',
      lastMessage: 'Got it, thanks for the help!',
      timestamp: new Date(2023, 7, 12, 9, 45),
      unread: true,
      messages: [
        {
          id: '3-1',
          content: 'Help with factoring polynomials',
          isUser: true,
          timestamp: new Date(2023, 7, 12, 9, 30),
        },
        {
          id: '3-2',
          content:
            "I'd be happy to help with factoring polynomials! What specific polynomial are you trying to factor?",
          isUser: false,
          timestamp: new Date(2023, 7, 12, 9, 31),
        },
        {
          id: '3-3',
          content: 'x³ - 8',
          isUser: true,
          timestamp: new Date(2023, 7, 12, 9, 33),
        },
        {
          id: '3-4',
          content:
            'This is a difference of cubes! The formula to remember is:\n\na³ - b³ = (a - b)(a² + ab + b²)\n\nIn your case, x³ - 8 = x³ - 2³, so a = x and b = 2.\n\nApplying the formula:\nx³ - 8 = (x - 2)(x² + 2x + 4)\n\nYou can verify this by multiplying it out:\n(x - 2)(x² + 2x + 4) = x³ + 2x² + 4x - 2x² - 4x - 8 = x³ - 8',
          isUser: false,
          timestamp: new Date(2023, 7, 12, 9, 35),
        },
        {
          id: '3-5',
          content: 'Can you also help me factor x² + 6x + 8?',
          isUser: true,
          timestamp: new Date(2023, 7, 12, 9, 40),
        },
        {
          id: '3-6',
          content:
            "Sure! For x² + 6x + 8, we need to find two numbers that:\n1. Multiply to give 8 (the constant term)\n2. Add up to give 6 (the coefficient of x)\n\nLet's try factors of 8: 1×8 = 8 and 1+8 = 9 (too large)\n2×4 = 8 and 2+4 = 6 (perfect!)\n\nSo x² + 6x + 8 = (x + 2)(x + 4)\n\nYou can verify this by multiplying it out:\n(x + 2)(x + 4) = x² + 4x + 2x + 8 = x² + 6x + 8",
          isUser: false,
          timestamp: new Date(2023, 7, 12, 9, 43),
        },
        {
          id: '3-7',
          content: 'Got it, thanks for the help!',
          isUser: true,
          timestamp: new Date(2023, 7, 12, 9, 45),
        },
      ],
    },
    {
      id: '4',
      title: 'Calculus derivatives',
      lastMessage: 'Perfect, now I understand the chain rule!',
      timestamp: new Date(2023, 7, 10, 16, 20),
      messages: [
        {
          id: '4-1',
          content: 'What is the chain rule in calculus and how do I use it?',
          isUser: true,
          timestamp: new Date(2023, 7, 10, 16, 10),
        },
        {
          id: '4-2',
          content:
            "The chain rule is a formula for calculating the derivative of a composite function. If you have a function h(x) = f(g(x)), then the derivative is:\n\nh'(x) = f'(g(x)) · g'(x)\n\nIn simpler terms, if you have a \"function of a function,\" you find the derivative of the outer function evaluated at the inner function, and multiply by the derivative of the inner function.\n\nIt's often written in Leibniz notation as:\ndy/dx = (dy/du) · (du/dx)",
          isUser: false,
          timestamp: new Date(2023, 7, 10, 16, 12),
        },
        {
          id: '4-3',
          content:
            'Can you show me an example? How do I find the derivative of y = sin(x²)?',
          isUser: true,
          timestamp: new Date(2023, 7, 10, 16, 15),
        },
        {
          id: '4-4',
          content:
            "Let's find the derivative of y = sin(x²) using the chain rule.\n\nFirst, identify the functions:\n- The outer function f(u) = sin(u)\n- The inner function g(x) = x²\n\nStep 1: Find the derivative of the outer function with respect to the inner function.\nf'(g(x)) = cos(x²)\n\nStep 2: Find the derivative of the inner function with respect to x.\ng'(x) = 2x\n\nStep 3: Apply the chain rule by multiplying these derivatives.\ny' = f'(g(x)) · g'(x) = cos(x²) · 2x = 2x·cos(x²)\n\nSo the derivative of sin(x²) is 2x·cos(x²).",
          isUser: false,
          timestamp: new Date(2023, 7, 10, 16, 18),
        },
        {
          id: '4-5',
          content: 'Perfect, now I understand the chain rule!',
          isUser: true,
          timestamp: new Date(2023, 7, 10, 16, 20),
        },
      ],
    },
    {
      id: '5',
      title: 'Pythagorean theorem',
      lastMessage: 'Thanks for the clear explanation and example!',
      timestamp: new Date(2023, 7, 8, 13, 0o5),
      messages: [
        {
          id: '5-1',
          content: 'Can you explain the Pythagorean theorem and how to use it?',
          isUser: true,
          timestamp: new Date(2023, 7, 8, 13, 0o0),
        },
        {
          id: '5-2',
          content:
            "The Pythagorean theorem states that in a right triangle (a triangle with one 90° angle), the square of the length of the hypotenuse (the side opposite the right angle) equals the sum of squares of the other two sides (known as legs or catheti).\n\nMathematically, it's expressed as:\na² + b² = c²\n\nWhere:\n- a and b are the lengths of the legs (the sides that form the right angle)\n- c is the length of the hypotenuse (the longest side, opposite the right angle)\n\nYou can use this theorem to find:\n1. The length of the hypotenuse if you know both legs: c = √(a² + b²)\n2. The length of one leg if you know the other leg and hypotenuse: a = √(c² - b²)",
          isUser: false,
          timestamp: new Date(2023, 7, 8, 13, 0o2),
        },
        {
          id: '5-3',
          content:
            'How would I calculate the distance between two points using this?',
          isUser: true,
          timestamp: new Date(2023, 7, 8, 13, 0o3),
        },
        {
          id: '5-4',
          content:
            'Great question! The distance formula between two points is a direct application of the Pythagorean theorem.\n\nIf you have two points in a coordinate plane:\nPoint 1: (x₁, y₁)\nPoint 2: (x₂, y₂)\n\nYou can find the distance between them using:\nd = √[(x₂ - x₁)² + (y₂ - y₁)²]\n\nFor example, to find the distance between (3, 4) and (6, 8):\nd = √[(6 - 3)² + (8 - 4)²]\nd = √[3² + 4²]\nd = √[9 + 16]\nd = √25\nd = 5\n\nThis works because you can visualize a right triangle where the two points form the opposite corners of a rectangle, and the distance is the hypotenuse of that triangle.',
          isUser: false,
          timestamp: new Date(2023, 7, 8, 13, 0o4),
        },
        {
          id: '5-5',
          content: 'Thanks for the clear explanation and example!',
          isUser: true,
          timestamp: new Date(2023, 7, 8, 13, 0o5),
        },
      ],
    },
  ]);

  // Sample suggestion topics
  const [topics] = useState<SuggestionTopic[]>([
    { id: 'algebra', name: 'Algebra', color: '#4361ee' },
    { id: 'calculus', name: 'Calculus', color: '#3a0ca3' },
    { id: 'geometry', name: 'Geometry', color: '#f72585' },
    { id: 'trigonometry', name: 'Trigonometry', color: '#7209b7' },
    { id: 'statistics', name: 'Statistics', color: '#4cc9f0' },
    { id: 'probability', name: 'Probability', color: '#4895ef' },
  ]);

  // Sample quick questions
  const quickQuestions = [
    'What is the quadratic formula?',
    'Explain the Pythagorean theorem',
    'How do you solve linear equations?',
    'What is the chain rule in calculus?',
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Focus back on input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const getAIResponse = (message: string): string => {
    // Mock AI responses based on subject and user input
    const lowerMsg = message.toLowerCase();

    if (subject === 'math') {
      if (lowerMsg.includes('quadratic')) {
        return 'The quadratic formula is used to solve quadratic equations. For an equation in the form ax² + bx + c = 0, the solution is x = (-b ± √(b² - 4ac)) / (2a). This formula gives you all the values of x that make the equation true.';
      } else if (lowerMsg.includes('linear equation')) {
        return 'Linear equations are equations of the form ax + b = 0, where a and b are constants. To solve, isolate x by subtracting b from both sides and then dividing by a: x = -b/a.';
      } else if (lowerMsg.includes('pythagorean')) {
        return 'The Pythagorean theorem states that in a right triangle, the square of the length of the hypotenuse (c) is equal to the sum of squares of the other two sides (a and b). So a² + b² = c². This is useful for finding unknown side lengths in right triangles.';
      }
    }

    return "I'm your math AI assistant. I can help you understand mathematical concepts, solve problems, and explain solutions step by step. What specific math topic would you like help with today?";
  };

  const handleInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    // Focus on input after setting question
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // Load conversation history when selecting a conversation
  const handleSelectConversation = (conversationId: string) => {
    setSelectedConversation(conversationId);
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation && conversation.messages) {
      setMessages(conversation.messages);
    } else {
      setMessages([]);
    }
  };

  return (
    <PageContainer>
      <div
        style={{ display: 'flex', gap: '24px', height: 'calc(100vh - 120px)' }}
      >
        {/* Left Column - Header and History */}
        <div
          style={{ width: '280px', display: 'flex', flexDirection: 'column' }}
        >
          <PageHeader>
            <GradientTitle level={3}>AI Math Tutor</GradientTitle>
            <Text type='secondary'>
              Ask any math question and get step-by-step explanations
            </Text>
          </PageHeader>

          {/* Past Conversations */}
          <StyledCard
            title={
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <HistoryOutlined style={{ color: '#4361ee' }} />
                <span>History</span>
              </div>
            }
            extra={
              <Text
                type='secondary'
                style={{ cursor: 'pointer', fontSize: '13px' }}
                underline
              >
                Clear all
              </Text>
            }
            bodyStyle={{ padding: '18px' }}
            style={{ flex: 1, overflowY: 'auto' }}
          >
            {conversations.map((conv) => (
              <ConversationButton
                key={conv.id}
                $active={conv.id === selectedConversation}
                block
                onClick={() => handleSelectConversation(conv.id)}
              >
                <Space direction='vertical' style={{ width: '100%' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Text strong>{conv.title}</Text>
                    {conv.unread && (
                      <Badge
                        count={
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: '#4361ee',
                            }}
                          />
                        }
                        offset={[0, 0]}
                      />
                    )}
                  </div>
                  <Text
                    type='secondary'
                    style={{
                      fontSize: '12px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {conv.lastMessage}
                  </Text>
                </Space>
              </ConversationButton>
            ))}

            <Button
              type='dashed'
              icon={<PlusOutlined />}
              block
              style={{
                marginTop: '12px',
                borderRadius: '14px',
                height: '44px',
              }}
            >
              New Conversation
            </Button>
          </StyledCard>
        </div>

        {/* Main Chat Area */}
        <MainChatArea style={{ flex: 1 }}>
          <ChatHeader>
            <Space>
              <Avatar
                icon={<img src='/AI.png' alt='AI Tutor' />}
                size={38}
                style={{
                  background:
                    'linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)',
                  boxShadow: '0 4px 8px rgba(67, 97, 238, 0.25)',
                }}
              />
              <div>
                <Text strong style={{ fontSize: '16px' }}>
                  AI Math Tutor
                </Text>
                <div>
                  <Badge status='success' />
                  <Text
                    type='secondary'
                    style={{ fontSize: '12px', marginLeft: '5px' }}
                  >
                    Online | Ready to help
                  </Text>
                </div>
              </div>
            </Space>

            <Space>
              {/* Subject Selector */}
              {/* <Select
                value={subject}
                onChange={setSubject}
                style={{ width: '120px' }}
                dropdownStyle={{ borderRadius: '12px' }}
              >
                <Option value='math'>Mathematics</Option>
                <Option value='physics'>Physics</Option>
                <Option value='chemistry'>Chemistry</Option>
                <Option value='biology'>Biology</Option>
              </Select> */}

              <Tooltip title='Settings'>
                <Button
                  type='text'
                  icon={<SettingOutlined style={{ fontSize: '18px' }} />}
                  shape='circle'
                />
              </Tooltip>
              <Tooltip title='How to use AI chat'>
                <Button
                  type='text'
                  icon={<QuestionCircleOutlined style={{ fontSize: '18px' }} />}
                  shape='circle'
                />
              </Tooltip>
            </Space>
          </ChatHeader>

          <ChatMessages>
            {messages.length === 0 ? (
              <EmptyChat>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Avatar
                    icon={<RobotOutlined />}
                    size={64}
                    style={{
                      background:
                        'linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)',
                      boxShadow: '0 8px 16px rgba(67, 97, 238, 0.25)',
                      marginBottom: '24px',
                    }}
                  />
                  <Title level={3} style={{ marginBottom: '16px' }}>
                    Welcome to the AI Math Tutor!
                  </Title>
                  <Paragraph
                    style={{
                      maxWidth: '580px',
                      marginBottom: '32px',
                      fontSize: '16px',
                    }}
                  >
                    I can help you solve math problems step-by-step, explain
                    concepts, and answer questions about any math topic.
                  </Paragraph>

                  <div style={{ maxWidth: '580px', width: '100%' }}>
                    <Alert
                      message='Ask me anything about mathematics!'
                      type='info'
                      showIcon
                      style={{
                        marginBottom: '32px',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        borderColor: '#d6e4ff',
                        background: '#f0f5ff',
                      }}
                    />

                    <div>
                      <Text
                        strong
                        style={{
                          fontSize: '16px',
                          display: 'block',
                          marginBottom: '16px',
                        }}
                      >
                        Try asking:
                      </Text>
                      <List
                        size='small'
                        dataSource={quickQuestions}
                        renderItem={(item) => (
                          <List.Item
                            style={{ border: 'none', padding: '4px 0' }}
                            onClick={() => handleQuickQuestion(item)}
                          >
                            <QuickQuestionButton
                              type='text'
                              icon={
                                <MessageOutlined style={{ color: '#4361ee' }} />
                              }
                            >
                              {item}
                            </QuickQuestionButton>
                          </List.Item>
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              </EmptyChat>
            ) : (
              messages.map((message) => (
                <MessageBubbleContainer
                  key={message.id}
                  $isUser={message.isUser}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '6px',
                    }}
                  >
                    {!message.isUser && (
                      <Avatar
                        size='small'
                        icon={<img src='/AI.png' alt='AI Tutor' />}
                        style={{
                          background:
                            'linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)',
                          marginRight: '8px',
                        }}
                      />
                    )}
                    <Text type='secondary' style={{ fontSize: '12px' }}>
                      {message.isUser ? 'You' : 'AI Tutor'} •{' '}
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    {message.isUser && (
                      <Avatar
                        size='small'
                        icon={<UserOutlined />}
                        style={{
                          backgroundColor: '#4361ee',
                          marginLeft: '8px',
                        }}
                      />
                    )}
                  </div>
                  <MessageBubble $isUser={message.isUser}>
                    {message.content}
                  </MessageBubble>
                </MessageBubbleContainer>
              ))
            )}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  alignSelf: 'flex-start',
                  marginBottom: '8px',
                }}
              >
                <Avatar
                  size='small'
                  icon={<img src='/AI.png' alt='AI Tutor' />}
                  style={{
                    background:
                      'linear-gradient(135deg, #4361ee 0%, #3a56d4 100%)',
                    marginRight: '8px',
                  }}
                />
                <Tag
                  icon={<SyncOutlined spin />}
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(67, 97, 238, 0.05))',
                    borderColor: 'rgba(67, 97, 238, 0.2)',
                    color: '#4361ee',
                    borderRadius: '12px',
                    padding: '4px 10px',
                  }}
                >
                  Thinking...
                </Tag>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </ChatMessages>

          <ChatInputArea>
            <div style={{ display: 'flex', gap: '12px' }}>
              <ChatInput
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleInputKeyPress}
                placeholder='Ask a math question...'
                autoSize={{ minRows: 1, maxRows: 4 }}
                size='large'
              />
              <SendButton
                type='primary'
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
              />
            </div>

            <div
              style={{
                marginTop: '16px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                alignItems: 'center',
              }}
            >
              <Text
                type='secondary'
                style={{
                  fontSize: '13px',
                  marginRight: '8px',
                  lineHeight: '22px',
                }}
              >
                Suggested:
              </Text>
              <SuggestionButton
                size='middle'
                onClick={() => handleQuickQuestion('Simplify x²-4x+4')}
              >
                Simplify x²-4x+4
              </SuggestionButton>
              <SuggestionButton
                size='middle'
                onClick={() => handleQuickQuestion('Solve 2x+3=7')}
              >
                Solve 2x+3=7
              </SuggestionButton>
              <SuggestionButton
                size='middle'
                onClick={() => handleQuickQuestion('Area of circle')}
              >
                Area of circle
              </SuggestionButton>
            </div>
          </ChatInputArea>
        </MainChatArea>
      </div>

      {/* Topics side panel - optional, can be shown in a drawer for mobile */}
      <div
        style={{
          width: '250px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          marginLeft: '24px',
          display: 'none',
        }}
      >
        <StyledCard
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <BulbOutlined style={{ color: '#4361ee' }} />
              <span>Topics</span>
            </div>
          }
          bodyStyle={{ padding: '16px' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {topics.map((topic) => (
              <TopicTag key={topic.id} color={topic.color}>
                {topic.name}
              </TopicTag>
            ))}
          </div>
        </StyledCard>
      </div>
    </PageContainer>
  );
};

export default AIChatBox;
