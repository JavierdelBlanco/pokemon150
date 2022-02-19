import React from "react";
import { Pagination, Table } from "react-bootstrap";
import { getAbilities } from "../api/abilities";
import { usePokemon } from "../context/pokemon";
import { Loading } from "../components/Loading";
import '../styles/MovesPage.css';



const AbilitiesPage = () => {

const [page,setPage] = React.useState(1);
const [pagination,setPagination] = React.useState(1);
const [abilities, setAbilities] = React.useState([]);
 const [isPendingAbilities, setIsPendingAbilities] = React.useState(true);

const{isPending} = usePokemon();

const fixName = (x) => {
        let name = x.charAt(0).toUpperCase() + x.slice(1);
        let hyphen = name.indexOf('-');
        if(hyphen !== -1){
            name = name.slice(0, hyphen + 1) + name.charAt(hyphen + 1).toUpperCase() + name.slice(hyphen + 2)
        }
        name = name.replace('-',' ');
        return name;
}

const fetchAbilities = async () => {
            const data = await getAbilities(page);
            console.log('data',data);
            setAbilities(data.results);
            setIsPendingAbilities(false);
}

React.useEffect(() => {
  fetchAbilities();
},[page]);


return  <main>
            <article className="text">
                <h2>Abilities</h2>
                <p>A list of all Pokémon abilities is shown below.</p>
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
                    <Pagination.Next  disabled={10 === page} onClick={() => {
                                                                            if((((pagination - 1 )* 5) + 5) === page){
                                                                              setPagination(pagination !== 2 ? (pagination + 1) : 2);
                                                                            }
                                                                            setPage(page !== 10 ? page + 1 : 10)
                                                                            }}/>
                    <Pagination.Last  disabled={10 === page} className="pageButton" onClick={() => {
                                                                                                if(page > 5){
                                                                                                  setPage(10);
                                                                                                }
                                                                                                setPagination(pagination !== 2 ? (pagination + 1) : 2); 
                                                                                                }}/>
                </Pagination>     
            </article>     

            {isPending || isPendingAbilities  ? <Loading/>
                                          : <div className='moves_container'>
                                              <Table striped bordered hover size='sm' className="table_moves_custom">
                                                <thead>
                                                  <tr>
                                                    <th key={0}>#{page}</th>
                                                    <th key={1}>Name</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {abilities.map((x,i) => <tr key={(i + (34 * (page-1)) + 1)}> 
                                                                          <th key={0}>{(i + (34 * (page-1)) + 1)} </th>
                                                                          <th key={1}>{fixName(x.name)} </th>
                                                                      </tr>)}
                                                </tbody>
                                              </Table>
                                            </div> } 
        </main>   
}

export {AbilitiesPage}