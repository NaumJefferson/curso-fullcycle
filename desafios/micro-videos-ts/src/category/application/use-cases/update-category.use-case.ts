import { CategoryOutput, CategoryOutputMapper } from './dto/category-output';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { UseCase } from '../../../shared/application/use-case';

export class UpdateCategoryUseCase
  implements UseCase<UpdateCategoryUseCaseInput, UpdateCategoryUseCaseOutput>
{
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(
    input: UpdateCategoryUseCaseInput
  ): Promise<UpdateCategoryUseCaseOutput> {
    const entity = await this.categoryRepo.findById(input.id);
    entity.update(input.name, input.description);

    if (input.is_active === true) {
      entity.activate();
    }

    if (input.is_active === false) {
      entity.deactivate();
    }

    await this.categoryRepo.update(entity);
    return CategoryOutputMapper.toOuput(entity);
  }
}

export type UpdateCategoryUseCaseInput = {
  id: string;
  name: string;
  description?: string;
  is_active?: boolean;
};

export type UpdateCategoryUseCaseOutput = CategoryOutput;
