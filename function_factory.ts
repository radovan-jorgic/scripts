import zoho from "./typescript/zoho";

interface FunctionFactory {
  [key: string]: (...args: any[]) => any;
}

export const functionFactory: FunctionFactory = {
  zoho,
};
