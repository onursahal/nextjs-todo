const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex place-items-center justify-center ">
      <div className="  border-white border rounded-md flex flex-col space-y-7 p-4">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
