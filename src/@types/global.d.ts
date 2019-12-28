declare module '@toast-ui/vue-editor' {
  const Editor: any;
  const Viewer: any;
}

declare module '@/assets/data/profile';

declare type myPost = {
  BoardID: number,
  Body: string,
  CreatedAt: string,
  DeletedAt: string,
  Description: string,
  ID: number,
  PostTags: string[],
  Title: string,
  UpdatedAt: string,
  Hits: number,
};

declare type myBoard = {
  CreatedAt: string,
  ID: number,
  Name: string,
  Order: number,
  ReadPermission: string,
  UpdatedAt: string,
  URL: string,
};
