export interface Post{
    _id: string;
    text: string;
    userId: string;
    userHandle: string;
    postDate: string;
    avatarUrl: string;
    stars: number;
    starredByMe: boolean;
}

export interface Star{
    stars: number;
  starredByMe: boolean;
}
