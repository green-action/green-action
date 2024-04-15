export interface PointModalProps {
  isOpen?: boolean | null;
  onClose?: () => void;
  point: number;
  mod?: string;
  handleClick?: () => {};
}
