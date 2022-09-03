interface ID {
    $oid: string;
  }

interface ownerId {
    $oid: string;
  }

  interface postId {
    $oid: string;
  }

  interface LikeRawDate {
    $date: string;
  }

  export interface LikeRaw {
    _id: ID;
    ownerId: ownerId;
    postId : postId;
    createdAt: LikeRawDate;
    deletedAt: LikeRawDate;
  }
