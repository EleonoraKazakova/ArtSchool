export default function InputField({ setup, state }) {
  const { label, placeholder, type } = setup;
  const [value, setValue] = state;
  return (
    <label>
      {label}
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={(event) => setValue(event.target.value)}
      />
    </label>
  );
}
