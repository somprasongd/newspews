import { Radio, Space } from 'antd';
import { RadioGroupProps } from 'antd/lib/radio';

interface ModernRadioGroupProps extends RadioGroupProps {
  options: { label: string; value: string; description?: string }[];
  direction?: 'horizontal' | 'vertical';
}

export const ModernRadioGroup = ({ 
  options, 
  direction = 'vertical',
  ...props 
}: ModernRadioGroupProps) => {
  return (
    <Radio.Group 
      {...props}
      style={{ width: '100%' }}
    >
      <Space 
        direction={direction} 
        style={{ width: '100%' }}
      >
        {options.map((option) => (
          <Radio.Button
            key={option.value}
            value={option.value}
            style={{
              width: direction === 'vertical' ? '100%' : 'auto',
              minHeight: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              borderRadius: 8,
              border: '1px solid #d9d9d9',
              margin: direction === 'vertical' ? '4px 0' : '0 4px',
              padding: '8px 12px'
            }}
          >
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}>
              <div style={{ fontWeight: 500 }}>{option.label}</div>
              {option.description && (
                <div style={{ 
                  fontSize: 12, 
                  opacity: 0.7, 
                  marginTop: 2,
                  lineHeight: 1.3,
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {option.description}
                </div>
              )}
            </div>
          </Radio.Button>
        ))}
      </Space>
    </Radio.Group>
  );
};