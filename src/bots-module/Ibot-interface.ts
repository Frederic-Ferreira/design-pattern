export interface IBot{
    hello(): Promise<string>;
    react(message: string): string;
}