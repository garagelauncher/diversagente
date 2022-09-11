import {
  FormControl,
  Input,
  VStack,
  Text,
  ScrollView,
  TextArea,
} from 'native-base';
import React from 'react';
import { TextInputProps } from 'react-native';

export type FormInputProps = TextInputProps & {
  value?: string;
  label?: string;
  placeholder?: string;
  hasImage?: boolean;
  isTextArea: boolean;
};

export function FormInput({
  value,
  placeholder,
  label,
  isTextArea,
  hasImage,
  ...rest
}: FormInputProps) {
  return (
    <VStack>
      <FormControl.Label>
        <Text fontSize="18" fontWeight="bold" marginBottom="2">
          {label}
        </Text>
      </FormControl.Label>
      {!isTextArea && (
        <Input
          borderColor={value?.length || hasImage ? 'green.500' : 'red.500'}
          size="md"
          placeholder={placeholder}
          width={'100%'}
          value={value}
          {...rest}
        />
      )}
      {isTextArea && (
        <ScrollView height="400">
          <TextArea
            borderColor={value?.length ? 'green.500' : 'red.500'}
            minHeight={400}
            size="md"
            width="100%"
            height="600px"
            placeholder="Máximo de 1800 caracteres."
            autoCompleteType="off"
            {...rest}
          />
        </ScrollView>
      )}
    </VStack>
  );
}
