'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
};

type Recipient = {
  id: string;
  country: string;
  countryCode: string;
  firstName: string;
  lastName: string;
};

const RecipientItem = ({ recipient, selected, onSelect }: { recipient: Recipient, selected: boolean, onSelect: () => void }) => (
  <div 
    className={`text-center cursor-pointer p-2 rounded-lg`}
    onClick={onSelect}
  >
    <div className={`relative w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full flex items-center justify-center text-lg sm:text-xl font-bold ${selected ? 'bg-onb2b-blue-900 text-white' : 'bg-gray-200/70 text-white'}`}>
      {getInitials(recipient.firstName, recipient.lastName)}
      <img src={`https://flagcdn.com/w20/${(recipient.countryCode || 'us').toLowerCase()}.png`} alt={recipient.country} className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 border-white" />
    </div>
    <p className="mt-2 text-xs sm:text-sm font-medium text-onb2b-blue-900/80">{`${recipient.firstName} ${recipient.lastName}`}</p>
  </div>
);

export const RecipientList = ({ recipients, selectedId, onSelectId }: { recipients: Recipient[], selectedId: string, onSelectId: (id: string) => void }) => {
  const router = useRouter();

  return (
    <div className="py-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">Recipient</h3>
        <Button
          variant="whiteGhost"
          className="no-underline font-semibold text-base cursor-pointer"
          onClick={() => router.push("/home/make-pass/wire/country")}
        >
          Add new recipient
          <span className="bg-onb2b-blue-800 rounded-full p-0.5 ml-2">
            <Plus className="text-white w-4 h-4" />
          </span>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-200 py-3">
        {recipients.map(recipient => (
          <RecipientItem 
            key={recipient.id} 
            recipient={recipient} 
            selected={selectedId === recipient.id}
            onSelect={() => onSelectId(recipient.id)}
          />
        ))}
      </div>
      <div className="text-end mt-4">
        <Button variant="link" className="text-blue-600">All recipients</Button>
      </div>
    </div>
  );
};
