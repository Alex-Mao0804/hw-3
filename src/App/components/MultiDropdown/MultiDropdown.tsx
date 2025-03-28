import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Input from "@components/Input";
import ArrowDownIcon from "@components/icons/ArrowDownIcon";
import styles from "./MultiDropdown.module.scss";
import Text from "@components/Text";
import { OptionMultiDropdown } from "@/App/utils/types";

/** Пропсы, которые принимает компонент Dropdown */
type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: OptionMultiDropdown[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: OptionMultiDropdown[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: OptionMultiDropdown[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: OptionMultiDropdown[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
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
    (option: OptionMultiDropdown) => {
      onChange(
        value.some((item) => item.key === option.key)
          ? value.filter((item) => item.key !== option.key)
          : [...value, option],
      );
    },
    [onChange, value],
  );

  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  return (
    <div className={clsx(styles.multi_dropdown, className)} ref={dropdownRef}>
      <Input
        value={isOpen || value.length === 0 ? search : getTitle(value)}
        onChange={setSearch}
        placeholder={getTitle(value)}
        disabled={disabled}
        onFocus={() => {
          setIsOpen(true);
        }}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {isOpen && (
        <ul className={styles.dropdown_options}>
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.key}
                className={clsx(styles.dropdown_option, {
                  [styles.selected]: value.some(
                    (item) => item.key === option.key,
                  ),
                })}
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
