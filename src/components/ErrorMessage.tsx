interface ErrorMessageProps {
  message: string ;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;
  return <p className="text-red-500 text-center">{message}</p>;
};

export default ErrorMessage;