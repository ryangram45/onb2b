'use client'

const DashboardNote = () => {
  return (
    <div className='w-full h-full py-5 px-7 flex flex-col gap-4'>
        <div className='border-b py-3 border-gray-300'>
            <p className='flex flex-col gap-4 text-[0.682rem] sm:text-[0.912rem]'>
                <span>For checking, savings, and money market accounts, the balance may reflect transactions that have not yet posted to your account. For credit card, Gold Option, Gold Reserve and personal line of credit accounts, the balance may not reflect recent transactions or pending payments.</span>
                <span>Amount shown for loan products is principal balance only and is current as of previous business day&apos;s closing. This amount does not include any applicable accrued interest and/or fees. Refer to your monthly billing statement for more information.</span>
                <span>The data displayed for your Merrill account(s) is for informational purposes only. Your account statement is the official record of your holdings and balances.</span>
            </p>
      </div>
      <div>
            <p className='flex flex-col gap-4 text-[0.682rem] sm:text-[0.912rem]'>
                <span>The score we provide here is FICO® Score 8 based on TransUnion data and may differ from other FICO® Scores. Bank of America and other lenders may use different scores and other types of information in credit decisions.</span>
                <span>FICO is a registered trademark of Fair Isaac Corporation in the United States and other countries.</span>
            </p>
      </div>
    </div>
  )
}

export default DashboardNote
