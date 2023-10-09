import * as _ from "lodash";
import { v1 } from "uuid";
import { useState } from "react";
import { FaBook } from "react-icons/fa6";
import { useForm } from "react-hook-form";

type Book = {
  id: string;
  name: string;
};

export const Page = () => {
  const { register, reset, handleSubmit } = useForm<Book>();
  const [bookList, setBookList] = useState<Book[]>([]);

  const handleRemove = (id: string) => {
    const clone = _.cloneDeep(bookList);
    const records = _.filter(clone, (book) => book.id !== id);

    setBookList(records);
  };

  const onSubmit = (data: Book) => {
    if (data.name) {
      const clone = _.cloneDeep(bookList);
      clone.push({ id: v1(), name: data.name });

      setBookList(clone);
      reset();
    }
  };

  return (
    <div className="bg-white rounded shadow p-6 m-4 w-full text-black">
      <div className="mb-4">
        <h1 className="text-grey-darkest flex justify-between">
          <span>Book List</span> <span>count: {bookList.length}</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex mt-4">
          <input
            {...register("name")}
            className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
            placeholder="Add Book"
          />
          <button
            type="submit"
            className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-gray-500 hover:bg-teal"
          >
            Add
          </button>
        </form>
      </div>
      <div className="mt-2">
        {bookList.map((book) => (
          <div
            key={book.id}
            onClick={() => handleRemove(book.id)}
            className="hover:text-gray-500 cursor-pointer"
          >
            <div className="flex mb-4 items-center">
              <FaBook />
              <p className="ml-5 w-full text-grey-darkest">{book.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
