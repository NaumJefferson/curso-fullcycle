import { Category } from "./category";

describe('Category Integration Tests', () => {

  describe('create method', () => {
    it('should a invalid category using name property', () => {
      expect(
        () => new Category({name: null})
      ).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });
      
      expect(
        () => new Category({name: ""})
      ).containsErrorMessages({
        name: [
          'name should not be empty'
        ]
      });
  
      expect(
        () => new Category({name: 5 as any})
      ).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });
  
      expect(
        () => new Category({name: "t".repeat(256)})
      ).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      });
    });
  
    it('should a invalid category using description property', () => {
      expect(
        () => new Category({name: 'Movie', description: 5 as any})
      ).containsErrorMessages({
        description: [
          'description must be a string',
        ]
      });
    });
  
    it('should a invalid category using is_active property', () => {
      expect(
        () => new Category({name: 'Movie', is_active: 5 as any})
      ).containsErrorMessages({
        is_active: [
          'is_active must be a boolean value',
        ]
      });
    });

    it('should a valid category', () => {
      expect( 
        () => new Category({
          name: 'Movie',
        })
      ).not.toThrow();

      expect( 
        () => new Category({
          name: 'Movie',
          description: 'some description'
        })
      ).not.toThrow();

      expect( 
        () => new Category({
          name: 'Movie',
          description: null
        })
      ).not.toThrow();

      expect( 
        () => new Category({
          name: 'Movie',
          description: 'some description',
          is_active: false,
        })
      ).not.toThrow();

      expect( 
        () => new Category({
          name: 'Movie',
          description: 'some description',
          is_active: true,
        })
      ).not.toThrow();

    });

  });

  describe('update method', () => {
    it('should a invalid category using name property', () => {
      const category = new Category({name: 'Movie'});

      expect(
        () => category.update(null) 
      ).containsErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });

      expect(
        () => category.update("")
      ).containsErrorMessages({
        name: [
          'name should not be empty'
        ]
      });
  
      expect(
        () => category.update(5 as any)
      ).containsErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      });
  
      expect(
        () => category.update("t".repeat(256))
      ).containsErrorMessages({
        name: [
          'name must be shorter than or equal to 255 characters'
        ]
      });
    });
  
    it('should a invalid category using description property', () => {
      const category = new Category({name: 'Movie'});
      expect(
        () => category.update('Movie', 5 as any)
      ).containsErrorMessages({
        description: [
          'description must be a string',
        ]
      });
    });

    it('should a valid category', () => {
      const category = new Category({name: 'Movie'});

      expect( 
        () => category.update('name changed')
      ).not.toThrow();

      expect( 
        () => category.update('name changed', 'descripton changed')
      ).not.toThrow();

      expect( 
        () => category.update('name changed', null)
      ).not.toThrow();

      expect( 
        () => category.activate()
      ).not.toThrow();

      expect( 
        () => category.deactivate()
      ).not.toThrow();

    });


  });
  
});