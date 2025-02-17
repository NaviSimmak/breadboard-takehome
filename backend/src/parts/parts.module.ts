import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierFetcher } from 'src/common/utils/supplier-fetcher';
import { Supplier } from '../suppliers/entities/suppliers.entity';
import { Part } from './entities/parts.entity';
import { PartsResolver } from './parts.resolver';
import { PartsService } from './parts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Part, Supplier])],
  providers: [PartsResolver, PartsService, SupplierFetcher],
})
export class PartsModule {}
