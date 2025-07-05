export const handleError = (error: unknown, context: string): void => {
  const message = `Error in ${context}`;
  throw error instanceof Error
    ? console.error(message, error)
    : console.error(`An unexpected error occurred in ${context}`, error);
};
