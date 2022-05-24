import { FontAwesome } from '@expo/vector-icons';
import { Button } from 'native-base';
import React, { useState } from 'react';

type Props = {
  id: string | undefined;
};

export function FavoriteButtton({ id }: Props) {
  const [favorite, setFavorite] = useState<string>('');

  const toggleFavButton = (id: string) => {
    setFavorite(id);
  };

  return (
    <Button
      w={12}
      h={12}
      bg={'transparent'}
      _hover={{
        bg: { color: 'warning.200' },
      }}
      onClick={() => {
        toggleFavButton(id!);
      }}
    >
      <FontAwesome
        name="star-o"
        size={26}
        color={favorite.length > 0 ? 'amber.300' : 'black'}
        bg={favorite.length > 0 ? 'amber.300' : 'transparent'}
      />
    </Button>
  );
}
