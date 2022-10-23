import { Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  ScrollView,
  Text,
  useToast,
  VStack,
} from 'native-base';
import { useState } from 'react';
import { useMutation } from 'react-query';

import DiversagenteLogo from '@src/assets/splash.png';
import { ModalConfirmAction } from '@src/components/ModalConfirmAction';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';

export type SelectComplaintScreenNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'SelectComplaint'
>;

export const SelectComplaint = () => {
  const { user } = useAuth();

  const toast = useToast();
  const navigation = useNavigation<SelectComplaintScreenNavigationProps>();
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'SelectComplaint'>>();
  const { resourceId, resource } = route.params;
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState('');

  const mutationCreateComplaint = useMutation(
    diversaGenteServices.createComplaint,
    {
      onSuccess: () => {
        toast.show({
          title: 'Denúncia enviada com sucesso!',
          bg: 'green.500',
        });
        navigation.goBack();
      },
      onError: () => {
        toast.show({
          title: 'Erro ao enviar denúncia',
          bg: 'red.500',
        });
        navigation.goBack();
      },
    },
  );

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleSelectComplaint = (complaint: string) => {
    setSelectedComplaint(complaint);
    handleOpenConfirmationModal();
  };

  const handleCreateComplaint = async (reason: string) => {
    if (user?.id) {
      await mutationCreateComplaint.mutateAsync({
        resourceId,
        resource,
        ownerId: user?.id,
        reason,
      });
    }
  };

  const complaintMapReasonByTitle = new Map([
    ['spam', 'Spam'],
    ['contentNotRelated', 'Conteúdo não relacionado'],
    ['offensiveContent', 'Conteúdo ofensivo'],
    ['politicalPropaganda', 'Propaganda política'],
    ['sexualContent', 'Conteúdo sexual para adultos'],
    ['illegalContent', 'Produtos ou serviços ilegais'],
    ['otherThings', 'Outras coisas'],
  ]);

  const complaints = [...complaintMapReasonByTitle.keys()];

  return (
    <ScrollView
      flex={1}
      backgroundColor="gray.100"
      contentContainerStyle={{ paddingBottom: 100, paddingTop: 50 }}
    >
      <IconButton
        colorScheme="gray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={10}
        left={4}
        zIndex={1}
      />
      <Flex width="100%" justify="center" alignItems="center">
        <Image
          source={DiversagenteLogo}
          alt="Diversagente"
          width={150}
          height={150}
        />
      </Flex>
      <Flex paddingX={4}>
        <Heading>Olá</Heading>
        <Text>
          Precisamos que você responda a algumas perguntas para entendermos
          melhor o que está acontecendo no perfil e nas publicações dessa conta.
        </Text>
      </Flex>
      <Text paddingX={4} fontSize={18} color="muted.500" marginTop={2}>
        Ajude-nos a entender o problema. O que há de errado com esta publicação?
      </Text>
      <VStack space={2} paddingX={4} marginTop={5}>
        {complaints.map((complaint) => (
          <Button
            key={complaint}
            colorScheme="muted"
            onPress={() => handleSelectComplaint(complaint)}
          >
            {complaintMapReasonByTitle.get(complaint)}
          </Button>
        ))}
      </VStack>
      <ModalConfirmAction
        isOpen={isConfirmationModalOpen}
        onClose={handleCloseConfirmationModal}
        onConfirm={() => handleCreateComplaint(selectedComplaint)}
        title="Denunciar"
        description={`Você tem certeza que deseja denunciar esta publicação por ${complaintMapReasonByTitle.get(
          selectedComplaint,
        )}?`}
        confirmText="Sim, denunciar"
        confirmColor="red"
      />
    </ScrollView>
  );
};
