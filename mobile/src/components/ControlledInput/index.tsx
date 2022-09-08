import { FormControl } from 'native-base';
import { Control, Controller, FieldError } from 'react-hook-form';

import { FormInput, FormInputProps } from '../FormInput';

type Props = FormInputProps & {
  control: Control<any>;
  name: string;
  error?: FieldError;
};

export function ControlledInput({ control, name, error, ...rest }: Props) {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <FormInput onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && (
        <FormControl.ErrorMessage>{error.message}</FormControl.ErrorMessage>
      )}
    </>
  );
}
