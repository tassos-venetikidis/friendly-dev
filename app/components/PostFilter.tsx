type PostFilterProps = {
  filterTerm: string;
  onFilterInput: (value: string) => void;
};

function PostFilter({ filterTerm, onFilterInput }: PostFilterProps) {
  return (
    <div className="mb-6 ">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={filterTerm}
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onInput={(e) => onFilterInput(e.currentTarget.value.toLowerCase())}
      />
    </div>
  );
}

export default PostFilter;
