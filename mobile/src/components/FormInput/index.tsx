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
  placeholder: string;
  label?: string;
  isTextArea: boolean;
};

export function FormInput({
  value,
  placeholder,
  label,
  isTextArea,
  ...rest
}: FormInputProps) {
  return (
    <VStack>
      <FormControl.Label isRequired={isTextArea}>
        <Text fontSize="18" fontWeight="bold" marginBottom="2">
          {label}
        </Text>
      </FormControl.Label>
      {!isTextArea && (
        <Input
          size="lg"
          placeholder={placeholder}
          width={'100%'}
          value={value}
          {...rest}
        />
      )}
      {isTextArea && (
        <>
          <ScrollView height="400">
            <TextArea
              minHeight={400}
              size="lg"
              width="100%"
              height="600px"
              placeholder="Máximo de 1800 caracteres."
              autoCompleteType="off"
            />
          </ScrollView>
        </>
      )}
    </VStack>
  );
}
