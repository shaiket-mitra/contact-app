import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ContactTable from "../components/ContactTable";
import { useContacts } from "../context/useContacts";

export default function Home() {
  const { loading } = useContacts();

  return (
    <main className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header card-title p-4">
                <div className="row align-items-center">
                  <div className="col-12 col-md-auto text-center text-md-start mb-3 mb-md-0">
                    <h2 className="m-0">All Contacts</h2>
                  </div>

                  <div className="col-12 col-md mb-3 mb-md-0">
                    <SearchBar />
                  </div>

                  <div className="col-12 col-md-auto d-flex justify-content-center justify-content-md-end">
                    <Link
                      to="/add-contact"
                      className="btn btn-success w-100 w-md-auto"
                    >
                      <i className="fa fa-plus-circle mr-1"></i>
                      Add New
                    </Link>
                  </div>
                </div>
              </div>

              <FilterBar />

              <div className="card-body">
                {loading ? (
                  <div className="py-4 d-flex justify-content-center align-items-center gap-2">
                    <div
                      className="spinner-border text-primary btn-space"
                      role="status"
                    />
                    <span>Loading...</span>
                  </div>
                ) : (
                  <ContactTable />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
