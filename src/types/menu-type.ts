type OutputType = {
  output: string;
  href: string;
};

type InputType = {
  input: string;
  outputs: OutputType[];
};

export type { OutputType, InputType };
