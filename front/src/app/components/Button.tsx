type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className: string;
  text: string;
  onClick?: () => void;
};

const Button = ({ className, type = 'button', text, onClick }: ButtonProps) => {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
