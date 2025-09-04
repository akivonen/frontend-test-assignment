import styles from './RadioGroup.module.scss';
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
  const hasError = meta.touched && meta.error;

  return (
    <fieldset className={styles.formRadioGroup}>
      <legend id={`${name}-legend`} className={styles.formRadioGroupLegend}>
        Select your position
      </legend>
      <div className={styles.formRadioGroupOptionList}>
        {options.map(({ id, name }) => (
          <label key={id} className={styles.formRadioGroupOption}>
            <input
              {...props}
              type="radio"
              name={field.name}
              value={id.toString()}
              checked={field.value === id}
              onChange={(e) => helpers.setValue(Number(e.target.value))}
              aria-checked={field.value === id ? 'true' : 'false'}
              role="radio"
            />
            <span className={styles.formRadioGroupCheckmark}></span>
            {name}
          </label>
        ))}
      </div>

      {meta.touched && meta.error ? (
        <div
          className={`${styles.formRadioGroupMessage} ${
            hasError ? styles.hasError : ''
          }`}
          role="alert"
        >
          {meta.error}
        </div>
      ) : null}
    </fieldset>
  );
}
