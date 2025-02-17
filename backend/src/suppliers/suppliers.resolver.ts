import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { Supplier } from './entities/suppliers.entity';
import { SuppliersService } from './suppliers.service';

@Resolver(() => Supplier)
export class SuppliersResolver {
  constructor(private readonly suppliersService: SuppliersService) {}

  // Query to get all suppliers
  @Query(() => [Supplier], { name: 'getAllSuppliers' })
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  // Query to get a single supplier by ID
  @Query(() => Supplier, { name: 'getSupplier' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Supplier> {
    return this.suppliersService.findOne(id);
  }

  // Mutation to create a new supplier
  @Mutation(() => Supplier, { name: 'createSupplier' })
  create(
    @Args('input') createSupplierDto: CreateSupplierDto,
  ): Promise<Supplier> {
    return this.suppliersService.create(createSupplierDto);
  }
}
