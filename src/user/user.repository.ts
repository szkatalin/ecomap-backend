import { EntityRepository, Repository } from 'typeorm';
import { User } from './model/user.entity';
import { Role } from './model/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async getAllUsers() {
    const query = this.createQueryBuilder('user');
    return await query.getMany();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.findOne({
      where: { id: id },
    });
    if (user) {
      return user;
    }
    return await this.createUser({ id: id });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { id } = createUserDto;
    const user = new User();

    user.id = id;
    user.role = Role.USER;
    user.operationalEvents = [];
    user.recommendations = [];

    return await this.save(user);
  }

  async updateUserRole(id: string, role: Role): Promise<User> {
    const user = await this.getUserById(id);
    user.role = role;
    return await this.save(user);
  }
}
