import { useEffect, useState, useCallback, useContext } from "react";
import { Link } from "react-router-dom";
import { getAllUsersByAdmin } from "../../api";
import { UserContext } from "../../context/UserContext";
import Pagination from "../Pagination";

const AdminPage = () => {
  //if true show nannys, if false show parents
  const [choice, setChoice] = useState(true);
  const [page, setPage] = useState(1);
  const { user, isLoading, users, setUsers, results, setResults } =
    useContext(UserContext);

  // console.log(giveMeChoice());
  const giveMeChoice = () => (choice ? { text: "nanny" } : { text: "parent" });

  // console.log(giveMeChoice());

  const fetchUsers = useCallback(() => {
    const authtoken = JSON.parse(localStorage.getItem("nannyTkn"));
    //  setIsLoading(true);
    getAllUsersByAdmin(authtoken, giveMeChoice(), page)
      .then((res) => {
        // console.log("res.data", res.data);
        setUsers(res.data.users);
        setResults(res.data.results);
        // setParents(res.data.parents);

        //  setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        //  setIsLoading(false);
      });
  }, [choice, page]);

  useEffect(() => {
    fetchUsers();
    // setArr(theNannys(10));
  }, [fetchUsers]);

  return (
    <div className="flex flex-col  text-white items-center md:mt-20">
      <h3 className=" text-coral-red underline p-4">Admin Dashboard</h3>

      <button
        className="rounded-lg p-2 mt-2 bg-coral-red px-4"
        onClick={() => setChoice(!choice)}
      >
        {" "}
        {choice ? "Fetch Parents" : "Fetch Nannys"}
      </button>
      <div className="mt-4 w-full flex flex-col items-center  max-w-[20rem] ">
        <h3 className="mb-2 text-black">{choice ? "Nannys" : "Parents"}</h3>
        {users.length > 0 &&
          users.map((el) => (
            <Link
              to={`/profile/${el._id}`}
              className="w-[80%] border-2 border-coral-red p-2 rounded-lg mb-2 text-coral-red "
              key={el._id}
            >{`${el.name} ${el.surname}`}</Link>
          ))}
      </div>
      {!isLoading && results?.numberOfPages > 1 && (
        <div className="mb-24 text-black">
          <Pagination results={results} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
