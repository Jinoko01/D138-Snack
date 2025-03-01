import SnackList from '@/components/SnackList';
import AddSnackForm from '../components/AddSnackForm';

export default function Main() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container max-w-md mx-auto p-4 pt-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            D138 연구실 간식 구매 리스트
          </h1>
          <p className="text-slate-500 mt-1">원하는 간식을 등록해보세요</p>
        </header>
        <AddSnackForm />

        <div className="mt-8">
          <h2 className="text-lg font-medium text-slate-900 mb-4">
            등록된 간식 목록
          </h2>
          <SnackList />
        </div>
      </div>
    </main>
  );
}
