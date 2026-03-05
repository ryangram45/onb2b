"use client"
import React, { useEffect, useState } from 'react'
import { RiInformation2Line } from "react-icons/ri";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { formatCurrency, getLastDigits } from '@/utils/string-utils';
import { HistorySkeleton } from '@/components/skeletons/client/account-history-skeleton';

const History = () => {
    const [showAccountNumber, setShowAccountNumber] = useState(true);
    const [visibleTransactions, setVisibleTransactions] = useState(10);
    const [isLoading, setIsLoading] = useState(true);
    const [account, setAccount] = useState<{
      advPlusAccountNumber: string;
      routingNumber: string;
      paperElectronicNumber: string;
      wiresAccountNumber: string;
      balance: number;
    } | null>(null);
    const [transactions, setTransactions] = useState<Array<{
      date: string | null;
      amount: number;
      description: string;
      currentBalance: number;
    }>>([]);

    useEffect(() => {
      async function loadTransactions() {
        setIsLoading(true);
        try {
          const [accRes, txRes] = await Promise.all([
            fetch("/api/me/bank-account"),
            fetch(`/api/me/bank-transactions?limit=200`),
          ]);
          if (accRes.ok) {
            setAccount(await accRes.json());
          }
          if (txRes.ok) {
            setTransactions(await txRes.json());
          }
        } catch (error) {
          console.error("Failed to load history:", error);
        } finally {
          setIsLoading(false);
        }
      }
      loadTransactions();
    }, []);

    const loadMoreTransactions = () => {
        setVisibleTransactions(prevVisibleTransactions => prevVisibleTransactions + 10);
    };

    if (isLoading) {
      return <HistorySkeleton />;
    }

  return (
    <div className="pt-42 pb-15 w-full max-w-3xl mx-auto">
        <h1 className='text-[0.67rem] font-semibold flex justify-end px-8 pb-1'>Provided by Bank of America</h1>
        <div className='bg-gray-100 h-full w-full pb-6 flex flex-col justify-center gap-7'>
            <div className='flex justify-between px-8 sm:px-17 text-[1.04rem] items-center'>
                <h1 className='w-full max-w-48 font-semibold mt-6 text-[1.188rem]'>ADV PLUS BANKING - {account ? getLastDigits(account.advPlusAccountNumber) : "-"}</h1>
                <button className='text-blue-800 cursor-pointer'>EDIT</button>
            </div>
            <h1 className='flex flex-col items-center font-semibold text-[1.788rem]'>
              {account ? formatCurrency(account.balance) : "—"}
              <span className='text-[0.7rem] font-normal flex items-center justify-center gap-1'>
                Available balance <RiInformation2Line size={19} color='#1e40af' cursor='pointer'/>
              </span>
            </h1>
            <div className='w-full h-full max-w-100 sm:max-w-152 lg:max-w-172 place-self-center bg-white flex flex-col rounded-lg drop-shadow-lg px-4 py-2'>
                <h1 className='flex items-center justify-between'>Account & Routing # 
                    <button className='cursor-pointer' onClick={() => setShowAccountNumber(!showAccountNumber)}>
                      {showAccountNumber ? <MdKeyboardArrowUp size={24} color='gray' /> : <MdKeyboardArrowDown size={24} color='gray' />}
                    </button>
                </h1>
                {showAccountNumber && (
                    <div className='flex flex-col gap-1'>
                        <div className='border-b border-gray-300 py-3 flex flex-col gap-3'>
                            <h1 className='flex justify-between font-bold'>Account Number <span className='font-normal text-gray-700'>{account?.advPlusAccountNumber ?? "—"}</span></h1>
                            <h1 className='flex justify-between font-bold'>Routing Numbers</h1>
                            <h1 className='flex justify-between'>Paper & Electronic <span className='font-normal text-gray-700'>{account?.paperElectronicNumber ?? "—"}</span></h1>
                            <p className='text-[0.678rem] text-gray-700'>Use this routing number to order checks, set up direct deposits and outgoing payments to other financial institutions.</p>
                        </div>
                        <div className='border-b py-3 border-gray-300 flex flex-col gap-2'>
                            <h1 className='flex justify-between'>Wires<span className='font-normal text-gray-700'>{account?.wiresAccountNumber ?? "—"}</span></h1>
                            <p className='text-[0.678rem] text-gray-700'>Use this routing number for all incoming wire transfers.</p>
                        </div>
                        <div className='py-3 flex flex-col gap-2 items-start'>
                            <p className='text-[0.678rem] text-gray-700'>For an international wire, you&apos;ll need one of our</p>
                            <button className='text-[0.678rem] text-blue-700'>SWIFT <span>codes</span></button> 
                        </div>
                    </div>
                )}
            </div>
            {/* history */}
            <div className='w-full h-full max-w-100 sm:max-w-152 lg:max-w-172 place-self-center bg-white flex flex-col rounded-lg drop-shadow-lg px-[0.300rem]'>
                <h1 className='flex items-center justify-between px-4 py-2 text-gray-600 text-[0.918rem] font-medium'>RECENT TRANSACTIONS</h1>
                {transactions.slice(0, visibleTransactions).map((transaction, index) => (
                    <div key={index} className='flex justify-between px-4 py-2 border-b border-gray-300'>
                        {/* date & description */}
                       <div className='flex flex-col'>
                        <h1 className='text-[0.778rem] text-gray-700'>{transaction.date}</h1>
                        <h1 className='w-full max-w-[13.799rem] text-[1.043rem]'>{transaction.description}</h1>
                       </div>
                       {/* amount & current balance*/}
                       <div className='text-center py-2'>
                        <h1 className='text-blue-800 font-semibold text-[1.097rem] text-end'>{formatCurrency(transaction.amount)}</h1>
                        <h1 className='text-gray-700 text-[0.802rem] text-end'>{formatCurrency(transaction.currentBalance)}</h1>
                       </div>
                    </div>
                ))}
                {visibleTransactions < transactions.length && (
                    <button className='w-full py-2 text-center text-blue-800 cursor-pointer active:text-blue-900' onClick={loadMoreTransactions}>Load More Transactions</button>
                )}
            </div>
        </div>
    </div>
  )
}

export default History