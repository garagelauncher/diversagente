import {
  FormControl,
  Input,
  VStack,
  Text,
  ScrollView,
  TextArea,
  Box,
  Stack,
  KeyboardAvoidingView,
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
  console.log(error);

  return (
    <SafeAreaView>
      <VStack>
        <FormControl.Label isRequired={!hasImage ? true : false}>
          <Text fontSize="18" fontWeight="bold" marginBottom="2">
            {label}
          </Text>
        </FormControl.Label>
        {!isTextArea && (
          <Stack space={4}>
            <Input
              borderColor={[error ? 'red.500' : 'blue.800']}
              size="md"
              placeholder={placeholder}
              value={value}
              {...rest}
            />
          </Stack>
        )}
        {isTextArea && (
          <Stack space={4}>
            <TextArea
              h={260}
              borderColor={[error ? 'red.500' : 'blue.800']}
              size="md"
              placeholder={placeholder}
              autoCompleteType="off"
              {...rest}
            />
          </Stack>
        )}
      </VStack>
    </SafeAreaView>
  );
}
