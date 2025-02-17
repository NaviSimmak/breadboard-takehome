import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/suppliers.entity';
import { SuppliersResolver } from './suppliers.resolver';
import { SuppliersService } from './suppliers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Supplier])],
  providers: [SuppliersResolver, SuppliersService],
})
export class SuppliersModule {}
