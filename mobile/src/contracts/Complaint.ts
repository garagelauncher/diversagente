export type ComplaintResources = 'post' | 'comment' | 'review' | 'location';

export type Complaint = {
  reason: string;

  ownerId: string;

  resource: ComplaintResources;

  resourceId: string;

  message?: string;

  data?: string;
};
