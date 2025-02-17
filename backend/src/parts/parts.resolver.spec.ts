import { Test, TestingModule } from '@nestjs/testing';
import { PartsResolver } from './parts.resolver';

describe('PartsResolver', () => {
  let resolver: PartsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartsResolver],
    }).compile();

    resolver = module.get<PartsResolver>(PartsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
