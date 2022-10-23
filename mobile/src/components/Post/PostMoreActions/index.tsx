import { Feather } from '@expo/vector-icons';
import { Box, Icon, Menu, Pressable, useToast } from 'native-base';
import { FunctionComponent } from 'react';

import { PostActionMenuItem } from './PostActionMenuItem';

import { ConditionallyRender } from '@src/components/ConditionallyRender';

export type PostMoreActionsProps = {
  isOwner: boolean;
};

export const PostMoreActions: FunctionComponent<PostMoreActionsProps> = ({
  isOwner,
}) => {
  const toast = useToast();

  const handleLikeDontLike = () => {
    toast.show({
      description:
        'Obrigado. O diversagente usará isso para aprimorar sua timeline.',
      background: 'muted.400',
    });
  };

  return (
    <Box w="100%" alignItems="center">
      <Menu
        w="200"
        closeOnSelect
        defaultIsOpen={false}
        trigger={(triggerProps) => {
          return (
            <Pressable
              accessibilityLabel="More post options menu"
              {...triggerProps}
            >
              <Icon as={Feather} name="more-horizontal" size={6} />
            </Pressable>
          );
        }}
      >
        <ConditionallyRender
          condition={!isOwner}
          trueComponent={
            <PostActionMenuItem
              icon="frown"
              label="Não tenho interesse"
              onPress={handleLikeDontLike}
            />
          }
          falseComponent={<></>}
        />

        <ConditionallyRender
          condition={isOwner}
          trueComponent={
            <PostActionMenuItem
              icon="edit"
              label="Editar conteúdo"
              onPress={() => console.log('Editar')}
            />
          }
          falseComponent={<></>}
        />

        <ConditionallyRender
          condition={isOwner}
          trueComponent={
            <PostActionMenuItem
              icon="trash-2"
              label="Excluir post"
              onPress={() => console.log('Excluir')}
            />
          }
          falseComponent={<></>}
        />

        <PostActionMenuItem
          icon="flag"
          label="Denunciar"
          onPress={() => console.log('Denunciar')}
        />
      </Menu>
    </Box>
  );
};
