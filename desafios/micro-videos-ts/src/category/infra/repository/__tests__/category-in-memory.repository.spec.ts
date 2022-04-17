import { Category } from '../../../domain/entities/category';
import { CategoryRepository } from '../../../domain/repository/category.repository';
import { CategoryInMemoryRepository } from '../category-in-memory.repository';

describe('CategoryInMemoryRepository Unit Tests', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  it('should be order by created_at when no sort param', async () => {
    const items = [
      new Category({
        name: 'category c',
        created_at: new Date('2022-04-17T00:00:00.000Z'),
      }),
      new Category({
        name: 'category b',
        created_at: new Date('2022-04-17T01:00:00.000Z'),
      }),
      new Category({
        name: 'category a',
        created_at: new Date('2022-04-17T02:00:00.000Z'),
      }),
    ];

    repository.items = items;

    const result = await repository.search(
      new CategoryRepository.SearchParams()
    );
    expect(result.toJSON()).toStrictEqual(
      new CategoryRepository.SearchResult({
        current_page: 1,
        per_page: 15,
        filter: null,
        sort: 'created_at',
        sort_dir: 'desc',
        total: 3,
        items: [items[2], items[1], items[0]],
      }).toJSON()
    );
  });

  it('should be order by name', async () => {
    const items = [
      new Category({
        name: 'category c',
        created_at: new Date('2022-04-17T00:00:00.000Z'),
      }),
      new Category({
        name: 'category e',
        created_at: new Date('2022-04-17T02:00:00.000Z'),
      }),
      new Category({
        name: 'category b',
        created_at: new Date('2022-04-17T01:00:00.000Z'),
      }),
      new Category({
        name: 'category d',
        created_at: new Date('2022-04-17T02:00:00.000Z'),
      }),
      new Category({
        name: 'category a',
        created_at: new Date('2022-04-17T02:00:00.000Z'),
      }),
    ];

    repository.items = items;

    const result = await repository.search(
      new CategoryRepository.SearchParams({
        sort: 'name',
      })
    );
    expect(result.toJSON()).toStrictEqual(
      new CategoryRepository.SearchResult({
        current_page: 1,
        per_page: 15,
        filter: null,
        sort: 'name',
        sort_dir: 'asc',
        total: 5,
        items: [items[4], items[2], items[0], items[3], items[1]],
      }).toJSON()
    );
  });

  it('should be filter by name', async () => {
    const items = [
      new Category({
        name: 'category c',
        created_at: new Date('2022-04-17T00:00:00.000Z'),
      }),
      new Category({
        name: 'category e',
        created_at: new Date('2022-04-17T02:00:00.000Z'),
      }),
      new Category({
        name: 'category b',
        created_at: new Date('2022-04-17T01:00:00.000Z'),
      }),
      new Category({
        name: 'category d',
        created_at: new Date('2022-04-17T02:00:00.000Z'),
      }),
      new Category({
        name: 'category a',
        created_at: new Date('2022-04-17T02:00:00.000Z'),
      }),
    ];

    repository.items = items;

    const arrange = [
      {
        filter: new CategoryRepository.SearchParams({
          page: 1,
          per_page: 3,
          filter: 'category',
        }),
        result: new CategoryRepository.SearchResult({
          current_page: 1,
          per_page: 3,
          filter: 'category',
          sort: 'created_at',
          sort_dir: 'desc',
          total: 0,
          items: [],
        }),
      },
      {
        filter: new CategoryRepository.SearchParams({
          page: 1,
          per_page: 3,
          filter: 'category b',
        }),
        result: new CategoryRepository.SearchResult({
          current_page: 1,
          per_page: 3,
          filter: 'category b',
          sort: 'created_at',
          sort_dir: 'desc',
          total: 1,
          items: [items[2]],
        }),
      },
    ];

    for (const i of arrange) {
      const result = await repository.search(i.filter);
      expect(result.toJSON()).toStrictEqual(i.result.toJSON());
    }
  });
});
