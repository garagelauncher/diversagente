/* eslint-disable @typescript-eslint/no-explicit-any */
import { Text, WarningOutlineIcon, HStack } from 'native-base';
import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { FormInputProps, FormInput } from '../FormInput';

type Props = FormInputProps &
  TextInputProps & {
    control: Control<any>;
    name: string;
    error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  };

export function ControlledInput({ control, name, error, ...rest }: Props) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <FormInput
            onChangeText={onChange}
            value={value}
            error={error}
            {...rest}
          />
        )}
      />
      {error && (
        <HStack marginTop={2} alignItems="center">
          <WarningOutlineIcon size="xs" color="red.600" paddingRight={4} />
          <Text
            alignItems={'center'}
            fontSize={'12'}
            color="red.600"
            marginRight={2}
          >
            {error.message}
          </Text>
        </HStack>
      )}
    </>
  );
}
