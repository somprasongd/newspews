import { Card, Typography, Space, Tag, Button as AntButton } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

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
  type: string;
  level: string;
  action: string;
  onReset: () => void;
}

export const ResultDisplay = ({ score, type, level, action, onReset }: ResultDisplayProps) => {
  // Determine risk level based on level from response
  const getRiskLevel = () => {
    switch (level) {
      case 'สูง':
      case 'High':
        return { level: 'สูง', color: 'red' };
      case 'ปานกลาง':
      case 'Medium':
        return { level: 'ปานกลาง', color: 'orange' };
      case 'ต่ำ':
      case 'Low':
        return { level: 'ต่ำ', color: 'green' };
      default:
        return { level: 'ไม่ทราบ', color: 'default' };
    }
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
          {type && (
            <Text style={{ display: 'block', fontSize: 12, textTransform: 'uppercase', marginTop: 4 }}>
              {type}
            </Text>
          )}
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

        {action && (
          <div style={{ 
            backgroundColor: '#fffbe6', 
            border: '1px solid #ffe58f', 
            borderRadius: 8, 
            padding: '12px 16px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: 18, marginRight: 8 }} />
              <Text strong style={{ fontSize: 16 }}>คำแนะนำ:</Text>
            </div>
            <Text>{action}</Text>
          </div>
        )}
        
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