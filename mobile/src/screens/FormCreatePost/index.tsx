import { logger } from '@src/utils/logger';
import {
  VStack,
  Button,
  FormControl,
  TextArea,
} from 'native-base';
import { useForm, Controller } from 'react-hook-form';

export const FormCreatePost = () => {
  logger.success('FormCreatePost');
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data: any) => {
    console.log('submiting with ', data);
  };
    return (
      <VStack width="80%" space={4}>
        <FormControl isRequired isInvalid={'thought' in errors}>
          <FormControl.Label>What do you think?</FormControl.Label>
          <Controller
            control={control}
            render={({ onChange, value }) => (
              <TextArea
                placeholder="TextArea"
                onChangeText={(val) => onChange(val)}
                defaultValue={value}
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
  );
};
