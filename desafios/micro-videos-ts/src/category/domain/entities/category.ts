import {Entity } from '../../../shared/domain/entity/entity';
import { UniqueEntityId } from '../../../shared/domain/value-objects/unique-entity-id.vo';

export type CategoryProperties = {
  name: string;
  is_active?: boolean;
  description?: string;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {

  constructor(props: CategoryProperties, id?: UniqueEntityId) {
    super(props, id);
    this.description = this.props.description;
    this.is_active = this.props.is_active;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, description?: string) {
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

  set name(name: string) {
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