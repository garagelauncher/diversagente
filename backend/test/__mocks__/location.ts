import { LocationRaw } from 'src/shared/contracts/LocationRaw';

export const locationMock = {
  id: 'hjudasfhasdu-18473-mnksadfjs-1924903',
  title: 'Localização mock',
  description: 'Descrição da localização mock',
  createdAt: '2021-01-01T00:00:00.000Z',
  updatedAt: '2021-01-01T00:00:00.000Z',
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  ownerId: '01923408oaskfjoasdj=jiasfjsdi-oiashjdfk',
};

export const findNearLocationListMock = [
  {
    id: 'hjudasfhasdu-18473-mnksadfjs-1924903',
    title: 'Localização mock',
    createdAt: '2021-01-01T00:00:00.000Z',
    updatedAt: '2021-01-01T00:00:00.000Z',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    ownerId: '01923408oaskfjoasdj=jiasfjsdi-oiashjdfk',
    categoryId: 'hjudasfhasdu-18473-mnksadfjs-1924903',
    icon: 'icon',
    iconProvider: 'Feather',
  },
];

export const locationsRawMock: LocationRaw[] = [
  {
    _id: {
      $oid: 'hjudasfhasdu-18473-mnksadfjs-1924903',
    },
    categoryId: {
      $oid: 'hjudasfhasdu-18473-mnksadfjs-1924903',
    },
    createdAt: {
      $date: '2021-01-01T00:00:00.000Z',
    },
    updatedAt: {
      $date: '2021-01-01T00:00:00.000Z',
    },
    ownerId: {
      $oid: '01923408oaskfjoasdj=jiasfjsdi-oiashjdfk',
    },
    geoposition: {
      type: 'Point',
      coordinates: [0, 0],
    },
    title: 'Localização mock',
    icon: 'icon',
    iconProvider: 'Feather',
  },
];
