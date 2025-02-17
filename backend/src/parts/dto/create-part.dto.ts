import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { SupplierInput } from '../../common/inputs/supplier.input';

@InputType()
export class CreatePartDto {
  @Field()
  @IsString()
  partNumber: string;

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field(() => Int)
  @IsInt()
  @Min(0)
  stock: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  leadTime?: number;

  @Field(() => SupplierInput)
  supplier: SupplierInput;
}
