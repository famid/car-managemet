import { HttpException, Injectable } from '@nestjs/common';
import { CARS } from './car.mock.data';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICar } from './interfaces/car.interface';
import { CarDto } from './car.dto';

const carProjection = {
  __v: false,
  _id: false,
};
@Injectable()
export class CarService {
  private cars = CARS;

  constructor(@InjectModel('Car') private readonly carModel: Model<ICar>) {}

  public async getCars(): Promise<CarDto[]> {
    const cars = await this.carModel.find({}, carProjection).exec();
    if (!cars || !cars[0]) {
      throw new HttpException('Not Found', 404);
    }
    return cars;
  }

  public async storeCar(newCar: CarDto): Promise<CarDto> {
    const car = new this.carModel(newCar);
    return car.save();
  }

  public async getCarById(id: number): Promise<any> {
    const car = await this.carModel.findOne({ id, carProjection }).exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }

  public async deleteCarById(id: number): Promise<any> {
    const car = await this.carModel.deleteOne({ id }).exec();
    if (car.deletedCount === 0) {
      throw new HttpException('Not Found', 404);
    }
    return {
      response: 'success',
      message: 'Car is deleted successfully',
      statusCode: 200,
    };
  }

  public async updateCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<any> {
    const car = await this.carModel
      .findOneAndUpdate(
        { id },
        {
          [propertyName]: propertyValue,
        },
      )
      .exec();
    if (!car) {
      throw new HttpException('Not Found', 404);
    }
    return car;
  }
}
