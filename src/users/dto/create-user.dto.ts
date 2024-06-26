export class CreateUserDto {
  id: number;
  fullname: string;
  email: string;
  password: string;
  phone?: string;
  userAvatar?: string;
}
