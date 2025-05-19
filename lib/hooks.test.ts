// lib/hooks.test.ts
import { useAgeFromBirthday } from "./hooks"; // Asegúrate que la ruta a tu hook sea correcta

describe("useAgeFromBirthday", () => {
  // Mock de la fecha actual para que los tests sean consistentes y no dependan del día en que se corren.
  // Esto es una buena práctica para tests que involucran fechas.
  const MOCK_CURRENT_DATE = new Date("2024-05-20T00:00:00.000Z"); // Lunes, 20 de Mayo de 2024

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(MOCK_CURRENT_DATE);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("debería calcular la edad correctamente si el cumpleaños ya pasó este año", () => {
    // Fecha de nacimiento: 10 de Mayo de 1990. En 2024-05-20, ya cumplió 34.
    const birthDay = "10-05-1990";
    const calculatedAge = useAgeFromBirthday(birthDay);
    expect(calculatedAge).toBe(34);
  });

  it("debería calcular la edad correctamente si el cumpleaños aún no ha pasado este año", () => {
    // Fecha de nacimiento: 25 de Diciembre de 1990. En 2024-05-20, aún tiene 33.
    const birthDay = "25-12-1990";
    const calculatedAge = useAgeFromBirthday(birthDay);
    expect(calculatedAge).toBe(33);
  });

  it("debería devolver null si la fecha de nacimiento no se proporciona (undefined)", () => {
    const calculatedAge = useAgeFromBirthday(undefined);
    expect(calculatedAge).toBeNull();
  });

  it("debería devolver 0 si la fecha de nacimiento es la fecha actual (recién nacido)", () => {
    // Ajusta la fecha de nacimiento para que coincida con MOCK_CURRENT_DATE en formato DD-MM-YYYY
    const birthDayToday = "20-05-2024";
    const calculatedAge = useAgeFromBirthday(birthDayToday);
    expect(calculatedAge).toBe(0);
  });
});
