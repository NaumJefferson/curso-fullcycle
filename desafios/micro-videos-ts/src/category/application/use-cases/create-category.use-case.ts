import { Category } from '../../domain/entities/category';
import { CategoryOutput, CategoryOutputMapper } from './dto/category-output';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { UseCase } from '../../../shared/application/use-case';

export class CreateCategoryUseCase
  implements UseCase<CreateCategoryUseCaseInput, CreateCategoryUseCaseOutput>
{
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(
    input: CreateCategoryUseCaseInput
  ): Promise<CreateCategoryUseCaseOutput> {
    const entity = new Category(input);
    await this.categoryRepo.insert(entity);
    return CategoryOutputMapper.toOuput(entity);
  }
}

export type CreateCategoryUseCaseInput = {
  name: string;
  description?: string;
  is_active?: boolean;
};

export type CreateCategoryUseCaseOutput = CategoryOutput;
