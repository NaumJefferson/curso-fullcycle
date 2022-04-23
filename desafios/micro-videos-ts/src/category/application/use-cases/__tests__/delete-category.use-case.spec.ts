import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Category } from '../../../domain/entities/category';
import { CategoryInMemoryRepository } from '../../../infra/repository/category-in-memory.repository';
import { DelteCategoryUseCase } from '../delete-category.use-case';

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DelteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeAll(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DelteCategoryUseCase(repository);
  });

  it('should throws error when entity not found', async () => {
    expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found usind ID fake id`)
    );
  });

  it('should delete a category', async () => {
    const items = [new Category({ name: 'Movie' })];

    repository.items = items;

    await useCase.execute({ id: items[0].id });

    expect(items).toHaveLength(0);
  });
});
