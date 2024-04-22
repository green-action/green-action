export interface PointModalProps {
  isOpen?: boolean | null;
  onCloseFn?: () => void;
  point: number;
  mod?: string;
  handleClick?: () => void;
}
