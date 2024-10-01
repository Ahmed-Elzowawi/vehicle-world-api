import { vehicleSchemaPostMethod, vehicleSchemaPatchMethod } from './index.js';
import { ValidationError } from 'yup';

describe('vehicleSchemaPostMethod', () => {
  type MockedBody = {
    manufacturer: string | number;
    model: string | number;
    fuel: string | number;
    type: string | number;
    color: string | number;
    VIN: string | number;
    VRM: string | number;
    used: boolean | number;
    modelYear: number | string;
    extraProperty?: string;
  };

  const validateVehicleSchemaPostMethod = async (
    mockedBody: MockedBody,
  ): Promise<true | { error: string }> => {
    let isError: boolean = false;
    let errorMessage: undefined | { error: string };

    await vehicleSchemaPostMethod.validate(mockedBody).catch((err: ValidationError) => {
      isError = true;
      errorMessage = { error: err.message };
    });

    if (isError && errorMessage) return errorMessage;
    else return true;
  };

  let mockedBody: MockedBody;
  beforeEach(() => {
    mockedBody = {
      manufacturer: 'toyota',
      model: 'camry',
      fuel: 'gas',
      type: 'sedan',
      color: 'white',
      VIN: 'TNRU392EESIR93ERF',
      VRM: 'ETHR382',
      used: true,
      modelYear: new Date().getFullYear(),
    };
  });

  it('should throw error for an unknown object key', async () => {
    mockedBody.extraProperty = 'value1';
    const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
    expect(validationResult).toStrictEqual({ error: 'unknown property: extraProperty' });
  });

  it('should validate all required object keys are existing', async () => {
    const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
    expect(validationResult).toBe(true);
  });

  it('should validate "manufacturer" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { manufacturer, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;

    // @ts-expect-error the following function requires "manufacturer" property, but, we need to remove it to unit test
    const validationResult = await validateVehicleSchemaPostMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toStrictEqual({ error: 'manufacturer is a required field' });
  });

  it('should validate "model" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { model, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;

    // @ts-expect-error the following function requires "manufacturer" property, but, we need to remove it to unit test
    const validationResult = await validateVehicleSchemaPostMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toStrictEqual({ error: 'model is a required field' });
  });

  it('should validate "fuel" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fuel, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;

    // @ts-expect-error the following function requires "manufacturer" property, but, we need to remove it to unit test
    const validationResult = await validateVehicleSchemaPostMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toStrictEqual({ error: 'fuel is a required field' });
  });

  it('should validate "type" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;

    // @ts-expect-error the following function requires "manufacturer" property, but, we need to remove it to unit test
    const validationResult = await validateVehicleSchemaPostMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toStrictEqual({ error: 'type is a required field' });
  });

  it('should validate "color" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;

    // @ts-expect-error the following function requires "manufacturer" property, but, we need to remove it to unit test
    const validationResult = await validateVehicleSchemaPostMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toStrictEqual({ error: 'color is a required field' });
  });

  it('should validate "VIN" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { VIN, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;

    // @ts-expect-error the following function requires "manufacturer" property, but, we need to remove it to unit test
    const validationResult = await validateVehicleSchemaPostMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toStrictEqual({ error: 'VIN is a required field' });
  });

  it('should validate "VRM" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { VRM, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;

    // @ts-expect-error the following function requires "manufacturer" property, but, we need to remove it to unit test
    const validationResult = await validateVehicleSchemaPostMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toStrictEqual({ error: 'VRM is a required field' });
  });

  it('should validate "used" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { used, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;

    // @ts-expect-error the following function requires "manufacturer" property, but, we need to remove it to unit test
    const validationResult = await validateVehicleSchemaPostMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toStrictEqual({ error: 'used is a required field' });
  });

  it('should validate "modelYear" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { modelYear, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;

    // @ts-expect-error the following function requires "manufacturer" property, but, we need to remove it to unit test
    const validationResult = await validateVehicleSchemaPostMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toStrictEqual({ error: 'modelYear is a required field' });
  });

  describe('"manufacturer" property', () => {
    test('empty string value', async () => {
      mockedBody.manufacturer = '';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'manufacturer is a required field' });
    });

    it('should validate the value is a string', async () => {
      mockedBody.manufacturer = 'toyota';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.manufacturer = 20;
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.manufacturer = 'toyota';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.manufacturer = 'TOYOTA';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'manufacturer must be a lowercase string' });

      mockedBody.manufacturer = 'ToYoTA';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'manufacturer must be a lowercase string' });

      mockedBody.manufacturer = 'toYOTa';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'manufacturer must be a lowercase string' });
    });

    it('should validate the value length is less than 31', async () => {
      mockedBody.manufacturer = 'toyota';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.manufacturer = 'toyotathejapanesecar';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 30 characters
      mockedBody.manufacturer = 'toyotanturiterhterutirethruteh';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 31', async () => {
      mockedBody.manufacturer = 'toyotanturiterhterutirethrutehs';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be at most 30 characters',
      });

      mockedBody.manufacturer = 'toyotanturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be at most 30 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.manufacturer = 'toyota';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.manufacturer = 'toyota the reliable car';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.manufacturer = 'toyota       ';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a trimmed string',
      });

      mockedBody.manufacturer = '      toyota';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a trimmed string',
      });

      mockedBody.manufacturer = '    toyota    ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a trimmed string',
      });

      mockedBody.manufacturer = ' toyota the reliable car ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a trimmed string',
      });
    });
  });

  describe('"model" property', () => {
    test('empty string value', async () => {
      mockedBody.model = '';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'model is a required field' });
    });

    it('should validate the value is a string', async () => {
      mockedBody.model = 'camry';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.model = 20;
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.model = 'camry';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.model = 'CAMRY';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'model must be a lowercase string' });

      mockedBody.model = 'CamRY';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'model must be a lowercase string' });

      mockedBody.model = 'cAMRy';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'model must be a lowercase string' });
    });

    it('should validate the value length is less than 31', async () => {
      mockedBody.model = 'camry';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.model = 'camrythejapanesecar';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 30 characters
      mockedBody.model = 'camrynturiterhterutirethruteh';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 31', async () => {
      mockedBody.model = 'camrynturiterhterutirethrutehsgulm';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be at most 30 characters',
      });

      mockedBody.model = 'camrynturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be at most 30 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.model = 'camry';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.model = 'camry the reliable model';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.model = 'camry       ';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a trimmed string',
      });

      mockedBody.model = '      camry';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a trimmed string',
      });

      mockedBody.model = '    camry    ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a trimmed string',
      });

      mockedBody.model = ' camry the reliable car ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a trimmed string',
      });
    });
  });

  describe('"fuel" property', () => {
    test('empty string value', async () => {
      mockedBody.fuel = '';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'fuel is a required field' });
    });

    it('should validate the value is a string', async () => {
      mockedBody.fuel = 'camry';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.fuel = 20;
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.fuel = 'camry';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.fuel = 'CAMRY';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'fuel must be a lowercase string' });

      mockedBody.fuel = 'CamRY';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'fuel must be a lowercase string' });

      mockedBody.fuel = 'cAMRy';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'fuel must be a lowercase string' });
    });

    it('should validate the value length is less than 21', async () => {
      mockedBody.fuel = 'camry';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.fuel = 'camrytheja';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 20 characters
      mockedBody.fuel = 'camrynturiterhterutr';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 21', async () => {
      mockedBody.fuel = 'camrynturiterhterutirethrutehsgulm';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be at most 20 characters',
      });

      mockedBody.fuel = 'camrynturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be at most 20 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.fuel = 'camry';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.fuel = 'camry the fuel';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.fuel = 'camry       ';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a trimmed string',
      });

      mockedBody.fuel = '      camry';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a trimmed string',
      });

      mockedBody.fuel = '    camry    ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a trimmed string',
      });

      mockedBody.fuel = ' camry the car ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a trimmed string',
      });
    });
  });

  describe('"type" property', () => {
    test('empty string value', async () => {
      mockedBody.type = '';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'type is a required field' });
    });

    it('should validate the value is a string', async () => {
      mockedBody.type = 'camry';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.type = 20;
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.type = 'camry';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.type = 'CAMRY';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'type must be a lowercase string' });

      mockedBody.type = 'CamRY';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'type must be a lowercase string' });

      mockedBody.type = 'cAMRy';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'type must be a lowercase string' });
    });

    it('should validate the value length is less than 31', async () => {
      mockedBody.type = 'camry';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.type = 'camrythejapanesecar';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 30 characters
      mockedBody.type = 'camrynturiterhterutirethruteh';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 31', async () => {
      mockedBody.type = 'camrynturiterhterutirethrutehsgulm';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be at most 30 characters',
      });

      mockedBody.type = 'camrynturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be at most 30 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.type = 'camry';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.type = 'camry the reliable type';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.type = 'camry       ';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a trimmed string',
      });

      mockedBody.type = '      camry';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a trimmed string',
      });

      mockedBody.type = '    camry    ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a trimmed string',
      });

      mockedBody.type = ' camry the reliable car ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a trimmed string',
      });
    });
  });

  describe('"color" property', () => {
    test('empty string value', async () => {
      mockedBody.color = '';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'color is a required field' });
    });

    it('should validate the value is a string', async () => {
      mockedBody.color = 'camry';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.color = 20;
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.color = 'camry';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.color = 'CAMRY';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'color must be a lowercase string' });

      mockedBody.color = 'CamRY';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'color must be a lowercase string' });

      mockedBody.color = 'cAMRy';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'color must be a lowercase string' });
    });

    it('should validate the value length is less than 26', async () => {
      mockedBody.color = 'camry';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.color = 'camrythejapanesecar';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 25 characters
      mockedBody.color = 'camrynturiterhterutireth';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 26', async () => {
      mockedBody.color = 'camrynturiterhterutirethrutehsgulm';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be at most 25 characters',
      });

      mockedBody.color = 'camrynturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be at most 25 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.color = 'camry';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.color = 'camry the reliable color';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.color = 'camry       ';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a trimmed string',
      });

      mockedBody.color = '      camry';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a trimmed string',
      });

      mockedBody.color = '    camry    ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a trimmed string',
      });

      mockedBody.color = ' camry the reliable car ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a trimmed string',
      });
    });
  });

  describe('"VIN" property', () => {
    test('empty string value', async () => {
      mockedBody.VIN = '';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VIN must be exactly 17 characters',
      });
    });

    it('should validate the value is a string', async () => {
      mockedBody.VIN = 'TNRU392EESIR93ERF';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.VIN = 20;
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VIN must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is an uppercase string', async () => {
      mockedBody.VIN = 'TNRU392EESIR93ERF';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not an uppercase string', async () => {
      mockedBody.VIN = 'tnru392eesir93erf';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must be a upper case string' });

      mockedBody.VIN = 'tnrU392EESIR93ERf';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must be a upper case string' });

      mockedBody.VIN = 'TnRu392eeSIR93ERF';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must be a upper case string' });
    });

    it('should validate the value length is exactly 17', async () => {
      mockedBody.VIN = 'TNRU392EESIR93ERF';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not exactly 17', async () => {
      // more than 17
      mockedBody.VIN = 'TNRU392EESIR93ERF32A';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VIN must be exactly 17 characters',
      });

      // less than 17
      mockedBody.VIN = 'TNRU392EES';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VIN must be exactly 17 characters',
      });
    });

    it('should validate VIN does not contain whitespace', async () => {
      mockedBody.VIN = 'TNRU39 E S R93ERF';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must not contain whitespace' });

      mockedBody.VIN = '   U39TEPSTR93ETV';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must not contain whitespace' });

      mockedBody.VIN = 'TGZU39TEPSTR9    ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must not contain whitespace' });

      mockedBody.VIN = '   U39 EPSTR93E  ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must not contain whitespace' });

      mockedBody.VIN = 'TNRU392EQSIR93ERF';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });
  });

  describe('"VRM" property', () => {
    test('empty string value', async () => {
      mockedBody.VRM = '';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must be exactly 7 characters' });
    });

    it('should validate the value is a string', async () => {
      mockedBody.VRM = 'ETHR382';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.VRM = 20;
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VRM must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is an uppercase string', async () => {
      mockedBody.VRM = 'ETHR38M';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not an uppercase string', async () => {
      mockedBody.VRM = 'ethr382';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must be a upper case string' });

      mockedBody.VRM = 'eTHR38m';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must be a upper case string' });

      mockedBody.VRM = 'Ethr38M';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must be a upper case string' });
    });

    it('should validate the value length is exactly 7', async () => {
      mockedBody.VRM = 'ETHR38M';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not exactly 7', async () => {
      // more than 7
      mockedBody.VRM = 'ETHR38MN8HW';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VRM must be exactly 7 characters',
      });

      // less than 7
      mockedBody.VRM = 'ET38M';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VRM must be exactly 7 characters',
      });
    });

    it('should validate VRM does not contain whitespace', async () => {
      mockedBody.VRM = 'ET   T5';
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must not contain whitespace' });

      mockedBody.VRM = '  P8A  ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must not contain whitespace' });

      mockedBody.VRM = 'T4P8A  ';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must not contain whitespace' });

      mockedBody.VRM = '   TF32';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must not contain whitespace' });

      mockedBody.VRM = 'ET38M5Z';
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });
  });

  describe('"used" property', () => {
    it('should validate the value is a boolean', async () => {
      mockedBody.used = true;
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.used = false;
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a boolean', async () => {
      mockedBody.used = 20;
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'used must be a `boolean` type, but the final value was: `20`.',
      });
    });
  });

  describe('"modelYear" property', () => {
    it('should validate the value is a number', async () => {
      mockedBody.modelYear = 2000;
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.modelYear = 2000.5;
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.modelYear = 2000.589;
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a number', async () => {
      mockedBody.modelYear = '2000';
      const validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'modelYear must be a `number` type, but the final value was: `"2000"`.',
      });
    });

    it('should validate the maximum model year is next year', async () => {
      mockedBody.modelYear = 2015;
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.modelYear = new Date().getFullYear();
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.modelYear = new Date().getFullYear() + 1;
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate model year is not less than the yearAfterNext', async () => {
      const nextYear = new Date().getFullYear() + 1;
      const yearAfterNext = new Date().getFullYear() + 2;

      mockedBody.modelYear = yearAfterNext;
      let validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: `modelYear must be less than or equal to ${nextYear}`,
      });

      mockedBody.modelYear = new Date().getFullYear() + 10;
      validationResult = await validateVehicleSchemaPostMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: `modelYear must be less than or equal to ${nextYear}`,
      });
    });
  });
});

