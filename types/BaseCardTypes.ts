// Define a basic action configuration type for cards.
export type ActionConfig<T> = {
    label: string;
    action: (item: T) => void;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  };
  