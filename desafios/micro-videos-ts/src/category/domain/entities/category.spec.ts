import { Category, CategoryProperties } from './category';
import { omit } from 'lodash';
import { UniqueEntityId } from '../../../shared/domain/value-objects/unique-entity-id.vo';

describe('Category Tests', () => {

  beforeEach(() => {
    Category.validate = jest.fn();
  });

  test('constructor of category', () => {

    let category = new Category({
      name: 'Movie',
    });

    let props = omit(category.props, 'created_at');

    expect(Category.validate).toHaveBeenCalled();

    expect(props).toStrictEqual({
      name: 'Movie',
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);



    const created_at = new Date();

    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });

    expect(category.props).toStrictEqual({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });
  });


  test('id field', () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: 'Movie' } },
      { props: { name: 'Movie' }, id: null },
      { props: { name: 'Movie' }, id: undefined },
      {
        props: { name: 'Movie' },
        id: new UniqueEntityId('2b36f570-5566-4fd9-bb78-64975b77ebca'),
      },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.uniqueEntityId).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  test('getter and setter of name props', () => {
    const category = new Category({
      name: 'Movie',
    });

    expect(category.name).toBe('Movie');

    category['name'] = 'other name';
    expect(category.name).toBe('other name');
  });

  test('getter and setter of description props', () => {
    let category = new Category({
      name: 'Movie',
      description: 'Description of category',
    });
    expect(category.description).toBe('Description of category');

    category = new Category({
      name: 'Movie',
    });
    category['description'] = 'Other description';

    expect(category.description).toBe('Other description');

    category['description'] = undefined;

    expect(category.description).toBeNull();

    category['description'] = null;

    expect(category.description).toBeNull();
  });

  test('getter and setter of is_active props', () => {
    let category = new Category({
      name: 'Movie',
    });

    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: 'Movie',
      is_active: true,
    });

    expect(category.is_active).toBeTruthy();

    category['is_active'] = false;

    expect(category.is_active).toBeFalsy();

    category = new Category({
      name: 'Movie',
      is_active: false,
    });

    expect(category.is_active).toBeFalsy();

    category['is_active'] = true;

    expect(category.is_active).toBeTruthy();
  });

  test('getter of created_at props', () => {
    let category = new Category({
      name: 'Movie',
    });

    expect(category.created_at).toBeInstanceOf(Date);

    const created_at = new Date();
    category = new Category({
      name: 'Movie',
      created_at,
    });

    expect(category.created_at).toBe(created_at);
  });
  
  test('update category', () => {
    let category = new Category({
      name: 'Initial name',
      description: 'Initial description'
    });

    category.update('new name', 'new description');

    expect(Category.validate).toHaveBeenCalledTimes(2);
    expect(category.props.name).toBe('new name');
    expect(category.props.description).toBe('new description');

    category = new Category({
      name: 'Initial name',
      description: 'Initial description'
    });

    category.update('new name', null);

    expect(Category.validate).toHaveBeenCalledTimes(4);
    expect(category.props.name).toBe('new name');
    expect(category.props.description).toBeNull();
  });

  test('activate category', () => {
    let category = new Category({
      name: 'Movie',
      is_active: true
    });

    category.activate();

    expect(category.is_active).toBeTruthy();

    category = new Category({
      name: 'Movie',
      is_active: false
    });

    category.activate();

    expect(category.is_active).toBeTruthy();
  });

  test('deactivate category', () => {
    let category = new Category({
      name: 'Movie',
      is_active: true
    });

    category.deactivate();

    expect(category.is_active).toBeFalsy();

    category = new Category({
      name: 'Movie',
      is_active: false
    });

    category.deactivate();

    expect(category.is_active).toBeFalsy();
  });
});
