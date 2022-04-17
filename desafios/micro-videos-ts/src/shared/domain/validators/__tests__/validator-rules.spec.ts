import { ValidationError } from '../../errors/validation-error';
import { ValidatorRules } from '../validator-rules';

type Values = {
  value: any;
  property: string;
}

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any[];
}

function runRule({value, property, rule, params = []}: Omit<ExpectedRule, 'error'>) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule];
  (method as any).apply(validator, params);
}

function assertIsInvalid(expectedRule: ExpectedRule) {
  expect(() => runRule(expectedRule)).toThrow(expectedRule.error);
}

function assertIsValid(expectedRule: ExpectedRule) {
  expect(() => runRule(expectedRule)).not.toThrow(expectedRule.error);
}

describe('ValidatorRules Unit Tests', () => {
  test('values method', () => {
    const validator = ValidatorRules.values('some value', 'field');
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator['value']).toBe('some value');
    expect(validator['property']).toBe('field');
  });

  test('required validation rule', () => {
    const error = new ValidationError('The field is required');

    //invalid cases
    let arrange: Values[]  = [
      {value: null, property: 'field'},
      {value: undefined, property: 'field'},
      {value: "", property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsInvalid({
        value: item.value, 
        property: item.property, 
        error, 
        rule: 'required'
      });
    });

    //valid cases
    arrange = [
      {value: 'test', property: 'field'},
      {value: 5, property: 'field'},
      {value: false, property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value, 
        property: item.property, 
        error, 
        rule: 'required'
      });
    });
    
  });

  test('string validation rule', () => {
    const error = new ValidationError('The field must be a string');
    //invalid cases
    let arrange: Values[]  = [
      {value: 5, property: 'field'},
      {value: {}, property: 'field'},
      {value: false, property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsInvalid({
        value: item.value, 
        property: item.property, 
        error, 
        rule: 'string'
      });
    });

    //valid cases
    arrange = [
      {value: null, property: 'field'},
      {value: undefined, property: 'field'},
      {value: 'test', property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value, 
        property: item.property, 
        error, 
        rule: 'string'
      });
    });
  });

  test('boolean validation rule', () => {
    const error = new ValidationError('The field must be a boolean');
    //invalid cases
    let arrange: Values[]  = [
      {value: 5, property: 'field'},
      {value: {}, property: 'field'},
      {value: 'false', property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsInvalid({
        value: item.value, 
        property: item.property, 
        error, 
        rule: 'boolean'
      });
    });

    //valid cases
    arrange = [
      {value: null, property: 'field'},
      {value: undefined, property: 'field'},
      {value: true, property: 'field'},
      {value: false, property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value, 
        property: item.property, 
        error, 
        rule: 'boolean'
      });
    });
  });

  test('maxLength validation rule', () => {
    const error = new ValidationError('The field must be less or equal than 5 characteres');
    //invalid cases
    let arrange: Values[]  = [
      {value: 'abcdef', property: 'field'}
    ];

    arrange.forEach(item => {
      assertIsInvalid({
        value: item.value, 
        property: item.property, 
        error, 
        rule: 'maxLength',
        params: [5]
      });
    });

    //valid cases
    arrange = [
      {value: null, property: 'field'},
      {value: undefined, property: 'field'},
      {value: 'abcde', property: 'field'},
    ];

    arrange.forEach(item => {
      assertIsValid({
        value: item.value, 
        property: item.property, 
        error, 
        rule: 'maxLength',
        params: [5]
      });
    });
  });

  it('should throw a validation error when combine two or more validation rules', () => {
    let validator = ValidatorRules.values(null, 'field');
    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(new ValidationError('The field is required'));

    validator = ValidatorRules.values(5, 'field');
    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(new ValidationError('The field must be a string'));

    validator = ValidatorRules.values('123456', 'field');
    expect(() => {
      validator.required().string().maxLength(5);
    }).toThrow(new ValidationError('The field must be less or equal than 5 characteres'));

    validator = ValidatorRules.values(null, 'field');
    expect(() => {
      validator.required().boolean();
    }).toThrow(new ValidationError('The field is required'));

    validator = ValidatorRules.values(5, 'field');
    expect(() => {
      validator.required().boolean();
    }).toThrow(new ValidationError('The field must be a boolean'));
  });

  it('should valid when combine two or more validation rules', () => {
    expect(() => {
      ValidatorRules.values('test', 'field').required().string();
      ValidatorRules.values('12345', 'field').required().string().maxLength(5);
      ValidatorRules.values(true, 'field').required().boolean();
      ValidatorRules.values(false, 'field').required().boolean();
    }).not.toThrow(new ValidationError());
  });

});