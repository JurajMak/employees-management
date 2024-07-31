type DebouncedFunction<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel(): void;
};

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): DebouncedFunction<T> {
  let timeout: NodeJS.Timeout | undefined;

  const debounced = function (...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  } as DebouncedFunction<T>;

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  return debounced;
}
