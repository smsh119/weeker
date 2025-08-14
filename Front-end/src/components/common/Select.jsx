import { useState } from "react";
import styles from "./css/select.module.css";

const Select = ({ name, options, defaultValue = "Select" }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  function handleSelect(e) {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  }

  function handleOption(e, value) {
    e.stopPropagation();
    setSelectedValue(value);
    setShowOptions(false);
  }
  return (
    <div id={name} className={styles.select} onClick={handleSelect}>
      <span>{selectedValue}</span>{" "}
      <span className={styles.dropdownSymbol}>&#x25BC;</span>
      <div
        className={`${styles.options} ${showOptions ? styles.showOptions : ""}`}
      >
        {options?.map((opt) => (
          <div
            key={opt}
            className={styles.option}
            onClick={(e) => handleOption(e, opt)}
          >
            {opt}
          </div>
        ))}
      </div>
      {showOptions && (
        <div
          className={styles.invisiblePannel}
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(false);
          }}
        />
      )}
    </div>
  );
};

export default Select;