describe('vehicleSchemaPatchMethod', () => {
  type MockedBody = {
    manufacturer?: string | number;
    model?: string | number;
    fuel?: string | number;
    type?: string | number;
    color?: string | number;
    VIN?: string | number;
    VRM?: string | number;
    used?: boolean | number;
    modelYear?: number | string;
    extraProperty?: string;
  };

  const validateVehicleSchemaPatchMethod = async (
    mockedBody: MockedBody,
  ): Promise<true | { error: string }> => {
    let isError: boolean = false;
    let errorMessage: undefined | { error: string };

    await vehicleSchemaPatchMethod.validate(mockedBody).catch((err: ValidationError) => {
      isError = true;
      errorMessage = { error: err.message };
    });

    if (isError && errorMessage) return errorMessage;
    else return true;
  };

  let mockedBody: MockedBody;
  beforeEach(() => {
    mockedBody = {
      manufacturer: 'toyota',
      model: 'camry',
      fuel: 'gas',
      type: 'sedan',
      color: 'white',
      VIN: 'TNRU392EESIR93ERF',
      VRM: 'ETHR382',
      used: true,
      modelYear: new Date().getFullYear(),
    };
  });

  it('should throw error for an unknown object key', async () => {
    mockedBody.extraProperty = 'value1';
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
    expect(validationResult).toStrictEqual({ error: 'unknown property: extraProperty' });
  });

  it('should validate all optional object keys are existing', async () => {
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
    expect(validationResult).toBe(true);
  });

  it('should validate an empty object', async () => {
    const mockedBody = {};
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
    expect(validationResult).toBe(true);
  });

  it('should validate "manufacturer" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { manufacturer, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toBe(true);
  });

  it('should validate "model" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { model, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toBe(true);
  });

  it('should validate "fuel" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { fuel, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toBe(true);
  });

  it('should validate "type" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { type, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toBe(true);
  });

  it('should validate "color" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { color, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toBe(true);
  });

  it('should validate "VIN" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { VIN, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toBe(true);
  });

  it('should validate "VRM" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { VRM, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toBe(true);
  });

  it('should validate "used" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { used, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toBe(true);
  });

  it('should validate "modelYear" is missing', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { modelYear, ...mockedBodyWithoutManufacturer }: MockedBody = mockedBody;
    const validationResult = await validateVehicleSchemaPatchMethod(mockedBodyWithoutManufacturer);
    expect(validationResult).toBe(true);
  });

  describe('"manufacturer" property', () => {
    test('empty string value', async () => {
      mockedBody.manufacturer = '';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is a string', async () => {
      mockedBody.manufacturer = 'toyota';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.manufacturer = 20;
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.manufacturer = 'toyota';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.manufacturer = 'TOYOTA';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'manufacturer must be a lowercase string' });

      mockedBody.manufacturer = 'ToYoTA';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'manufacturer must be a lowercase string' });

      mockedBody.manufacturer = 'toYOTa';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'manufacturer must be a lowercase string' });
    });

    it('should validate the value length is less than 31', async () => {
      mockedBody.manufacturer = 'toyota';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.manufacturer = 'toyotathejapanesecar';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 30 characters
      mockedBody.manufacturer = 'toyotanturiterhterutirethruteh';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 31', async () => {
      mockedBody.manufacturer = 'toyotanturiterhterutirethrutehs';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be at most 30 characters',
      });

      mockedBody.manufacturer = 'toyotanturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be at most 30 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.manufacturer = 'toyota';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.manufacturer = 'toyota the reliable car';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.manufacturer = 'toyota       ';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a trimmed string',
      });

      mockedBody.manufacturer = '      toyota';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a trimmed string',
      });

      mockedBody.manufacturer = '    toyota    ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a trimmed string',
      });

      mockedBody.manufacturer = ' toyota the reliable car ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'manufacturer must be a trimmed string',
      });
    });
  });

  describe('"model" property', () => {
    test('empty string value', async () => {
      mockedBody.model = '';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is a string', async () => {
      mockedBody.model = 'camry';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.model = 20;
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.model = 'camry';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.model = 'CAMRY';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'model must be a lowercase string' });

      mockedBody.model = 'CamRY';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'model must be a lowercase string' });

      mockedBody.model = 'cAMRy';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'model must be a lowercase string' });
    });

    it('should validate the value length is less than 31', async () => {
      mockedBody.model = 'camry';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.model = 'camrythejapanesecar';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 30 characters
      mockedBody.model = 'camrynturiterhterutirethruteh';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 31', async () => {
      mockedBody.model = 'camrynturiterhterutirethrutehsgulm';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be at most 30 characters',
      });

      mockedBody.model = 'camrynturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be at most 30 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.model = 'camry';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.model = 'camry the reliable model';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.model = 'camry       ';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a trimmed string',
      });

      mockedBody.model = '      camry';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a trimmed string',
      });

      mockedBody.model = '    camry    ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a trimmed string',
      });

      mockedBody.model = ' camry the reliable car ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'model must be a trimmed string',
      });
    });
  });

  describe('"fuel" property', () => {
    test('empty string value', async () => {
      mockedBody.fuel = '';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is a string', async () => {
      mockedBody.fuel = 'camry';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.fuel = 20;
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.fuel = 'camry';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.fuel = 'CAMRY';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'fuel must be a lowercase string' });

      mockedBody.fuel = 'CamRY';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'fuel must be a lowercase string' });

      mockedBody.fuel = 'cAMRy';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'fuel must be a lowercase string' });
    });

    it('should validate the value length is less than 21', async () => {
      mockedBody.fuel = 'camry';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.fuel = 'camrytheja';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 20 characters
      mockedBody.fuel = 'camrynturiterhterutr';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 21', async () => {
      mockedBody.fuel = 'camrynturiterhterutirethrutehsgulm';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be at most 20 characters',
      });

      mockedBody.fuel = 'camrynturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be at most 20 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.fuel = 'camry';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.fuel = 'camry the fuel';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.fuel = 'camry       ';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a trimmed string',
      });

      mockedBody.fuel = '      camry';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a trimmed string',
      });

      mockedBody.fuel = '    camry    ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a trimmed string',
      });

      mockedBody.fuel = ' camry the car ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'fuel must be a trimmed string',
      });
    });
  });

  describe('"type" property', () => {
    test('empty string value', async () => {
      mockedBody.type = '';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is a string', async () => {
      mockedBody.type = 'camry';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.type = 20;
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.type = 'camry';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.type = 'CAMRY';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'type must be a lowercase string' });

      mockedBody.type = 'CamRY';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'type must be a lowercase string' });

      mockedBody.type = 'cAMRy';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'type must be a lowercase string' });
    });

    it('should validate the value length is less than 31', async () => {
      mockedBody.type = 'camry';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.type = 'camrythejapanesecar';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 30 characters
      mockedBody.type = 'camrynturiterhterutirethruteh';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 31', async () => {
      mockedBody.type = 'camrynturiterhterutirethrutehsgulm';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be at most 30 characters',
      });

      mockedBody.type = 'camrynturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be at most 30 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.type = 'camry';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.type = 'camry the reliable type';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.type = 'camry       ';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a trimmed string',
      });

      mockedBody.type = '      camry';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a trimmed string',
      });

      mockedBody.type = '    camry    ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a trimmed string',
      });

      mockedBody.type = ' camry the reliable car ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'type must be a trimmed string',
      });
    });
  });

  describe('"color" property', () => {
    test('empty string value', async () => {
      mockedBody.color = '';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is a string', async () => {
      mockedBody.color = 'camry';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.color = 20;
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is a lowercase string', async () => {
      mockedBody.color = 'camry';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a lowercase string', async () => {
      mockedBody.color = 'CAMRY';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'color must be a lowercase string' });

      mockedBody.color = 'CamRY';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'color must be a lowercase string' });

      mockedBody.color = 'cAMRy';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'color must be a lowercase string' });
    });

    it('should validate the value length is less than 26', async () => {
      mockedBody.color = 'camry';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.color = 'camrythejapanesecar';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      // 25 characters
      mockedBody.color = 'camrynturiterhterutireth';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not less than 26', async () => {
      mockedBody.color = 'camrynturiterhterutirethrutehsgulm';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be at most 25 characters',
      });

      mockedBody.color = 'camrynturiterhterutirethrutehsntywfntuwytufw';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be at most 25 characters',
      });
    });

    it('should validate the leading and trailing whitespace are trimmed from the value', async () => {
      mockedBody.color = 'camry';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.color = 'camry the reliable color';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the leading and trailing whitespace are not trimmed from the value', async () => {
      mockedBody.color = 'camry       ';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a trimmed string',
      });

      mockedBody.color = '      camry';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a trimmed string',
      });

      mockedBody.color = '    camry    ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a trimmed string',
      });

      mockedBody.color = ' camry the reliable car ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'color must be a trimmed string',
      });
    });
  });

  describe('"VIN" property', () => {
    test('empty string value', async () => {
      mockedBody.VIN = '';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VIN must be exactly 17 characters',
      });
    });

    it('should validate the value is a string', async () => {
      mockedBody.VIN = 'TNRU392EESIR93ERF';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.VIN = 20;
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VIN must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is an uppercase string', async () => {
      mockedBody.VIN = 'TNRU392EESIR93ERF';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not an uppercase string', async () => {
      mockedBody.VIN = 'tnru392eesir93erf';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must be a upper case string' });

      mockedBody.VIN = 'tnrU392EESIR93ERf';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must be a upper case string' });

      mockedBody.VIN = 'TnRu392eeSIR93ERF';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must be a upper case string' });
    });

    it('should validate the value length is exactly 17', async () => {
      mockedBody.VIN = 'TNRU392EESIR93ERF';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not exactly 17', async () => {
      // more than 17
      mockedBody.VIN = 'TNRU392EESIR93ERF32A';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VIN must be exactly 17 characters',
      });

      // less than 17
      mockedBody.VIN = 'TNRU392EES';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VIN must be exactly 17 characters',
      });
    });

    it('should validate VIN does not contain whitespace', async () => {
      mockedBody.VIN = 'TNRU39 E S R93ERF';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must not contain whitespace' });

      mockedBody.VIN = '   U39TEPSTR93ETV';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must not contain whitespace' });

      mockedBody.VIN = 'TGZU39TEPSTR9    ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must not contain whitespace' });

      mockedBody.VIN = '   U39 EPSTR93E  ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VIN must not contain whitespace' });

      mockedBody.VIN = 'TNRU392EQSIR93ERF';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });
  });

  describe('"VRM" property', () => {
    test('empty string value', async () => {
      mockedBody.VRM = '';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must be exactly 7 characters' });
    });

    it('should validate the value is a string', async () => {
      mockedBody.VRM = 'ETHR382';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a string', async () => {
      mockedBody.VRM = 20;
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VRM must be a `string` type, but the final value was: `20`.',
      });
    });

    it('should validate the value is an uppercase string', async () => {
      mockedBody.VRM = 'ETHR38M';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not an uppercase string', async () => {
      mockedBody.VRM = 'ethr382';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must be a upper case string' });

      mockedBody.VRM = 'eTHR38m';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must be a upper case string' });

      mockedBody.VRM = 'Ethr38M';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must be a upper case string' });
    });

    it('should validate the value length is exactly 7', async () => {
      mockedBody.VRM = 'ETHR38M';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value length is not exactly 7', async () => {
      // more than 7
      mockedBody.VRM = 'ETHR38MN8HW';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VRM must be exactly 7 characters',
      });

      // less than 7
      mockedBody.VRM = 'ET38M';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'VRM must be exactly 7 characters',
      });
    });

    it('should validate VRM does not contain whitespace', async () => {
      mockedBody.VRM = 'ET   T5';
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must not contain whitespace' });

      mockedBody.VRM = '  P8A  ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must not contain whitespace' });

      mockedBody.VRM = 'T4P8A  ';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must not contain whitespace' });

      mockedBody.VRM = '   TF32';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({ error: 'VRM must not contain whitespace' });

      mockedBody.VRM = 'ET38M5Z';
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });
  });

  describe('"used" property', () => {
    it('should validate the value is a boolean', async () => {
      mockedBody.used = true;
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.used = false;
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a boolean', async () => {
      mockedBody.used = 20;
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'used must be a `boolean` type, but the final value was: `20`.',
      });
    });
  });

  describe('"modelYear" property', () => {
    it('should validate the value is a number', async () => {
      mockedBody.modelYear = 2000;
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.modelYear = 2000.5;
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.modelYear = 2000.589;
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate the value is not a number', async () => {
      mockedBody.modelYear = '2000';
      const validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: 'modelYear must be a `number` type, but the final value was: `"2000"`.',
      });
    });

    it('should validate the maximum model year is next year', async () => {
      mockedBody.modelYear = 2015;
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.modelYear = new Date().getFullYear();
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);

      mockedBody.modelYear = new Date().getFullYear() + 1;
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toBe(true);
    });

    it('should validate model year is not less than the yearAfterNext', async () => {
      const nextYear = new Date().getFullYear() + 1;
      const yearAfterNext = new Date().getFullYear() + 2;

      mockedBody.modelYear = yearAfterNext;
      let validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: `modelYear must be less than or equal to ${nextYear}`,
      });

      mockedBody.modelYear = new Date().getFullYear() + 10;
      validationResult = await validateVehicleSchemaPatchMethod(mockedBody);
      expect(validationResult).toStrictEqual({
        error: `modelYear must be less than or equal to ${nextYear}`,
      });
    });
  });
});
