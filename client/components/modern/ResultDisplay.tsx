import { Card, Typography, Space, Tag, Button as AntButton } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface ModernButtonProps {
  children: React.ReactNode;
  [key: string]: any;
}

const ModernButton = ({ children, ...props }: ModernButtonProps) => {
  return (
    <AntButton
      {...props}
      style={{
        borderRadius: 8,
        fontWeight: 500,
        ...props.style
      }}
    >
      {children}
    </AntButton>
  );
};

interface ResultDisplayProps {
  score: number;
  onReset: () => void;
}

export const ResultDisplay = ({ score, onReset }: ResultDisplayProps) => {
  // Determine risk level based on score
  const getRiskLevel = () => {
    if (score >= 5) return { level: 'สูง', color: 'red' };
    if (score >= 3) return { level: 'ปานกลาง', color: 'orange' };
    return { level: 'ต่ำ', color: 'green' };
  };

  const risk = getRiskLevel();

  return (
    <Card
      style={{
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f0f0f0',
        textAlign: 'center',
        maxWidth: 500,
        margin: '0 auto'
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />
        </div>
        
        <div>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            ผลการประเมิน
          </Title>
          <Text type="secondary">Early Warning Sign Calculator</Text>
        </div>
        
        <div>
          <Title level={1} style={{ 
            margin: 0, 
            fontSize: 48,
            color: risk.color === 'red' ? '#ff4d4f' : 
                  risk.color === 'orange' ? '#fa8c16' : '#52c41a'
          }}>
            {score}
          </Title>
          <Text style={{ fontSize: 18 }}>คะแนน</Text>
        </div>
        
        <div>
          <Text style={{ fontSize: 18 }}>ระดับความเสี่ยง: </Text>
          <Tag 
            color={risk.color} 
            style={{ 
              fontSize: 16, 
              padding: '4px 12px',
              borderRadius: 20
            }}
          >
            {risk.level}
          </Tag>
        </div>
        
        <div>
          <Text type="secondary">
            โปรดติดต่อทีมทางการแพทย์หากคุณมีข้อกังวลเกี่ยวกับผลการประเมินนี้
          </Text>
        </div>
        
        <div>
          <ModernButton 
            type="primary" 
            size="large" 
            onClick={onReset}
            style={{ 
              width: '100%', 
              maxWidth: 300,
              height: 48,
              fontSize: 16
            }}
          >
            ประเมินใหม่
          </ModernButton>
        </div>
      </Space>
    </Card>
  );
};