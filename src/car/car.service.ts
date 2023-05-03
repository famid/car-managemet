import { HttpException, Injectable } from '@nestjs/common';
import { CARS } from './car.mock.data';

@Injectable()
export class CarService {
  private cars = CARS;
  public async getCars() {
    return this.cars;
  }

  public async storeCar(newCar) {
    this.cars.push(newCar);
    return this.cars;
  }

  public async getCarById(id: number): Promise<any> {
    id = Number(id);
    return new Promise((resolve, reject) => {
      const car = this.cars.find((car) => car.id === id);

      if (!car) {
        return reject(new HttpException('Not found', 404));
      }

      return resolve(car);
    });
  }

  public async deleteCarById(id: number): Promise<any> {
    id = Number(id);
    return new Promise((resolve, reject) => {
      const carIndex = this.cars.findIndex((car) => car.id === id);
      if (carIndex === -1) {
        return reject(new HttpException('Not found', 404));
      }
      this.cars.splice(carIndex, 1);

      return resolve(this.cars);
    });
  }

  public async updateCarById(
    id: number,
    propertyName: string,
    propertyValue: string,
  ): Promise<any> {
    id = Number(id);
    return new Promise((resolve, reject) => {
      const carIndex = this.cars.findIndex((car) => car.id === id);
      if (carIndex === -1) {
        return reject(new HttpException('Not found', 404));
      }
      this.cars[carIndex][propertyName] = propertyValue;

      return resolve(this.cars);
    });
  }
}
