import { Transform } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';

export class FindAllTasksFilterDto {
  @IsInt()
  page: number = 1; // It is necessary to say explicitly that the type is number or else the enableImplicitConversion in ValidationPipe won't work

  @IsInt()
  amount: number = 10;

  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  paginate: boolean = true;

  getPaginationParams() {
    if (!this.paginate) {
      return {};
    }

    return {
      skip: (this.page - 1) * this.amount,
      take: this.amount,
    };
  }

  getResponseParams() {
    if (!this.paginate) {
      return {};
    }

    return {
      page: this.page,
      amount: this.amount,
    };
  }
}
