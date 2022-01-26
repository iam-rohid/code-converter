type OutputType = {
  title: string;
  href: string;
};

type InputType = {
  input: string;
  outputs: OutputType[];
};

export type { OutputType, InputType };
