import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchProps,
  SearchResult as DefaultSearchResult,
} from '../../../shared/domain/repository/repository-contracts';
import { Category } from '../entities/category';

export namespace CategoryRepository {
  export type Filter = string;
  export class SearchParams extends DefaultSearchParams<Filter> {
    constructor(props?: SearchProps) {
      super({
        ...props,
        sort: !props || !props.sort ? 'created_at' : props.sort,
        sort_dir: !props || !props.sort ? 'desc' : props.sort_dir,
      });
    }
  }
  export class SearchResult extends DefaultSearchResult<Category, Filter> {}
  export interface Repository
    extends SearchableRepositoryInterface<
      Category,
      Filter,
      SearchParams,
      SearchResult
    > {}
}
