import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px]">
          <Image
            src="/documents.svg"
            fill
            className="object-contains dark:hidden"
            alt="Documents photo"
          />
          <Image
            src="/documentsDark.svg"
            fill
            className="object-contains hidden dark:block"
            alt="Documents photo"
          />
        </div>
      </div>
    </div>
  );
};
