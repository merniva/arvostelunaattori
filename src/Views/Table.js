import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useAxiosGet } from "../Hooks/HttpRequests";
import TableDetails from "../Components/TableDetails";

function ShowTable() {
  const { tableId } = useParams();
  const url = `http://localhost:80/React/getboarddetails.php?table_id=${tableId}`;
  let table = useAxiosGet(url, tableId);

  let content = null;
  let header = null;
  let history = useHistory();

  if (table.error) {
    content = (
      <div>
        <div className="bg-red-300 p-3">
          Odottamaton ongelma. Ole hyvä ja päivitä tai sulje sivu.
        </div>
      </div>
    );
  }

  if (table.loading) {
    content = <p>Ladataan...</p>;
  }

  if (table.data) {
    content = table.data.details
      .reduce((all, current, idx, source) => {
        const exists = all.find((detail) => detail && detail.id === current.id);
        if (exists) {
          return all;
        }

        const result = { ...current };
        const filteredResults = source.filter(
          (detail) => detail.id === current.id
        );
        result.average = filteredResults.reduce((numbers, currentNumber) => {
          if (!currentNumber.rating) {
            return numbers;
          }
          let parsedCurrentNumber = parseInt(currentNumber.rating);
          let sum = numbers + parsedCurrentNumber;
          console.log(
            "average",
            numbers,
            currentNumber,
            parsedCurrentNumber,
            sum
          );
          return sum;
        }, 0);
        result.average = result.average / filteredResults.length;
        console.log("result average", result);
        return [...all, result];
      }, [])
      .map((tableItem) => (
        <div key={tableItem.id}>
          <TableDetails
            tableItem={tableItem}
            parentTableId={table.data.table.id}
          />
        </div>
      ));
    header = table.data.table.table_name;
  }

  return (
    <div className="container mx-auto justify-center mb-6">
      <h4 className="block font-bold text-xl flex justify-center mb-3">
        {header}
      </h4>
      {content}
      <div className="flex flex-wrap -mx-3">
        <div className="w-full mt-2 px-3 lg:w-1/3 xl:w-1/3">
          <Link
            to={`/additem/${tableId}`}
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full"
          >
            Lisää uusi kohde
          </Link>
        </div>
        <div className="w-full mt-2 px-3 lg:w-2/3 xl:w-2/3">
          <button
            type="back"
            className="bg-white hover:bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded-full"
            onClick={() => history.goBack()}
          >
            Takaisin
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowTable;
