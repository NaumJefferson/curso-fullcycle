import { CategoryRepository } from '../../domain/repository/category.repository';
import { UseCase } from '../../../shared/application/use-case';

export class DelteCategoryUseCase
  implements UseCase<DelteCategoryUseCaseInput, DelteCategoryUseCaseOutput>
{
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(
    input: DelteCategoryUseCaseInput
  ): Promise<DelteCategoryUseCaseOutput> {
    const entity = await this.categoryRepo.findById(input.id);
    await this.categoryRepo.delete(entity.id);
  }
}

export type DelteCategoryUseCaseInput = {
  id: string;
};

export type DelteCategoryUseCaseOutput = void;
