export default function SnackListSkeleton() {
  return (
    <ul className="space-y-3">
      <li className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 transition-all hover:shadow-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-slate-900"></h3>
        </div>
      </li>
    </ul>
  );
}
