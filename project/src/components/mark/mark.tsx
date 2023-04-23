type MarkProps = {
  className: string;
  text: string;
}

function Mark({ className, text }: MarkProps): JSX.Element {
  return (
    <div className={className} data-testid="mark">
      <span>{text}</span>
    </div>
  );
}

export default Mark;
