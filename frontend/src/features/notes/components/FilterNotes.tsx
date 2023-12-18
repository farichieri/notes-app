import { Category } from '@/features/categories';

interface Props {
  archiveFilter: string;
  setArchiveFilter: (value: string) => void;
  categoryFilterId: number | null;
  setCategoryFilterId: (value: number | null) => void;
  categories: Category[];
  archiveFilterOptions: Record<string, string>;
}

const FilterNotes: React.FC<Props> = ({
  archiveFilter,
  setArchiveFilter,
  categoryFilterId,
  setCategoryFilterId,
  categories,
  archiveFilterOptions,
}) => {
  return (
    <div className='w-full flex-wrap flex justify-between items-start gap-4'>
      <div className='w-full overflow-auto rounded-full min-w-fit divide-x divide-slate-800 border border-slate-800 sm:w-fit'>
        {Object.entries(archiveFilterOptions).map(([key, value]) => (
          <button
            key={key}
            className={`text-slate-400 py-2 px-3 hover:bg-slate-700 duration-200 active:bg-slate-900 font-semibold ${
              archiveFilter === value ? 'bg-slate-700' : ''
            }`}
            onClick={() => setArchiveFilter(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <div>
        {
          <div className='w-fit flex-wrap gap-2 flex'>
            {categories.map((category) => (
              <button
                key={category.id}
                style={{ backgroundColor: category.color }}
                className={`text-slate-400 py-2 px-3 rounded-full duration-200 font-semibold ${
                  categoryFilterId === category.id
                    ? 'opacity-100'
                    : 'opacity-30'
                }`}
                onClick={() =>
                  setCategoryFilterId(
                    categoryFilterId === category.id ? null : category.id
                  )
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default FilterNotes;
