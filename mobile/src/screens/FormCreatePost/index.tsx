import { VStack, Button, FormControl, TextArea } from 'native-base';
import { useForm, Controller } from 'react-hook-form';

import { logger } from '@src/utils/logger';

export const FormCreatePost = () => {
  logger.success('FormCreatePost');
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log('submiting with ', data);
  };

  return (
    <VStack width="80%" space={4}>
      <FormControl isRequired isInvalid={'thought' in errors}>
        <FormControl.Label>What do you think?</FormControl.Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextArea
              placeholder="TextArea"
              onChangeText={(val) => onChange(val)}
              defaultValue={value}
              autoCompleteType="off"
            />
          )}
          name="thought"
          rules={{ required: 'Field is required', minLength: 3 }}
          defaultValue="I love NativeBase."
        />
        <FormControl.ErrorMessage>
          {errors.thought?.message}
        </FormControl.ErrorMessage>
      </FormControl>
      <Button onPress={handleSubmit(onSubmit)} colorScheme="pink">
        Submit
      </Button>
    </VStack>
  );
};
