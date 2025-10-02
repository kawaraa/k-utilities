import { useEffect, useState } from "react";
import Avatar from "./avatar";
import { borderCls } from "./tw/layout";
import ComboBox from "./combobox";
// Read more about HTML table: https://www.w3schools.com/html/html_tables.asp

export default function Table({ data, onCheck, onClick, imgKey, translation = {}, ...p }) {
  if (!data?.length) return null;
  const headers = !data.length ? [] : Object.keys(data[0]);
  const [checkedItems, setCheckedItems] = useState([]);
  const containsImage = imgKey && headers.includes(imgKey);
  const thCls = `px-2 py-3 ${p.hCls}`;
  const allChecked = checkedItems.length == data.length;

  const handleSelectAll = ({ target: { checked } }) => {
    setCheckedItems(!checked ? [] : data.map((item) => item.id));
  };

  const handleSelectOne = ({ target: { name, checked } }) => {
    if (checked) setCheckedItems((items) => [...items, name]);
    else setCheckedItems((items) => items.filter((item) => item != name));
  };

  useEffect(() => {
    if (onCheck) onCheck(checkedItems);
  }, [checkedItems]);

  return (
    <div className={`${borderCls} max-h-[85vh] overflow-x-auto no-srl-bar rounded-lg ${p.cls || ""}`}>
      <table className="table-auto w-full">
        <thead className="sticky top-0 z-[1] backdrop-blur-md font-semibold capitalize after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-neutral-200 after:dark:bg-neutral-700 ">
          <tr className="text-center">
            {onCheck && (
              <td className={thCls}>
                <input type="checkbox" onChange={handleSelectAll} checked={allChecked} className="w-12" />
              </td>
            )}
            {containsImage && <td className={thCls}>{translation[imgKey] || imgKey}</td>}
            {headers.map(
              (h, i) =>
                h != imgKey && (
                  <th className={thCls} key={i}>
                    {h}
                  </th>
                )
            )}
          </tr>
        </thead>

        <tbody className="">
          {data.map((row, i) => (
            <tr
              onClick={(e) => onClick && onClick(row.id, e)}
              className="odd:bg-neutral-100/50 odd:dark:bg-neutral-800/70"
              key={i}
            >
              {onCheck && (
                <td className={thCls}>
                  <input
                    type="checkbox"
                    name={row.id}
                    onChange={handleSelectOne}
                    checked={checkedItems.includes(row.id)}
                    className="w-12"
                  />
                </td>
              )}
              {containsImage && (
                <td className="p-2 flex justify-center">
                  <Avatar src={row[imgKey]} />
                </td>
              )}
              {headers.map(
                (field, i) =>
                  field != imgKey && (
                    <td className="p-2" key={i}>
                      {translation[row[field]] || row[field]}
                    </td>
                  )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {p.children}
    </div>
  );
}

export function TableColumnsSelect({ columns = [], selected, onSelect }) {
  return <ComboBox items={columns} selected={selected} onSelect={onSelect} multiple name="table-columns" />;
}

/** Usage: Example with Columns Select
<>
  <TableColumnsSelect columns={allFields} selected={allFields} onSelect={handler} />

  <div className="text-center w-full relative">
    <Table data={x} imgKey="image" onCheck={handler} onClick={handler}>
    <LoadMoreButton />
    </Table>
  </div>
</>
 */
