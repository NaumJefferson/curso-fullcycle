import { deepFreeze } from "../object";

describe('object Unit Tests', () => {

  it('should be null', () => {
    const obj = deepFreeze(null);

    expect(obj).toBeNull();
  })

  it('should not freeze a scalar value', () => {
    const str = deepFreeze('');
    expect(typeof str).toBe('string');

    const value1 = deepFreeze(true);
    expect(typeof value1).toBe('boolean');

    const value2 = deepFreeze(false);
    expect(typeof value2).toBe('boolean');

    const num = deepFreeze(5);
    expect(typeof num).toBe('number');
  });

  it('should be a immutable obj', () => {
      const obj = deepFreeze({
        prop1: 'value', 
        deep: {
          prop2: 'value2', 
          prop3: new Date()
        },
        other: null,
      });

      expect(() => {
        (obj as any).prop1 = 'mudou';
      }).toThrow("Cannot assign to read only property 'prop1' of object '#<Object>'");

      expect(() => {
        (obj as any).deep.prop2 = 'mudou';
      }).toThrow("Cannot assign to read only property 'prop2' of object '#<Object>'");

      expect(obj.deep.prop3).toBeInstanceOf(Date);
      

  });
});