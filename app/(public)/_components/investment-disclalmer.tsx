"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function InvestmentDisclaimersSection() {
  return (
    <section className="w-full bg-transparent py-8 md:py-12">
      <div className="px-4 md:px-6 lg:px-12 mx-auto">
        <h3 className="text-base font-normal text-foreground mb-2">
          Investment and insurance products:
        </h3>

        <Table className="w-full border border-gray-400 border-collapse bg-transparent">
        <TableHeader>
            <TableRow className="bg-transparent hover:bg-transparent">
            <TableHead className="px-6 py-8 text-center font-semibold text-gray-700 border-r border-gray-400 bg-transparent">
                Are Not FDIC Insured
            </TableHead>
            <TableHead className="px-6 py-8 text-center font-semibold text-gray-700 border-r border-gray-400 bg-transparent">
                Are Not Bank Guaranteed
            </TableHead>
            <TableHead className="px-6 py-8 text-center font-semibold text-gray-700 bg-transparent">
                May Lose Value
            </TableHead>
            </TableRow>
        </TableHeader>

        <TableBody>
            <TableRow className="bg-transparent hover:bg-transparent">
            <TableCell className="px-6 py-8 text-center font-semibold text-gray-700 border-r border-gray-400 bg-transparent">
                Are Not Deposits
            </TableCell>
            <TableCell className="px-6 py-8 text-center font-semibold text-gray-700 border-r border-gray-400 bg-transparent">
                Are Not Insured by Any Federal Government Agency
            </TableCell>
            <TableCell className="px-6 py-8 text-center font-semibold text-gray-700 bg-transparent">
                Are Not a Condition to Any Banking Service or Activity
            </TableCell>
            </TableRow>
        </TableBody>
        </Table>

        <h4 className="text-base font-semibold text-onb2b-blue-900 mt-5 mb-4">
          Online Banking Service Agreement
        </h4>

        <div className="space-y-4 text-[0.90rem] text-gray-700 leading-relaxed">
          <p>
            Investing in securities involves risks, and there is always the potential of losing money when you invest in securities. You should review any planned financial transactions that may have tax or legal implications with your personal tax or legal advisor.
          </p>

          <p>
            Securities products are provided by Merrill Lynch, Pierce, Fenner & Smith Incorporated (also referred to as &MLPF&S&quot;, or &quot;Merrill&quot;), a registered broker-dealer, registered investment adviser,{" "}
            <span className="text-onb2b-blue-700 underline">Member SIPC</span>, and a wholly-owned subsidiary of Bank of America Corporation. MLPF&S makes available certain investment products sponsored, managed, distributed or provided by companies that are affiliates of Bank of America Corporation.
          </p>

          <p>
            Bank of America Private Bank is a division of Bank of America, N.A., Member FDIC and a wholly owned subsidiary of Bank of America Corporation. Trust and fiduciary services are provided by Bank of America, N.A. and U.S. Trust Company of Delaware. Both are indirect subsidiaries of Bank of America Corporation with no real data, transactions, or authentication occurs. Do not enter any real information unless otherwise.
          </p>

          <p>
            Insurance Products are offered through Merrill Lynch Life Agency Inc. (MLLA) and/or Bank of America Insurance Services, Inc., both of which are licensed insurance agencies and wholly-owned subsidiaries of Bank of America Corporation.
          </p>

          <p>
            Banking, credit card, automobile loans, mortgage and home equity products are provided by Bank of America, N.A. and affiliated banks, Members FDIC and wholly owned subsidiaries of Bank of America Corporation Demo bank purpose only. Credit and collateral are subject to approval. Terms and conditions apply. This is not a commitment to lend. Programs, rates, terms and conditions are subject to change without notice.
          </p>
        </div>
      </div>
    </section>
  )
}