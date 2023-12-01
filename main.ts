import { functionFactory } from "./function_factory";

const functionName: string | undefined = process.argv[2];

if (functionName) {
  if (Object.keys(functionFactory).includes(functionName)) {
    functionFactory[functionName]();
  } else {
    console.log("Provided function name is not found in function factory!");
  }
} else {
  console.log("Please provide function name!");
}
