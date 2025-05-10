const assert = require('assert');

describe('Component Tests', () => {
  describe('PasswordComponent', () => {
    let comp;
    let service;

    beforeEach(() => {
      service = {
        save: jest.fn(() => Promise.resolve()) 
      };

      comp = {
        password: '',
        confirmPassword: '',
        doNotMatch: null,
        error: null,
        success: null,
        changePassword: function () {
          if (this.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
            this.success = null;
            this.error = null;
          } else {
            try {
              service.save(this.password);
              this.success = 'OK';
              this.error = null;
              this.doNotMatch = null;
            } catch (e) {
              this.success = null;
              this.error = 'ERROR';
              this.doNotMatch = null;
            }
          }
        }
      };
    });

    test('should show error if passwords do not match', () => {
      // GIVEN
      comp.password = 'password1';
      comp.confirmPassword = 'password2';

      // WHEN
      comp.changePassword();

      // THEN
      expect(comp.doNotMatch).toBe('ERROR');
      expect(comp.error).toBeNull();
      expect(comp.success).toBeNull();
    });

    test('should call Auth.changePassword when passwords match', () => {
      // GIVEN
      comp.password = comp.confirmPassword = 'myPassword';

      // WHEN
      comp.changePassword();

      // THEN
      expect(service.save).toHaveBeenCalledWith('myPassword');
    });

    test('should set success to OK upon success', function () {
      // GIVEN
      comp.password = comp.confirmPassword = 'myPassword';

      // WHEN
      comp.changePassword();

      // THEN
      expect(comp.doNotMatch).toBeNull();
      expect(comp.error).toBeNull();
      expect(comp.success).toBe('OK');
    });

    test('should notify of error if change password fails', function () {
      // GIVEN
      service.save = jest.fn(() => {
        throw new Error('Service failed');
      });

      comp.password = comp.confirmPassword = 'myPassword';

      // WHEN
      comp.changePassword();

      // THEN
      expect(comp.doNotMatch).toBeNull();
      expect(comp.success).toBeNull();
      expect(comp.error).toBe('ERROR');
    });
  });
});

