import SearchInput from "components/search-input";
import { Table } from "components/table/table";
import { FaSearch } from "react-icons/fa";

const UserDatabase = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-row justify-between items-center">
        <h1 className="font-semibold text-2xl">Users</h1>
        <div className="flex flex-row gap-3">
          <SearchInput
            placeholder="Search"
            onSubmit={({ text }) => {}}
          />
        </div>
      </div>
      <Table<any> columns={[]}></Table>
    </div>
  );
};

export default UserDatabase;
