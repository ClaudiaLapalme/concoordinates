import { ConvertToDayOfWeek } from './convert-to-day-of-week.pipe';

describe('ConvertToDayOfWeek', () => {
    
    let convertToDayOfWeek: ConvertToDayOfWeek;

    beforeEach(() => {
        convertToDayOfWeek = new ConvertToDayOfWeek();
      });

    it('providing a correct value should give feedback', () => {
        expect(convertToDayOfWeek.transform(0) === ("Sun")).toBeTruthy();
      });
});