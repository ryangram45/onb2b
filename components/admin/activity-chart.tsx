"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Activity } from "lucide-react";

const data = [
  { name: "Mon", users: 4, transactions: 24 },
  { name: "Tue", users: 3, transactions: 13 },
  { name: "Wed", users: 7, transactions: 38 },
  { name: "Thu", users: 5, transactions: 27 },
  { name: "Fri", users: 9, transactions: 45 },
  { name: "Sat", users: 2, transactions: 12 },
  { name: "Sun", users: 1, transactions: 8 },
];

export function ActivityChart() {
  return (
    <Card className="col-span-2 border-none shadow-gray-200/50">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Activity className="h-5 w-5 text-onb2b-blue-600" />
          Weekly Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Add a wrapper with min-height to ensure the container has dimensions */}
        <div style={{ minHeight: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3f42ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3f42ff" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="txGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc1431" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#dc1431" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="name" 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis 
                className="text-xs"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Area 
                type="monotone" 
                dataKey="users" 
                stroke="#3f42ff" 
                fill="url(#userGradient)"
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="transactions" 
                stroke="#dc1431" 
                fill="url(#txGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#3f42ff]" />
            <span className="text-sm text-muted-foreground">New Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#dc1431]" />
            <span className="text-sm text-muted-foreground">Transactions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}