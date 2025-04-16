import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import Input from "@/components/Input";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import styles from "./MultiDropdown.module.scss";
import Text from "@/components/Text";
import { OptionEntity } from "@/utils/types";
import { extractOptionValue } from "@/utils/extractOption";
import Loader from "../Loader";

type MultiDropdownProps = {
  className?: string;
  options: OptionEntity[];
  value: OptionEntity | OptionEntity[] | null;
  onChange: (value: OptionEntity | OptionEntity[] | null) => void;
  disabled?: boolean;
  getTitle: (value: OptionEntity | OptionEntity[] | null) => string;
  isMulti?: boolean;
  onSearchInput?: (value: string) => void;
  searchable?: boolean;
  loading?: boolean;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({
  className,
  options,
  value,
  onChange,
  disabled = false,
  getTitle,
  isMulti = false,
  onSearchInput,
  searchable = true,
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredOptions = useMemo(() => {
    if (!searchable) return options;
    return options.filter((option) =>
      option.value.toLowerCase().includes(search.toLowerCase()),
    );
  }, [options, search, searchable]);

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
        const updated = exists
          ? newValue.filter((item) => item.key !== option.key)
          : [...newValue, option];
        onChange(updated);
        setSearch("");
      } else {
        const alreadySelected = (value as OptionEntity)?.key === option.key;
        if (alreadySelected) {
          onChange(null); 
          setSearch("");           
        } else {
          onChange(option);
          setSearch(String(extractOptionValue(option)));           
        }
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
        onChange={(val) => {
          setSearch(val);              
          onSearchInput?.(val);       
        }}
        placeholder={getTitle(value)}
        disabled={disabled}
        onFocus={() => setIsOpen(true)}
        afterSlot={!loading ? 
        <ArrowDownIcon onClick={() => setIsOpen(!isOpen)} className={clsx(styles.dropdown, isOpen && styles.dropdown_arrow)} color="secondary" />
        :
        <Loader size="s" />
      }
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
            <li key="no-options" className={styles.dropdown_no_options}>Ничего не найдено</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MultiDropdown;
