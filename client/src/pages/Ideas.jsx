import React, { useEffect, useState } from 'react'
import IdeaCard from '../components/IdeaCard';
import { toast } from 'react-hot-toast';



const Ideas = () => {

    const [search,setSearch] = useState("");
    const [filter,setFilter] = useState("all");
    const [ideas,setIdeas] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
      const fetchIdeas = async()=>{
        try {
          const response = await fetch("http://localhost:5000/api/idea");
          const data = await response.json();
          setIdeas(data);
        } catch (error) {
          console.error("Error fetching ideas:", error);
          toast.error("Something went wrong while fetching ideas")
        }finally{
          setLoading(false);
        }
      }


    fetchIdeas();
    
    
    },[])

  
    const filterIdeas = ideas.filter((idea)=>{
      const matchesSearch = idea.title.toLowerCase().includes(search.toLowerCase()) || idea.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === "all" || (filter === "badgeWinner" && idea.badgeWinner) || (filter ==="liked" && idea.like?.length > 1);

      return matchesSearch && matchesFilter;
  })



  return (
    <div className='min-h-screen bg-gray-950 text-white px-6 py-10'>
        <h1 className='text-4xl mt-28 font-bold mb-8 text-center'>Explore Ideas</h1>

        <div className='flex flex-col md:flex-row item-center justify-between gap-4 mb-8'>
            <input type="text" placeholder='Search Ideas...' value={search} onChange={(e)=>setSearch(e.target.value)} className='px-4 py-2 rounded bg-gray-800 text-white w-full md:w-1/3'/>

            <select value={filter} onChange={(e)=>setFilter(e.target.value) } className="px-4 py-2 rounded bg-gray-800 text-white">
            <option value="all">All</option>
          <option value="badgeWinner">Badge Winners</option>
          <option value="liked">Most Liked</option>
            </select>
        </div>

        {loading ? (
        <p className='text-center mt-12 text-gray-400'>Loading ideas...</p>
      ) : (
        <div className='grid md:grid-cols-3 gap-6'>
          {filterIdeas.length > 0 ? (
            filterIdeas.map((idea) => (
              <IdeaCard key={idea._id} idea={idea} />
            ))
          ) : (
            <p className='text-center text-gray-400 col-span-3'>No ideas found</p>
          )}
        </div>
      )}

        {/* <div className='grid md:grid-cols-3 gap-6'>
            {
                filterIdeas.map((idea)=>{
                    return <IdeaCard key={idea._id} idea={idea}/>
                })
            }
        </div> */}

    </div>
  )
}

export default Ideas