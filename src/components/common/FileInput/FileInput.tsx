import styles from './FileInput.module.scss';
import { useField } from 'formik';
import { useRef, useState } from 'react';

type FileInputProps = {
  name: string;
  label: string;
  acceptedFormats: string[];
} & Omit<React.ComponentProps<'input'>, 'name'>;

export default function FileInput({
  name,
  label,
  acceptedFormats,
  ...props
}: FileInputProps) {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && meta.error;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const describedBy = hasError ? `${name}-message` : undefined;

  const handlePickFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    helpers.setValue(file, true);
    helpers.setTouched(true, true);
  };

  return (
    <div className={styles.formFileInput}>
      <label className={styles.formFileInputLabel} htmlFor={name}>
        {label}
      </label>
      <div
        className={`${styles.formFileInputControl} ${
          hasError ? styles.isInvalid : ''
        }`}
      >
        <button
          type="button"
          className={`${styles.formFileInputButton} ${
            hasError ? styles.isInvalid : ''
          }`}
          onClick={handlePickFile}
          aria-label={`Choose a file for ${label}`}
        >
          Upload
        </button>
        <span
          className={`
            ${styles.formFileInputFilename} ${
            hasError ? styles.isInvalid : ''
          }`}
        >{`${field.value?.name || 'Upload your photo'}`}</span>
      </div>
      <input
        {...props}
        id={name}
        type="file"
        accept={acceptedFormats.join(', ')}
        ref={fileInputRef}
        onChange={handleFileChange}
        className={styles.formFileInputNativeInput}
        aria-describedby={describedBy}
        aria-invalid={hasError ? 'true' : 'false'}
      />
      {hasError && (
        <div id={`${name}-message`} className={styles.formFileInputMessage}>
          {meta.error}
        </div>
      )}
    </div>
  );
}
