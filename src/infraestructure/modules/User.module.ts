import { Module } from '@nestjs/common';
import { MongoClient } from 'mongodb';

import { MongoUserRepository } from '../persistence/MongoUserRepository';
import { ApiPokemonRepository } from '../persistence/ApiPokemonRepository';
import { UserPostController } from '../controllers/UserPost.controller';
import { RegisterUser } from 'src/application/RegisterUser';
import { MongoClientFactory } from 'src/shared/infraestructure/MongoClientFactory';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/JwsStrategy';
import { LoginUser } from 'src/application/LoginUser';
import { LoginPostController } from '../controllers/LoginPost.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SearchUser } from 'src/application/SearchUser';
import { UserGetController } from '../controllers/UserGet.controller';
import { UserPatchController } from '../controllers/UserPatch.controller';
import { UpdateUser } from 'src/application/UpdateUser';
import { DeleteUser } from 'src/application/DeleteUser';
import { UserDeleteController } from '../controllers/UserDelete.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'UserRepository',
      useClass: MongoUserRepository,
    },
    {
      provide: 'PokemonRepository',
      useClass: ApiPokemonRepository,
    },
    {
      provide: 'MongoConnection',
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongoClient> => {
        const client = MongoClientFactory.createClient(
          'mooc',
          configService.get<string>('MONGO_URI'),
        );
        return client;
      },
      inject: [ConfigService],
    },
    RegisterUser,
    SearchUser,
    UpdateUser,
    DeleteUser,
    LoginUser,
    JwtStrategy,
  ],

  controllers: [
    UserPostController,
    UserGetController,
    UserPatchController,
    UserDeleteController,
    LoginPostController,
  ],
})
export class UserModule {}
