import { HStack, Input } from 'native-base';
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

export type InputProps = TextInputProps & {
  value?: string;
  placeholder?: string;
};

export function FormInput({ value, placeholder, ...rest }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);
  }

  return (
    <HStack>
      <Input
        size="lg"
        placeholder={placeholder}
        width={'100%'}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        focusable={isFocused}
        value={value}
        {...rest}
      />
    </HStack>
  );
}
