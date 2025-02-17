import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierFetcher } from '../common/utils/supplier-fetcher';
import { Supplier } from '../suppliers/entities/suppliers.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { Part } from './entities/parts.entity';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private partsRepository: Repository<Part>,

    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,

    private supplierFetcher: SupplierFetcher, // ✅ Inject SupplierFetcher via Dependency Injection
  ) {}

  // ✅ Fetch all parts from the database & APIs
  async findAll(): Promise<Part[]> {
    const dbParts = await this.partsRepository.find({
      relations: ['supplier'],
    });

    const externalData = await this.supplierFetcher.fetchData();

    // Transform API data properly by ensuring suppliers are dynamically fetched/created
    const transformedParts = await this.transformExternalData(externalData);

    return [...dbParts, ...transformedParts];
  }

  // ✅ Fetch a part by ID (including supplier data)
  async findOne(id: number): Promise<Part> {
    const part = await this.partsRepository.findOne({
      where: { id },
      relations: ['supplier'],
    });
    if (!part) {
      throw new NotFoundException(`Part with ID ${id} not found`);
    }
    return part;
  }

  // ✅ Create a new part while ensuring the supplier exists
  async create(createPartDto: CreatePartDto): Promise<Part> {
    const { supplier, ...partData } = createPartDto;

    // ✅ Fix: Ensure `supplier.name` exists
    if (!supplier || !supplier.name) {
      throw new NotFoundException(`Supplier name is required`);
    }

    const existingSupplier = await this.findOrCreateSupplier(supplier.name);

    const part = this.partsRepository.create({
      ...partData,
      supplier: existingSupplier,
    });
    return this.partsRepository.save(part);
  }

  // 🔍 Helper function: Fetch or Create a Supplier
  private async findOrCreateSupplier(supplierName: string): Promise<Supplier> {
    let supplier = await this.suppliersRepository.findOne({
      where: { name: supplierName },
    });

    if (!supplier) {
      supplier = this.suppliersRepository.create({ name: supplierName });
      await this.suppliersRepository.save(supplier);
    }

    return supplier;
  }

  // 🔍 Helper function: Transform external API data into Part entity format
  private async transformExternalData(data: any): Promise<Part[]> {
    const parts: Part[] = [];

    if (data.arrow) {
      for (const item of data.arrow) {
        const supplier = await this.findOrCreateSupplier('Arrow Electronics'); // ✅ Fetch or create the supplier dynamically

        parts.push(
          this.partsRepository.create({
            partNumber: item.part_number,
            name: item.manufacturer,
            description: item.description || 'No description',
            stock: item.quantity_available || 0,
            leadTime: item.lead_time || 0,
            supplier, // ✅ Use real supplier entity, not hardcoded ID
          }),
        );
      }
    }

    if (data.tti) {
      for (const item of data.tti) {
        const supplier = await this.findOrCreateSupplier('TTI'); // ✅ Fetch or create the supplier dynamically

        parts.push(
          this.partsRepository.create({
            partNumber: item.part_number,
            name: item.manufacturer,
            description: item.description || 'No description',
            stock: item.stock || 0,
            leadTime: item.lead_time || 0,
            supplier, // ✅ Use real supplier entity, not hardcoded ID
          }),
        );
      }
    }

    return parts;
  }
}
