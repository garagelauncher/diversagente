import { AntDesign, Fontisto } from '@expo/vector-icons';
import {
  Avatar,
  Button,
  FlatList,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  ScrollView,
  Text,
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useAuth } from '@src/hooks/useAuth';

type PostProps = {
  post: {
    id: string;
    username: string;
    avatar: string;
    title: string;
    description?: string;
    image?: string;
    likes: number;
    comments: number;
    createdAt: string;
  };
};

const posts = [
  {
    id: 'jkosdfalasdnklfnm',
    username: 'Samantha Shine',
    avatar:
      'https://pbs.twimg.com/profile_images/1361031517256863744/6QZQ9Z9-_400x400.jpg',
    image:
      'https://images.unsplash.com/photo-1611780788889-8f8f0d9f9c0a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    likes: 123,
    title: 'I love this photo',
    createdAt: '6 minutos atrás',
  },
  {
    id: 'lasdkfjasdlkfjsadlf',
    username: 'Samantha Shine',
    avatar:
      'https://pbs.twimg.com/profile_images/1361031517256863744/6QZQ9Z9-_400x400.jpg',
    image:
      'https://images.unsplash.com/photo-1611780788889-8f8f0d9f9c0a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    likes: 123,
    createdAt: '22 de Outubro de 2022',
    title: 'Como incentivei meu filho a ter vontade de comer saudável',
    content:
      'Não faz muito tempo que comecei a pesquisar os benefícios que uma dieta saudável poderiam gerar para o Pedrinho, meu filho mais novo e que   possui TDAH...',
  },
];
// flex as TouchableOpacity
const Post = () => (
  <TouchableOpacity>
    <Flex backgroundColor="white" borderRadius={6} paddingX={6} paddingY={5}>
      <Flex direction="row">
        <Avatar borderRadius={6} backgroundColor="green.600">
          SS
        </Avatar>
        <Flex marginLeft={5}>
          <Text fontWeight={'bold'}>Samantha Shine</Text>
          <Text color="gray.500">22 de Outubro de 2022</Text>
        </Flex>
      </Flex>
      <Flex marginTop={3}>
        <Heading>
          Como incentivei meu filho a ter vontade de comer saudável
        </Heading>
        <Text color="gray.500" marginTop={7}>
          Não faz muito tempo que comecei a pesquisar os benefícios que uma
          dieta saudável poderiam gerar para o Pedrinho, meu filho mais novo e
          que possui TDAH
          <Text color="blue.500" marginTop={7} underline>
            ...Ver mais
          </Text>
        </Text>
      </Flex>
      <HStack direction="row" space={5} marginTop={3}>
        <Flex direction="row" alignItems="center">
          <Icon as={Fontisto} name="like" size={7} />
          <Text marginLeft={2} fontSize={18}>
            123
          </Text>
        </Flex>
        <Flex direction="row" alignItems="center">
          <Icon as={Fontisto} name="commenting" size={7} />
          <Text marginLeft={2} fontSize={18}>
            50
          </Text>
        </Flex>
      </HStack>
    </Flex>
  </TouchableOpacity>
);

const categories = [
  {
    name: 'Saúde',
  },
  {
    name: 'Educação',
  },
  {
    name: 'Lazer',
  },
  {
    name: 'Cultura',
  },
];

export const Home = () => {
  const { user } = useAuth();
  return (
    <Flex flex={1}>
      <Flex
        paddingTop={12}
        paddingX={4}
        paddingBottom={9}
        backgroundColor="darkBlue.700"
        width="100%"
        direction="row"
      >
        <Flex>
          <Heading color="white">Olá, {user?.name}</Heading>
          <Text color="gray.400" marginTop={3}>
            Encontre e compartilhe experiências no fórum
          </Text>
        </Flex>
        <Avatar backgroundColor={'orange.500'}>{user?.name[0]}</Avatar>
      </Flex>
      <Flex
        backgroundColor="gray.50"
        width="100%"
        borderTopLeftRadius={8}
        borderTopRightRadius={8}
        marginTop={-4}
        paddingBottom={40}
      >
        <Flex
          marginTop={6}
          direction="row"
          width={'100%'}
          alignContent="center"
          justifyContent="center"
        >
          <Input
            mx="3"
            placeholder="Pesquise uma subcategoria"
            borderRadius={90}
            width={'65%'}
            borderColor={'warmGray.700'}
            InputRightElement={
              <Icon
                as={AntDesign}
                name="search1"
                size={4}
                marginRight={3}
                color={'warmGray.700'}
              />
            }
          />
          <Button
            size={'sm'}
            variant={'solid'}
            width={35}
            height={35}
            marginLeft={2}
            backgroundColor={'white'}
          >
            <Icon
              as={AntDesign}
              name="plussquareo"
              size={8}
              color={'warmGray.700'}
            />
          </Button>
        </Flex>

        <ScrollView
          marginTop={6}
          paddingX={4}
          width={'100%'}
          height={20}
          showsHorizontalScrollIndicator
          horizontal={true}
        >
          {categories.map((category) => (
            <Button
              colorScheme={'gray'}
              fontWeight={600}
              variant="outline"
              marginLeft={5}
              key={category.name}
            >
              {category.name}
            </Button>
          ))}
          <Button variant="outline" marginLeft={5}>
            Ver mais
          </Button>
        </ScrollView>

        <Flex width="100%" padding={6}>
          <Heading>Últimas postagens</Heading>
        </Flex>

        <FlatList
          width={'100%'}
          data={posts}
          renderItem={({ item }) => <Post />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 300 }}
          onEndReached={() => console.log('end reached')}
        />
      </Flex>
    </Flex>
  );
};
