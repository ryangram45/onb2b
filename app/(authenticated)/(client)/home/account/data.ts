interface Transactions {
    date: string,
    amount: string,
    description: string,
    currentBalance: string,
}

export const bankHistory: Transactions[] =  [
    {
        date: "Mar 7, 2025",
        amount: "$1,000,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT876543210 INDN:GLOBAL TECH SOLUTIONS AC:987654321 BRANCH:021000322 REF:INV2025XYZ CO ID:XXXXX28471",
        currentBalance: "3,158,624.19"
    },
    {
        date: "Mar 5, 2025",
        amount: "-$12.00",
        description: "Monthly Maintenance Fee",
        currentBalance: "2,158,624.19"
    },
    {
        date: "Mar 3, 2025",
        amount: "$750,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT112233445 INDN:INVESTMENT FUND LLC AC:334455667 BRANCH:026009593 REF:PROJECT2025 CO ID:XXXXX28471",
        currentBalance: "2,158,636.19"
    },
    {
        date: "Feb 28, 2025",
        amount: "$500,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT554433221 INDN:FINTECH PARTNERS AC:112233445 BRANCH:011000138 REF:DIVIDEND25 CO ID:XXXXX28471",
        currentBalance: "1,408,636.19"
    },
    {
        date: "Feb 25, 2025",
        amount: "$300,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT998877665 INDN:REAL ESTATE VENTURES AC:667788990 BRANCH:031202169 REF:PROPERTY_SALE CO ID:XXXXX28471",
        currentBalance: "908,636.19"
    },
    {
        date: "Feb 22, 2025",
        amount: "-$200.00",
        description: "Consulting Fee - DES:PROFESSIONAL SERVICES ID:XXXXX123456 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "608,636.19"
    },
    {
        date: "Feb 18, 2025",
        amount: "$200,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT334455667 INDN:TECH STARTUP INC AC:889977556 BRANCH:064000020 REF:SEED_FUNDING CO ID:XXXXX28471",
        currentBalance: "608,836.19"
    },
    {
        date: "Feb 15, 2025",
        amount: "$150,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT667788990 INDN:PRIVATE EQUITY GROUP AC:445566778 BRANCH:053000219 REF:ROI_2025 CO ID:XXXXX28471",
        currentBalance: "408,836.19"
    },
    {
        date: "Feb 12, 2025",
        amount: "$100,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT223344556 INDN:FREELANCE PLATFORM AC:998877665 BRANCH:021001208 REF:CONTRACT_PAY CO ID:XXXXX28471",
        currentBalance: "258,836.19"
    },
    {
        date: "Feb 10, 2025",
        amount: "-$50.00",
        description: "Utility Payment - DES:UTILITIES ID:XXXXX654321 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "158,836.19"
    },
    {
        date: "Feb 9, 2025",
        amount: "$50,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT556677889 INDN:DIGITAL AGENCY LLC AC:776655443 BRANCH:011401533 REF:SERVICES_CO ID:XXXXX28471",
        currentBalance: "158,886.19"
    },
    {
        date: "Feb 8, 2025",
        amount: "$25,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT123456789 INDN:CONSULTING FIRM AC:554433221 BRANCH:051000017 REF:PROJECT_FEE CO ID:XXXXX28471",
        currentBalance: "108,886.19"
    },
    // NEW TRANSACTIONS (JANUARY 2025)
    {
        date: "Jan 30, 2025",
        amount: "$75,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT987654321 INDN:INVESTMENT GROUP AC:123456789 BRANCH:021000322 REF:INVESTMENT_25 CO ID:XXXXX28471",
        currentBalance: "83,886.19"
    },
    {
        date: "Jan 25, 2025",
        amount: "-$500.00",
        description: "Car Payment - DES:AUTO LOAN ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "8,886.19"
    },
    {
        date: "Jan 20, 2025",
        amount: "$50,000.00",
        description: "Wire Transfer Received - DES:INCOMING WIRE ID:WT112233445 INDN:FREELANCE PLATFORM AC:998877665 BRANCH:021001208 REF:CONTRACT_PAY CO ID:XXXXX28471",
        currentBalance: "9,386.19"
    },
    {
        date: "Jan 15, 2025",
        amount: "$500.00",
        description: "Payroll Deposit - DES:PAYROLL ID:XXXXX123456 INDN:LOERA PEREZ CO ID:XXXXX28471 PPD",
        currentBalance: "-40,613.81"
    },
    // EXISTING DATA (JANUARY 15, 2025 AND EARLIER)
    {
        date: "Jan 10, 2025",
        amount: "-$12.00",
        description: "Monthly Maintenance Fee",
        currentBalance: "54.19",
    },
    {
        date: "Jan 5, 2025",
        amount: "-$100.00",
        description: "Car Repair - WASHINGTON DES:CARREPAIR ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "66.19",
    },
    {
        date: "Dec 30, 2024",
        amount: "$300.00",
        description: "Freelance Payment - WASHINGTON DES:FREELANCE ID:XXXXX778899 INDN:LOERA PEREZ CO ID:XXXXX28471 ACH",
        currentBalance: "166.19",
    },
    {
        date: "Dec 25, 2024",
        amount: "-$45.00",
        description: "Restaurant Payment - WASHINGTON DES:DINING ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "466.19",
    },
    {
        date: "Dec 20, 2024",
        amount: "-$25.00",
        description: "Online Shopping - WASHINGTON DES:SHOPPING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "511.19",
    },
    {
        date: "Dec 17, 2024",
        amount: "-$0.89",
        description: "HORIZONCUSPOKANE DES:ACCTVERIFY ID:XXXXX882902 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "536.19",
    },
    {
        date: "Dec 17, 2024",
        amount: "$0.42",
        description: "HORIZONCUSPOKANE DES:ACCTVERIFY ID:XXXXX882899 INDN:LOERA PEREZ CO ID:XXXXX28471 PPD",
        currentBalance: "537.08",
    },
    {
        date: "Dec 17, 2024",
        amount: "$0.47",
        description: "HORIZONCUSPOKANE DES:ACCTVERIFY ID:XXXXX882899 INDN:LOERA PEREZ CO ID:XXXXX28471 PPD",
        currentBalance: "536.66",
    },
    {
        date: "Dec 15, 2024",
        amount: "$150.00",
        description: "Gift from Friend - WASHINGTON DES:GIFT ID:XXXXX556677 INDN:LOERA PEREZ CO ID:XXXXX28471 P2P",
        currentBalance: "537.13",
    },
    {
        date: "Dec 10, 2024",
        amount: "-$12.00",
        description: "Monthly Maintenance Fee",
        currentBalance: "687.13",
    },
    {
        date: "Dec 5, 2024",
        amount: "-$50.00",
        description: "Utility Payment - WASHINGTON DES:UTILITY ID:XXXXX654321 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "699.13",
    },
    {
        date: "Nov 30, 2024",
        amount: "$200.00",
        description: "Transfer from Savings - WASHINGTON DES:TRANSFER ID:XXXXX112233 INDN:LOERA PEREZ CO ID:XXXXX28471 ACH",
        currentBalance: "749.13",
    },
    {
        date: "Nov 25, 2024",
        amount: "-$45.00",
        description: "Restaurant Payment - WASHINGTON DES:DINING ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "949.13",
    },
    {
        date: "Nov 20, 2024",
        amount: "$300.00",
        description: "Freelance Payment - WASHINGTON DES:FREELANCE ID:XXXXX778899 INDN:LOERA PEREZ CO ID:XXXXX28471 ACH",
        currentBalance: "994.13",
    },
    {
        date: "Nov 18, 2024",
        amount: "-$25.00",
        description: "Online Shopping - WASHINGTON DES:SHOPPING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "1,294.13",
    },
    {
        date: "Nov 15, 2024",
        amount: "-$15.00",
        description: "Streaming Service - WASHINGTON DES:STREAMING ID:XXXXX223344 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "1,319.13",
    },
    {
        date: "Nov 12, 2024",
        amount: "$150.00",
        description: "Gift from Friend - WASHINGTON DES:GIFT ID:XXXXX556677 INDN:LOERA PEREZ CO ID:XXXXX28471 P2P",
        currentBalance: "1,334.13",
    },
    {
        date: "Nov 10, 2024",
        amount: "$500.00",
        description: "Payroll Deposit - WASHINGTON DES:PAYROLL ID:XXXXX123456 INDN:LOERA PEREZ CO ID:XXXXX28471 PPD",
        currentBalance: "1,484.13",
    },
    {
        date: "Nov 10, 2024",
        amount: "-$50.00",
        description: "Utility Payment - WASHINGTON DES:UTILITY ID:XXXXX654321 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "1,984.13",
    },
    {
        date: "Nov 10, 2024",
        amount: "-$30.00",
        description: "Groceries - WASHINGTON DES:GROCERIES ID:XXXXX987654 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "1,934.13",
    },
    {
        date: "Nov 10, 2024",
        amount: "-$20.00",
        description: "Gas Station - WASHINGTON DES:GAS ID:XXXXX456789 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "1,904.13",
    },
    {
        date: "Nov 10, 2024",
        amount: "$200.00",
        description: "Transfer from Savings - WASHINGTON DES:TRANSFER ID:XXXXX112233 INDN:LOERA PEREZ CO ID:XXXXX28471 ACH",
        currentBalance: "1,884.13",
    },
    {
        date: "Nov 5, 2024",
        amount: "-$100.00",
        description: "Car Repair - WASHINGTON DES:CARREPAIR ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "2,084.13",
    },
    {
        date: "Nov 1, 2024",
        amount: "-$12.00",
        description: "Monthly Maintenance Fee",
        currentBalance: "2,184.13",
    },
    {
        date: "Oct 30, 2024",
        amount: "$2,750.00",
        description: "Bonus Payment - WASHINGTON DES:BONUS ID:XXXXX998877 INDN:LOERA PEREZ CO ID:XXXXX28471 ACH",
        currentBalance: "2,196.13",
    },
    {
        date: "Oct 25, 2024",
        amount: "$2,500.00",
        description: "Freelance Project Payment - WASHINGTON DES:FREELANCE ID:XXXXX776655 INDN:LOERA PEREZ CO ID:XXXXX28471 ACH",
        currentBalance: "4,946.13",
    },
    {
        date: "Oct 20, 2024",
        amount: "-$200.00",
        description: "Rent Payment - WASHINGTON DES:RENT ID:XXXXX554433 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "7,446.13",
    },
    {
        date: "Oct 15, 2024",
        amount: "$3,000.00",
        description: "Investment Dividend - WASHINGTON DES:DIVIDEND ID:XXXXX332211 INDN:LOERA PEREZ CO ID:XXXXX28471 ACH",
        currentBalance: "7,646.13",
    },
    {
        date: "Oct 10, 2024",
        amount: "-$150.00",
        description: "Medical Bill - WASHINGTON DES:MEDICAL ID:XXXXX112233 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "10,646.13",
    },
    {
        date: "Oct 5, 2024",
        amount: "-$12.00",
        description: "Monthly Maintenance Fee",
        currentBalance: "10,796.13",
    },
    {
        date: "Oct 1, 2024",
        amount: "$500.00",
        description: "Payroll Deposit - WASHINGTON DES:PAYROLL ID:XXXXX123456 INDN:LOERA PEREZ CO ID:XXXXX28471 PPD",
        currentBalance: "10,808.13",
    },
    {
        date: "Sep 30, 2024",
        amount: "-$50.00",
        description: "Utility Payment - WASHINGTON DES:UTILITY ID:XXXXX654321 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "11,308.13",
    },
    {
        date: "Sep 25, 2024",
        amount: "$200.00",
        description: "Transfer from Savings - WASHINGTON DES:TRANSFER ID:XXXXX112233 INDN:LOERA PEREZ CO ID:XXXXX28471 ACH",
        currentBalance: "11,358.13",
    },
    {
        date: "Sep 20, 2024",
        amount: "-$45.00",
        description: "Restaurant Payment - WASHINGTON DES:DINING ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "11,558.13",
    },
    {
        date: "Sep 15, 2024",
        amount: "$300.00",
        description: "Freelance Payment - WASHINGTON DES:FREELANCE ID:XXXXX778899 INDN:LOERA PEREZ CO ID:XXXXX28471 ACH",
        currentBalance: "11,603.13",
    },
    {
        date: "Sep 10, 2024",
        amount: "-$25.00",
        description: "Online Shopping - WASHINGTON DES:SHOPPING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "11,903.13",
    },
    {
        date: "Sep 5, 2024",
        amount: "-$15.00",
        description: "Streaming Service - WASHINGTON DES:STREAMING ID:XXXXX223344 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "11,928.13",
    },
    {
        date: "Sep 1, 2024",
        amount: "$150.00",
        description: "Gift from Friend - WASHINGTON DES:GIFT ID:XXXXX556677 INDN:LOERA PEREZ CO ID:XXXXX28471 P2P",
        currentBalance: "12920.13",
    },
];



