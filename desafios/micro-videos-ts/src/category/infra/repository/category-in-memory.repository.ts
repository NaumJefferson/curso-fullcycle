import { InMemorySearchableRepository } from '../../../shared/domain/repository/in-memory.repository';
import { Category } from '../../domain/entities/category';
import { CategoryRepository } from '../../domain/repository/category.repository';

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ['name', 'created_at'];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase() === filter.toLowerCase();
    });
  }
}
