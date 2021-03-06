import React, { useState } from 'react';
import './App.css';
import useFetchJobs from './useFetchJobs';
import { Container, Spinner } from 'react-bootstrap';
import Job from './components/Job';
import JobsPagination from './components/JobsPagination';
import SearchForm from './components/SearchForm';
import Header from './components/Header';

function App() {
    const [params, setParams] = useState({ description: '', location: '' });
    const handleParamChange = e => {
        const name = e.target.name,
            value = e.target.value;
        setPage(1);
        setParams(prevParams => {
            setParams({
                ...prevParams,
                [name]: value,
            });
        });
    };
    const [page, setPage] = useState(1);
    const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);

    return (
        <>
            <Header />
            <Container className="my-3">
                <SearchForm
                    params={params}
                    handleParamChange={handleParamChange}
                />

                <JobsPagination
                    page={page}
                    setPage={setPage}
                    hasNextPage={hasNextPage}
                />
                {loading && (
                    <Spinner
                        animation="border"
                        role="status"
                        variant="primary"
                        className="d-block mx-auto my-5"
                    >
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}
                {error && <h1>Error. Try refreshing</h1>}
                {jobs.map(job => (
                    <Job key={job.id} job={job} />
                ))}
                {!loading && (
                    <JobsPagination
                        page={page}
                        setPage={setPage}
                        hasNextPage={hasNextPage}
                    />
                )}
            </Container>
        </>
    );
}

export default App;
