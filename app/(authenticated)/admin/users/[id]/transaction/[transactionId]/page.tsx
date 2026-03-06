"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/utils/string-utils";
import { ArrowLeft } from "lucide-react";

interface Transaction {
  _id: string;
  date: string;
  amount: number;
  description: string;
  balance: number;
}

export default function TransactionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id: userId, transactionId } = params;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState<Partial<Transaction>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId && transactionId) {
      const fetchTransaction = async () => {
        try {
          setLoading(true);
          const response = await fetch(`/api/admin/users/${userId}/transactions/${transactionId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch transaction details");
          }
          const data = await response.json();
          setTransaction(data);
          setEditedTransaction(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchTransaction();
    }
  }, [userId, transactionId]);

  const handleEditToggle = () => {
    if (!isEditing && transaction) {
      setEditedTransaction({
        ...transaction,
        amount: parseFloat(transaction.amount.toFixed(2)),
        balance: parseFloat(transaction.balance.toFixed(2)),
      });
    } else {
      setEditedTransaction(transaction || {});
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: name === "amount" || name === "balance" ? parseFloat(value) : value,
    }));
  };

  const handleSave = async () => {
    if (!transaction) return;
    const amt = editedTransaction.amount;
    if (typeof amt !== "number" || Number.isNaN(amt)) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}/transactions/${transactionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: editedTransaction.amount,
          description: editedTransaction.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update transaction");
      }

      const updatedData = await response.json();
      setTransaction(updatedData);
      setIsEditing(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading transaction...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">Error: {error}</div>;
  }

  if (!transaction) {
    return <div className="container mx-auto p-4">Transaction not found.</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full cursor-pointer hover:bg-transparent"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5 text-onb2b-blue-900" />
        </Button>
        <p className="text-xl font-semibold">Transaction Details</p>
      </div>
      <Card className="shadow-xs shadow-onb2b-red-200/20 border-none">
        <CardHeader>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="description" className="mb-3">Description</Label>
              {isEditing ? (
                <Input
                  id="description"
                  name="description"
                  value={editedTransaction.description || ""}
                  onChange={handleChange}
                />
              ) : (
                <p>{transaction.description}</p>
              )}
            </div>
            <div>
              <Label htmlFor="date" className="mb-3">Date</Label>
              {isEditing ? (
                <Input
                  id="date"
                  name="date"
                  value={editedTransaction.date ? new Date(editedTransaction.date).toLocaleDateString() : ""}
                  disabled
                  readOnly
                />
              ) : (
                <p>{new Date(transaction.date).toLocaleDateString()}</p>
              )}
            </div>
            <div>
              <Label htmlFor="amount" className="mb-3">Amount</Label>
              {isEditing ? (
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={editedTransaction.amount || 0}
                  onChange={handleChange}
                />
              ) : (
                <p>{formatCurrency(transaction.amount)}</p>
              )}
            </div>
            <div>
              <Label htmlFor="balance" className="mb-3">Current Balance (after this transaction)</Label>
              {isEditing ? (
                <Input
                  id="balance"
                  name="balance"
                  type="number"
                  value={editedTransaction.balance || 0}
                  disabled
                  readOnly
                />
              ) : (
                <p>{formatCurrency(transaction.balance)}</p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button
              onClick={handleEditToggle}
              className={
                isEditing
                  ? "bg-transparent hover:bg-transparent border border-onb2b-red-800 text-onb2b-red-800 cursor-pointer hover:bg-onb2b-red-800 hover:border-none hover:text-white transition-all duration-300 ease-in-out"
                  : "bg-onb2b-blue-900 hover:bg-onb2b-blue-800 cursor-pointer"
              }
            >
              {isEditing ? "Cancel" : "Edit"}
            </Button>
            {isEditing && (
              <Button onClick={handleSave} className="bg-onb2b-blue-900 hover:bg-onb2b-blue-800 cursor-pointer">Save</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
