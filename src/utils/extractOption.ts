import { OptionEntity } from "@/utils/types";

export const extractOptionKey = (
  value: OptionEntity | OptionEntity[] | null,
): number | undefined => {
  if (Array.isArray(value)) {
    return value.length > 0 ? Number(value[0].key) : undefined;
  }
  return value?.key ? Number(value.key) : undefined;
};

export const extractOptionValue = (
  value: OptionEntity | OptionEntity[] | null,
): String => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value[0].value : '';
  }
  return value?.value ? value.value : '';
};

