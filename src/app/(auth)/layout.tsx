import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex place-items-center justify-center ">
      <div className="bg-red-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 flex flex-row ">
        <div className="flex self-center">
          <Image src={"/mascot.png"} alt={"mascot"} width={400} height={400} />
        </div>
        <div className="flex flex-col space-y-4 p-10">{children}</div>

      </div>
    </div>
  );
};

export default AuthLayout;
