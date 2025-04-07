import { OptionEntity } from "@types";

export const extractOptionKey = (
  value: OptionEntity | OptionEntity[] | null,
): number | undefined => {
  if (Array.isArray(value)) {
    return value.length > 0 ? Number(value[0].key) : undefined;
  }
  return value?.key ? Number(value.key) : undefined;
};
