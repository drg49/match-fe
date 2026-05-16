import React from 'react';
import './index.scss';

/**
 * A reusable input component with an optional label.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The ID of the input.
 * @param {string} props.type - The type of the input.
 * @param {string} props.placeholder - The placeholder of the input.
 * @param {string} props.name - The name of the input.
 * @param {string|number} props.value - The current value of the input.
 * @param {string} props.label - The text for the input label. // 🆕 Added
 * @param {function} props.change - The onChange event for the input.
 * @param {boolean} props.animate - Should the input display animated focus borders?
 * @param {boolean} props.preventSpaces - Should the input prevent spaces from being entered?
 */
const Input = ({
  id,
  type,
  placeholder,
  name,
  value,
  label,
  change,
  animate,
  preventSpaces,
}) => {
  const preventSpace = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  };

  // Generate a fallback ID if one isn't explicitly passed to link the label and input securely
  const inputId = id || `input-${name}`;

  return (
    <div className={`app-input-wrapper`}>
      {label && (
        <label htmlFor={inputId} className="app-input-label">
          {label}
        </label>
      )}

      <div
        className={`app-input ${animate && 'animate'}`}
        id={id ? undefined : inputId}
      >
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value ?? ''}
          onChange={change}
          onKeyDown={preventSpaces ? preventSpace : undefined}
        />
        <span>
          <i></i>
        </span>
      </div>
    </div>
  );
};

export default Input;
