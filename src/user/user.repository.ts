import { EntityRepository, Repository } from 'typeorm';
import { User } from './model/user.entity';
import { Role } from './model/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async getAllUsers() {
    const query = this.createQueryBuilder('user');
    return query.getMany();
  }

  public async getUserById(id: string): Promise<User> {
    const user = await this.findOne({
      where: { id },
    });
    if (user) {
      return user;
    }
    return this.createUser({ id });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id } = createUserDto;
    const user = new User();

    user.id = id;
    user.role = Role.USER;
    user.operationalEvents = [];
    user.recommendations = [];

    return this.save(user);
  }

  public async updateUserRole(id: string, role: Role): Promise<User> {
    const user = await this.getUserById(id);
    user.role = role;
    return this.save(user);
  }
}
