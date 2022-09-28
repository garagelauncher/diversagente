import {
  FormControl,
  Input,
  VStack,
  Text,
  ScrollView,
  TextArea,
} from 'native-base';
import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { SafeAreaView, TextInputProps } from 'react-native';

export type FormInputProps = TextInputProps & {
  value?: string;
  label?: string;
  placeholder?: string;
  hasImage?: boolean;
  isTextArea: boolean;
  error?: FieldError;
};

export function FormInput({
  value,
  placeholder,
  label,
  isTextArea,
  hasImage,
  error,
  ...rest
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  console.log(error);

  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handleInputFocus() {
    setIsFocused(true);
  }
  return (
    <SafeAreaView>
      <VStack>
        <FormControl.Label isRequired={!hasImage ? true : false}>
          <Text fontSize="18" fontWeight="bold" marginBottom="2">
            {label}
          </Text>
        </FormControl.Label>
        {!isTextArea && (
          <Input
            borderColor={[
              isFilled && !error ? 'green.500' : 'gray.400',
              error ? 'red.500' : 'gray.400',
            ]}
            size="md"
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            width={'100%'}
            value={value}
            {...rest}
          />
        )}
        {isTextArea && (
          <TextArea
            borderColor={[
              isFilled && !error ? 'green.500' : 'gray.400',
              error ? 'red.500' : 'gray.400',
            ]}
            size="md"
            height={700}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            width="100%"
            placeholder="Máximo de 1800 caracteres."
            autoCompleteType="off"
            textAlignVertical="top"
            {...rest}
          />
        )}
      </VStack>
    </SafeAreaView>
  );
}
