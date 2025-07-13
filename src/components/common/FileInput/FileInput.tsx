import { useField } from 'formik';
import { useRef, useState } from 'react';
import { z } from 'zod';

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
    <div className="form-file-input">
      <label className="form-file-input__label" htmlFor={name}>
        {label}
      </label>
      <div
        className={`form-file-input__control ${
          hasError ? 'form-file-input__control--invalid' : ''
        }`}
      >
        <button
          type="button"
          className={`form-file-input__button ${
            hasError ? 'form-file-input__button--invalid' : ''
          }`}
          onClick={handlePickFile}
          aria-label={`Choose a file for ${label}`}
        >
          Upload
        </button>
        <span
          className={`form-file-input__filename ${
            hasError ? 'form-file-input__filename--invalid' : ''
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
        className="form-file-input__input"
        aria-describedby={describedBy}
        aria-invalid={hasError ? 'true' : 'false'}
      />
      {hasError && (
        <div id={`${name}-message`} className="form-file-input__message">
          {meta.error}
        </div>
      )}
    </div>
  );
}
