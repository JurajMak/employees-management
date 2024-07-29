type DebouncedFunction<T extends (...args: any[]) => void> = (...args: Parameters<T>) => void;

export function debounce<T extends (...args: any[]) => void>(func: T, wait: number): DebouncedFunction<T> {
  let timeout: NodeJS.Timeout | undefined;

  return function (...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
