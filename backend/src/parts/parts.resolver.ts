import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePartDto } from './dto/create-part.dto';
import { Part } from './entities/parts.entity';
import { PartsService } from './parts.service';

@Resolver(() => Part)
export class PartsResolver {
  constructor(private readonly partsService: PartsService) {}

  // 🔍 Query to get all parts
  @Query(() => [Part], { name: 'getAllParts' })
  findAll(): Promise<Part[]> {
    return this.partsService.findAll();
  }

  // 🔍 Query to get a single part by ID
  @Query(() => Part, { name: 'getPart' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Part> {
    return this.partsService.findOne(id);
  }

  // ✨ Mutation to create a new part
  @Mutation(() => Part, { name: 'createPart' })
  create(@Args('input') createPartDto: CreatePartDto): Promise<Part> {
    return this.partsService.create(createPartDto);
  }
}
