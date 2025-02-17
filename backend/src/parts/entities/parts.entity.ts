import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier } from '../../suppliers/entities/suppliers.entity';

@ObjectType()
@Entity()
export class Part {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  partNumber: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => Int)
  @Column()
  stock: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  leadTime?: number;

  @Field(() => Supplier)
  @ManyToOne(() => Supplier, (supplier) => supplier.name)
  supplier: Supplier;
}
