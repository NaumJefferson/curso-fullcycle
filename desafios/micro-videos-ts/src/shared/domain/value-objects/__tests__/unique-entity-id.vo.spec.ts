import { validate as uuidValidate } from 'uuid';

import { InvalidUuidError } from '../../errors/invalid-uuid.error';
import { UniqueEntityId } from '../unique-entity-id.vo';

// function spyValidateMethod() {
//   return jest.spyOn(UniqueEntityId.prototype as any, 'validate');
// }

describe('UniqueEntityId Unit Tests', () => {
  // Descomentar essa linha caso as configuracoes do jest clearMocks seja false
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

  // Descomentar essa linha caso as configuracoes do jest clearMocks seja false
  // beforeEach(() => validateSpy.mockClear());

  it('should throw error when uuid is invalid', () => {
    // const validateSpy = spyValidateMethod();
    expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    // const validateSpy = spyValidateMethod();
    const uuid = '2b36f570-5566-4fd9-bb78-64975b77ebca';
    const vo = new UniqueEntityId(uuid);
    expect(vo.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it('should accept a uuid passed in constructor', () => {
    // const validateSpy = spyValidateMethod();
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
