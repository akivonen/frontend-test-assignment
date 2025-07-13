import { Position } from '@src/types';
import { useField } from 'formik';

type RadioGroupProps = {
  name: string;
  options: Position[];
} & Omit<React.ComponentProps<'input'>, 'name'>;

export default function RadioGroup({
  options,
  name,
  ...props
}: RadioGroupProps) {
  const [field, meta, helpers] = useField(name);

  return (
    <fieldset className="form-radio-group">
      <legend id={`${name}-legend`} className="form-radio-group__legend">
        Select your position
      </legend>
      <div className="form-radio-group__options-list">
        {options.map(({ id, name }) => (
          <label key={id} className="form-radio-group__option">
            <input
              {...props}
              type="radio"
              name={field.name}
              value={id.toString()}
              checked={field.value === id}
              onChange={(e) => helpers.setValue(Number(e.target.value))}
            />
            <span className="form-radio-group__checkmark"></span>
            {name}
          </label>
        ))}
      </div>

      {meta.touched && meta.error ? (
        <div className="form-input__error">{meta.error}</div>
      ) : null}
    </fieldset>
  );
}
