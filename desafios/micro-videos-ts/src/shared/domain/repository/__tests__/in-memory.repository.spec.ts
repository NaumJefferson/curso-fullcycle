import { Entity } from '../../entity/entity';
import { NotFoundError } from '../../errors/not-found.error';
import { UniqueEntityId } from '../../value-objects/unique-entity-id.vo';
import { InMemoryRepository } from '../in-memory.repository';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it('should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repository.insert(entity);

    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should throws error when entity not found', () => {
    expect(repository.findById('fake id')).rejects.toThrow(
      new NotFoundError(`Entity Not Found usind ID fake id`)
    );

    expect(
      repository.findById(
        new UniqueEntityId('2b36f570-5566-4fd9-bb78-64975b77ebca')
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found usind ID 2b36f570-5566-4fd9-bb78-64975b77ebca`
      )
    );
  });

  it('should finds a entity by id', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entityFound.toJSON()).toStrictEqual(entity.toJSON());
  });

  it('should return all entities', async () => {
    const entities = [
      new StubEntity({ name: 'name value', price: 5 }),
      new StubEntity({ name: 'other value', price: 15 }),
    ];

    for (const element of entities) {
      const entity = element;
      await repository.insert(entity);
    }

    const foundEntities = await repository.findAll();

    expect(foundEntities).toStrictEqual(entities);
  });

  it('should throws error on update when entity not found', () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity Not Found usind ID ${entity.id}`)
    );
  });

  it('should updates an entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repository.insert(entity);

    const entityUpdated = new StubEntity(
      { name: 'updated', price: 10 },
      entity.uniqueEntityId
    );

    await repository.update(entityUpdated);

    expect(entityUpdated.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it('should throws error on delete when entity not found', () => {
    expect(repository.delete('fake id')).rejects.toThrow(
      new NotFoundError(`Entity Not Found usind ID fake id`)
    );

    expect(
      repository.delete(
        new UniqueEntityId('2b36f570-5566-4fd9-bb78-64975b77ebca')
      )
    ).rejects.toThrow(
      new NotFoundError(
        `Entity Not Found usind ID 2b36f570-5566-4fd9-bb78-64975b77ebca`
      )
    );
  });

  it('should deletes an entity', async () => {
    const entity = new StubEntity({ name: 'name value', price: 5 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);

    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
