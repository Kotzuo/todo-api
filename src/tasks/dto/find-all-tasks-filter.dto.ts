import { IsInt } from 'class-validator';

export class FindAllTasksFilterDto {
  @IsInt()
  page: number = 1; // It is necessary to say explicitly that the type is number or else the enableImplicitConversion in ValidationPipe won't work

  @IsInt()
  amount: number = 10;

  getPaginationParams() {
    return {
      skip: (this.page - 1) * this.amount,
      take: this.amount,
    };
  }
}
