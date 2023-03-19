import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Public } from 'src/decorators/public.decorator';
import * as Joi from 'joi';
import { JoiValidationPipe } from 'src/pipes/joiValidation.pipe';

const signupCatSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  role: Joi.string().required(),
  status: Joi.number(),
});

const loginCatSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @UsePipes(new JoiValidationPipe(loginCatSchema))
  @UseGuards(LocalAuthGuard)
  async login(
    @Body() body: User,
  ): Promise<{
    data: User;
    accessToken: { expiresIn: number; accessToken: string };
  }> {
    const data = await this.userService.login(body.username, body.password);
    const accessToken = await this.authService.createToken({
      account: body.username,
    });
    return { data, accessToken };
  }

  @Get('/auth')
  @Roles(Role.Admin, Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  async getUser(@Req() req): Promise<string> {
    return req.user;
  }

  @Public()
  @UsePipes(new JoiValidationPipe(signupCatSchema))
  @Post('signup')
  async signupLocal(
    @Body() body: User,
  ): Promise<{
    data: User;
    accessToken: { expiresIn: number; accessToken: string };
  }> {
    const data = await this.userService.signupLocal(body);
    const accessToken = await this.authService.createToken({
      account: body.username,
    });
    return { data, accessToken };
  }
}
