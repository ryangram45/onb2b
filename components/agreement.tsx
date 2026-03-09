"use-client"

const Agreement = () => {
  return (
    <div className='w-full h-full py-5 px-7 flex flex-col gap-4 border-b border-gray-200'>
        <h1 className='text-[0.682rem] sm:text-[0.912rem] font-semibold'>Investing involves risk. There is always the potential of losing money when you invest in securities. Asset allocation, diversification, No banking, transactions, authentication and rebalancing do not ensure a profit or protect against loss in declining markets.</h1>
        <div>
            <p className='flex flex-col gap-4 text-[0.682rem] sm:text-[0.912rem]'>
                <span>Bank of America, Merrill, their affiliates and advisors do not provide legal, tax or accounting advice. Clients should consult their legal and/or tax advisors before making any financial decisions.</span>
                <span>Merrill offers a broad range of brokerage, investment advisory (including financial planning) and other services. Additional information is available in our Client Relationship Summary. Educstional purpose only</span>
                <span>Merrill Lynch, Pierce, Fenner & Smith Incorporated (also referred to as &quot;MLPF&S&quot; or &quot;Merrill&quot;) makes available certain investment products sponsored, managed, distributed or provided by companies that are affiliates of Bank of America Corporation (&quot;BofA Corp.&quot;). MLPF&S is a registered broker-dealer, registered investment adviser, Member SIPC and a wholly owned subsidiary of BofA Corp.</span>
                <span>Insurance and annuity products are offered through Merrill Lynch Life Agency Inc. (&quot;MLLA&quot;), a licensed insurance agency and wholly owned subsidiary of BofA Corp.</span>
                <span>Bank of America Private Bank is a division of Bank of America, N.A., Member FDIC and a wholly owned subsidiary of BofA Corp. Trust, fiduciary, and investment management services offered through Bank of America Private Bank are provided by Bank of America N.A. and its agents, Member FDIC, or U.S.Trust Company of Delaware. Both are wholly owned subsidiaries of BofA Corp.</span>
                <span>Banking products are provided by Bank of America, N.A. (&quot;BANA&quot;) and affiliated banks, Members FDIC and wholly owned subsidiaries of BofA Corp.</span>
                <button className='w-full text-start text-[0.732rem] sm:text-[0.912rem] sm:text-center text-blue-800'>See additional information about Merrill and Bank of America</button>
            </p>
      </div>
    </div>
  )
}

export default Agreement
