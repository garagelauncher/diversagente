import { FunctionComponent } from 'react';
import {
    Button,
    useToast,
    Input,
    Flex
  } from 'native-base';
  import { useMutation } from 'react-query';
  import { diversaGenteServices } from '@src/services/diversaGente';
  import { queryClient } from '@src/services/queryClient';
  import { PostForm } from '@src/contracts/Post';
  import * as yup from 'yup';

export type PostEditProps = {
    postId: string;
    isEditModeActive: boolean;
    onDeactiveEditMode: () => void;
    previousTitle: string;
    previousContent: string;
};

const schemaUpdatePost = yup.object({
    title: yup
      .string()
      .min(6, 'O título deve conter no mínimo 6 caracteres.')
      .max(200, 'O título deve conter no máximo 200 caracteres.')
      .required('Título é obrigatório.'),
    content: yup
      .string()
      .min(50, 'O conteúdo deve conter no mínimo 50 caracteres')
      .max(1800, 'O conteúdo deve conter no máximo 1800 caracteres')
      .required('Conteúdo é obrigatório.'),
  });
  

export const PostEdit: FunctionComponent<PostEditProps> = ({
    postId,
    isEditModeActive,
    onDeactiveEditMode,
    previousTitle,
    previousContent

}) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<PostForm>({
        resolver: yupResolver(schemaUpdatePost),
        defaultValues: {
            title: previousTitle,
            content: previousContent
        }
      });

    const toast = useToast();
    const updatePostMutation = useMutation(diversaGenteServices.updatePostById, {
        onSuccess: () => {
          queryClient.invalidateQueries(['diversagente@post', postId]);
    
          toast.show({
            description: 'Post atualizado com sucesso!',
            bg: 'green.500',
          });
          onDeactiveEditMode();
        },
        onError: () => {
          toast.show({
            description: 'Não foi possível atualizar o post!',
            background: 'red.500',
          });
          onDeactiveEditMode();
        },
      });


    const handleUpdatePost = () => {
        handleSubmit(updatePostMutation.mutate);
    }

    return (
        <Flex>
      <Controller
        control={control}
        rules={{
         maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <Input  variant="underlined" placeholder="title"             style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value} />

        )}
        name="title"
      />
            <Controller
        control={control}
        rules={{
         maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
            <Input  variant="underlined" placeholder="content"             style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value} />

        )}
        name="content"
      />
             <Flex>
                <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                    Cancelar
                </Button>
                <Button onPress={handleUpdatePost} colorScheme="red">
                    Atualizar
                </Button>
             </Flex>
        </Flex>
    );
}