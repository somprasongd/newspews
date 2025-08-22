import { Input, InputProps } from 'antd';
import { useState } from 'react';

interface ModernInputNumberProps extends InputProps {
  addonAfter?: string;
  maxLength?: number;
  allowAgeFormat?: boolean; // Special handling for age input (year.month.day)
  onAgeValidationError?: (error: string | null) => void; // Callback for age validation errors
}

export const ModernInputNumber = ({ 
  addonAfter, 
  maxLength,
  allowAgeFormat = false,
  onAgeValidationError,
  ...props 
}: ModernInputNumberProps) => {
  const [value, setValue] = useState(props.value || '');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Special handling for age format (year.month.day)
    if (allowAgeFormat) {
      // Allow only numbers and decimal points
      let numericValue = inputValue.replace(/[^0-9.]/g, '');
      
      // Prevent more than 3 parts (year.month.day)
      const parts = numericValue.split('.');
      if (parts.length > 3) return;
      
      // Validate each part as it's being typed
      let validationError: string | null = null;
      
      // Validate month (second part) - must be 0-11
      if (parts.length >= 2) {
        const monthPart = parts[1];
        // If month part has more than 2 digits, it's invalid
        if (monthPart.length > 2) {
          return;
        }
        // If month part is complete (2 digits) and greater than 11, it's invalid
        if (monthPart.length === 2) {
          const month = parseInt(monthPart, 10);
          if (month > 11) {
            validationError = 'เดือนต้องอยู่ระหว่าง 0-11';
          }
        }
        // If month part is "1" and user tries to type another digit that would make it > 11
        if (monthPart.length === 1 && monthPart === "1") {
          // We'll allow typing the second digit but validate after
        } else if (monthPart.length === 1 && parseInt(monthPart, 10) > 1) {
          // If first digit is 2-9, it's already invalid
          validationError = 'เดือนต้องอยู่ระหว่าง 0-11';
        }
      }
      
      // Validate day (third part) - must be 0-31
      if (parts.length >= 3) {
        const dayPart = parts[2];
        // If day part has more than 2 digits, it's invalid
        if (dayPart.length > 2) {
          return;
        }
        // If day part is complete (2 digits) and greater than 31, it's invalid
        if (dayPart.length === 2) {
          const day = parseInt(dayPart, 10);
          if (day > 31) {
            validationError = 'วันต้องอยู่ระหว่าง 0-31';
          }
        }
        // If day part is "3" and user tries to type another digit that would make it > 31
        if (dayPart.length === 1 && dayPart === "3") {
          // We'll allow typing the second digit but validate after
        } else if (dayPart.length === 1 && parseInt(dayPart, 10) > 3) {
          // If first digit is 4-9, it's already invalid
          validationError = 'วันต้องอยู่ระหว่าง 0-31';
        }
      }
      
      // Notify parent of validation status
      onAgeValidationError && onAgeValidationError(validationError);
      
      // Limit length if specified
      if (maxLength && numericValue.length > maxLength) return;
      
      setValue(numericValue);
      props.onChange && props.onChange(e);
      return;
    }
    
    // Regular numeric input handling
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