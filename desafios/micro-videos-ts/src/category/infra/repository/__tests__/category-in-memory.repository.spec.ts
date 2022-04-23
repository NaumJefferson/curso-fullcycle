import { Category } from '../../../../category/domain/entities/category';
import { CategoryRepository } from '../../../../category/domain/repository/category.repository';
import { CategoryInMemoryRepository } from '../../../../category/infra/repository/category-in-memory.repository';

describe('CategoryInMemoryRepository Unit Tests', () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  it('should no filter items when filter object is null', async () => {
    const items = [
      new Category({
        name: 'test',
      }),
    ];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    repository.items = items;

    const itemsFiltered = await repository['applyFilter'](items, null);

    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it('should filter items using filter parameter', async () => {
    const items = [
      new Category({
        name: 'test',
      }),
      new Category({
        name: 'TEST',
      }),
      new Category({
        name: 'fake',
      }),
    ];
    const filterSpy = jest.spyOn(items, 'filter' as any);

    const itemsFiltered = await repository['applyFilter'](items, 'TEST');

    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it('should sort by created_at when sort param is null', async () => {
    const created_at = new Date();
    const items = [
      new Category({ name: 'test', created_at }),
      new Category({
        name: 'TEST',
        created_at: new Date(created_at.getTime() + 100),
      }),
      new Category({
        name: 'fake',
        created_at: new Date(created_at.getTime() + 200),
      }),
    ];

    let itemsSorted = await repository['applySort'](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('should sort by created_at when sort param is null', async () => {
    const items = [
      new Category({
        name: 'c',
      }),
      new Category({
        name: 'b',
      }),
      new Category({
        name: 'a',
      }),
    ];

    let itemsSorted = await repository['applySort'](items, 'name', 'asc');
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = await repository['applySort'](items, 'name', 'desc');
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });

  // DESAFIO

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
      new CategoryRepository.SearchParams({})
    );
    expect(result.toJSON()).toStrictEqual(
      new CategoryRepository.SearchResult({
        current_page: 1,
        per_page: 15,
        filter: null,
        sort: null,
        sort_dir: null,
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
        name: 'Category c',
        created_at: new Date('2022-04-17T00:00:00.000Z'),
      }),
      new Category({
        name: 'category e',
        created_at: new Date('2022-04-17T02:00:00.000Z'),
      }),
      new Category({
        name: 'CATEGORY b',
        created_at: new Date('2022-04-17T01:00:00.000Z'),
      }),
      new Category({
        name: 'other',
        created_at: new Date('2022-04-17T05:00:00.000Z'),
      }),
      new Category({
        name: 'category d',
        created_at: new Date('2022-04-17T04:00:00.000Z'),
      }),
    ];

    repository.items = items;

    const arrange = [
      {
        params: new CategoryRepository.SearchParams({
          page: 1,
          per_page: 3,
          filter: 'search',
          sort: null,
          sort_dir: null,
        }),
        result: new CategoryRepository.SearchResult({
          current_page: 1,
          per_page: 3,
          filter: 'search',
          sort: null,
          sort_dir: null,
          total: 0,
          items: [],
        }),
      },
      {
        params: new CategoryRepository.SearchParams({
          page: 1,
          per_page: 3,
          filter: 'category',
          sort: null,
          sort_dir: null,
        }),
        result: new CategoryRepository.SearchResult({
          current_page: 1,
          per_page: 3,
          filter: 'category',
          sort: null,
          sort_dir: null,
          total: 4,
          items: [items[4], items[1], items[2]],
        }),
      },
    ];

    for (const i of arrange) {
      const result = await repository.search(i.params);
      expect(result.toJSON()).toStrictEqual(i.result.toJSON());
    }
  });
});
