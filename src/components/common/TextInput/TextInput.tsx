import styles from './TextInput.module.scss';
import { useField } from 'formik';
import { useState } from 'react';
import { filterNonDigits } from '@src/lib/utils';

type TextInputProps = {
  name: string;
  label: string;
  hint?: string;
  phonePrefix?: string;
  maxLength?: number;
} & Omit<React.ComponentProps<'input'>, 'name'>;

export default function TextInput({
  name,
  label,
  hint,
  phonePrefix,
  maxLength,
  ...props
}: TextInputProps) {
  const [field, meta, helpers] = useField(name);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const hasError = meta.touched && meta.error;
  const describedby = hasError || hint ? `${name}-message` : undefined;

  const handleFocus = () => {
    setIsFocused(true);
    if (props.type === 'tel' && phonePrefix && !field.value) {
      helpers.setValue(phonePrefix);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    field.onBlur(e);
  };

  const handleTelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (!phonePrefix) {
      helpers.setValue(`+${filterNonDigits(value)}`);
      return;
    }

    if (value.length < phonePrefix.length) {
      helpers.setValue(phonePrefix);
      return;
    }

    const withoutPrefix = value.slice(phonePrefix.length);
    helpers.setValue(`${phonePrefix}${filterNonDigits(withoutPrefix)}`);
  };
  return (
    <div className={styles.formField} role="group">
      <label
        className={`${styles.formFieldLabel} ${
          hasError ? styles.isInvalid : ''
        } ${isFocused || field.value?.length ? styles.isActive : ''}`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        id={name}
        className={`${styles.formFieldInput} ${
          hasError ? styles.isInvalid : ''
        }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={props.type === 'tel' ? handleTelChange : field.onChange}
        maxLength={maxLength ?? undefined}
        placeholder={isFocused || field.value?.length ? '' : label}
        aria-describedby={describedby}
        aria-invalid={hasError ? 'true' : 'false'}
      />
      {(hasError || hint) && (
        <div
          id={`${name}-message`}
          className={`${styles.formFieldMessage} ${
            hasError ? styles.hasError : ''
          }`}
        >
          {hasError ? meta.error : hint}
        </div>
      )}
    </div>
  );
}
