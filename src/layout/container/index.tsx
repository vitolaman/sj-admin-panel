interface ContainerProps {
  children: React.ReactNode;
  className?: string
}

const Container: React.FC<ContainerProps> = ({
  children,
  className
}): JSX.Element => {
  return (
    <div
      className={`bg-slate-100 max-h-screen h-screen overflow-auto p-3 pt-[100px] ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;
