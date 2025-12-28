import { j as jsxRuntimeExports } from './jsx-runtime-ConiGv8a.js';
import { r as reactExports } from './index-C0njtHQA.js';

const container = "_container_ezbdg_1";
const label = "_label_ezbdg_8";
const inputWrapper = "_inputWrapper_ezbdg_15";
const input = "_input_ezbdg_15";
const unit = "_unit_ezbdg_54";
const styles = {
	container: container,
	label: label,
	inputWrapper: inputWrapper,
	input: input,
	unit: unit
};

function QuantityInput({
  value: controlledValue,
  onChange,
  label = "Количество",
  unit = "шт.",
  placeholder = "0",
  disabled = false
}) {
  const [internalValue, setInternalValue] = reactExports.useState("");
  const displayValue = controlledValue !== void 0 && controlledValue !== null ? controlledValue.toString() : internalValue;
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue === "" || /^\d+$/.test(inputValue)) {
      const numValue = inputValue === "" ? null : parseInt(inputValue, 10);
      if (controlledValue === void 0) {
        setInternalValue(inputValue);
      }
      onChange?.(numValue);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.container, children: [
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: styles.label, children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.inputWrapper, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          className: styles.input,
          value: displayValue,
          onChange: handleChange,
          placeholder,
          disabled
        }
      ),
      unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.unit, children: unit })
    ] })
  ] });
}

export { QuantityInput };
//# sourceMappingURL=QuantityInput--vyWjfIY.js.map
