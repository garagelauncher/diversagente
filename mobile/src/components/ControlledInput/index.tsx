import { FormControl, Text } from 'native-base';
import { Control, Controller, FieldError } from 'react-hook-form';

import { FormInputProps, FormInput } from '../FormInput';

type Props = FormInputProps & {
  control: Control<any>;
  name: string;
  error?: FieldError;
};

export function ControlledInput({ control, name, error, ...rest }: Props) {
  return (
    <FormControl>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <FormInput onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && (
        <Text fontSize={'16'} color="red.500">
          {error.message}
        </Text>
      )}
    </FormControl>
  );
}
