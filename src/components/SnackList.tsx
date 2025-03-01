import { useEffect, useState } from 'react';
import { ExternalLink, Pencil, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { getSnacks, removeSnack, Snack, updateSnack } from '@/lib/snackList';

export default function SnackList() {
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLink, setEditLink] = useState<string | null>('');

  useEffect(() => {
    async function reFetch() {
      setSnacks(await getSnacks());
    }
    reFetch();
  }, []);

  const handleEditLink = (id: string, currentLink: string | null) => {
    setEditingId(id);
    setEditLink(currentLink);
  };

  const handleSaveLink = async (id: string) => {
    await updateSnack(id, editLink as string);
    setSnacks(await getSnacks());
    setEditingId(null);

    toast.success('링크가 저장되었습니다');
  };

  const handleRemoveSnack = async (id: string, name: string) => {
    await removeSnack(id);
    setSnacks(await getSnacks());

    toast.success(`${name}이(가) 삭제되었습니다`);
  };

  if (!snacks || snacks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-500">등록된 간식이 없습니다</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {snacks.map((snack) => (
        <li
          key={snack.id}
          className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-slate-900">{snack.name}</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSnack(snack.id, snack.name)}
              className="h-8 w-8 text-slate-500 hover:text-red-500 cursor-pointer"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">삭제</span>
            </Button>
          </div>

          {editingId === snack.id ? (
            <div className="flex items-center gap-2 mt-3">
              <Input
                type="url"
                placeholder="구매 링크를 입력하세요"
                value={editLink ?? ''}
                onChange={(e) => setEditLink(e.target.value)}
                className="flex-1 text-sm border-slate-200"
              />
              <Button
                size="sm"
                onClick={() => handleSaveLink(snack.id)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Save className="h-4 w-4 mr-1" />
                저장
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-1">
              {snack.link ? (
                <a
                  href={snack.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline flex items-center"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  구매 링크
                </a>
              ) : (
                <span className="text-sm text-slate-400">구매 링크 없음</span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  handleEditLink(snack.id, snack.link as string | null)
                }
                className="h-7 text-slate-500 hover:text-blue-500 cursor-pointer"
              >
                <Pencil className="h-3 w-3 mr-1" />
                {snack.link ? '링크 수정' : '링크 추가'}
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
