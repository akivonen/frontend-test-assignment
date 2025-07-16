export const handleError = (error: unknown, context: string): never => {
  const message = `Error in ${context}`;
  console.error(message, error);

  if (error instanceof Error) {
    throw new Error(`${message}: ${error.message}`);
  }
  throw new Error(`An unexpected error occurred in ${context}`);
};

export const filterNonDigits = (s: string): string => s.replace(/[^0-9]/g, '');

export const joinErrors = (
  message: string,
  fails: Record<string, string[]>
): string =>
  [message, Object.values(fails).map((messages) => messages.join(' '))].join(
    ' '
  );
