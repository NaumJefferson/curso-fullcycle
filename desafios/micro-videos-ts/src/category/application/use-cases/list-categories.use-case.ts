import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from '../../../shared/application/dto/pagination-output';
import { SearchInputDto } from '../../../shared/application/dto/search-input';
import { UseCase } from '../../../shared/application/use-case';
import { CategoryRepository } from '../../domain/repository/category.repository';
import { CategoryOutput, CategoryOutputMapper } from './dto/category-output';

export class ListCategoriesUseCase
  implements UseCase<ListCategoriesUseCaseInput, ListCategoriesUseCaseOutput>
{
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(
    input: ListCategoriesUseCaseInput
  ): Promise<ListCategoriesUseCaseOutput> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepo.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(
    searchResult: CategoryRepository.SearchResult
  ): ListCategoriesUseCaseOutput {
    const items = searchResult.items.map((entity) => {
      return CategoryOutputMapper.toOuput(entity);
    });

    const pagination = PaginationOutputMapper.toOutput(searchResult);

    return {
      ...pagination,
      items,
    };
  }
}

export type ListCategoriesUseCaseInput = SearchInputDto;

export type ListCategoriesUseCaseOutput = PaginationOutputDto<CategoryOutput>;