interface CreditCardHistoryProps { 
    date: string,
    amount: string,
    type: string,
    currentBalance: string,
}

export const creditCardHistory: CreditCardHistoryProps[] = [
    {
        date: "Mar 9, 2025",
        amount: "-$45.67",
        type: "SAFEWAY #1234 DES:GROCERIES ID:XXXXX123456 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "15844.79",
    },
    {
        date: "Mar 5, 2025",
        amount: "-$120.00",
        type: "OLIVE GARDEN #5678 DES:DINING ID:XXXXX654321 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "15890.46",
    },
    {
        date: "Mar 3, 2025",
        amount: "-$89.99",
        type: "AMAZON.COM DES:SHOPPING ID:XXXXX778899 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "16010.46",
    },
    {
        date: "Mar 1, 2025",
        amount: "-$35.00",
        type: "SHELL #91011 DES:GAS ID:XXXXX987654 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "16100.45",
    },
    {
        date: "Feb 28, 2025",
        amount: "-$15.99",
        type: "NETFLIX DES:STREAMING ID:XXXXX223344 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "16135.45",
    },
    {
        date: "Feb 25, 2025",
        amount: "-$250.00",
        type: "BEST BUY #1213 DES:ELECTRONICS ID:XXXXX556677 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "16151.44",
    },
    {
        date: "Feb 20, 2025",
        amount: "-$75.00",
        type: "TARGET #1415 DES:CLOTHING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "16401.44",
    },
    {
        date: "Feb 15, 2025",
        amount: "-$500.00",
        type: "EXPEDIA DES:TRAVEL ID:XXXXX112233 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "16476.44",
    },
    {
        date: "Feb 10, 2025",
        amount: "-$60.00",
        type: "PSE DES:UTILITY ID:XXXXX654321 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "16976.44",
    },
    {
        date: "Feb 5, 2025",
        amount: "-$200.00",
        type: "UW MEDICAL DES:MEDICAL ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "17036.44",
    },
    {
        date: "Jan 30, 2025",
        amount: "-$45.00",
        type: "CHIPOTLE #1617 DES:DINING ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "17236.44",
    },
    {
        date: "Jan 25, 2025",
        amount: "-$300.00",
        type: "WALMART #1819 DES:SHOPPING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "17281.44",
    },
    {
        date: "Jan 20, 2025",
        amount: "-$150.00",
        type: "AMAZON.COM DES:GIFT ID:XXXXX556677 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "17581.44",
    },
    {
        date: "Jan 15, 2025",
        amount: "-$50.00",
        type: "CHEVRON #2021 DES:GAS ID:XXXXX456789 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "17731.44",
    },
    {
        date: "Jan 10, 2025",
        amount: "-$25.00",
        type: "SPOTIFY DES:STREAMING ID:XXXXX223344 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "17781.44",
    },
    {
        date: "Jan 5, 2025",
        amount: "-$100.00",
        type: "EBAY DES:SHOPPING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "17806.44",
    },
    {
        date: "Jan 1, 2025",
        amount: "-$75.00",
        type: "MCDONALDS #2223 DES:DINING ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "17906.44",
    },
    {
        date: "Dec 30, 2024",
        amount: "-$200.00",
        type: "NIKE #2425 DES:CLOTHING ID:XXXXX556677 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "17981.44",
    },
    {
        date: "Dec 25, 2024",
        amount: "-$500.00",
        type: "DELTA DES:TRAVEL ID:XXXXX112233 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "18181.44",
    },
    {
        date: "Dec 20, 2024",
        amount: "-$60.00",
        type: "COMCAST DES:UTILITY ID:XXXXX654321 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "18681.44",
    },
    {
        date: "Dec 15, 2024",
        amount: "-$150.00",
        type: "KAIZER DES:MEDICAL ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "18741.44",
    },
    {
        date: "Dec 10, 2024",
        amount: "-$45.00",
        type: "STARBUCKS #2627 DES:DINING ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "18891.44",
    },
    {
        date: "Dec 5, 2024",
        amount: "-$300.00",
        type: "TARGET #2829 DES:SHOPPING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "18936.44",
    },
    {
        date: "Dec 1, 2024",
        amount: "$5000.00",
        type: "Payment - Online Payment from Checking Account ****1314",
        currentBalance: "19236.44",
    },
    {
        date: "Nov 30, 2024",
        amount: "-$50.00",
        type: "SHELL #3031 DES:GAS ID:XXXXX456789 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "14236.44",
    },
    {
        date: "Nov 25, 2024",
        amount: "-$25.00",
        type: "HULU DES:STREAMING ID:XXXXX223344 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "14286.44",
    },
    {
        date: "Nov 20, 2024",
        amount: "-$100.00",
        type: "EBAY DES:SHOPPING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "14311.44",
    },
    {
        date: "Nov 15, 2024",
        amount: "-$75.00",
        type: "CHIPOTLE #3233 DES:DINING ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "14411.44",
    },
    {
        date: "Nov 10, 2024",
        amount: "$14411.44",
        type: "Payment - Online Payment from Checking Account ****1314",
        currentBalance: "0.00",
    },
    {
        date: "Nov 5, 2024",
        amount: "-$200.00",
        type: "NIKE #3435 DES:CLOTHING ID:XXXXX556677 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "14411.44",
    },
    {
        date: "Nov 1, 2024",
        amount: "-$500.00",
        type: "DELTA DES:TRAVEL ID:XXXXX112233 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "14611.44",
    },
    {
        date: "Oct 30, 2024",
        amount: "-$60.00",
        type: "COMCAST DES:UTILITY ID:XXXXX654321 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "15111.44",
    },
    {
        date: "Oct 25, 2024",
        amount: "-$150.00",
        type: "KAIZER DES:MEDICAL ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "15171.44",
    },
    {
        date: "Oct 20, 2024",
        amount: "-$45.00",
        type: "STARBUCKS #3637 DES:DINING ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "15321.44",
    },
    {
        date: "Oct 15, 2024",
        amount: "-$300.00",
        type: "TARGET #3839 DES:SHOPPING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "15366.44",
    },
    {
        date: "Oct 10, 2024",
        amount: "$15366.44",
        type: "Payment - Online Payment from Checking Account ****1314",
        currentBalance: "0.00",
    },
    {
        date: "Oct 5, 2024",
        amount: "-$200.00",
        type: "NIKE #4041 DES:CLOTHING ID:XXXXX556677 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "15366.44",
    },
    {
        date: "Oct 1, 2024",
        amount: "-$500.00",
        type: "DELTA DES:TRAVEL ID:XXXXX112233 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "15566.44",
    },
    {
        date: "Sep 30, 2024",
        amount: "-$60.00",
        type: "COMCAST DES:UTILITY ID:XXXXX654321 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "16066.44",
    },
    {
        date: "Sep 25, 2024",
        amount: "-$150.00",
        type: "KAIZER DES:MEDICAL ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 WEB",
        currentBalance: "16126.44",
    },
    {
        date: "Sep 20, 2024",
        amount: "-$45.00",
        type: "STARBUCKS #4243 DES:DINING ID:XXXXX334455 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "16276.44",
    },
    {
        date: "Sep 15, 2024",
        amount: "-$300.00",
        type: "TARGET #4445 DES:SHOPPING ID:XXXXX990011 INDN:LOERA PEREZ CO ID:XXXXX28471 POS",
        currentBalance: "16321.44",
    },
    {
        date: "Sep 10, 2024",
        amount: "$16321.44",
        type: "Payment - Online Payment from Checking Account ****1314",
        currentBalance: "0.00",
    },
];