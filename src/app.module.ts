import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { CarModule } from './car/car.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BookmarkModule,
    CarModule,
    MongooseModule.forRoot('mongodb://localhost/car_manager'),
  ],
})
export class AppModule {}
