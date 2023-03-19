import {
  HttpException,
  Inject,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CryptoUtil } from 'src/utils/crypto.util';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';

@Injectable()
export class UserService implements OnModuleInit {
  async onModuleInit() {
    if (await this.findOneByAccount('admin')) {
      return;
    }
    // 初始化系统管理员
    const admin = this.usersRepository.create({
      username: 'admin',
      password: this.cryptoUtil.encryptPassword('123456'),
      role: 'admin',
      email: 'test@email.com',
    });
    await this.usersRepository.save(admin);
  }
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
  ) {}

  async login(username: string, password: string): Promise<User> {
    const user = await this.findOneByAccount(username);
    return user;
  }

  async signupLocal(user: User): Promise<User> {
    return await this.save(user);
  }

  async save(user: User): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async findOneByAccount(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
