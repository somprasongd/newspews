import { Input, InputProps } from 'antd';
import { useState } from 'react';

interface ModernInputNumberProps extends InputProps {
  addonAfter?: string;
  maxLength?: number;
}

export const ModernInputNumber = ({ 
  addonAfter, 
  maxLength,
  ...props 
}: ModernInputNumberProps) => {
  const [value, setValue] = useState(props.value || '');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow only numbers and decimal point
    const numericValue = inputValue.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const parts = numericValue.split('.');
    if (parts.length > 2) return;
    
    // Limit length if specified
    if (maxLength && numericValue.length > maxLength) return;
    
    setValue(numericValue);
    props.onChange && props.onChange(e);
  };

  return (
    <div style={{ position: 'relative' }}>
      <Input
        {...props}
        value={value}
        onChange={handleChange}
        style={{
          borderRadius: 8,
          paddingRight: addonAfter ? 40 : 12,
          ...props.style
        }}
        inputMode="decimal"
      />
      {addonAfter && (
        <span 
          style={{
            position: 'absolute',
            right: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#8c8c8c',
            pointerEvents: 'none'
          }}
        >
          {addonAfter}
        </span>
      )}
    </div>
  );
};