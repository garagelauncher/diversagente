import { FormControl, Input, VStack, Text, TextArea, Stack } from 'native-base';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { SafeAreaView, TextInputProps } from 'react-native';

export type FormInputProps = TextInputProps & {
  value?: string;
  label?: string;
  placeholder?: string;
  hasImage?: boolean;
  isTextArea: boolean;
  error?: FieldError;
  inputVariant?: 'underlined' | 'outline';
};

export function FormInput({
  value,
  placeholder,
  label,
  isTextArea,
  hasImage,
  error,
  inputVariant = 'outline',
  ...rest
}: FormInputProps) {
  return (
    <SafeAreaView>
      <VStack>
        <FormControl.Label isRequired={!hasImage ? true : false}>
          <Text fontSize="16" fontWeight="bold" color={'gray.500'}>
            {label}
          </Text>
        </FormControl.Label>
        {!isTextArea && (
          <Stack space={4}>
            <Input
              borderColor={[error ? 'red.500' : 'blue.800']}
              size="md"
              variant={inputVariant}
              placeholder={placeholder}
              value={value}
              alignItems="center"
              {...rest}
            />
          </Stack>
        )}
        {isTextArea && (
          <Stack space={4}>
            <TextArea
              h={280}
              borderColor={[error ? 'red.500' : 'blue.800']}
              lineHeight={0.85}
              size="md"
              mt={4}
              py={6}
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
