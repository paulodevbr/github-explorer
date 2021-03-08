import { clear, mockUserAgent } from 'jest-useragent-mock';
import isMobile from '../isMobile';

describe('isMobile', () => {
  afterEach(() => {
    clear();
  });
  it('should be able to return true if client is mobile', async () => {
    mockUserAgent('mobile');
    expect(isMobile()).toBeTruthy();

    mockUserAgent('iphone');
    expect(isMobile()).toBeTruthy();
  });

  it('should be able to return false if client is PC', async () => {
    mockUserAgent('windows');
    expect(isMobile()).toBeFalsy();

    mockUserAgent('macos');
    expect(isMobile()).toBeFalsy();
  });
});
