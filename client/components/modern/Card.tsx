import { Card as AntCard, CardProps } from 'antd';
import { ReactNode } from 'react';

interface ModernCardProps extends CardProps {
  children: ReactNode;
}

export const Card = ({ children, ...props }: ModernCardProps) => {
  return (
    <AntCard
      {...props}
      style={{
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f0f0f0',
        marginBottom: 16,
        ...props.style
      }}
    >
      {children}
    </AntCard>
  );
};