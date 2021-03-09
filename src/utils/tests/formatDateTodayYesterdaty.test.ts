import formatDateTodayYesterday from '../formatDateTodayYesterday';

describe('formatDateTodayYesterday', () => {
  beforeAll(() => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 2, 9, 10, 10).getTime();
    });
  });
  it('should be able to convert date to created now', async () => {
    const date = new Date(2021, 2, 9, 10, 10);
    expect(formatDateTodayYesterday(date)).toBe('Created now');
  });
  it('should be able to convert date to minutes ago', async () => {
    const date = new Date(2021, 2, 9, 10, 0);
    expect(formatDateTodayYesterday(date)).toBe('10 minutes ago');
  });
  it('should be able to convert date to hours ago', async () => {
    const date = new Date(2021, 2, 9, 8, 10);
    expect(formatDateTodayYesterday(date)).toBe('2 hours ago');
  });

  it('should be able to convert date to string yesterday and hour', async () => {
    const date = new Date(2021, 2, 8, 10, 10);
    expect(formatDateTodayYesterday(date)).toBe('Yesterday at 10:10 am');
  });

  it('should be able to convert date to string showing day, month, year, hours and minutes', async () => {
    const date = new Date(2021, 2, 7, 10, 10);
    expect(formatDateTodayYesterday(date)).toBe('03/07/2021 10:10 am');
  });
});
