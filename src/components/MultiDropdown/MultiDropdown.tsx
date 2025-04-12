import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Input from "@/components/Input";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import styles from "./MultiDropdown.module.scss";
import Text from "@/components/Text";
import { OptionEntity } from "@/utils/types";

type MultiDropdownProps = {
  className?: string;
  options: OptionEntity[];
  value: OptionEntity | OptionEntity[] | null;
  onChange: (value: OptionEntity | OptionEntity[]) => void;
  disabled?: boolean;
  getTitle: (value: OptionEntity | OptionEntity[] | null) => string;
  isMulti?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
  isMulti = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.value.toLowerCase().includes(search.toLowerCase()),
      ),
    [options, search],
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = useCallback(
    (option: OptionEntity) => {
      if (isMulti) {
        const newValue = Array.isArray(value) ? [...value] : [];
        const exists = newValue.some((item) => item.key === option.key);
        onChange(
          exists
            ? newValue.filter((item) => item.key !== option.key)
            : [...newValue, option],
        );
      } else {
        onChange(option);
        setIsOpen(false);
      }
    },
    [onChange, value, isMulti],
  );

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  const selectedKeys = useMemo(() => {
    if (isMulti && Array.isArray(value)) {
      return new Set(value.map((item) => item.key));
    }
    return new Set([(value as OptionEntity)?.key]);
  }, [value, isMulti]);

  return (
    <div className={clsx(styles.multi_dropdown, className)} ref={dropdownRef}>
      <Input
        value={isOpen || !value ? search : getTitle(value)}
        onChange={setSearch}
        placeholder={getTitle(value)}
        disabled={disabled}
        onFocus={() => setIsOpen(true)}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {isOpen && (
        <ul className={styles.dropdown_options}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.key}
                className={clsx(
                  styles.dropdown_option,
                  selectedKeys.has(option.key) && styles.selected,
                )}
                onClick={() => handleSelect(option)}
              >
                <Text tag="span" view="p-16" weight="normal" color="primary">
                  {option.value}
                </Text>
              </li>
            ))
          ) : (
            <li className={styles.dropdown_no_options}>Ничего не найдено</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
