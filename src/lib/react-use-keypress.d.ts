declare module "react-use-keypress" {
  import { KeyboardEvent } from "react";

  function useKeypress(
    keys: string | string[],
    handler: (event: KeyboardEvent) => void,
  ): void;

  export default useKeypress;
}
