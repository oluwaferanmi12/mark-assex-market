export const TableLoader = () => {
  return (
    <table className="w-full animate-pulse">
      <thead>
        <tr className="min-w-full w-full">
          {Array.from({ length: 7 }).map((_, i, arr) => (
            <th
              key={i}
              className={`bg-[#F0F4F8] p-4 ${i === 0 ? "rounded-tl-2xl" : ""} ${
                i === arr.length - 1 ? "rounded-tr-2xl" : ""
              }`}
            >
              <div className="h-4 w-24 bg-slate-200 rounded" />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 6 }).map((_, r) => (
          <tr
            key={r}
            style={{ boxShadow: "0px 4px 10px rgba(64, 64, 64, 0.05)" }}
          >
            {Array.from({ length: 7 }).map((__, c) => (
              <td key={c} className="bg-[#FEFEFE33] p-4">
                <div className="h-4 w-[60%] bg-slate-200 rounded" />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
