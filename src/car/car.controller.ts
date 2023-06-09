import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CarDto } from './car.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getCars() {
    return await this.carService.getCars();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  public async storeCar(@Body() car: CarDto) {
    return await this.carService.storeCar(car);
  }

  @Get(':id')
  public async getCarById(@Param('id') id: number) {
    return await this.carService.getCarById(id);
  }

  @Delete(':id')
  public async deleteCarById(@Param('id') id: number) {
    return await this.carService.deleteCarById(id);
  }

  @Put(':id')
  public async updateCarById(@Param('id') id: number, @Query() query) {
    const propertyName = query.property_name;
    const propertyValue = query.property_value;

    return await this.carService.updateCarById(id, propertyName, propertyValue);
  }
}
