interface LoginUserType {
  email: string;
  password: string;
  rememberMe?: string;
}

interface RegisterUserType extends LoginUserType {
  fullName: string;
  accountType: string;
}

export { LoginUserType, RegisterUserType };
