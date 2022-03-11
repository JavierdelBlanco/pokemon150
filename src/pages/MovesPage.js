import React from "react";
import { Pagination, Table } from "react-bootstrap";
import { getMoves } from "../api/moves";
import { Loading } from "../components/Loading";
import '../styles/MovesPage.css';



const MovesPage = () => {

const [page,setPage] = React.useState(1);
const [pagination,setPagination] = React.useState(1);
const [moves, setMoves] = React.useState([]);
const [isPending, setIsPending] = React.useState(true);

const fixName = (x) => {
        let name = x.charAt(0).toUpperCase() + x.slice(1);
        let hyphen = name.indexOf('-');
        if(hyphen !== -1){
            name = name.slice(0, hyphen + 1) + name.charAt(hyphen + 1).toUpperCase() + name.slice(hyphen + 2)
        }
        name = name.replace('-',' ');
        return name;
}

const fetchMoves = async () => {
            const data = await getMoves(page);
            console.log('data',data);
            setMoves(data.results);
            setIsPending(false);
}

React.useEffect(() => {
  fetchMoves();
},[page]);


return  <main>
            <article className="text">
                <h2>Moves</h2>
                <p>A list of all Pokémon Moves is shown below.</p>
                <Pagination className="pagination-custom">
                    <Pagination.First  disabled={1 === page} className="pageButton" onClick={() => setPagination(pagination !== 1 ? (pagination - 1) : 1)}/>
                    <Pagination.Prev disabled={1 === page} onClick={() => {
                                                                            if((((pagination - 1 )* 5) + 1) === page){
                                                                              setPagination(pagination !== 1 ? (pagination - 1) : 1);
                                                                            }
                                                                            setPage(page !== 1 ? page - 1 : 1);
                                                                            }}/>
                    <Pagination.Item key={1}  active={((pagination - 1 )* 5) + 1 === page} onClick={() => setPage(((pagination - 1 )* 5) + 1)}>{((pagination - 1 )* 5) + 1}</Pagination.Item>
                    <Pagination.Item key={2}  active={((pagination - 1 )* 5) + 2 === page} onClick={() => setPage(((pagination - 1 )* 5) + 2)}>{((pagination - 1 )* 5) + 2}</Pagination.Item>
                    <Pagination.Item key={3}  active={((pagination - 1 )* 5) + 3 === page} onClick={() => setPage(((pagination - 1 )* 5) + 3)}>{((pagination - 1 )* 5) + 3}</Pagination.Item>
                    <Pagination.Item key={4}  active={((pagination - 1 )* 5) + 4 === page} onClick={() => setPage(((pagination - 1 )* 5) + 4)}>{((pagination - 1 )* 5) + 4}</Pagination.Item>
                    <Pagination.Item key={5}  active={((pagination - 1 )* 5) + 5 === page} onClick={() => setPage(((pagination - 1 )* 5) + 5)}>{((pagination - 1 )* 5) + 5}</Pagination.Item>
                    <Pagination.Next  disabled={25 === page} onClick={() => {
                                                                            if((((pagination - 1 )* 5) + 5) === page){
                                                                              setPagination(pagination !== 5 ? (pagination + 1) : 5);
                                                                            }
                                                                            setPage(page !== 25 ? page + 1 : 25)
                                                                            }}/>
                    <Pagination.Last  disabled={25 === page} className="pageButton" onClick={() => {
                                                                                                if(page > 20){
                                                                                                  setPage(25);
                                                                                                }
                                                                                                setPagination(pagination !== 5 ? (pagination + 1) : 5); 
                                                                                                }}/>
                </Pagination>     
            </article>     

            {isPending  ? <Loading/>
                                          : <div className='moves_container'>
                                              <Table striped bordered hover size='sm' className="table_moves_custom">
                                                <thead>
                                                  <tr>
                                                    <th key={0}>#{page}</th>
                                                    <th key={1}>Name</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {moves.map((x,i) => <tr key={(i + (34 * (page-1)) + 1)}> 
                                                                          <th key={0}>{(i + (34 * (page-1)) + 1)} </th>
                                                                          <th key={1}>{fixName(x.name)} </th>
                                                                      </tr>)}
                                                </tbody>
                                              </Table>
                                            </div> } 
        </main>   
}

export {MovesPage}