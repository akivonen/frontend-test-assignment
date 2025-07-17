// Handler unknown errors by logging and throwing a descriptive Error
export const handleError = (error: unknown, context: string): never => {
  const message = `Error in ${context}`;
  console.error(message, error);

  if (error instanceof Error) {
    throw new Error(`${message}: ${error.message}`);
  }
  throw new Error(`An unexpected error occurred in ${context}`);
};

// Removes all non-digit chars
export const filterNonDigits = (s: string): string => s.replace(/[^0-9]/g, '');

// Joins a main error with a multiple field-specific errors
export const joinErrors = (
  message: string,
  fails: Record<string, string[]>
): string =>
  [message, Object.values(fails).map((messages) => messages.join(' '))].join(
    ' '
  );

// Formats a phone number string to format as in template
export const formatPhone = (phone: string): string => {
  const countryCode = phone.slice(0, 3);
  const localCode = phone.slice(3, 6);
  const restDigits = phone.slice(6);

  return `${countryCode} (${localCode}) ${restDigits.slice(
    0,
    3
  )} ${restDigits.slice(3, 5)} ${restDigits.slice(5)}`;
};

export const getImageDimensions = (
  file: File
): Promise<{ width: number; height: number }> => {
  const imageUrl = URL.createObjectURL(file);
  const img = new Image();

  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
      URL.revokeObjectURL(imageUrl);
    };
    img.onerror = () => {
      reject(new Error('Failed to load image'));
      URL.revokeObjectURL(imageUrl);
    };
    img.src = imageUrl;
  });
};
