import type React from 'react';
import {
  Typography,
  Button,
  Row,
  Col,
  Card,
  Divider,
  Space,
  Input,
} from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  RocketOutlined,
  ReadOutlined,
  LineChartOutlined,
  RightOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  SendOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BookOutlined,
  BulbOutlined,
  LaptopOutlined,
} from '@ant-design/icons';
import Logo from '@/components/logo';

const { Title, Paragraph, Text } = Typography;

const Container = styled.div`
  all: unset;
  padding: 0px !important;
  margin: 0px !important;
`;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  padding: 80px 60px;
  background: linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%);
  border-radius: 0 0 50px 50px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -100px;
    right: -100px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(135, 206, 250, 0.1);
    z-index: 0;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50px;
    left: 30%;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(135, 206, 250, 0.08);
    z-index: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 40px 20px;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  padding-right: 60px;
  padding: 40px;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 40px;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 1;

  img {
    height: 100%;
    width: 100%;
    max-width: 150%;
    filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.15));
    transform: perspective(800px) rotateY(-5deg);
    transition: transform 0.5s ease;

    &:hover {
      transform: perspective(800px) rotateY(0);
    }
  }
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  gap: 20px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  text-align: center;
  padding: 15px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  flex: 1;
  min-width: 120px;

  h3 {
    margin: 0;
    color: #1890ff;
    font-size: 28px;
    font-weight: bold;
  }

  p {
    margin: 5px 0 0;
    font-size: 14px;
    color: #666;
  }
`;

const FeaturesSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px;
  text-align: center;
  background: white;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const FeatureCard = styled(Card)`
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: none;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  }

  .ant-card-body {
    padding: 30px;
  }
`;

const FeatureIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #eaf2ff 0%, #cce4ff 100%);
  color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  margin: 0 auto 24px;
`;

const TestimonialsSection = styled.div`
  padding: 80px;
  background: linear-gradient(135deg, #f9fbff 0%, #f0f7ff 100%);
  text-align: center;
  border-radius: 50px 50px 0 0;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const TestimonialCard = styled(Card)`
  height: 100%;
  border-radius: 16px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  padding: 30px;
  display: flex;
  flex-direction: column;
  text-align: left;
  border: none;
  background: white;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const TestimonialHeader = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const TestimonialHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 16px;
  text-align: left;
`;

const TestimonialAvatar = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 3px solid white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const QuoteIcon = styled.div`
  font-size: 60px;
  color: #f0f7ff;
  position: absolute;
  right: 20px;
  bottom: 10px;
  opacity: 0.8;
`;

const HowItWorksSection = styled.div`
  padding: 80px;
  background: white;
  text-align: center;

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const StepCard = styled.div`
  padding: 30px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
  text-align: left;
  position: relative;
  margin-top: 20px;
  z-index: 1;

  &:before {
    content: '${(props) => props.number}';
    position: absolute;
    top: -20px;
    left: -10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #1890ff;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    z-index: 2;
  }
`;

const CtaSection = styled.div`
  padding: 80px 0;
  text-align: center;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -100px;
    left: 20%;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.08);
  }

  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const AppStoreButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const AppStoreButton = styled(Button)`
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .app-store-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-left: 8px;
  }

  .store-name {
    font-size: 18px;
    font-weight: bold;
  }

  .download-text {
    font-size: 12px;
    opacity: 0.8;
  }
`;

const Footer = styled.footer`
  background: #001529;
  color: white;
  padding: 60px 0 20px;
`;

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 80px 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 768px) {
    padding: 0 20px 20px;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
  margin-bottom: 30px;
  padding-right: 20px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  img {
    height: 40px;
    margin-right: 10px;
  }

  h3 {
    color: white;
    margin: 0;
    font-size: 24px;
  }
`;

const FooterLink = styled(Link)`
  display: block;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const SocialButton = styled(Button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
`;

