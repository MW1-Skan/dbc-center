import type { FieldValues, Resolver } from "react-hook-form";

/**
 * Defers loading Zod and the schema until the first validation, so forms hydrate
 * with a few kilobytes and the validation bundle never competes with first paint.
 */
export function lazyResolver<TIn extends FieldValues, TOut extends FieldValues = TIn>(
  load: () => Promise<Resolver<TIn, unknown, TOut>>,
): Resolver<TIn, unknown, TOut> {
  let pending: Promise<Resolver<TIn, unknown, TOut>> | undefined;
  return async (values, context, options) => {
    pending ??= load();
    const resolver = await pending;
    return resolver(values, context, options);
  };
}
