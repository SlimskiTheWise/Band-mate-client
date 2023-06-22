'use client';
import { Instrument } from '@/components/users/instrument';
import { Profile } from '@/components/users/profile';
import axios from '@/utils/api';
import { useEffect, useState } from 'react';

export default function Page({ params }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/users/${params.userId}`);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [params.userId]);
  return (
    <>
      {user && (
        <div className='container mx-auto my-5 p-5'>
          <div className='md:flex no-wrap md:-mx-2 '>
            <div className='w-full md:w-3/12 md:mx-2'>
              <div className='bg-white p-3 border-t-4 border-blue-400'>
                <Profile user={user} />
              </div>
            </div>
            <div className='w-full md:w-9/12 mx-2 h-64'>
              {user.instruments.map((instrument) => (
                <Instrument instrument={instrument} key={instrument.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}