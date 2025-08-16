import { useState } from "react";
import styles from "./css/select.module.css";

const Select = ({ options, value, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  function handleSelect(e) {
    e.stopPropagation();
    setShowOptions((prev) => !prev);
  }

  return (
    <div className={styles.select} onClick={handleSelect}>
      <span>{value || "Select"}</span>{" "}
      <span className={styles.dropdownSymbol}>&#x25BC;</span>
      <div
        className={`${styles.options} ${showOptions ? styles.showOptions : ""}`}
      >
        {options?.map((opt) => (
          <div
            key={opt}
            className={styles.option}
            onClick={() => {
              onChange(opt);
            }}
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
