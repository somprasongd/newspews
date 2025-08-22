import { Layout, Typography } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

export const Header = ({ title, subtitle, actions }: HeaderProps) => {
  return (
    <AntHeader 
      style={{ 
        background: '#fff', 
        padding: '0 24px',
        height: 'auto',
        lineHeight: 'normal',
        borderBottom: '1px solid #f0f0f0'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        minHeight: 64,
        flexWrap: 'wrap'
      }}>
        <div>
          <Title 
            level={3} 
            style={{ 
              margin: 0, 
              color: '#1890ff',
              fontSize: 'clamp(18px, 4vw, 24px)'
            }}
          >
            {title}
          </Title>
          {subtitle && (
            <Typography.Text type="secondary" style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>
              {subtitle}
            </Typography.Text>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a 
            href="https://github.com/somprasongd/newspews" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              color: '#1890ff', 
              fontSize: 20,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <GithubOutlined />
          </a>
          {actions && <div>{actions}</div>}
        </div>
      </div>
    </AntHeader>
  );
};