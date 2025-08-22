import { Button as AntButton, ButtonProps } from 'antd';

interface ModernButtonProps extends ButtonProps {}

export const ModernButton = ({ ...props }: ModernButtonProps) => {
  return (
    <AntButton
      {...props}
      style={{
        borderRadius: 8,
        fontWeight: 500,
        ...props.style
      }}
    >
      {props.children}
    </AntButton>
  );
};