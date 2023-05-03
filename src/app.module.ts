import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CarModule } from './car/car.module';
import { MongooseModule } from '@nestjs/mongoose';

const dbUser = process.env.MONGO_DB_USER;
const dbPassword = process.env.MONGO_DB_PASSWORD;
const dbHost = process.env.MONGO_DB_HOST;
const dbPort = process.env.MONGO_DB_PORT;
const dbName = process.env.MONGO_DB_NAME;

// const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@localhost:27017/${process.env.MONGO_DB_NAME}`;
let mongoUrl = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
mongoUrl = 'mongodb://root:root@localhost:27017/car_manager';
console.log(mongoUrl);

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    CarModule,
    MongooseModule.forRoot(mongoUrl),
  ],
})
export class AppModule {}
