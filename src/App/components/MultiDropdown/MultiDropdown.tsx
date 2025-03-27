import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Input from "../Input";
import ArrowDownIcon from "../icons/ArrowDownIcon";
import styles from "./MultiDropdown.module.scss";
import Text from "../Text";
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled,
  getTitle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: Option) => {
    const newValue = value.some((item) => item.key === option.key)
      ? value.filter((item) => item.key !== option.key)
      : [...value, option];

    onChange(newValue);
  };

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
