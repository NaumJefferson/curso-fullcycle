import { UseCase } from '../../../shared/application/use-case';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from './dto/category-output';

export class GetCategoryUseCase
  implements UseCase<GetCategoryUseCaseInput, GetCategoryUseCaseOutput>
{
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(
    input: GetCategoryUseCaseInput
  ): Promise<GetCategoryUseCaseOutput> {
    const entity = await this.categoryRepo.findById(input.id);
    return CategoryOutputMapper.toOuput(entity);
  }
}

export type GetCategoryUseCaseInput = {
  id: string;
};

export type GetCategoryUseCaseOutput = CategoryOutput;
