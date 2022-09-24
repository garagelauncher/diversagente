interface ID {
    $oid: string;
  }
  
  interface ownerId {
    $oid: string;
  }

  interface postId {
    $oid: string;
  }

  interface CommentRawDate {
    $date: string;
  }

  interface commentText{
    type: string;
  }
  
  export interface CommentRaw {
    _id: ID;
    createdAt: CommentRawDate;
    updatedAt: CommentRawDate;
    ownerId: ownerId;
    postId: postId;
    comment: commentText;
  }