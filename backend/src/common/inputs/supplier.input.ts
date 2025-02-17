import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SupplierInput {
  @Field()
  id: number;

  @Field()
  name: string; //
}
