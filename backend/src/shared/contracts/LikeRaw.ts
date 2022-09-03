interface ID {
    $oid: string;
  }

interface ownerID {
    $oid: string;
  }

  interface postID {
    $oid: string;
  }

  interface LikeRawDate {
    $date: string;
  }
  
  export interface LikeRaw {
    _id: ID;
    ownerId: ownerID;
    postID : postID;
    createdAt: LikeRawDate;
    deletedAt: LikeRawDate;
  }
  