const NewsletterForm = styled.div`
  display: flex;
  margin-top: 16px;

  input {
    flex: 1;
    border-radius: 8px 0 0 8px !important;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: white;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  button {
    border-radius: 0 8px 8px 0;
    background: #1890ff;
    border: none;
    color: white;

    &:hover {
      background: #40a9ff;
    }
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  color: rgba(255, 255, 255, 0.7);

  .icon {
    margin-right: 10px;
    font-size: 16px;
  }
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <Title
            level={1}
            style={{
              color: '#0d1b2a',
              fontFamily: 'Poppins',
              fontSize: '42px',
              fontWeight: 800,
              lineHeight: '1.2',
              marginBottom: 24,
            }}
          >
            Learn Math{' '}
            <span style={{ color: '#1890ff' }}>Anytime, Anywhere</span>,
            <br />
            Easily and Enjoyably!
          </Title>
          <Paragraph
            style={{
              fontSize: 18,
              marginBottom: 32,
              color: '#4a5568',
              lineHeight: 1.6,
            }}
          >
            AI-powered math learning application helps you master math concepts
            with personalized guidance. From arithmetic to algebra, make
            learning math an engaging and effective experience.
          </Paragraph>
          <Space size='large'>
            <Link to='/topics'>
              <Button
                type='primary'
                size='large'
                style={{
                  height: 48,
                  borderRadius: 8,
                  fontWeight: 600,
                  paddingLeft: 24,
                  paddingRight: 24,
                }}
              >
                Start Learning Free <RightOutlined />
              </Button>
            </Link>
            <Button
              size='large'
              icon={<PlayCircleOutlined />}
              style={{ height: 48, borderRadius: 8, fontWeight: 600 }}
            >
              Watch Demo
            </Button>
          </Space>

          <StatsRow>
            <StatItem>
              <h3>20K+</h3>
              <p>Active Users</p>
            </StatItem>
            <StatItem>
              <h3>150+</h3>
              <p>Math Topics</p>
            </StatItem>
            <StatItem>
              <h3>92%</h3>
              <p>Success Rate</p>
            </StatItem>
          </StatsRow>
        </HeroContent>
        <HeroImage>
          <img src='/div.png' alt='MathGenius App Interface' width={500} />
        </HeroImage>
      </HeroSection>

      <HowItWorksSection>
        <Title
          level={2}
          style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: 16,
            position: 'relative',
            display: 'inline-block',
          }}
        >
          How Math Genius Works
          <div
            style={{
              position: 'absolute',
              height: '8px',
              width: '60%',
              background: 'rgba(24, 144, 255, 0.2)',
              bottom: 2,
              left: '20%',
              zIndex: -1,
              borderRadius: '4px',
            }}
          />
        </Title>
        <Paragraph
          style={{ fontSize: 18, maxWidth: 700, margin: '0 auto 48px' }}
        >
          Our platform makes learning math simple and effective through these
          easy steps
        </Paragraph>

        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <StepCard number='1'>
              <FeatureIcon style={{ margin: '0 0 16px 0' }}>
                <BookOutlined />
              </FeatureIcon>
              <Title level={4}>Choose Your Topic</Title>
              <Paragraph>
                Select from a wide range of math topics tailored to your grade
                level or specific areas you want to improve.
              </Paragraph>
            </StepCard>
          </Col>
          <Col xs={24} md={8}>
            <StepCard number='2'>
              <FeatureIcon style={{ margin: '0 0 16px 0' }}>
                <BulbOutlined />
              </FeatureIcon>
              <Title level={4}>Learn With AI</Title>
              <Paragraph>
                Our AI tutor guides you through concepts with interactive
                exercises and step-by-step explanations.
              </Paragraph>
            </StepCard>
          </Col>
          <Col xs={24} md={8}>
            <StepCard number='3'>
              <FeatureIcon style={{ margin: '0 0 16px 0' }}>
                <LaptopOutlined />
              </FeatureIcon>
              <Title level={4}>Track Progress</Title>
              <Paragraph>
                Review your performance with detailed analytics and see your
                improvement over time as you master new skills.
              </Paragraph>
            </StepCard>
          </Col>
        </Row>
      </HowItWorksSection>

      <FeaturesSection>
        <Title
          level={2}
          style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: 16,
            position: 'relative',
            display: 'inline-block',
          }}
        >
          Outstanding Features
          <div
            style={{
              position: 'absolute',
              height: '8px',
              width: '60%',
              background: 'rgba(24, 144, 255, 0.2)',
              bottom: 2,
              left: '20%',
              zIndex: -1,
              borderRadius: '4px',
            }}
          />
        </Title>
        <Paragraph
          style={{ fontSize: 18, maxWidth: 700, margin: '0 auto 48px' }}
        >
          Discover the powerful tools that make Math Genius the ideal learning
          platform
        </Paragraph>

        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <FeatureCard bordered={false}>
              <FeatureIcon>
                <RocketOutlined />
              </FeatureIcon>
              <Title level={4}>AI Personal Guide</Title>
              <Paragraph style={{ fontSize: 16 }}>
                Analyzes your strengths and weaknesses, recommends appropriate
                lessons and provides detailed explanations tailored to your
                learning style.
              </Paragraph>
              <Space style={{ marginTop: 16 }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Personalized learning path</Text>
              </Space>
              <br />
              <Space style={{ marginTop: 8 }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Smart problem detection</Text>
              </Space>
            </FeatureCard>
          </Col>
          <Col xs={24} md={8}>
            <FeatureCard bordered={false}>
              <FeatureIcon>
                <ReadOutlined />
              </FeatureIcon>
              <Title level={4}>Interactive Lessons</Title>
              <Paragraph style={{ fontSize: 16 }}>
                Enjoy an engaging learning experience with multiple-choice
                exercises, fill-in-the-blank activities, and rich interactive
                problem-solving tasks.
              </Paragraph>
              <Space style={{ marginTop: 16 }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Gamified learning</Text>
              </Space>
              <br />
              <Space style={{ marginTop: 8 }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Real-time feedback</Text>
              </Space>
            </FeatureCard>
          </Col>
          <Col xs={24} md={8}>
            <FeatureCard bordered={false}>
              <FeatureIcon>
                <LineChartOutlined />
              </FeatureIcon>
              <Title level={4}>Track Your Progress</Title>
              <Paragraph style={{ fontSize: 16 }}>
                View your learning progress and improve your weaknesses through
                detailed reports, performance analytics, and achievement
                tracking.
              </Paragraph>
              <Space style={{ marginTop: 16 }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Visual progress charts</Text>
              </Space>
              <br />
              <Space style={{ marginTop: 8 }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
                <Text>Achievement badges</Text>
              </Space>
            </FeatureCard>
          </Col>
        </Row>
      </FeaturesSection>

      <TestimonialsSection>
        <Title
          level={2}
          style={{
            fontSize: '36px',
            fontWeight: 700,
            marginBottom: 16,
            position: 'relative',
            display: 'inline-block',
          }}
        >
          What Users Are Saying
          <div
            style={{
              position: 'absolute',
              height: '8px',
              width: '60%',
              background: 'rgba(24, 144, 255, 0.2)',
              bottom: 2,
              left: '20%',
              zIndex: -1,
              borderRadius: '4px',
            }}
          />
        </Title>
        <Paragraph
          style={{ fontSize: 18, maxWidth: 700, margin: '0 auto 48px' }}
        >
          Hear from our community of students, parents and educators
        </Paragraph>

        <Row gutter={[32, 32]}>
          <Col xs={24} md={8}>
            <TestimonialCard bordered={false}>
              <TestimonialHeader>
                <TestimonialAvatar>
                  <img src='/avatar.png' alt='Nguyễn Anh Tuấn' />
                </TestimonialAvatar>
                <TestimonialHeaderContent>
                  <Title level={4} style={{ margin: 0 }}>
                    Nguyễn Anh Tuấn
                  </Title>
                  <Text type='secondary'>High School Student</Text>
                </TestimonialHeaderContent>
              </TestimonialHeader>
              <Paragraph
                style={{
                  fontSize: 16,
                  fontStyle: 'italic',
                  position: 'relative',
                }}
              >
                "This app helps me understand math problems much better. I can
                complete homework faster and my test scores have improved. The
                AI explanations are clear and easy to follow."
                <QuoteIcon>"</QuoteIcon>
              </Paragraph>
            </TestimonialCard>
          </Col>
          <Col xs={24} md={8}>
            <TestimonialCard bordered={false}>
              <TestimonialHeader>
                <TestimonialAvatar>
                  <img src='/avatar.png' alt='Trần Thu Hà' />
                </TestimonialAvatar>
                <TestimonialHeaderContent>
                  <Title level={4} style={{ margin: 0 }}>
                    Trần Thu Hà
                  </Title>
                  <Text type='secondary'>Parent</Text>
                </TestimonialHeaderContent>
              </TestimonialHeader>
              <Paragraph
                style={{
                  fontSize: 16,
                  fontStyle: 'italic',
                  position: 'relative',
                }}
              >
                "My child loves learning math through this app. His scores have
                improved significantly after 2 months of use. The progress
                tracking helps me stay informed about his development."
                <QuoteIcon>"</QuoteIcon>
              </Paragraph>
            </TestimonialCard>
          </Col>
          <Col xs={24} md={8}>
            <TestimonialCard bordered={false}>
              <TestimonialHeader>
                <TestimonialAvatar>
                  <img src='/avatar.png' alt='Lê Văn Minh' />
                </TestimonialAvatar>
                <TestimonialHeaderContent>
                  <Title level={4} style={{ margin: 0 }}>
                    Lê Văn Minh
                  </Title>
                  <Text type='secondary'>Math Teacher</Text>
                </TestimonialHeaderContent>
              </TestimonialHeader>
              <Paragraph
                style={{
                  fontSize: 16,
                  fontStyle: 'italic',
                  position: 'relative',
                }}
              >
                "A great tool to support students' self-learning. The AI-powered
                system helps me understand each student's strengths and
                weaknesses, allowing me to provide more targeted instruction."
                <QuoteIcon>"</QuoteIcon>
              </Paragraph>
            </TestimonialCard>
          </Col>
        </Row>
      </TestimonialsSection>

      <CtaSection>
        <Title
          level={2}
          style={{
            color: 'white',
            fontSize: 36,
            fontWeight: 700,
            position: 'relative',
            zIndex: 1,
          }}
        >
          Ready to begin your math learning journey?
        </Title>
        <Paragraph
          style={{
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: 700,
            margin: '16px auto 32px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          Don't miss the opportunity to learn math easily and effectively. Start
          for free today!
        </Paragraph>
        {/* <Link to='/register'>
          <Button
            size='large'
            type='primary'
            ghost
            style={{
              height: 48,
              borderRadius: 8,
              fontSize: 16,
              fontWeight: 600,
              paddingLeft: 32,
              paddingRight: 32,
              borderWidth: 2,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Get Started Now
          </Button>
        </Link> */}

        <AppStoreButtons>
          <AppStoreButton
            icon={<img src='/apple.png' height='24' />}
            size='large'
          >
            <div className='app-store-content'>
              <span className='download-text'>Download on the</span>
              <span className='store-name'>App Store</span>
            </div>
          </AppStoreButton>
          <AppStoreButton
            icon={<img src='/googleplay.png' height='24' />}
            size='large'
          >
            <div className='app-store-content'>
              <span className='download-text'>GET IT ON</span>
              <span className='store-name'>Google Play</span>
            </div>
          </AppStoreButton>
        </AppStoreButtons>
      </CtaSection>

      <Footer>
        <FooterTop>
          <FooterColumn>
            <FooterLogo>
              <img src='/Vector.png' alt='Math Genius' />
              <h3>Math Genius</h3>
            </FooterLogo>
            <Paragraph style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              AI-powered math learning platform that makes math easy and
              enjoyable for everyone.
            </Paragraph>
            <SocialLinks>
              <SocialButton icon={<FacebookOutlined />} />
              <SocialButton icon={<TwitterOutlined />} />
              <SocialButton icon={<InstagramOutlined />} />
              <SocialButton icon={<LinkedinOutlined />} />
            </SocialLinks>
          </FooterColumn>

          <FooterColumn>
            <Title level={4} style={{ color: 'white', marginBottom: 20 }}>
              Quick Links
            </Title>
            <FooterLink to='/about'>About Us</FooterLink>
            <FooterLink to='/features'>Features</FooterLink>
            <FooterLink to='/pricing'>Pricing</FooterLink>
            <FooterLink to='/testimonials'>Testimonials</FooterLink>
            <FooterLink to='/faq'>FAQ</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <Title level={4} style={{ color: 'white', marginBottom: 20 }}>
              Resources
            </Title>
            <FooterLink to='/blog'>Blog</FooterLink>
            <FooterLink to='/tutorials'>Tutorials</FooterLink>
            <FooterLink to='/support'>Support</FooterLink>
            <FooterLink to='/community'>Community</FooterLink>
            <FooterLink to='/webinar'>Webinars</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <Title level={4} style={{ color: 'white', marginBottom: 20 }}>
              Contact Us
            </Title>
            <ContactItem>
              <MailOutlined className='icon' />
              <span>support@mathgenius.com</span>
            </ContactItem>
            <ContactItem>
              <PhoneOutlined className='icon' />
              <span>+1 (123) 456-7890</span>
            </ContactItem>
            <ContactItem>
              <HomeOutlined className='icon' />
              <span>123 Math Street, Code City, CT 10001</span>
            </ContactItem>

            <Title
              level={5}
              style={{ color: 'white', marginTop: 20, marginBottom: 12 }}
            >
              Subscribe to Newsletter
            </Title>
            <NewsletterForm>
              <Input placeholder='Your email address' />
              <Button icon={<SendOutlined />} />
            </NewsletterForm>
          </FooterColumn>
        </FooterTop>

        <FooterBottom>
          <div>
            © {new Date().getFullYear()} Math Genius. All rights reserved.
          </div>
          <div style={{ marginTop: 8 }}>
            <Link
              to='/privacy'
              style={{ color: 'rgba(255, 255, 255, 0.5)', marginRight: 16 }}
            >
              Privacy Policy
            </Link>
            <Link to='/terms' style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Terms of Service
            </Link>
          </div>
        </FooterBottom>
      </Footer>
    </Container>
  );
};

export default HomePage;
