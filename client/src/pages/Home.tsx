import type React from "react";
import { Typography, Button, Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  RocketOutlined,
  ReadOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const HeroSection = styled.div`
  display: flex;
  align-items: center;
  padding: 0 60px;
  background-color: #f8f9fa;

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

  @media (max-width: 768px) {
    padding-right: 0;
    margin-bottom: 40px;
  }
`;

const HeroImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    height: 100%;
    width: 100%;
    max-width: 150%;

    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
  }
`;

const FeaturesSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 80px;
  text-align: center;
`;

const FeatureCard = styled(Card)`
  display: flex;
  text-align: left;
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  background-color: #eff6ff; /* sửa lại dòng này */
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const IconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 24px;
`;

const TestimonialsSection = styled.div`
  padding: 60px 80px;
  background-color: #f8f9fa;
  text-align: center;
`;

const TestimonialCard = styled(Card)`
  height: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  text-align: start;
  background-color: #ffffff; /* Thêm màu nền cho phần testimonial */
`;

const TestimonialHeader = styled.div`
  display: flex;
  margin-bottom: 16px;
`;

const TestimonialHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 16px;
  text-align: left;
`;

const TestimonialAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CtaSection = styled.div`
  padding: 60px 0;
  text-align: center;
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
`;

const AppStoreButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection>
        <HeroContent>
          <Title level={1}>
            Learn Math Anytime, Anywhere, Easily and Enjoyably!
          </Title>
          <Paragraph style={{ fontSize: 16, marginBottom: 24 }}>
            AI-powered math learning application helps you learn math in an
            engaging and effective way. From arithmetic to algebra, you will
            receive personalized guidance every step of the way.
          </Paragraph>
          <div>
            <Link to="/register">
              <Button type="primary" size="large" style={{ marginRight: 16 }}>
                Bắt đầu học miễn phí
              </Button>
            </Link>
            <Button size="large">Watch demo</Button>
          </div>
        </HeroContent>
        <HeroImage>
          <img
            src=".\public\div.png"
            alt="MathGenius App Interface"
            width={300}
          />
        </HeroImage>
      </HeroSection>

      <FeaturesSection>
        <Title level={2} style={{ marginBottom: 48 }}>
          Outstanding Features
        </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <FeatureCard bordered={false}>
              <IconWrapper>
                <RocketOutlined />
              </IconWrapper>
              <Title level={4}>AI Personal Guide</Title>
              <Paragraph>
                Analyzes your strengths and weaknesses, recommends appropriate
                lessons and provides detailed explanations.
              </Paragraph>
            </FeatureCard>
          </Col>
          <Col xs={24} md={8}>
            <FeatureCard bordered={false}>
              <IconWrapper>
                <ReadOutlined />
              </IconWrapper>
              <Title level={4}>Interactive Lessons</Title>
              <Paragraph>
                Enjoy an engaging learning experience with multiple-choice
                exercises, fill-in-the-blank activities, and problem-solving
                tasks.
              </Paragraph>
            </FeatureCard>
          </Col>
          <Col xs={24} md={8}>
            <FeatureCard bordered={false}>
              <IconWrapper>
                <LineChartOutlined />
              </IconWrapper>
              <Title level={4}>Track Your Progress</Title>
              <Paragraph>
                View your learning progress and improve your weaknesses through
                detailed reports.
              </Paragraph>
            </FeatureCard>
          </Col>
        </Row>
      </FeaturesSection>

      <TestimonialsSection>
        <Title level={2} style={{ marginBottom: 48 }}>
          What Users Are Saying?
        </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <TestimonialCard bordered={false}>
              <TestimonialHeader>
                <TestimonialAvatar>
                  <img src="./public/avatar.png" alt="Nguyễn Anh Tuấn" />
                </TestimonialAvatar>
                <TestimonialHeaderContent>
                  <Title level={5}>Nguyễn Anh Tuấn</Title>
                  <Paragraph type="secondary">High grade student</Paragraph>
                </TestimonialHeaderContent>
              </TestimonialHeader>
              <Paragraph style={{ fontStyle: "italic" }}>
                "This app helps me understand math problems, complete it easier,
                and to help me learn progress every day."
              </Paragraph>
            </TestimonialCard>
          </Col>
          <Col xs={24} md={8}>
            <TestimonialCard bordered={false}>
              <TestimonialHeader>
                <TestimonialAvatar>
                  <img src="./public/avatar.png" alt="Trần Thu Hà" />
                </TestimonialAvatar>
                <TestimonialHeaderContent>
                  <Title level={5}>Trần Thu Hà</Title>
                  <Paragraph type="secondary">Parents of students</Paragraph>
                </TestimonialHeaderContent>
              </TestimonialHeader>

              <Paragraph style={{ fontStyle: "italic" }}>
                "My child loves learning math through the app. His scores has
                improved significantly after 2 months of use."
              </Paragraph>
            </TestimonialCard>
          </Col>
          <Col xs={24} md={8}>
            <TestimonialCard bordered={false}>
              <TestimonialHeader>
                <TestimonialAvatar>
                  <img src="./public/avatar.png" alt="Lê Văn Minh" />
                </TestimonialAvatar>
                <TestimonialHeaderContent>
                  <Title level={5}>Lê Văn Minh</Title>
                  <Paragraph type="secondary">Teacher</Paragraph>
                </TestimonialHeaderContent>
              </TestimonialHeader>
              <Paragraph style={{ fontStyle: "italic" }}>
                "A great tool to support students self-learning. AI-based helps
                understand the score and child's weakness."
              </Paragraph>
            </TestimonialCard>
          </Col>
        </Row>
      </TestimonialsSection>

      <CtaSection>
        <Title level={2} style={{ color: "white" }}>
          Ready to begin your math learning journey?
        </Title>
        <Paragraph style={{ fontSize: 16, color: "rgba(255, 255, 255, 0.8)" }}>
          Don't miss the opportunity to learn math easily and effectively.
          Download the app today!
        </Paragraph>
        <AppStoreButtons>
          <Button icon={<i className="fab fa-apple" />} size="large">
            App Store
          </Button>
          <Button icon={<i className="fab fa-google-play" />} size="large">
            Google Play
          </Button>
        </AppStoreButtons>
      </CtaSection>
    </>
  );
};

export default HomePage;
