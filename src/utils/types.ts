export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateUserProfileParams = {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
};

export type CreateUserPostParams = {
  title: string;
  description: string;
};

export type CreateAuthorBooks = {
  title: string;
}


export type AuthorDetails = {
  name: string;
}

export type UpdateAuthorDetails = {
  name: string;
}


export type RoleDetailsParams = {
  name: string;
  description: string;
}