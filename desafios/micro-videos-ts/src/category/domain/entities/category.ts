import { EntityValidationError } from '../../../shared/domain/errors/validation-error';
import {Entity } from '../../../shared/domain/entity/entity';
import { UniqueEntityId } from '../../../shared/domain/value-objects/unique-entity-id.vo';
import { CategoryValidatorFactory } from './validators/category.validator';

export type CategoryProperties = {
  name: string;
  is_active?: boolean;
  description?: string;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {

  constructor(props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);

    Category.validate(props);

    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  // static validate(props: Omit<CategoryProperties, 'created_at'>) {
  //   ValidatorRules.values(props.name, 'name').required().string().maxLength(255);
  //   ValidatorRules.values(props.description, 'description').string();
  //   ValidatorRules.values(props.is_active, 'is_active').boolean();
  // }

  static validate(props: CategoryProperties){
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if(!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  update(name: string, description?: string) {
    Category.validate({name, description});

    this.name = name;
    this.description = description;
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  get name() {
    return this.props.name;
  }

  private set name(name: string) {
    this.props.name = name;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }
}