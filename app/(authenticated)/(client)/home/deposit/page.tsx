"use-client";

const Deposit = () => {
  return (
    <div className="w-full max-w-3xl container mx-auto pt-42 px-6.5 sm:px-32">
      <h1 className="text-[1.203rem] font-semibold w-full">
        Mobile Check Deposit isn&apos;t available for devices located in certain
        countries.
      </h1>
      <p className="pt-3 flex flex-col gap-3 text-[0.854rem] text-balance">
        <span>
          Keep your check in a safe place and you can deposit your check when
          you are located in a country where Mobile Check Deposit is available.
        </span>
        <span>
         {` For information on additional deposit options go to Help > Browse More
          Topics > Mobile Check Deposit > Additional Deposit Options.`}
        </span>
        <span>{`You may also contact us through Menu > Contact Us.`}</span>
      </p>
    </div>
  );
};

export default Deposit;
