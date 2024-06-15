import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { LoginPostController } from '../../../src/infraestructure/controllers/LoginPost.controller';
import { MongoUserRepository } from '../../../src/infraestructure/persistence/MongoUserRepository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';
import { MongoClientFactory } from '../../../src/shared/infraestructure/MongoClientFactory';
import { SearchUser } from '../../../src/application/SearchUser';
import { LoginUser } from '../../../src/application/LoginUser';
import { JwtStrategy } from '../../../src/infraestructure/auth/JwsStrategy';
import { LoginUserDto } from 'src/infraestructure/dtos/LoginUser.dto';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

describe('Login Controller (e2e)', async () => {
  const moduleRef = await Test.createTestingModule({
    imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),
      PassportModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        }),
        inject: [ConfigService],
      }),
    ],
    controllers: [LoginPostController],
    providers: [
      {
        provide: 'UserRepository',
        useClass: MongoUserRepository,
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
      SearchUser,
      LoginUser,
      {
        provide: LoginUser,
        useValue: {
          login: jest.fn().mockImplementation((dto: LoginUserDto) => {
            if (dto.email === 'test@example.com' && dto.password === 'test') {
              return 'test_token';
            } else {
              throw new Error('Invalid credentials');
            }
          }),
        },
      },
      JwtStrategy,
    ],
  }).compile();

  let app: NestFastifyApplication;

  beforeAll(async () => {
    app = moduleRef.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it(`/POST auth/login`, () => {
    return app
      .inject({
        method: 'POST',
        url: '/auth/login',
      })
      .then((result) => {
        expect(result.statusCode).toEqual(200);
        expect(result.payload).toContain('access_token');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
