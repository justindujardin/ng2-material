export abstract class PlatformHost {
  abstract highlight(code: string, language: string): Promise<string>;
}
