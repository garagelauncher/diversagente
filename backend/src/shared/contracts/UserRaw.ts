interface ID {
  $oid: string;
}

interface email {
  type: string;
}

interface username {
  type: string;
}

interface name {
  type: string;
}

interface biograph {
  type: string;
}

interface picture {
  type: string;
}

interface preferences {
  type: string;
}

interface UserRawDate {
  $date: string;
}


export interface UserRaw {
  _id: ID;
  email: email;
  username: username;
  name: name;
  picture?: picture;
  preferences?: preferences;
  biograph?: biograph;
  createdAt: UserRawDate;
  updatedAt: UserRawDate;
}
