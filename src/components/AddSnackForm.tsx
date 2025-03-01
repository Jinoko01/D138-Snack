import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { addSnack } from '@/lib/snackList';

export default function AddSnackForm() {
  const [snackName, setSnackName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!snackName.trim()) {
      toast.error('간식 이름을 입력해주세요');
      return;
    }

    await addSnack(snackName);
    setSnackName('');

    toast.success('간식이 추가되었습니다');
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200"
    >
      <div className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="간식 이름을 입력하세요"
          value={snackName}
          onChange={(e) => setSnackName(e.target.value)}
          className="flex-1 border-slate-200 focus-visible:ring-blue-500"
        />
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
          <PlusCircle className="h-4 w-4 mr-2" />
          추가
        </Button>
      </div>
    </form>
  );
}
